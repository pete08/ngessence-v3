import React from "react";
import { useDispatch } from "react-redux";
import { addSequenceTrim } from "./sequencesSlice"

const getDateTime = () => {
  let today = new Date();
  let fullyr = today.getUTCFullYear();
  let month = (today.getUTCMonth() + 1); // (January gives 0)
  let date = today.getUTCDate(); 
  let hrs = today.getUTCHours(); 
  let minutes = today.getUTCMinutes(); 
  // let seconds = today.getUTCSeconds(); 
  let dateTime = (fullyr + "-" + month + "-" + date + "_" +  hrs + minutes);
  return dateTime;
}

export default function Sequence({sequence}) {
  const dispatch = useDispatch();
  
  const { id, getfilepath, trimFileName, trimFileExt, seqTrimOutputFilePath, seqTrimOutputFileName } = sequence;
  // console.log(`sequence from Sequence-copy : ${sequence}`);
  console.log(`1. Sequence export function: id of {sequence} called: ${id} `);
  // console.log(`sequence's getfilepath from Sequence-copy: ${getfilepath}`);
  // console.log(`sequence's seqTrimOutputFilePath from Sequence-copy: ${seqTrimOutputFilePath}`);
  // const isSeqLoading = useSelector(isLoadingSequences);
  // console.log(`sequence's isLoadingSequences (True when bbDuk Button clicked): ${isSeqLoading}`);

  const addSeqTrim = (id, seqTrimTimeStamp) => {
    console.log(`addSeqTrim args are:\nid: ${id}\nseqTrimTimeStamp: ${seqTrimTimeStamp}`)
    const someData = {
      'id': id,
      'seqTrim': true,
      'seqTrimTimeStamp': seqTrimTimeStamp,
    };
    dispatch(addSequenceTrim({someData: someData}));
  }

//2024-01-04 : START HERE , see when eventHandlers is triggered using run BBDuk Trim: clicktoTrim() if the values in redux state are apprapopriately added... so far the error stems form sequncesSlice error; "someData is undefined"
  const clicktoTrim = async (e) => {
    e.preventDefault();
    console.log("1. clicktoTrim: Inside");
    const seqTrimTimeStamp = getDateTime();
    
    console.log("3. clicktoTrim: Before addSeqTrim, in try{fetch(runSeqTrim)/catch() stmt");
    //add values to seqTrim for sequence
    addSeqTrim(id, seqTrimTimeStamp);
    console.log("2. clicktoTrim: After addSeqTrim, in try{fetch(runSeqTrim)/catch() stmt");
      
    const requestBody = new FormData();
    requestBody.append('id', id); requestBody.append('getfilepath', getfilepath); requestBody.append('seqTrimOutputFilePath', seqTrimOutputFilePath);
    
    console.log("4. clicktoTrim: Before try{fetch(runSeqTrim)/catch() stmt");

    try {
      console.log("5. clicktoTrim: Before fetch, in try{fetch(runSeqTrim)/catch() stmt");
      
      const response = await fetch('http://localhost:5000/runSeqTrim', {
        method: 'POST',
        body: requestBody
      });

      console.log(`6. clicktoTrim: After fetch, before await response.text()`);
      const responsebody = await response.text();
      console.log(`7. clicktoTrim: After fetch, after await response.text()`);
      const responsestatus = response.status;
      console.log(`8. clicktoTrim: After fetch, in try{fetch(runSeqTrim)/catch() stmt , \nresponse.status is: ${responsestatus}, \nresponse.body is: ${responsebody}`);
      
      if (!response.ok) {
        // const errorMessage = await response.text();
        console.log(`clicktoTrim: Error - After fetch if !response.ok: ${response.status}`)
        throw new Error(`HTTP Error! Status: ${responsestatus}`);
      }
      console.log(`9. clicktoTrim: After fetch Before catch(), seqTrimOutputFileName: ${seqTrimOutputFileName}`);



    } catch (error) {
      console.error(`#.ERROR clicktoTrim: - /runSeqTrim: ${error}`);
    }



  };

  // const eventHandlerClicktoDownload = async (e) => {
  //   e.preventDefault();
    
  //   const requestBody = new FormData();
  //   requestBody.append('seqTrimOutputFileName', seqTrimOutputFileName);

  //   await fetch('http://localhost:5000/dnldSeqTrim', {
  //     method: 'GET',
  //     body: requestBody, // If this is succcessful in downloading ...-trim.fa, then attempt to send "fileName.fa" through header instead of body
  //     headers: {
  //       "Content-Type": "text/plain",
  //       "Content-Disposition": `attachment; filename=${seqTrimOutputFileName}`
  //     }       
  //   })
  //   .then((response) => response.blob())
  //   .then((blob) => {
  //     // Create blob link to download
  //     const url = window.URL.createObjectURL(blob);
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.setAttribute('download', `${seqTrimOutputFileName}`); // Specify the filename

  //     // Append to the HTML link element on the page
  //     document.body.appendChild(link);

  //     // Start the download
  //     link.click();

  //     // Clean up and remove the link
  //     document.body.removeChild(link);
  //   });
  // };

  const clicktoDnldTxtFile = async (e) => {
    e.preventDefault();
    
    console.log(`1. clicktoDnldTxtFile: before requestBody`);
    
    // const requestBody = new FormData();
    // requestBody.append('id', id);
    // requestBody.append('seqTrimOutputFilePath', seqTrimOutputFilePath);
    console.log(`2. clicktoDnldTxtFile: after requestBody\n id: ${id}\n seqTrimOutputFilePath: ${seqTrimOutputFilePath}\n seqTrimOutputFileName: ${seqTrimOutputFileName}`);
    
    // obtain file (file blob) from backend node.js
    console.log(`3. clicktoDnldTxtFile: before try/catch fetch`)
    try {
      const response = await fetch(`http://localhost:5000/dnldSeqTrim?sampleFileName=${seqTrimOutputFileName}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'text/plain',
          'Content-Disposition': `attachment; filename=${seqTrimOutputFileName}`
        },
        // body: requestBody
      });
      
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      console.log(`4. clicktoDnldTxtFile: after fetch`);
      
      // Create a Blob from the response data
      console.log(`5. clicktoDnldTxtFile: before fileBlob`);
      const fileBlob = await response.blob();
      console.log(`6. clicktoDnldTxtFile: after fileBlob`);
      
      // console.log("1. clicktoDnldTxtFile: before create Data obj");
      // const datatxts = ["here", "and", "now"];
      // console.log("2. clicktoDnldTxtFile: before create Blob file, after create Data obj");
      // const file = new Blob(datatxts, {type: 'text/plain'});
      
      
      console.log(`7. clicktoDnldTxtFile: before create document.createElement("a").URL.createObjectURL(fileBlob)`);
      //anchor link
      const element = document.createElement("a");
      element.href = URL.createObjectURL(fileBlob);
      element.download = `${trimFileName}_${getDateTime()}.${trimFileExt}`;
      console.log(`8. clicktoDnldTxtFile: after create document.createElement("a").URL.createObjectURL(fileBlob)`);
      
      //link click
      console.log(`9. clicktoDnldTxtFile: before click to download, before appendChild(element)`);
      document.body.appendChild(element);
      element.click();
      console.log(`10. clicktoDnldTxtFile: after click to download, after appendChild(element)`);
      
      console.log(`11. clicktoDnldTxtFile: before removeChild(element)`); 
      // Remove the link from the body
      document.body.removeChild(element);
      
      console.log(`12. clicktoDnldTxtFile: after removeChild(element)`);
    } catch (error) {
      console.error(`Error downloading file: ${error}`);
    }
    console.log(`13. clicktoDnldTxtFile: Outside, After try{fetch}/catch`);
  };
//2024-01-04:START HERE , 
// [1]. within sequence div container only show bbduk Trim button and nothing else.
//    If sequence.seqTrim == null, then only show
//        i. filename,
//        ii. <button onClick={clicktoTrim}>Run bbDuk Trim</button>

  return (
    <div className="wrapper">
      <div> {sequence.seqTrimOutputFileName}:{(sequence.seqTrimTimeStamp == null) ? "": `   ${sequence.seqTrimTimeStamp}`}</div>
      <div> Illumina quality: {sequence.illuminaPass}</div>
      
      <div className="GridItemWButton"> {(sequence.seqTrim == null) ? <button onClick={clicktoTrim}>Run bbDuk Trim</button>: <button id="downloadBtn" onClick={clicktoDnldTxtFile} value="download">Download</button>} </div>
      {/* <div className="GridItemWButton">
        <button onClick={clicktoTrim}>Run bbDuk Trim</button>
      </div> */}
      {/* <div className="btnDiv"> {(sequence.seqTrim == null) ? '':
        <button id="downloadBtn" onClick={clicktoDnldTxtFile} value="download">Download</button>}
      </div> */}
    </div>  
  );
}


