// server.js
// note 'require' vs 'import' modules Node.js doesn't support ES6 import statements out of the box for CommonJS modules (Node.js uses require for module imports)
// import { fileTypeFromFile } from 'file-type';
const express = require("express");
const multer = require("multer");
const { exec } = require("child_process");
const favicon = require("serve-favicon");
const path = require("path");
// filesystem module
const fs = require('fs');
const cors = require("cors");
// const { Server } = require("http");
// for general front-end server built on Express.js
const app = express();
const port = 5000;
// const { checkFile } = require('./src/components/filehandling/fileService');

// // Scan file for nefarious content
// const cloudmersiveApi = require('cloudmersive-virus-api-client');
// const virusScanFile = cloudmersiveApi.ScanApi();



// for path to upload docs
const storage = multer.memoryStorage();
// for uploading using multer, limit file size
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 1 /* 1024^2 bytes = 1MB */ }
});


// Serve favicon.ico
app.use(favicon(path.join(__dirname, "public/favicon.ico")), express.static(path.join(__dirname, 'public')), cors());
// Serve static files from the 'public' directory
// app.use('/public', express.static(path.join(__dirname, 'public')))

app.post("/upload", upload.single("input-file"), async (req, res, next) => {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    console.log(`Server: IN ROUTE "app.post('/upload')"; req.body is: ${JSON.stringify(req.body)}`);
    const { filepath, filename } = req.body;
    console.log(`Server: IN ROUTE "app.post('/upload')"; filepath is: ${filepath}\n`);
    
    // // Scan file for nefarious content
    // const fileContentResult = await virusScanFile.scanFile(filepath);
    
    // Access uploaded file using req.file.buffer, 
    const fileContent = req.file.buffer;

    // // Confirm file is text file
    // // Access file type attributes, 
    // const mimeFileType = fileTypeFromFile(req.file.buffer).mime;  
    // console.log(`Server: IN ROUTE "app.post('/upload')"; mimeFileType is: ${mimeFileType}`)
    // if (!mimeFileType || mimeFileType !== 'text/plain') {
    //   res.status(400).json({ error: "Only test files are allowed." });
    //   return;
    // }
    

    fs.writeFile(filepath, fileContent, (err) => {
      if (err) {
        console.log(`/upload error: ${err}`);
        return next(err);
      };
      // if (err) throw err;
      console.log('The file has been saved!');
      res.json({ result: `successfully uploaded: ${filepath}`});
    }); 
    
    // // if clean check with ScanFile, trigger file upload
    // if (fileContent.CleanResult === true){
    //   // const fileContent = req.file.buffer.toString();
    //   console.log(`Server: IN ROUTE "app.post('/upload')"; fileContent.toString() is: ${fileContent.toString().substring(0,300)}\n`);
    //   // if (!fs.existsSync(directory)) { fs.mkdirSync(directory, { recursive: true }); }
    //   fs.writeFile(filepath, fileContent, (err) => {
    //     if (err) {
    //       console.log(`/upload error: ${err}`);
    //       return next(err);
    //     };
    //     // if (err) throw err;
    //     console.log('The file has been saved!');
    //     res.json({ result: `successfully uploaded: ${filepath}`});
    //   }); 
    // } else {
    //   res.status(400).json({ error: "Uploaded file is infected"});
    // }

    } catch (error) {
      next(error);
    }
    

  // HEREHEREHERE - start at the response provided within gpt 3.5 tab
  // Find out how to incorporate Express error (err) handling for this route
  // Then include two error handlings that can result from /upload route...:
  // 1. multer's upload(file-path) method fails
  // 2. multer's file size limit hits upper bound... per stackoverflow this error should be: "err.code === 'LIMIT_FILE_SIZE' " (stackoverflwo src:"https://stackoverflow.com/questions/34697502/how-to-limit-the-file-size-when-uploading-with-multer") 

});


