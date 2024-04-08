// server.js
// note 'require' vs 'import' modules Node.js doesn't support ES6 import statements out of the box for CommonJS modules (Node.js uses require for module imports)
import express from "express";
// const express = require("express");
import multer from "multer";
// const multer = require("multer");
import favicon from "serve-favicon";
// const favicon = require("serve-favicon");
import path from "path";
// const path = require("path");
import fs, { rmSync } from 'fs';
// const fs = require('fs');
import cors from "cors";
// const cors = require("cors");
import { isText } from 'istextorbinary';

const app = express();
// for path to upload docs
const storage = multer.memoryStorage();
// for uploading using multer, limit file size
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 4 /* 1024^2 bytes = 1MB */ },
});

export default function startTestServer(port, callback) {

    console.log(`1 of 6, Server: first console log`);

    app.use(favicon(path.join(__dirname, "public/favicon.ico")), express.static(path.join(__dirname, 'public')), cors());

    app.post("/upload", (req, res, next) => {
        upload.single("input-file")(req, res, (err) => {
            const { filepath, filename } = req.body;
            try {
                // Check: fileSize limit
                if (err) {
                    // Handle Multer errors
                    if (err.code === "LIMIT_FILE_SIZE") {
                        res.status(400).json({ error: `${filename}: File size limit exceeded` });
                        console.error("File size limit exceeded:", err.message);
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
                    res.status(400).json({ error: `${filename}: does not appear to be a text file. Only text files are allowed.` });
                    console.error("File does not appear to be a text file:", err.message);
                    return;
                }

                // Check : fileContent contains key Characters
                const keyCharacters = {
                    single : ['G', 'T', 'A', 'C', `\n`],
                    keybase0: ['GT', 'TG'],
                    keybase1: ['AC', 'CA']
                };
                const keyCharactersCheck = keyCharacters['single'].every(char => fileContent.includes(char)) && keyCharacters['keybase0'].some(char => fileContent.includes(char)) && keyCharacters['keybase1'].some(char => fileContent.includes(char));
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
    });

    // app.post("/uploadOG", upload.single("input-file"), (req, res) => {
    //     try {
    //         res.setHeader("Access-Control-Allow-Origin", "*");
    //         res.setHeader("Access-Control-Allow-Methods", "POST");
    //         res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    //         console.log(`Server: post(/upload); req.body is: ${JSON.stringify(req.body)}`);
    //         const { filepath, filename } = req.body;
    //         console.log(`Server: post(/upload); filepath is: ${filepath}`);

    //         // Access the uploaded file using req.file.buffer
    //         const fileContent = req.file.buffer;
    //         console.log(`Server: post(/upload); fileContent.toString() is: ${fileContent.toString().substring(0, 200)}\n`);

    //         // Text file otherwise false, checks only filename
    //         console.log(`Server: post(/upload) Route #5; isText(null, fileContent): ${isText(null, fileContent)}`);
            
    //         // Checks Buffer content: if not 'text/plain' if not res.json error
    //         // (isText)[https://github.com/bevry/istextorbinary] npm module
    //         if (!isText(null, fileContent)) {
    //             console.log(`Server: post(/upload) Route #6; isText: ${isText(null, fileContent)}`);
    //             console.log(`Server: post(/upload) Route #7; filename is: "${filename}"`);
    //             res.status(400).json({ error: `${filename} : does not appear to be a text file. Only text files are allowed.` });
    //             return;
    //         } else {
    //             fs.writeFile(filepath, fileContent, (err) => {
    //             if (err) {
    //                 console.log(`Server: post(/upload) Route; Error: ${err}`);
    //                 return next(err);
    //             }
    //             // if (err) throw err;
    //             console.log("Server: post(/upload) Route; File Saved!");
    //             res.json({ result: `successfully uploaded: ${filepath}` });
    //             });
    //         }

    //     } catch (error) {
    //         next(error);
    //     }
    // });

    app.get('/user', function (req, res) {
        res.status(200).json({ name: 'johnjacobjimgleheimmerschmidt' });
    });

    app.use((err, req, res) => {
        console.error(err.stack);
        console.log(`err.stack: ${err.stack}`);
        console.log(`What is err.code\n Does err.code === "LIMIT_FILE_SIZE"???\n The err.code is: ${err.code}`); //
        res.status(500).json({ error: "Internal Server Error" });
    });

    const server = app.listen(port, () => {
        console.log(`6 of 6, Server is running on port ${port}`);
        if (callback) callback();
    });


    return server;
}
