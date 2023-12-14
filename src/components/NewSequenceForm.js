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


export default function NewSequenceForm() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const seqsLoading = useSelector(isLoadingSequences);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fileInput = document.getElementById('input-file');
        const fileExtension = document.querySelector('input[name="file-extension"]:checked').value;
        // const file = new FormData();
        const file = fileInput.files[0]; 
        // file.append('input-file', fileInput.files[0]);

        const outputExt = outputExtension(fileExtension);
        const filepath = `./src/data/int/${name}.${fileExtension}`;        
        const outputfilepath = `public/data/${name}-trim.${outputExt}`;
        const getoutputfilepath = `data/${name}-trim.${outputExt}`;

        const id = uuidv4();
        setId(id);
        const timestamp = getDateTime();

        const requestBody = new FormData();
        requestBody.append('input-file', file);
        requestBody.append('filepath', filepath);
        requestBody.append('id', id);
        requestBody.append('timestamp', timestamp);
        requestBody.append('outputfilepath', outputfilepath);

        const someFormData = {
            'name': name,
            'fileExtension': fileExtension,
            'outputExt': outputExt,
            'filepath': filepath,
            'outputfilepath': outputfilepath,
            'getoutputfilepath': getoutputfilepath,
            'id': id,
            'timestamp': timestamp,
        }

        // try {
            console.log(`This console.log is within the try block BEFORE fetch(/upload), the someFormData is:\n${someFormData}`)
            const response = await fetch('http://localhost:5000/upload', {
                method: 'POST',
                body: requestBody
            });

            console.log(`Response Status: ${response.status}`);
            console.log(`Response Text: ${await response.text()}`);
        
            // // console.log(`This console.log is within the try block DIRECTLY AFTER fetch(/upload), the someFormData is:\n${someFormData}`)
            // // console.log("This console.log is DIRECTLY AFTER fetch(/upload)\n")
            dispatch(addSequence({formData: someFormData}));
            // console.log(`This console.log is DIRECTLY AFTER fetch(/upload)\nand this is the someFormData sent as arg within despatch(addSequence):\n${someFormData}`)

        // } catch (error) {
        //     // Handle any errors that might occur during processNewSeqForm
        //     console.error('Error in handleSubmit:', error);
        // }
    };


    return (
        <section>
            <form onSubmit={handleSubmit}>
                <h1 className="center">Create a new Sequence</h1>
                <div className="form-section">
                    <label for="run-name">Run Name:</label>
                    <input
                        id="topic-name"
                        name="run-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.currentTarget.value)}
                        placeholder="Run Name"
                    />
                    <label for="input-file">Upload input file:</label>
                    <input type="file" id="input-file" name="input-file" accept="text/plain;charset=US-ASCII, text/plain;charset=UTF-8, .fasta, .fastq, .txt" />
                    <input type="radio" id="fasta" name="file-extension" value="fasta" />
                    <label for="fasta">fasta</label>
                    <input type="radio" id="fastq" name="file-extension" value="fastq" />
                    <label for="fastq">fastq</label>
                </div>
                <button className="center" type="submit" disabled={seqsLoading}>Run Sequence Bash</button>

            </form>
        </section>
    );
}
