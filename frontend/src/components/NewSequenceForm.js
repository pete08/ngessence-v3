
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import sanitize from 'sanitize-filename';
import { addSequence, isLoadingSequences, selectSequences } from "../features/sequences/sequencesSlice.js";

const getDateTime = () => {
    let today = new Date();
    let fullyr = today.getUTCFullYear();
    let month = (today.getUTCMonth() + 1); // (January gives 0)
    let date = today.getUTCDate(); 
    let hrs = today.getUTCHours(); 
    let minutes = today.getUTCMinutes(); 
    let seconds = today.getUTCSeconds(); 
    let dateTime = fullyr + "-" + month + "-" + date + hrs + minutes + seconds;
    return dateTime;
}

// async function getScript() {
//     try {
//         const response = await fetch('http://localhost:5000/runScript');
//         // const response = await fetch('http://localhost:4000/runScript');
//         if (!response.ok) {
//             throw new Error(`HTTP Error! Status: ${response.status}`);
//         }
//         const responseBody = await response.text();
//         // console.log(`Response Body:\n${responseBody}`);
//         return responseBody;

//     } catch (error) {
//         // console.log(`unsuccessful sequence run`);
//         console.error(`unsuccessful sequence run ${error.message}`);
//     }
// }

function outputExtension(extension) { 
    let outputExt;
    if (extension == "fasta") {
        outputExt="fa";}
    else if (extension == "fastq") {
        outputExt="fq";}
    else if (extension == "fa") {
        outputExt="fa";}
    else if (extension == "fq") {
        outputExt="fq";}
    else {outputExt="q";}
    return outputExt;
}

// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'https://rex7wrpzu2.us-east-1.awsapprunner.com';