app.post("/runSeqTrim", upload.none(), (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    
  const { id, getfilepath, seqTrimOutputFilePath } = req.body;
  console.log(`\n1. /runSeqTrim: the seq file's id getting trimmed: ${id}`);
  console.log(`2. /runSeqTrim: this is Before try{BashScript}/catch{} stmt`);

  try { exec(`sh ${path.join(__dirname, 'src', 'api', 'sequencescript.sh')} ${path.join(__dirname, getfilepath)} ${path.join(__dirname, seqTrimOutputFilePath)}`, (error, stdout, stderr) => {
    if (error) {
      console.log(`XXX. /runSeqTrim: Error of try{BashScript}: ${error}`);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    
    // Send the result back to the client
    console.log(`3. /runSeqTrim: end of try{BashScript} and before catch{}, \n3. this is stdout: ${stdout} \n- end of /runSeqTrim -\n\n`);
    return res.json({ result: stdout });
  })
  } catch (catcherror) {
    console.error(`XXX. /runSeqTrim: Error of catch{}: ${catcherror}`);
  };  
});


app.get("/dnldSeqTrim", (req, res) => {
  // ensure the server side script outputs test file, and marke the file's content as such to allow for trust when users dnld the file output:
  //https://developer.mozilla.org/en-US/docs/Learn/Server-side/Configuring_server_MIME_types
  //    1. # How to set up your server to send the correct MIME types.
  //    1a. 
  //      Using the download on NGEssence app:     "When using server-side script to generate content, the way to indicate the content type will depend on the tool you're using. Check the framework or library's documentation."
  //      "Regardless of what server system you use, the effect you need to achieve is to set a response header with the name Content-Type, followed by a colon and space, followed by a MIME type.
  //      add to Header: {"Content-Type": "text/plain"}

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type', 'Content-Disposition');

  console.log(`1. /dnldSeqTrim: Before checking query param for 'sampleFileName'`)
  // Extract the sampleFileName from the query parameters
  const sampleFileName = req.query.sampleFileName;
  console.log(`2. /dnldSeqTrim: 'sampleFileName': ${sampleFileName}`)
  
  if (!req.query.sampleFileName) {
    return res.status(400).json({ error: 'Missing sampleFileName parameter' });
  }

  console.log(`3. /dnldSeqTrim: before creating filePath`);
  const filePath = path.join(__dirname, 'uploads', 'int', sampleFileName);
  console.log(`4. /dnldSeqTrim: After creating filePath: ${filePath}`);
  
  console.log(`5. /dnldSeqTrim: Before res.sendFile(filePath)`);
  // Send the file as the response
  res.sendFile(filePath);
  console.log(`6. /dnldSeqTrim: After res.sendFile(filePath)`);
  
});

// Function to clean up files in the uploads directory older than a certain time
function cleanupFiles() {
  console.log(`\ncleanupFiles: before uploadDir path.join`)
  const uploadDir = path.join(__dirname, 'uploads');
  console.log(`\ncleanupFiles: after uploadDir path.join`)
  console.log(`\ncleanupFiles: path.join is:`)

  const cleanupFilesRecursive = (cleanThisDir) => {
    fs.readdir(cleanThisDir, (err, files) => {
      if (err) {
        console.error('Error reading upload directory:', err);
        return;
      }

      const currentTime = Date.now();

      files.forEach((file) => {
        const filePath = path.join(cleanThisDir, file);
        console.log(`\ncleanupFiles: files.forEach((file); current file is: ... ${filePath} ...`);
        fs.stat(filePath, (statErr, stats) => {
          if (statErr) {
            console.error(`Error checking file stats for ${file}:`, statErr);
            return;
          }
          if (stats.isDirectory()) {
            cleanupFilesRecursive(filePath);
          } else {
            // Adjust threshold time
            const thresholdTime = currentTime - 2 * 60 * 1000; // 2 min

            if (stats.birthtime.getTime() < thresholdTime) {
              // Delete files older than the threshold time
              fs.unlink(filePath, (unlinkErr) => {
                if (unlinkErr) {
                  console.error(`Error deleting file ${file}:`, unlinkErr);
                } else {
                  console.log(`File ${file} deleted.`);
                }
              });
            }
          }
        });
      });
    });
  }
  cleanupFilesRecursive(uploadDir);
}

// // Schedule the cleanup function to reflect thresholdTime 
// setInterval(cleanupFiles, 2 * 60 * 1000); // Run every 2 min


//  NOTE: GET '/user' worked as control within example.test.js. Attempting to re-create successful execution of sest outside exampole.test.js 
app.get('/user', function(req, res) {
  res.status(200).json({ name: 'johnjacobheimerschmidtn' });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  console.log(`err.stack: ${err.stack}`);
  console.log(`What is err.code\n Does err.code === "LIMIT_FILE_SIZE"???\n The err.code is: ${err.code}`); // 
  res.status(500).json({ error: "Internal Server Error"});
  
});

// server listening for requests to port 5000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



// 1. Should I restructure code within the "NewSequenceForm component's  eventHandler `handleSubmit`" ? 
// 2. Should I restructure code within the "POST  '/upload' backend server route" ?
// 3. How should I execute restructuring code within  2. or 3. with the following security concerns in mind?
// 3-a. Escape potentially dangerous characters (in filename or in file itself?)
// |
// |_3-a. Implemeneted
// 3-b. Limit the incoming amount of data to allow only what's necessary.
// |
// |_3-b. Implemeneted
// 3-c. Sandbox uploaded files. Store them on a different server and allow access to the file only through a different subdomain or even better through a completely different domain.
// |
// |_3-c. Sandbox uploaded files. Store them on a different server and allow access to the file only through a different subdomain or even better through a completely different domain.

// Storing files on a separate server and serving them through a different subdomain or domain is a good security practice. You can configure a CDN or a different server to serve static files.