// server.js
// note 'require' vs 'import' modules Node.js doesn't support ES6 import statements out of the box for CommonJS modules (Node.js uses require for module imports)
const express = require("express");
const multer = require("multer");
const favicon = require("serve-favicon");
const path = require("path");
const fs = require('fs');
const cors = require("cors");
const app = express();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


export function startTestServer(port, callback) {

    console.log(`1 of 6, Server: first console log`);
    
    app.use(favicon(path.join(__dirname, "public/favicon.ico")), express.static(path.join(__dirname, 'public')), cors());

    app.post("/upload", upload.single("input-file"), (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "POST");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
        console.log(`3a of 6, Server: IN ROUTE "app.post('/upload')"; req.body is: ${JSON.stringify(req.body)}`);
        const { filepath } = req.body;
        console.log(`Server: IN ROUTE "app.post('/upload')"; filepath is: ${filepath}`);
        
        // Access the uploaded file using req.file.buffer
        const fileContent = req.file.buffer;
        // const fileContent = req.file.buffer.toString();
        console.log(`Server: IN ROUTE "app.post('/upload')"; fileContent.toString() is: ${fileContent.toString().substring(0,100)}\n`);
      
        // if (!fs.existsSync(directory)) { fs.mkdirSync(directory, { recursive: true }); }
        fs.writeFile(filepath, fileContent, (err) => {
          if (err) {console.log(`/uplaod error: ${err}`)};
          // if (err) throw err;
          console.log('The file has been saved!');
          res.json({ result: `successfully uploaded: ${filepath}`});
        }); 
    });
      

    app.get('/user', function(req, res) {
        res.status(200).json({ name: 'johnjacobjimgleheimmerschmidt' });
    });
    
    const server = app.listen(port, () => {
        console.log(`6 of 6, Server is running on port ${port}`);   
        if (callback) callback();
    });


    return server;
}
