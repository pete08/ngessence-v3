import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// {
//   'id': uuid,
//   'timestamp': timestamp,
//   'fileName': fileName,
//   'filepath': filepath,
//   'getfilepath': getfilepath,
//   'seqTrimOutputFileName': trimFileName,
//   'seqTrimOutputFilePath': seqTrimOutputFilePath,
//   'getSeqTrimOutputFilePath': getSeqTrimOutputFilePath,
// }

export const addSequence = createAsyncThunk(
    'sequences/addSequence',
    async ( { formData  } ) => {
        const { id, timestamp, fileName, filepath, getfilepath, seqTrimOutputFileName, seqTrimOutputFilePath, getSeqTrimOutputFilePath } = formData; 

        console.log("HELLO! FROM THE INSIDE addSequence!!!!!\nHELLLO IS YOU THERE??")
        console.log(`formData: ${JSON.stringify(formData)}\n`)
        return {
            id: id,
            timestamp: timestamp,
            illuminaPass: false,
            fileName: fileName,
            filepath: filepath,
            getfilepath: getfilepath,
            seqTrimOutputFileName: seqTrimOutputFileName,
            seqTrimOutputFilePath: seqTrimOutputFilePath,
            getseqTrimOutputFilePath: getSeqTrimOutputFilePath,
            seqTrim: null,
            seqTrimTimeStamp: null,
        };

    }
);

export const addSequenceTrim = createAsyncThunk(
  'sequences/addSequenceTrim',
  async ( { formData  } ) => {
      const { id, seqTrim, seqTrimTimeStamp } = formData; 

      // const response = await fetch(`http://localhost:3000/seqTrim`);
      // console.log(`Response Status: ${response.status}`)
      // // console.log(`ResponseResult Text response.text(): ${sequenceResult}`)
      // const seqTrim = await response.text();
      return {
          id: id,
          seqTrim: seqTrim,
          seqTrimTimeStamp: seqTrimTimeStamp,
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
            const {id, seqTrim, seqTrimTimeStamp} = action.payload;
            state.isLoadingSequences = false;
            state.hasError = false;
            state.sequences[id.seqTrim]=seqTrim;
            state.sequences[id.seqTrimTimeStamp]=seqTrimTimeStamp;

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

