// server.js
// note 'require' vs 'import' modules Node.js doesn't support ES6 import statements out of the box for CommonJS modules (Node.js uses require for module imports)
const express = require("express");
const multer = require("multer");
const { exec } = require("child_process");
const favicon = require("serve-favicon");
const path = require("path");
const cors = require("cors");
// filesystem module
const fs = require('fs');
const { Server } = require("http");
// for general front-end server built on Express.js
const app = express();
const port = 5000;


// for path to upload docs
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// Serve favicon.ico
app.use(favicon(path.join(__dirname, "public/favicon.ico")), express.static(path.join(__dirname, 'public')), cors());
// Serve static files from the 'public' directory
// app.use('/public', express.static(path.join(__dirname, 'public')))

app.post("/upload", upload.single("input-file"), (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  const { filepath } = req.body;
  console.log(`\nfilepath is: ${filepath}\n`)
  
  // Access the uploaded file using req.file.buffer
  const fileContent = req.file.buffer;
  // const fileContent = req.file.buffer.toString();
  
  // if (!fs.existsSync(directory)) { fs.mkdirSync(directory, { recursive: true }); }
  fs.writeFile(filepath, fileContent, (err) => {
    if (err) {console.log(`/uplaod error: ${err}`)};
    // if (err) throw err;
    console.log('The file has been saved!');
  }); 

  res.json({ result: `successfully uploaded: ${filepath}`});
});

// app.post("/runSeqTrim", upload.none(), async (req, res) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "POST");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    
//   const { id, getfilepath, seqTrimOutputFilePath } = req.body;
//   try {
//     // ... other code
    
//     // Enqueue the file processing task asynchronously
//     await processFileAsync(id, getfilepath, seqTrimOutputFilePath);

//     // Respond immediately to the client
//     res.json({ message: 'File processing started. Check for completion.' });
//   } catch (error) {
//     console.error(`Error: ${error}`);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// async function processFileAsync(id, getfilepath, seqTrimOutputFilePath) {
//   return new Promise((resolve, reject) => {
//     exec(`sh ${path.join(__dirname, 'src', 'api', 'sequencescript.sh')} ${path.join(__dirname, getfilepath)} ${path.join(__dirname, seqTrimOutputFilePath)}`, (error, stdout, stderr) => {
//       if (error) {
//         console.error(`Error executing the script: ${error}`);
//         reject(error);
//       } else {
//         console.log(`this is the stdout: ${stdout}`);
//         resolve();
//       }
//     });
//   });
// }

app.post("/runSeqTrim", upload.none(), (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    
  const { id, getfilepath, seqTrimOutputFilePath } = req.body;
  console.log(`\n1. /runSeqTrim: the seq file's id getting trimmed: ${id}`);
  console.log(`\n2. /runSeqTrim: this is Before try{BashScript}/catch{} stmt`);

  try { exec(`sh ${path.join(__dirname, 'src', 'api', 'sequencescript.sh')} ${path.join(__dirname, getfilepath)} ${path.join(__dirname, seqTrimOutputFilePath)}`, (error, stdout, stderr) => {
    if (error) {
      console.log(`XXX. /runSeqTrim: Error of try{BashScript}: ${error}`);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    
    // Send the result back to the client
    console.log(`4. /runSeqTrim: end of try{BashScript} and before catch{}, this is stdout: ${stdout} \n- end of /runSeqTrim -\n\n`);
    return res.json({ result: stdout });
  })
  } catch (catcherror) {
    console.error(`XXX. /runSeqTrim: Error of catch{}: ${catcherror}`);
  };  
});


app.get("/dnldSeqTrim", (req, res) => {
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


// server listening for requests to port 5000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
