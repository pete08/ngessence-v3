// #1. create configured copy of server.js
// #2. export 'start server' func as module 
// #3. import module to perform tests on server

import request from 'supertest';
// const request = require('supertest');
import startTestServer from "../servertesting.js"; // Note: after getting testing to work, change server to a duplicate server for best practice: 'testing'` server
// const startTestServer = require("../servertesting.js"); // Note: after getting testing to work, change server to a duplicate server for best practice: 'testing'` server
import fs from 'fs';
// const fs = require('fs');
import path from 'path';
// const path = require('path');

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

console.log(`1a. server.test.js; BEFORE beforeAll(() => {testServer = startTestServer(5000)...})`);
beforeAll(async () => {
  testServer = startTestServer(5000);
});
afterAll(async () => {
  testServer.close();
});
console.log(`1b. server.test.js; AFTER beforeAll(() => {testServer = startTestServer(5000)...})`);


describe('upload appropriate file to `post(`/upload`) route`', () => {
  // Assuming that the file is saved in the same directory with the name 'testfile01.txt'
  const fileName = `testfile01.txt`;
  const uploadedFilePath = `uploads/${fileName}`;
  const filePath = `${__dirname}/testFiles/${fileName}`;

  console.log(`2. server.test.js; IN describe('testing testy test'), filePath: ${filePath}`);

  test('post/upload should upload file to > uploads/testfile01.txt', async () => {
    console.log(`3a. server.test.js; IN Test('should upload file to CDN'), BEFORE await request(testServer).post('/upload')`);

    const response = await request(testServer)
      .post('/upload')
      .field('filepath', 'uploads/testfile01.txt') // 'filepath': Path to specify file's upload location 
      .attach('input-file', fs.readFileSync(filePath), 'testfile01.txt')
      .expect(200);      

    // Check if the file exists at the expected location
    const fileExists = fs.existsSync(uploadedFilePath);
       
    expect(fileExists).toBeTruthy();
    expect(response.body).toHaveProperty('result', `successfully uploaded: ${uploadedFilePath}`); 

    //[ ]// 5. Can I catch 'contents' of file and respond to front-end with modal?
  });

  test('check for file `character` contents', async () => {
    const fileContent = fs.readFileSync(uploadedFilePath, 'utf-8');
    
    // (a.) Check if the file contains certain characters
    const containsCertainCharacters = ['g', 't', 'a', 'c', '\n'].every(char => fileContent.includes(char));
    expect(containsCertainCharacters).toBeTruthy();
    //START HERE: Make another test: "check contents do NOT have g, t, a, c..."
  });
  test('check for file `character` contents', async () => {
    const fileContent = fs.readFileSync(uploadedFilePath, 'utf-8');
    
    // (a.) Check if the file contains certain characters
    const containsCertainCharacters = ['g', 't', 'a', 'c', '\n'].every(char => fileContent.includes(char));
    expect(containsCertainCharacters).toBeTruthy();
    //START HERE: Make another test: "check contents do NOT have g, t, a, c..."
  });

  test('check for file extension is `.txt`', async () => {
   
    const fileExtension = path.extname(uploadedFilePath);
    expect(fileExtension).toBe('.txt');

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

describe('upload inappropriate file to post `/upload`', () => {
    test('upload .png file', async () => {
        let fileName = `2023-10-05_CodecademyProgress.png`;
        let uploadedFilePath = `uploads/${fileName}`;
        let filePath = `${__dirname}/testFiles/${fileName}`;

        console.log(`server.test.js; upload TEXT file: ${fileName}`);

        const response = await request(testServer)
        .post('/upload')
        .field('filepath', `${filePath}`) // 'filepath': Path to specify file's location 
        .field('filename', `${fileName}`) // 'filename': filename
        .attach('input-file', fs.readFileSync(filePath), `${fileName}`)
        .expect(400);      
  
        // Check if the file exists at the expected location
        const fileExists = fs.existsSync(uploadedFilePath);
            
        expect(fileExists).toBeFalsy();

        console.log(`Test's response.body, for "upload .png file": ${JSON.stringify(response.body)}`)

        expect(response.body).toHaveProperty('error', `${fileName}: does not appear to be a text file. Only text files are allowed.`);

    });

    test('upload file too large (>6MB)', async () => {
        let fileName = `16s_426-read-1.fastq`;
        let filePath = `${__dirname}/testFiles/${fileName}`;

        console.log(`3. server.test.js; File Size too Large: ${fileName}`);

        const response = await request(testServer)
        .post('/upload')
        .field('filepath', `${filePath}`) // 'filepath': Path to specify file's location 
        .field('filename', `${fileName}`) // 'filename': filename
        .attach('input-file', fs.readFileSync(filePath), `${fileName}`)
        .expect(400);

        console.log(`Test's response.body, for "upload file of 6.1 MB": ${JSON.stringify(response.body)}`)

        expect(response.body).toHaveProperty('error', `${fileName}: File size limit exceeded`); 
  
    });  
});






