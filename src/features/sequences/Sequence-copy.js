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
  const { id, getfilepath, seqTrimOutputFilePath } = sequence;
  console.log(`this the sequence: ${sequence}`);
  console.log(`this the sequence's id: ${id}`);
  console.log(`The getfilepath is: ${getfilepath}`);
  console.log(`The seqTrimOutputFilePath is: ${seqTrimOutputFilePath}`);

  const eventHandlerClicktoTrim = async (e) => {
    e.preventDefault();
    const seqTrimTimeStamp = getDateTime();

    console.log(`inside eventHandler "ClicktoTrim"`);
    console.log(`The id is: ${id}`);
    console.log(`The getfilepath is: ${getfilepath}`);
    console.log(`The seqTrimOutputFilePath is: ${seqTrimOutputFilePath}`);
    
    const requestBody = new FormData();
    requestBody.append('id', id);
    requestBody.append('getfilepath', getfilepath);
    requestBody.append('seqTrimOutputFilePath', seqTrimOutputFilePath);

    await fetch('http://localhost:5000/runSeqTrim', {
      method: 'POST',
      body: requestBody
    }).then((response) => {
      console.log(`Response Status: ${response.status}`)
      console.log(`Response Text: ${response.text()}`)
    }).then(() => {
      const someFormData = {
        'id': id,
        'seqTrim': "oh hi, I'm GATACA",
        'seqTrimTimeStamp': seqTrimTimeStamp,
      };
      dispatch(addSequenceTrim({someFormData: someFormData}));
    })
    
  };

  return (
    <div class="wrapper">
      <div> {sequence.seqTrimOutputFileName}:{(sequence.seqTrimTimeStamp == null) ? "": sequence.seqTrimTimeStamp.toString()}</div>
      <div> Illumina quality passes: {(sequence.illuminaPass == true) ? "True": "False"}</div>
      <div class="GridItemWButton"> {(sequence.seqTrim == null) ? <button onClick={eventHandlerClicktoTrim}>Run bbDuk Trim</button>: sequence.seqTrim.substring(0,50)} </div>
    </div>  
  );
}
