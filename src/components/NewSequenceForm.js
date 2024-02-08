// To Populate following the sequenceSlice.js State creation
// [X] - create sequenceSlice data feature component (featuers/sequences/sequencesSlice.js)
// [X] - create sequences data feature component (featuers/sequences/Sequences.js)
// [X] - create sequences data feature component - Runs Script (featuers/component/NewSequencesForm.js)
// [X] - create sequence data feature component added as module to /sequences (featuers/sequences/Sequence.js)
// [X] - sequenceSlice to Store.js

// [X] - localhost:3000
// [X] - localhost:5000 - frontend Express.js server, "./server.js": allows Shell Script... Reactjs Does NOT allow both FrontEnd App and Shell Script)

// [ ] - NewSequenceForm features:
//      |- [X] form can obtain file to be used in eventHandler
//      |- [X] MOST IMPORTANT: ensure the triggered eventHandler Function kicks off the sequences run/processing bash script 
//      |- [X] Apply a "IlluminaPass" boolean state attribute (`state.sequences.sequences.id.illuminaAcceptable`): True or False
//      |- [ ] Add a "IlluminaPass" POST method, with logic to set `state.sequences.sequences.id.illuminaAcceptable` to either: True, False
// [X] - Sequencing page
//      |- [X] - Display uploaded files' names 
//      |- [X] - Display uploaded files' attributes 
//      |- [X] - Add upload form to upload additional sequence files
//      |- [X] - Add option to download a "successful" completion run

// [ ] - Any testing items
//      |- [ ] - how to handle "unclean" output from processing, log output (extraReducer action: error check)
//      |- [ ] - 


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
            const response = await fetch('http://localhost:5000/upload', {
                method: 'POST',
                body: requestBody
            });
            console.log(`8. NewSequenceForm handleSubmit: within try{fetch}/catch(), after fetch`);
            const responseData = await response.json();
            if (responseData.error ) {
                const errorForUser = responseData.error;
            }
            console.log(`9. NewSequenceForm handleSubmit: within try{fetch}/catch(), after fetch, response.statues --&-- response.json():`, response.status, " --&-- " , responseData);

            if (!response.ok) {
                setUploadError(errorForUser || 'Unknown error occurred! ahh!');
                throw new Error(`HTTP Error! Status: ${response.status} responseData: ${JSON.stringify(responseData)}`);
            } else {
                setUploadError(null);
                console.log(`6. NewSequenceForm handleSubmit: \nafter setting slice input data:\n${JSON.stringify(someFormData)} \n\n 6. before addSequence`);
                dispatch(addSequence({formData: someFormData}));
            }
        } catch (error) {
            console.error(`NewSequenceForm handleSubmit: catch Error -> : ${error}`);
            setUploadError('Network or server error occurred');
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

// SIMPLIFIED UPLOAD FILE FUNC, AND PUT METHOD; TO INQUIRE WITH:
// 
// uploadfileform.js
// export default function NewSequenceForm() {
//     const handleSubmit = async (e) => {
//         const fileInput = document.getElementById('input-file');
//         const file = fileInput.files[0];
//         const filepath = `./uploads/${fileName}`;

//         const requestBody = new FormData();
//         requestBody.append('input-file', file);
//         requestBody.append('getfilepath', getfilepath);
//         requestBody.append('filepath', filepath);

//         const response = await fetch('http://localhost:5000/upload', {
//             method: 'POST',
//             body: requestBody
//         });
//         if (!response.ok) {
//             const errorMessage = response;
//             throw new Error(`HTTP Error! Status: ${response.status} Message: ${errorMessage}`);
//         }
//     };

//     return (
//             <form onSubmit={handleSubmit}>
//                 <div className="form-section">
//                     <label htmlFor="input-file">Select Sequence to Upload:</label>
//                     <input onChange={handleChange} type="file" id="input-file" name="input-file" accept="text/plain;charset=US-ASCII, text/plain;charset=UTF-8, .fasta, .fastq, .txt" />
//                 </div>
//                 {(fileName !== "") ? <button className="center" type="submit">Upload Sequence</button>: <></>}
//             </form>
//     );
// }


// server.js
// app = express();
// app.post("/upload", upload.single("input-file"), (req, res) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Methods", "POST");
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//     const { filepath } = req.body;
    
//     // Access the uploaded file using req.file.buffer
//     const fileContent = req.file.buffer;
//     // const fileContent = req.file.buffer.toString();
    
//     // if (!fs.existsSync(directory)) { fs.mkdirSync(directory, { recursive: true }); }
//     fs.writeFile(filepath, fileContent, (err) => {
//       if (err) {console.log(`/uplaod error: ${err}`)};
//       if (err) throw err;
//     }); 
  
//     res.json({ result: `successfully uploaded: ${filepath}`});
// });
