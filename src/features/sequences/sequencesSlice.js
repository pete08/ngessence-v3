import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { addSequenceExecution } from "../sequences/sequencesexecutionSlice";


// turn on both servers, 30000, and 5000, createw new seq (/new/sequence...if does not work (i.e. poulate the state.sequence), try commenting out (lines 24-29) :
//              const response = await fetch('http://localhost:5000/upload', {method: 'POST',body: requestBody});
// and re-running with known file in publi/data/16s...trim.fa. < if this works to populate state.sequence. then brainstorm ways to perform two requests types necessarty to both upload and return the trim within the state.sequence.id.newSeqTrim 

export const addSequence = createAsyncThunk(
    'sequences/addSequence',
    async ( { formData  } ) => {
        const { filepath, outputfilepath, id, timestamp, name, outputExt, getoutputfilepath, rawInput } = formData; 
        console.log(`This is the formData sent to sequencesSlice's addSequence thunk action:\n`, formData);
        console.log(`This is the formData's filepath sent to sequencesSlice's:\n`, filepath);
        console.log(`This is the formData's outputfilepath sent to sequencesSlice's addSequence thunk action:\n`, outputfilepath);
        // console.log(`This is the file sent to sequencesSlice's addSequence thunk action:\n`, file);
  
        // const requestBody = new FormData();
        // requestBody.append('input-file', file);
        // requestBody.append('filepath', filepath);
        // requestBody.append('id', id);
        // requestBody.append('timestamp', timestamp);
        // requestBody.append('outputfilepath', outputfilepath);

        // await fetch('http://localhost:5000/upload', {
        //     method: 'POST',
        //     body: requestBody
        //     })
        const response = await fetch(`http://localhost:3000/${getoutputfilepath}`);
        console.log(`Response Status: ${response.status}`)
        // console.log(`ResponseResult Text response.text(): ${sequenceResult}`)
        const sequenceResult = await response.text();
        console.log("HELLO! FROM THE INSIDE!!!!!\nHELLLO IS YOU THERE??")

        return {
            id: id,
            filepath: filepath,
            timestamp: timestamp,
            name: name + '-trim.' + outputExt,
            illuminaPass: false,
            rawInput: rawInput,
            sequenceResult: sequenceResult
        };
        // fetch(`http://localhost:3000/${getoutputfilepath}`)
        // .then((response) => response.text())
        // .then((sequenceResult) => ({
        //     id: id,
        //     filepath: filepath,
        //     timestamp: timestamp,
        //     name: name + '-trim.' + outputExt,
        //     illuminaPass: false,
        //     sequenceResult: sequenceResult}))
        
        // // return response
    }
);
    



        // const response = await fetch('http://localhost:5000/upload', {
        //     method: 'POST',
        //     body: requestBody
        // });
        // const responseData = await response.json();

        // const response = await fetch(`http://localhost:5000/${getoutputfilepath}`);
        // const sequenceResult = await response.text();

        // return {
        //     id: id,
        //     filepath: filepath,
        //     timestamp: timestamp,
        //     name: name + '-trim.' + outputExt,
        //     illuminaPass: false,
        //     sequenceResult: sequenceResult
        // };






// let sendObject = {
//             id: id,
//             filepath: filepath,
//             timestamp: timestamp,
//             name: name + '-trim.' + outputExt,
//             illuminaPass: false,
//             sequenceResult: null
//         };

// const generateIt = () => {
//   return new Promise((resolve, reject) => {
//     if (const response = fetch('http://localhost:5000/upload', {
//             method: 'POST',
//             body: requestBody
//         })) {
//       resolve(response.json());
//     } else {
//       reject(new Error('Failed to upload'));
//     }
//   });
// }

// const generateTrim = (getoutputfilepath) => {
//   return new Promise((resolve, reject) => {
//     if (const response = fetch(`http://localhost:5000/${getoutputfilepath}`).text()) {
//       resolve(objectTrim.sequenceResult = response);
//     } else {
//       reject(new Error('Failed to upload'));
//     }
//   });
// }

// generateIt()
//   .then((mail) => {
//     console.log(mail);
//   })
//   .catch((err) => {
//     console.error(err);
//   })
//   .finally((getoutputfilepath) => {
//     const response = fetch(`http://localhost:5000/${getoutputfilepath}`).text();
//   });


// slice 
const sequencesSlice = createSlice({
    name:'sequences',
    initialState: {
        sequences:{},
        isLoadingSequences: false,
        hasError: false,
        error: null
    },
    reducers: {
        // addSequence: (state, action) => {
        //     const {id, name, timestamp, sequenceResult} = action.payload;
        //     state.sequences[id] = {
        //         id: id,
        //         timestamp: timestamp,
        //         name: name,
        //         sequenceResult: sequenceResult,
        //         illuminaPass: false
        //     }
        // }
    },
    extraReducers: (builder) => {
        builder
          .addCase(addSequence.pending, (state) => {
            state.isLoadingSequences = true;
            state.hasError = false;
          })
          .addCase(addSequence.fulfilled, (state, action) => {
            // const {id, name, timestamp, newSeqFileTrimContent} = action.payload;
            state.isLoadingSequences = false;
            state.hasError = false;
            state.sequences[action.payload.id]=action.payload;
            // console.log(`what is the action.payload???:\n${action.payload}`)
            // console.log(`what is the action.payload??? , JSON.stringify(action.payload):\n${JSON.stringify(action.payload)}`)
            // console.log(`what is the action.payload.id???:\n${action.payload.id}`)
            // state.sequences[id] = {
            //     id: id,
            //     timestamp: timestamp,
            //     name: name,
            //     seqTrim: newSeqFileTrimContent,
            //     illuminaPass: false
            // };
            // console.log(`state.sequences is...${JSON.stringify(state.sequences)}`)
            // console.log(`state.sequences is now!!!!...${JSON.stringify(state.sequences)}`)
          })
          .addCase(addSequence.rejected, (state, action) => {
            state.isLoadingSequences = false;
            state.hasError = true;
            state.error = action.error.message;
            state.sequences = {};
          });
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(addSequenceExecution, (state, action) => {
    //             const {id, sequenceId} = action.payload;
    //             state.sequences[sequenceId].addSequence.push(id);
    //         })
    // }
})

// selector of state sequences
export const selectSequences = (state) => state.sequences.sequences;

//export the actions
export const isLoadingSequences = (state) => state.sequences.isLoadingSequences;

// Slice reducer
export default sequencesSlice.reducer;