export default function NewSequenceForm() {
    console.log(`1. NewSequenceForm: Before selectSequences`)
    const allSequences = useSelector(selectSequences);
    console.log(`2. NewSequenceForm: After selectSequences`)
    console.log(`3. NewSequenceForm: Before Count selectSequences `)
    let count = Object.keys(allSequences).length;
    console.log(`4. NewSequenceForm: After Count selectSequences `)
    const dispatch = useDispatch();
    console.log(`5. NewSequenceForm: Before setting up react useState fileName, trimFileExt, trimFileName`)
    const [fileName, setFileName] = useState("");
    const [trimFileExt, setTrimFileExt] = useState("");
    const [trimFileName, setTrimFileName] = useState("");
    const [uploadError, setUploadError] = useState(null);
    console.log(`6. NewSequenceForm: After setting up react useState fileName, trimFileExt, trimFileName`)
    // const [id, setId] = useState("");
    // const seqsLoading = useSelector(isLoadingSequences);

    const handleChange = (e) => {
        // e.preventDefault();
        let rawfilenameextpath = e.target.value;
        let rawfilenameextsplit = rawfilenameextpath.split('\\');
        let rawfilenameext = rawfilenameextsplit[(rawfilenameextsplit.length-1)];
        
        //sanitize filename prior to addition to redux state
        rawfilenameext = sanitize(rawfilenameext);
        
        let rawfilenameSplit = rawfilenameext.split('.');
        setFileName(`${rawfilenameSplit[0]}-${count}.${rawfilenameSplit[rawfilenameSplit.length-1]}`);
        setTrimFileName(`${rawfilenameSplit[0]}-${count}-trim`);
        setTrimFileExt(outputExtension(rawfilenameSplit[rawfilenameSplit.length-1]));

    }
    
    const handleSubmit = async (e) => {
        
        e.preventDefault();

        const uuid = uuidv4();

        const fileInput = document.getElementById('input-file');
        // const file = new FormData();
        const file = fileInput.files[0];

                
        console.log(`1. NewSequenceForm handleSubmit: id AFTER setId(uuid): ${uuid}`)
        const timestamp = getDateTime();

        
        const filepath = `./uploads/${fileName}`;
        const getfilepath = `uploads/${fileName}`;
        // const getfilepath = `data/${fileName}`;

        const seqTrimOutputFileName = `${trimFileName}.${trimFileExt}`;
        console.log(`2. NewSequenceForm handleSubmit: after setting FileName before outputFilePath: ${seqTrimOutputFileName}`);
        
        const seqTrimOutputFilePath = `./uploads/int/${seqTrimOutputFileName}`;
        const getSeqTrimOutputFilePath = `uploads/int/${seqTrimOutputFileName}`;
        console.log(`3. NewSequenceForm handleSubmit: after setting FileName after outputFilePath : ${getSeqTrimOutputFilePath}`);
                

        const requestBody = new FormData();
        requestBody.append('input-file', file);
        requestBody.append('getfilepath', getfilepath);
        requestBody.append('filepath', filepath);
        requestBody.append('filename', fileName);
        console.log(`4. NewSequenceForm handleSubmit: after creating requestBody, before clearing form's State`);

        setFileName("");
        setTrimFileName("");
        setTrimFileExt("");
        document.forms[0].reset();
        console.log(`5. NewSequenceForm handleSubmit: after creating requestBody, after clearing form's State after resetting form`);

        const someFormData = {
            'id': uuid,
            'fileName': fileName,
            'filepath': filepath,
            'getfilepath': getfilepath,
            'trimFileName': trimFileName,
            'trimFileExt': trimFileExt,
            'seqTrimOutputFileName': seqTrimOutputFileName,
            'seqTrimOutputFilePath': seqTrimOutputFilePath,
            'getSeqTrimOutputFilePath': getSeqTrimOutputFilePath,
            'timestamp': timestamp,
        };



        console.log(`7. NewSequenceForm handleSubmit: after addSequence, before try{fetch}/catch() stmt`);
        try {
            const response = await fetch(`${BACKEND_URL}/upload`, {
            // const response = await fetch('http://localhost:4000/upload', {
                method: 'POST',
                body: requestBody
            });
            console.log(`8. NewSequenceForm handleSubmit: within try{fetch}/catch(), after FETCH before await RESPONSE`);
            const responseData = await response.json();

            console.log(`9. NewSequenceForm handleSubmit: within try{fetch}/catch(), after FETCH after await RESPONSE; response.status: "${response.status}" --&-- response.json(): "${JSON.stringify(responseData)}"`);

            if (!response.ok) {
                setUploadError(responseData.error);
                throw new Error(`HTTP Error! Status: ${response.status} responseData: ${JSON.stringify(responseData)}`);
            } else {
                setUploadError(null);
                console.log(`6. NewSequenceForm handleSubmit: \nafter setting slice input data:\n${JSON.stringify(someFormData)} \n\n 6. before addSequence`);
                dispatch(addSequence({formData: someFormData}));
            }
        } catch (error) {
            console.error(`NewSequenceForm handleSubmit error: ${error}`);
        }
    };

    const fileUploading = (filename) =>{
        if (filename !== '') {
            return (<h6>file to upload: {fileName}</h6>);
            }
    };

    return (
        <section>
            {/* {(fileName !== "") ? fileUploading({fileName}) : <></>} */}
            <form onSubmit={handleSubmit}>
                {/* <h2 className="center">Create a new Sequence</h2><br/> */}
                <div className="form-section">
                    <label htmlFor="input-file">Select Sequence to Upload:</label>
                    <input onChange={handleChange} type="file" id="input-file" name="input-file" accept="text/plain;charset=US-ASCII, text/plain;charset=UTF-8, .fasta, .fastq, .txt" />
                </div>
                {(fileName !== "") ? <button className="center" type="submit">Upload Sequence</button>: <></>}
            </form>
                {(uploadError) ? <div style={{ color: "red"}}>{uploadError}</div>: <></>}
        </section>
    );
}
