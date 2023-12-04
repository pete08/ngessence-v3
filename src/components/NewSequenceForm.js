// To Populate following the sequenceSlice.js State creation
// [ ] - create sequenceSlice data feature component (featuers/sequences/sequencesSlice.js)
// [ ] - create sequences data feature component (featuers/sequences/Sequences.js)
// [ ] - create sequence data feature component (featuers/sequences/Sequence.js)
// [ ] - sequenceSlice to Store.js
// [ ] - sequenceSlice to Store.js add the "extraReducer" 3 part action status: kickoff, fulfilled, error"

// [ ] - does localhost:3000 work?

// [ ] - create component for new Sequence execution form - populate this file with minimum feature form
// - 1. form can obtain file to be used in eventHandler
// - 2. MOST IMPORTANT: ensure the triggered eventHandler Function kicks off the sequences run/processing bash script 
// - 3. Change state attribute per Pass or No Pass: for IlluminaPass (criteria -> within Slice, can be changed later: state attribute `state.sequences.sequences.id.illuminaAcceptable`)
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
    let fullyr = today.getUTCFullYear(); // (January gives 0)
    let month = (today.getUTCMonth() + 1); // (January gives 0)
    let date = today.getUTCDate(); // (January gives 0)
    let hrs = today.getUTCHours(); // (January gives 0)
    let minutes = today.getUTCMinutes(); // (January gives 0)
    let seconds = today.getUTCSeconds(); // (January gives 0)
    let dateTime = fullyr + "-" + month + "-" + date + hrs + minutes + seconds;
    return dateTime;
}

async function getScript(name) {
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
        const sequenceResult = await getScript(name);
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
                    <input
                        id="topic-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.currentTarget.value)}
                        placeholder="Run Name"
                    />
                </div>
                <button className="center" type="submit">Run Sequence Bash</button>
            </form>
        </section>
    );
}
