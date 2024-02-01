// #1. create configured copy of server.js
// #2. export 'start server' func as module 
// #3. import module to perform tests on server
const request = require('supertest');
const startTestServer = require("../servertesting"); // Note: after getting testing to work, change server to a duplicate server for best practice: 'testing'` server
const fs = require('fs');
const path = require('path');
// const FormData = require('form-data');


// let testFilePath = null;
// let testServer;
// console.log(`1A. server.test.js; BEFORE beforeEach(startTestServer(5000)`)

// beforeEach(async () => {
//   testServer = startTestServer(5000);
//   console.log(`1B. server.test.js; beforeEach(startTestServer(5000)`)
// })

// afterEach((done) => {
//     testServer.close(done);
//   })
let testServer;

console.log(`1a. server.test.js; BEFORE beforeEach(() => {testServer = startTestServer(5000)...})`);
beforeAll(async () => {
  testServer = startTestServer(5000);
});
afterAll(async () => {
  testServer.close();
});
console.log(`1b. server.test.js; AFTERbeforeEach(() => {testServer = startTestServer(5000)...})`);


describe('testing uploaded file to `post(`/upload`) route`', () => {
  // Assuming that the file is saved in the same directory with the name 'testfile01.txt'
  const fileName = `testfile01.txt`;
  const uploadedFilePath = `uploads/${fileName}`;
  const filePath = `${__dirname}/testFiles/${fileName}`;

  console.log(`2. server.test.js; IN describe('testing testy test'), filePath: ${filePath}`);

  test('should upload file to CDN', async () => {
    console.log(`3a. server.test.js; IN Test('should upload file to CDN'), BEFORE await request(testServer).post('/upload')`);

    // const formData = new FormData();
    // formData.append('input-file', fs.createReadStream(filePath));
    // console.log(`3b. server.test.js; IN Test('should upload file to CDN'), BEFORE await request(.post('/upload')), AFTER  formData.append, formData is: ${formData}`);
    
    // const formDataString = JSON.stringify(formData);
    // console.log(`3c. server.test.js; IN Test('should upload file to CDN'), BEFORE await request(.post('/upload')), BEFORE supertest request(testServer).send(formData),\n <<<  AFTER modifying formData into string JSON.stringify(formData), \n<<< non-string leads to Error: 'the "string" argument must be of type string of Buffer or ArrayBuffer, Received an instance of FormData',\ntherefore new formData is: ${formDataString}`);

    const response = await request(testServer)
      .post('/upload')
      .field('filepath', 'uploads/testfile01.txt') // 'filepath': Path to specify file's upload location 
      .attach('input-file', fs.readFileSync(filePath), 'testfile01.txt')
      .expect(200);
      

    console.log(`3c. server.test.js; IN Test('should upload file to CDN'), AFTER await request(testServer)`);



    console.log(`3d. server.test.js; IN Test('should upload file to CDN'), AFTER await request(testServer)`);
    // Check if the file exists at the expected location
    const fileExists = fs.existsSync(uploadedFilePath);
    
    console.log(`3e. server.test.js; IN Test('should upload file to CDN'), AFTER await request(testServer)`);
    expect(fileExists).toBeTruthy();

    // Additional assertions based on your requirements
    expect(response.body).toHaveProperty('result', `successfully uploaded: ${uploadedFilePath}`); 
    //NEXT
    //X// 1. Find out if server moves testfile01.txt from x -> uploads/testfile01.txt
    //X// 2. find out how server's post('/upload') knows to send file to uploads/ directory
    //X// 3. copy/paste server.js to testingserver.js and ensure test still runs successfully
    //4. What is best practice for testing text files for contents that could prove dangerous if ran against backend server bash script 
    //5. find out if I can catch 'contents' of file before route uploads file to directory 
  });

  test('check for file `character` contents', async () => {
    const fileContent = fs.readFileSync(uploadedFilePath, 'utf-8');

    // const response = await request(testServer)
    //   .post('/upload')
    //   .field('filepath', 'uploads/testfile01.txt')
    //   .attach('input-file', fs.readFileSync(filePath), 'testfile01.txt')
    //   .expect(200);
    
    // (a.) Check if the file contains certain characters
    const containsCertainCharacters = ['g', 't', 'a', 'c', '\n'].every(char => fileContent.includes(char));
    expect(containsCertainCharacters).toBeTruthy();

  });

  test('check for file extension is `.txt`', async () => {
   
    // const response = await request(testServer)
    //   .post('/upload')
    //   .field('filepath', 'uploads/testfile01.txt')
    //   .attach('input-file', fs.readFileSync(filePath), 'testfile01.txt')
    //   .expect(200);
    
    // (b.) Add your checks for nefarious contents here

    // (c.) Check if the file has a .txt extension
    const fileExtension = path.extname(uploadedFilePath);
    expect(fileExtension).toBe('.txt');
    // following implimentation: add other tests that ensure other file extensions are rejected by '/upload'

  });
  // test('check to ensure file does not include nefarious contents', async () => {
  //   const fileContent = fs.readFileSync(uploadedFilePath, 'utf-8');
    
  //   // (b.) Add your checks for nefarious contents here

  // });

  // console.log(`4. server.test.js; AFTER Test('should upload file to CDN'), BEFORE Test('/user content-length`); // GETS LOGGED BEFORE... TEST('SHOULD UPLOF FILE TO CDN')

  // test('/user content-length', async () => {
  //   console.log(`5a. server.test.js; IN Test('/user content-length'), BEFORE await request(testServer).get('/user')`); 
  //   await request(testServer)
  //     .get('/user')
  //     .expect('Content-Type', /json/)
  //     .expect('Content-Length', '40')
  //     .expect(200)
  //     .catch(function(err, res) {
  //       if (err) throw err;
  //     });
  //   console.log(`5b. server.test.js; IN Test('/user content-length'), AFTER await request(testServer)`); 
  // })

  // console.log(`6. server.test.js; AFTER Test('should upload file to CDN'), AFTER Test('/user content-length`); // GETS LOGGED BEFORE... TEST('SHOULD UPLOF FILE TO CDN') & TEST('/USER CONTENT-LENGTH')
});





