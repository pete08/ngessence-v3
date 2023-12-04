// server.js
// note 'require' vs 'import' modules Node.js doesn't support ES6 import statements out of the box for CommonJS modules (Node.js uses require for module imports)
const express = require('express');
const {exec} = require('child_process');
const favicon = require('serve-favicon');
const path = require('path');

const app = express();
const port = 5000;


// Serve favicon.ico
app.use(favicon(path.join(__dirname, 'public/favicon.ico')));


app.get('/runScript', (req, res) => {
// app.get('/', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const scriptPath = './src/api/sequencescript.sh';

  exec(`sh ${scriptPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing the script: ${error}`);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Send the script result back to the client
    res.send(stdout);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
