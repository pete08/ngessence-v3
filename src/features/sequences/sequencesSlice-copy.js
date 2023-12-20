import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";




export const addSequence = createAsyncThunk(
    'sequences/addSequence',
    async ( { formData  } ) => {
        const { id, fileName, fileExtension, outputExt, filepath, timestamp, outputfilepath, getoutputfilepath } = formData; 


        // console.log("HELLO! FROM THE INSIDE!!!!!\nHELLLO IS YOU THERE??")

        return {
            id: id,
            fileName: fileName,
            fileExtension: fileExtension,
            outputExt: outputExt,
            filepath: filepath,
            timestamp: timestamp,
            outputfilepath: outputfilepath,
            getoutputfilepath: getoutputfilepath,
            illuminaPass: false,
            seqTrim: null,
            seqTrimName: fileName + '-trim',
            seqTrimTimeStamp: null,
            seqTrimOutputFilePath: null
        };

    }
);

export const addSequenceTrim = createAsyncThunk(
  'sequences/addSequenceTrim',
  async ( { formData  } ) => {
      const { id, seqTrimTimeStamp, seqTrimOutputFilePath } = formData; 

      const response = await fetch(`http://localhost:3000/seqTrim`);
      console.log(`Response Status: ${response.status}`)
      // console.log(`ResponseResult Text response.text(): ${sequenceResult}`)
      const seqTrim = await response.text();
      return {
          id: id,
          seqTrim: seqTrim,
          seqTrimTimeStamp: seqTrimTimeStamp,
          seqTrimOutputFilePath: seqTrimOutputFilePath 
      };

  }
);



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
    },
    extraReducers: (builder) => {
        builder
          .addCase(addSequence.pending, (state) => {
            state.isLoadingSequences = true;
            state.hasError = false;
          })
          .addCase(addSequence.fulfilled, (state, action) => {
            state.isLoadingSequences = false;
            state.hasError = false;
            state.sequences[action.payload.id]=action.payload;

          })
          .addCase(addSequence.rejected, (state, action) => {
            state.isLoadingSequences = false;
            state.hasError = true;
            state.error = action.error.message;
            state.sequences = {};
          })
          .addCase(addSequenceTrim.pending, (state) => {
            state.isLoadingSequences = true;
            state.hasError = false;
          })
          .addCase(addSequenceTrim.fulfilled, (state, action) => {
            const {id, seqTrim, seqTrimTimeStamp, seqTrimOutputFilePath} = action.payload;
            state.isLoadingSequences = false;
            state.hasError = false;
            state.sequences[id.seqTrim]=seqTrim;
            state.sequences[id.seqTrimTimeStamp]=seqTrimTimeStamp;
            state.sequences[id.seqTrimOutputFilePath]=seqTrimOutputFilePath;

          })
          .addCase(addSequenceTrim.rejected, (state, action) => {
            state.isLoadingSequences = false;
            state.hasError = true;
            state.error = action.error.message;
            state.sequences = {};
          });
    },
})

// selector of state sequences
export const selectSequences = (state) => state.sequences.sequences;

//export the actions
export const isLoadingSequences = (state) => state.sequences.isLoadingSequences;

// Slice reducer
export default sequencesSlice.reducer;


//START HERE (2023-12-19) Troubleshoot:
// [ ] 1. change reference from 'sequenceSlice' to 'sequenceSliceCopy' ref Error lines: 120,124,129

// ERROR from "start sequence":
    // This is the formData sent to sequencesSlice's addSequence thunk action:  
    // Object { id: "", fileName: "C:\\fakepath\\16s_426-read-2.fasta", fileExtension: "fasta", outputExt: "fa", filepath: "./src/data/int/C:\\fakepath\\16s_426-read-2.fasta.fasta", outputfilepath: "public/data/trim/C:\\fakepath\\16s_426-read-2.fasta-trim.fa", getoutputfilepath: "data/C:\\fakepath\\16s_426-read-2.fasta-trim.fa", timestamp: "2023-12-1923355" }
    // sequencesSlice.js:13 17:35:05.592 
    
    // This is the formData's filepath sent to sequencesSlice's:
    // ./src/data/int/C:\fakepath\16s_426-read-2.fasta.fasta 
    // sequencesSlice.js:14 17:35:05.592


    // This is the formData's outputfilepath sent to sequencesSlice's addSequence thunk action:
    // public/data/trim/C:\fakepath\16s_426-read-2.fasta-trim.fa 
    // sequencesSlice.js:15 17:35:05.611



    // XHRGET http://localhost:3000/data/C:/fakepath/16s_426-read-2.fasta-trim.fa [HTTP/1.1 200 OK 182ms]
