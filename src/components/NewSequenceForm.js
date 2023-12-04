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
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addSequence } from "../features/sequences/sequencesSlice";
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

export default function NewSequenceForm() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const sequenceResult = await getScript();
        console.log(`sequenceResult:\n${sequenceResult}`);
        let id = uuidv4();
        let timeStamp = getDateTime();
        dispatch(addSequence({id, name, timeStamp, sequenceResult}));
        setName("");
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
                    <input type="file" id="input-file" name="input-file" accept="text/plain;charset=US-ASCII, text/plain;charset=UTF-8, .fasta, .fastq" />
                </div>
                <button className="center" type="submit">Run Sequence Bash</button>
            </form>
        </section>
    );
}
