// ShellScriptRunner.js
import React, { useState, useEffect } from 'react';
// import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { selectSequences } from "../features/sequences/sequencesSlice";


const ShellScriptRunner = () => {
  const [scriptResult, setScriptResult] = useState('');
  // const dispatch = useDispatch();
  let sequences = useSelector(selectSequences); 

  // change to use state triggered when eventHandler occurs 
  // change to use state triggered when eventHandler occurs 
  // change to use state triggered when eventHandler occurs 
  useEffect(() => {
    // Fetch script result from the server
    fetch('http://localhost:5000/runScript')
    // fetch('http://localhost:4000/runScript')
      .then((response) => response.text())
      .then((result) => setScriptResult(result))
      .catch((error) => console.error('Error fetching script result:', error));
  }, []);

  //add new bash shell result to state.seqeunces
  // let id = uuidv4();
  // YYYY-MM-DD HHmmss
  // let today = new Date();
  // let fullyr = today.getUTCFullYear(); // (January gives 0)
  // let month = (today.getUTCMonth()+1); // (January gives 0)
  // let date = today.getUTCDate(); // (January gives 0)
  // let hrs = today.getUTCHours(); // (January gives 0)
  // let minutes = today.getUTCMinutes(); // (January gives 0)
  // let seconds = today.getUTCSeconds(); // (January gives 0)
  // let timestamp = fullyr+"-"+month+"-"+date+hrs+minutes+seconds;
  // let name = "MyRun_" + timestamp;

  //const {id, name, timestamp, sequenceResult} = action.payload;
  // dispatch(addSequence({id, name, timestamp, scriptResult}));

  console.log(`Current Topics: ${JSON.stringify(sequences)}`)

  return (
    <div>
      <h1>Shell Script Result:</h1>
      <pre>{scriptResult}</pre>
    </div>
  );
};

export default ShellScriptRunner;
