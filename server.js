// server.js
// note 'require' vs 'import' modules Node.js doesn't support ES6 import statements out of the box for CommonJS modules (Node.js uses require for module imports)
// import { fileTypeFromFile } from 'file-type';
import { fileTypeFromBuffer, fileTypeFromFile } from "file-type";
import express from "express";
// const express = require("express");
import multer from "multer";
// const multer = require("multer");
import { exec } from "child_process";
// const { exec } = require("child_process");
import favicon from "serve-favicon";
// const favicon = require("serve-favicon");
import path from "path";
// const path = require("path");
// filesystem module
import fs from "fs";
// const fs = require('fs');
import cors from "cors";
// const cors = require("cors");
import { isText } from "istextorbinary";

// const { Server } = require("http");
// for general front-end server built on Express.js
const app = express();
const port = process.env.PORT || 5000;

// const { checkFile } = require('./src/components/filehandling/fileService');

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

// for path to upload docs
const storage = multer.memoryStorage();
// limit upload file size
const bytesFileSizeLimit = (1024 * 1024 * 7); // /* 1024^2 bytes = 1MB */

const upload = multer({
  storage: storage,
  limits: { fileSize: bytesFileSizeLimit  },
});

// Error with favicon(path.join(__dirname...: "__dirname is not defined in ES module scope"
// // Serve favicon.ico
app.use(favicon(path.join(__dirname, "public/favicon.ico")), express.static(path.join(__dirname, "public")), cors());

// Serve static files from the 'public' directory
// app.use('/public', express.static(path.join(__dirname, 'public')))

app.post("/upload", (req, res, next) => {
    upload.single("input-file")(req, res, (err) => {
        const { filepath, filename } = req.body;
        try {
            // Check: fileSize limit
            if (err) {
                // Handle Multer errors
                if (err.code === "LIMIT_FILE_SIZE") {
                    console.error("File size limit exceeded:", err.code);
                    console.error("File size limit exceeded:", err.message);
                    res.status(400).json({ error: `File size limit of ${((bytesFileSizeLimit/(1024*1024)).toFixed(2)).toString()}MB, may have been exceeded` });
                    return;
                } else {
                  // Handle other errors
                  throw err;
                }
            }
            const fileContent = req.file.buffer;  
        
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", "POST");
            res.setHeader("Access-Control-Allow-Headers", "Content-Type");
            // Check : fileContent is text/plain
            if (isText(null, fileContent) !== true) {
                res.status(400).json({ error: `File does not appear to be text file. Only text files are allowed.` });
                return;
            }
            
            console.log(`fileContent.toString(): ${fileContent.toString().substring(0, 200)}`)
            
            
            // Check : fileContent contains key Characters
            const keyCharacters = {
                single : ['G', 'T', 'A', 'C', `\n`],
                //keybase0: ['GT', 'TG'],
                //keybase1: ['AC', 'CA']
            };
            const keyCharactersCheck = keyCharacters['single'].every(char => fileContent.includes(char))
            // const keyCharactersCheck = keyCharacters['single'].every(char => fileContent.includes(char)) && keyCharacters['keybase0'].some(char => fileContent.includes(char)) && keyCharacters['keybase1'].some(char => fileContent.includes(char));
            console.log(`keyCharactersCheck: ${keyCharactersCheck}`)

            if (keyCharactersCheck !== true) {
                res.status(400).json({ error: `File does not appear to contain appropriate base characters: 'G', 'T', 'A', 'C'`});
                return;
            }

            // write file to upload location
            fs.writeFile(filepath, fileContent, (err) => {
                if (err) {
                    console.log(`Server: post(/upload) Route; Error: ${err}`);
                    next(err);
                    return;
                }
                console.log("Server: post(/upload) Route; File Saved!");
                res.json({ result: `successfully uploaded: ${filepath}` });
            });

        } catch (error) {
            // Handle other errors
            next(error);
        } 
    })
    // try {
    //     res.setHeader("Access-Control-Allow-Origin", "*");
    //     res.setHeader("Access-Control-Allow-Methods", "POST");
    //     res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    //     console.log(`Server: post(/upload) Route #1; req.body is: ${JSON.stringify(req.body)}`);
    //     const { filepath, filename, getfilepath } = req.body;
    //     console.log(`Server: post(/upload) Route #2; filepath is: ${filepath}\n`);

    //     const fileContent = req.file.buffer;
    //     console.log(
    //     `Server: post(/upload) Route #3; fileContent...substring(0,200) is: ${fileContent.toString().substring(0, 200)}\n`
    //     );

    //     // Text file otherwise false, checks only filename
    //     console.log(`Server: post(/upload) Route #5; isText(null, fileContent): ${isText(null, fileContent)}`);

    //     // Checks Buffer content: if not 'text/plain' if not res.json error
    //     // (isText)[https://github.com/bevry/istextorbinary] npm module
    //     if (isText(null, fileContent) !== true) {
    //     res.status(400).json({ error: `${filename} : does not appear to be text file. Only text files are allowed.` });
    //     return;
    //     }

    //     fs.writeFile(filepath, fileContent, (err) => {
    //         if (err) {
    //             console.log(`Server: post(/upload) Route; Error: ${err}`);
    //             next(err);
    //             return;
    //         }
    //         console.log("Server: post(/upload) Route; File Saved!");
    //         res.json({ result: `successfully uploaded: ${filepath}` });
    //     });
    // } catch (error) {
    //     // Handle other errors
    //     next(error);
    // } 

    
    // // if clean check with ScanFile, trigger file upload
    // if (fileContent.CleanResult === true){
    //   // const fileContent = req.file.buffer.toString();
    //   console.log(`Server: post(/upload) Route #1 ; fileContent.toString() is: ${fileContent.toString().substring(0,300)}\n`);
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

  try {
    exec(
      `sh ${path.join(__dirname, "src", "api", "sequencescript.sh")} ${path.join(__dirname, getfilepath)} ${path.join(
        __dirname,
        seqTrimOutputFilePath
      )}`,
      (error, stdout, stderr) => {
        if (error) {
          console.log(`XXX. /runSeqTrim: Error of try{BashScript}: ${error}`);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        console.error(`3. /runSeqTrim: ...NEW NEW NEW... Script errors: ${stderr}`);
        // Send the result back to the client
        console.log(`4. /runSeqTrim: ...NEW NEW NEW... Script output: ${stdout}. Output file intended location:${path.join(__dirname, seqTrimOutputFilePath)}`);
        
        return res.json({ result: stdout });
      }
    );
  } catch (catcherror) {
    console.error(`XXX. /runSeqTrim: Error of catch{}: ${catcherror}`);
  }
});

app.get("/dnldSeqTrim", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type", "Content-Disposition");

  console.log(`1. /dnldSeqTrim: Before checking query param for 'sampleFileName'`);
  // Extract the sampleFileName from the query parameters
  const sampleFileName = req.query.sampleFileName;
  console.log(`2. /dnldSeqTrim: 'sampleFileName': ${sampleFileName}`);

  if (!req.query.sampleFileName) {
    return res.status(400).json({ error: "Missing sampleFileName parameter" });
  }

  console.log(`3. /dnldSeqTrim: before creating filePath`);
  const filePath = path.join(__dirname, "uploads", "int", sampleFileName);
  console.log(`4. /dnldSeqTrim: After creating filePath: ${filePath}`);

  console.log(`5. /dnldSeqTrim: Before res.sendFile(filePath)`);
  // Send the file as the response
  res.sendFile(filePath);
  console.log(`6. /dnldSeqTrim: After res.sendFile(filePath)`);
});

