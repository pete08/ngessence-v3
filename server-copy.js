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
// for general front-end server built on Express.js
const app = express();
const port = 5000;


// for path to upload docs
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// Enable CORS for all routes
app.use(cors());

// Serve favicon.ico
app.use(favicon(path.join(__dirname, "public/favicon.ico")));
// Serve static files from the 'public' directory
// app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public')));

// Add this middleware before your route handler
app.options('/upload', (req, res) => {
  res.header('Access-Control-Allow-Methods', 'POST'); // Allow only POST requests
  res.sendStatus(200); // Respond with 200 OK
});



app.post("/upload", upload.single("input-file"), (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  
  const { filepath, outputfilepath } = req.body;
  console.log(`\nfilepath is: ${filepath}\n`)
  console.log(`\noutputfilepath is: ${outputfilepath}\n`)
  
  // Access the uploaded file using req.file.buffer
  const fileContent = req.file.buffer;
  // const fileContent = req.file.buffer.toString();
  const directory = path.dirname(filepath);
  console.log(`\ndirectory is: ${directory}\n`)
  
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
  fs.writeFileSync(filepath, fileContent);
  //START HERE: current ERROR "Server is running on port 5000 Error: ENOENT: no such file or directory, open './src/data/int/024.fasta'"
  // [1]. Solve Error: upload a fasta file to ./src/data/int/
    // [1a]. why did it used to work and now NO file is being uploaded after handleSubmit POST method to localhost:5000/uplaod?
  // [2]. Try to speed up NewSequenceForm process:
    // [2a]. Try running newSeq form with smaller input file to  to update state.sequence with input file of a smaller size (i.e. 'create new seq' with "./bash-scripts-v2/bbtools01/bbmap/16s_426-read-2.fasta <--- only 5000 lines")
    // [2b]. Try to move fs.wrtieFileSync(fielpath, fileConetnt) from here (server.js) to NewSequenceForm.js
  // [3]. Should I even bother attempting to speicfially pull select dependency files within bbtools/bbmap for bbduk to work appropriately (or remain currently how i have copy/paste dump ensuring bbduk works) <--- in an attempt to speed up processing of .fasta files within app on localhost:5000 express server, MANY dependent files exisit and it MAY NOT even speed process up, my theory is it would NOT speed process up.
  // [4]. consider re-doing the process of uploading, restructuiring components within React App to separate the NewSeq processing: uploading file, processing (bashscript) file, and updating state (addSequence()). In hopes that processing works consistantly and effectively and consistantly, currently the problem is when express server POST method is hit it requires too much time and sometimes breaks (~1.5 seconds per NETWORK log - Web Developer Tools)
  
  
  // fs.writeFileSync(filepath, fileContent);
  // res.json({ result: outputfilepath });

  
});

app.post("/runSeqTrim", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const { id, inputFilePath, outputFileTrimPath } = req.body;

  
  
  // console.log(`\n\nfrom server 5000, the body: requestBody.filepath sent to POST /upload is:${filepath}\n requestBody.id is:${id}`)
  // Execute the shell script

  exec(`sh ./src/api/sequencescript-true.sh ${inputFilePath} ${outputFileTrimPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing the script: ${error}`);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    stdout.id = id;
    // Send the result back to the client
    res.json({ result: stdout });
    
  });
  // console.log(`this concludes the app.post("/upload",...=>{}`);
  
});


// server listening for requests to port 5000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