// 3a - ii.JSON.stringify(result)):
// { "req": {
//     "method": "POST",
//     "url": "http://127.0.0.1:5000/upload",
//     "headers": {}
//   },
//   "header": {
//     "x-powered-by": "Express", 
//     "access-control-allow-origin": "*", 
//     "content-security-policy": "default-src 'none'", 
//     "x-content-type-options": "nosniff", 
//     "content-type": "text/html; charset=utf-8", 
//     "content-length": "1335", 
//     "date": "Fri, 26 Jan 2024 21:06:58 GMT", 
//     "connection": "close" 
//   },
//   "status": 500, 
//   "text": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Error</title>\n</head>\n<body>\n<pre>MulterError: Unexpected field<br> &nbsp; &nbsp;at wrappedFileFilter (/Users/peter/Desktop/Programming/ngessence-v3/node_modules/multer/index.js:40:19)<br> &nbsp; &nbsp;at Multipart.&lt;anonymous&gt; (/Users/peter/Desktop/Programming/ngessence-v3/node_modules/multer/lib/make-middleware.js:107:7)<br> &nbsp; &nbsp;at Multipart.emit (node:events:513:28)<br> &nbsp; &nbsp;at HeaderParser.cb (/Users/peter/Desktop/Programming/ngessence-v3/node_modules/busboy/lib/types/multipart.js:358:14)<br> &nbsp; &nbsp;at HeaderParser.push (/Users/peter/Desktop/Programming/ngessence-v3/node_modules/busboy/lib/types/multipart.js:162:20)<br> &nbsp; &nbsp;at SBMH.ssCb [as _cb] (/Users/peter/Desktop/Programming/ngessence-v3/node_modules/busboy/lib/types/multipart.js:394:37)<br> &nbsp; &nbsp;at feed (/Users/peter/Desktop/Programming/ngessence-v3/node_modules/streamsearch/lib/sbmh.js:219:14)<br> &nbsp; &nbsp;at SBMH.push (/Users/peter/Desktop/Programming/ngessence-v3/node_modules/streamsearch/lib/sbmh.js:104:16)<br> &nbsp; &nbsp;at Multipart._write (/Users/peter/Desktop/Programming/ngessence-v3/node_modules/busboy/lib/types/multipart.js:567:19)<br> &nbsp; &nbsp;at writeOrBuffer (node:internal/streams/writable:392:12)</pre>\n</body>\n</html>\n" 
// }