const uploadDir = path.join(__dirname, "uploads");
// Function to clean up files in the uploads directory older than a certain time
function cleanupFiles() {
  console.log(`\ncleanupFiles: before uploadDir path.join`);
  console.log(`\ncleanupFiles: after uploadDir path.join`);
  console.log(`\ncleanupFiles: path.join is:`);

  // START HERE - 2024-02-07: Add 'idle' idle-timer' to (1) trigger server's 'cleanupFiles()' and (2) remove use.state values
  // [ ] - 1. https://blog.logrocket.com/make-idle-timer-react-app/
  // [ ] - 2. ...
  const cleanupFilesRecursive = (cleanThisDir) => {
    fs.readdir(cleanThisDir, (err, files) => {
      if (err) {
        console.error("Error reading upload directory:", err);
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
  };
  cleanupFilesRecursive(uploadDir);
}

// // Schedule the cleanup function to reflect thresholdTime
setInterval(cleanupFiles, 5 * 60 * 1000); // Run every 5 min

//  NOTE: GET '/user' worked as control test when learning testing within example.test.js. Attempting to re-create successful execution of test outside example.test.js
app.get("/user", function (req, res) {
    res.status(200).json({ name: "johnjacobheimerschmidtn" });
});

app.use((err, req, res) => {
    console.error(err.stack);
    console.log(`err.stack: ${err.stack}`);
    console.log(`What is err.code\n Does err.code === "LIMIT_FILE_SIZE"???\n The err.code is: ${err.code}`); //
    res.status(500).json({ error: "Internal Server Error" });
});

// server listening for requests to port process.env.PORT || 5000
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
