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


// allow CORS requests from outside servers to access via path: port/path (5000/runScript)
app.get("/runScript", (req, res) => {
  // res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Allow-Methods", "GET");
  // res.setHeader("Access-Control-Allow-Headers", "Content-Type"); 

  const scriptPath = "./src/api/smallscript.sh";

  exec(`sh ${scriptPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing the script: ${error}`);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Send the script result back to the client
    res.send(stdout);
  });
});


app.post("/upload", upload.single("input-file"), (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const { filepath, outputfilepath } = req.body;
  // Access the uploaded file using req.file.buffer
  const fileContent = req.file.buffer.toString();
  fs.writeFileSync(filepath, fileContent);
  // console.log(`\n\nfrom server 5000, the body: requestBody.filepath sent to POST /upload is:${filepath}\n requestBody.id is:${id}`)
  // Execute the shell script

  exec(`sh ./src/api/sequencescript.sh ${filepath} ${outputfilepath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing the script: ${error}`);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    // Send the result back to the client
    res.json({ result: stdout });
    
  });
  // console.log(`this concludes the app.post("/upload",...=>{}`);
  
});

// server listening for requests to port 5000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
