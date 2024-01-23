// To Populate following the sequenceSlice.js State creation
// [X] - create sequenceSlice data feature component (featuers/sequences/sequencesSlice.js)
// [X] - create sequences data feature component (featuers/sequences/Sequences.js)
// [X] - create sequences data feature component - Runs Script (featuers/component/NewSequencesForm.js)
// [ ] - NOT YET - create sequence data feature component (featuers/sequences/Sequence.js)
// [X] - sequenceSlice to Store.js
// [ ] - NOT YET -  sequenceSlice to Store.js add the "extraReducer" 3 part action status: kickoff, fulfilled, error"

// [X] - localhost:3000
// [X] - localhost:5000 - frontend Express.js server, "./server.js": allows Shell Script... Reactjs Does NOT allow both FrontEnd App and Shell Script)

// [ ] - NewSequenceForm features:
// |- [ ] form can obtain file to be used in eventHandler
// |- [ ] Change state attribute per Pass or No Pass: for IlluminaPass (criteria -> within Slice, can be changed later: state attribute `state.sequences.sequences.id.illuminaAcceptable`)
// |- [ ] MOST IMPORTANT: ensure the triggered eventHandler Function kicks off the sequences run/processing bash script 
// - 4. print the output
// - 4. After successful print output see if you can provide a printed form within the sequencing page
// - 4. After successful print output see if you can find out how ot auto download a "successful" completion run
// - 5. incorporate how to handle "unclean" input from user, warning output (extraReducer action: kickoff check)
// - 5. incorporate how to handle "unclean" input from user, log output (extraReducer action: kickoff check)
// - 6. incorporate how to handle "unclean" output from processing, warning output (extraReducer action: error check)
// - 6. incorporate how to handle "unclean" output from processing, log output (extraReducer action: error check)


import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addSequence, isLoadingSequences, selectSequences } from "../features/sequences/sequencesSlice";

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

async function getScript() {
    try {
        const response = await fetch('http://localhost:5000/runScript');
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const responseBody = await response.text();
        // console.log(`Response Body:\n${responseBody}`);
        return responseBody;

    } catch (error) {
        // console.log(`unsuccessful sequence run`);
        console.error(`unsuccessful sequence run ${error.message}`);
    }
}

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
    console.log(`6. NewSequenceForm: After setting up react useState fileName, trimFileExt, trimFileName`)
    // const [id, setId] = useState("");
    // const seqsLoading = useSelector(isLoadingSequences);

    const handleChange = (e) => {
        // e.preventDefault();
        let rawfilenameextpath = e.target.value;
        let rawfilenameextsplit = rawfilenameextpath.split('\\');
        let rawfilenameext = rawfilenameextsplit[(rawfilenameextsplit.length-1)];
        let rawfilenameSplit = rawfilenameext.split('.');
        setFileName(`${rawfilenameSplit[0]}-${count}.${rawfilenameSplit[rawfilenameSplit.length-1]}`);
        setTrimFileName(`${rawfilenameSplit[0]}-${count}-trim`);
        setTrimFileExt(outputExtension(rawfilenameSplit[rawfilenameSplit.length-1]));

    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 01-12-2024: move uuid from handleSubmit to handlChange for easier file mgmt
        const uuid = uuidv4();
        // 1. create useState below trimFileName: 
            // const [seqIdInitDigits, setSeqIdInitDigits] = useState("");
        // 2. in HandleChange() setSeqIdInitDigits to first 4 digits of uuiv4()
        // 2. removed uuid from handleSubmit() and use setSeqIdInitDigits using uuid in handlChange();
        // 3. use seqIdInitDigits to create FileName
        // 4. this unique file name ensures:
        //4a. No errouneous dupes for redux slice stored state if user uploads same file accidently 
        //4b-i. programmed file removal: Timed via timed function cleanupFiles() 
        //4b-ii. user triggered file removal: /sequnces eventHandler() within Redux State.sequences list

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

        console.log(`6. NewSequenceForm handleSubmit: \nafter setting slice input data:\n${JSON.stringify(someFormData)} \n\n 6. before addSequence`);
        dispatch(addSequence({formData: someFormData}));

        console.log(`7. NewSequenceForm handleSubmit: after addSequence, before try{fetch}/catch() stmt`);
        try {
            const response = await fetch('http://localhost:5000/upload', {
                method: 'POST',
                body: requestBody
            });
            console.log(`8. NewSequenceForm handleSubmit: within try{fetch}/catch(), after fetch`);
            if (!response.ok) {
                const errorMessage = response;
                throw new Error(`HTTP Error! Status: ${response.status} Message: ${errorMessage}`);
            }
        } catch (error) {
            console.error(`NewSequenceForm handleSubmit: catch Error -> : ${error}`);
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
                    <label htmlFor="input-file">Select Sequence:</label>
                    <input onChange={handleChange} type="file" id="input-file" name="input-file" accept="text/plain;charset=US-ASCII, text/plain;charset=UTF-8, .fasta, .fastq, .txt" />
                </div>
                {(fileName !== "") ? <button className="center" type="submit">Upload Sequence</button>: <></>}
            </form>
        </section>
    );
}
