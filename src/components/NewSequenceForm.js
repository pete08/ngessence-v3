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
import { addSequence, isLoadingSequences, selectSequences } from "../features/sequences/sequencesSlice-copy";
// import { useNavigate } from "react-router-dom";
// import ROUTES from "../app/routes";

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

// async function processNewSeqForm(formData) {
//     try {
//         const response = await fetch('http://localhost:5000/upload', {
//             method: 'POST',
//             body: formData
//         })
        
//         return await response.json();
//         // const contentType = response.headers.get('content-type');
//         // console.log(`resonse.content-type is: ${contentType}`)
//         // .then(response => {
//         //     if (contentType == "application/json") {
//         //         return await response.json();
//         //     } else if (contentType == "text/plain") {
//         //         return response.text();
//         //     } else {
//         //         return `unable to accomadate response contentType of:\n${contentType}`;
//         //     }
//         // })
//         // .then(data => {
//         //     // Now you can use the data as needed
//         //     console.log('HTML content:', data);
//         //     return data;
//         // })

//     } catch (error) {
//         // Handle network errors or other exceptions
//         if (error && error.message) {
//             console.error('ErrorErrorErrorError:', error.message);
//         } else {
//             console.error('An unknown error occurred:', error);
//         }
//         return { error: error };
//     }
// };

// // Function to fetch and process a static file
// async function processoutputSeq(fileUrl) {
//     try {
//         const response = await fetch(fileUrl);

//         if (!response.ok) {
//             throw new Error(`Failed to fetch file: ${response.statusText}`);
//         }

//         const fileContent = await response.text();

//         // Now you can use the file content in your function
//         console.log(fileContent);

//         // Add your processing logic here

//     } catch (error) {
//         console.error('Error:', error.message);
//     }
// }


export default function NewSequenceForm({count}) {
    const dispatch = useDispatch();
    const [fileName, setFileName] = useState("");
    const [trimFileExt, setTrimFileExt] = useState("");
    const [trimFileName, setTrimFileName] = useState("");
    // const [id, setId] = useState("");
    const seqsLoading = useSelector(isLoadingSequences);

    const handleChange = async (e) => {
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
        const uuid = uuidv4();
        // setId(uuid);

        const fileInput = document.getElementById('input-file');
        // const file = new FormData();
        const file = fileInput.files[0];
        // file.append('input-file', fileInput.files[0]);
        // const fileExtension = document.querySelector('input[name="file-extension"]:checked').value;
        // ^ "file extension from the DOM". This is no longer needed due to the state hook [fileName, setFileName] contianing neede info
        
        // const name = fileInput.files[0].name;
        // const fileInputName = fileInput.files[0].name.split('\\');
        // setFileName(fileInputName[(fileInputName.length-1)]);
        
        
        console.log(`this is id AFTER setId(uuid): ${uuid}`)
        const timestamp = getDateTime();

        
        const filepath = `./public/data/${fileName}`;
        const getfilepath = `data/${fileName}`;

        const seqTrimOutputFileName = `${trimFileName}.${trimFileExt}`;
        console.log(`seqTrimOutputFileName: ${seqTrimOutputFileName}`);

        const seqTrimOutputFilePath = `./public/data/int/${seqTrimOutputFileName}`;
        const getSeqTrimOutputFilePath = `data/int/${seqTrimOutputFileName}`;


        //upload file to approripate directory in FrontEnd:
        // let file = fileInput.files[0];
        // const fileContent = file.buffer;
        // fs.writeFileSync(filepath, fileContent);

        // TRIGGERS NODE.JS SERVER 5000 POST /UPLOAD (BASH SCRIPT TO PROCESS FILE UPLOADED) &&& ADD TO STATE.SEQUENCE()

        const requestBody = new FormData();
        requestBody.append('input-file', file);
        requestBody.append('getfilepath', getfilepath);
        requestBody.append('filepath', filepath);
        
        // POST to /upload requires both "filepath" and "outputfilepath". neither correct values, see node server=copy console .log in terminal
        // requestBody.append('id', uuid);
        // requestBody.append('timestamp', timestamp);
        // requestBody.append('outputfilepath', outputfilepath);


        const someFormData = {
            'id': uuid,
            'fileName': fileName,
            'filepath': filepath,
            'getfilepath': getfilepath,
            'seqTrimOutputFileName': trimFileName,
            'seqTrimOutputFilePath': seqTrimOutputFilePath,
            'getSeqTrimOutputFilePath': getSeqTrimOutputFilePath,
            'timestamp': timestamp,
        }

        console.log(`This console.log is BEFORE dispatch(addSequence({formData: someFormData}, the someFormData is:\n${JSON.stringify(someFormData)}`)
        dispatch(addSequence({formData: someFormData}));
        console.log(`This console.log BEFORE fetch(/upload), the someFormData is:\n${JSON.stringify(someFormData)}`)
        try {fetch('http://localhost:5000/upload', {
            method: 'POST',
            body: requestBody
        })
        // .then((response) => {
        //     console.log(`Response Status: ${response.status}`)
        //     console.log(`Response Text: ${response.text()}`)
        // })
        // .then(() => {
        //     console.log(`dispatch addSequence() containing  someFormData text: ${someFormData.text()}`)
        //     dispatch(addSequence({formData: someFormData}));
        // })        
        } catch (error) {
            // Handle any errors that might occur during processNewSeqForm
            console.error('Error in handleSubmit:', error);
        }
    };

    return (
        <section>
            <h1>file to upload: {fileName}</h1>
            <form onSubmit={handleSubmit}>
                <h2 className="center">Create a new Sequence</h2><br/>
                <div className="form-section">
                    
                    <label for="input-file">Upload:</label>
                    <input onChange={handleChange} type="file" id="input-file" name="input-file" accept="text/plain;charset=US-ASCII, text/plain;charset=UTF-8, .fasta, .fastq, .txt" />
                    <input type="radio" id="fasta" name="file-extension" value="fasta" />
                    <label for="fasta">fasta</label>
                    <input type="radio" id="fastq" name="file-extension" value="fastq" />
                    <label for="fastq">fastq</label>
                </div>
                <button className="center" type="submit" disabled={seqsLoading}>Upload Sequence</button>
            </form>
        </section>
    );
}
