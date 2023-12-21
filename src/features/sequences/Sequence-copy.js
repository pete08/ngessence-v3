import React from "react";
import { useSelector, useDispatch } from "react-redux"
// import { Link } from "react-router-dom";
// import ROUTES from "../../app/routes";
// import selector
import { addSequenceTrim } from "./sequencesSlice-copy"

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

export default function Sequence({sequence}) {
  const dispatch = useDispatch();
  console.log("hey there from inside Sequence-copy");
  console.log(`this the sequence: ${sequence}`)
  console.log(`this the sequence.id: ${sequence.id}`)
  const handleClick = async (e) => {
    e.preventDefault();
    const seqTrimTimeStamp = getDateTime();

    const requestBody = new FormData();
    requestBody.append('id', sequence.id);
    requestBody.append('inputFilePath', `public/data/${sequence.fileName}.${sequence.fileExtension}`);
    requestBody.append('outputFileTrimPath', sequence.getoutputfilepath);

    const someFormData = {
      'id': sequence.id,
      'seqTrimTimeStamp': seqTrimTimeStamp,
      'seqTrimOutputFilePath': sequence.getoutputfilepath,
    }

    await fetch('http://localhost:5000/runSeqTrim', {
      method: 'POST',
      body: requestBody
    }).then((response) => {
      console.log(`Response Status: ${response.status}`)
      console.log(`Response Text: ${response.text()}`)
    }).then(() => {
      dispatch(addSequenceTrim({someFormData: someFormData}));
    })
    
  };

  return (
    <div class="wrapper">
    {/* <div className="topic-container" key={sequence.id}> */}
    {/* <div className="text-content" key={sequence.id}> */}

      <div> {sequence.seqTrimName}:{(sequence.seqTrimTimeStamp == null) ? "": sequence.seqTrimTimeStamp.toString()}</div>
      <div> Illumina quality passes: {(sequence.illuminaPass == true) ? "True": "False"}</div>
      <div class="GridItemWButton"> {(sequence.seqTrim == null) ? <button onClick={handleClick}>Run bbDuk Trim</button>: sequence.seqTrim.substring(0,50)} </div>
    </div>  
  );
}
