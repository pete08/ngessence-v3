import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addSequence = createAsyncThunk(
    'sequences/addSequence',
    async ( { formData  } ) => {
        const { id, timestamp, fileName, filepath, getfilepath, trimFileName, trimFileExt, seqTrimOutputFileName, seqTrimOutputFilePath, getSeqTrimOutputFilePath } = formData; 

        console.log(`addSequence SLICE ACTION id: ${id}`)
        return {
            id: id,
            timestamp: timestamp,
            illuminaPass: "Sequence Not processed.",
            fileName: fileName,
            filepath: filepath,
            getfilepath: getfilepath,
            trimFileName: trimFileName,
            trimFileExt: trimFileExt,
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
  async ( { someData  } ) => {
      const { id, seqTrim, seqTrimTimeStamp } = someData; 

      console.log(`addSequenceTrim SLICE ACTION id: ${id}`)

      return {
          id: id,
          illuminaPass: "Sequence processed using BBDuk",
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
      clearSequences: (state) => {
        state.sequences = {};
      },
      clearSequence: (state, action) => {
        // console.log(`1a. clearSequence: action.payload is: ${JSON.stringify(action.payload)}`);
        delete state.sequences[action.payload.id]
      },
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
            //maybe this state thunk action causing clearing of state.sequences 
            state.sequences = {};
          })
          .addCase(addSequenceTrim.pending, (state) => {
            state.isLoadingSequences = true;
            state.hasError = false;
          })
          .addCase(addSequenceTrim.fulfilled, (state, action) => {
            const {id, illuminaPass, seqTrim, seqTrimTimeStamp} = action.payload;
            state.isLoadingSequences = false;
            state.hasError = false;
            state.sequences[id].illuminaPass = illuminaPass;
            state.sequences[id].seqTrim = seqTrim;
            state.sequences[id].seqTrimTimeStamp = seqTrimTimeStamp;
          })
          .addCase(addSequenceTrim.rejected, (state, action) =>   {
            state.isLoadingSequences = false;
            state.hasError = true;
            state.error = action.error.message;
            //maybe this state thunk action causing clearing of state.sequences -> Answer: NO, THIS IS NOT AFFECTING
            state.sequences = {};
          });
    },
})

// selector of state sequences
export const selectSequences = (state) => state.sequences.sequences;
//export actions
export const {clearSequences, clearSequence} = sequencesSlice.actions;
//export the Thunk actions
export const isLoadingSequences = (state) => state.sequences.isLoadingSequences;

// Slice reducer
export default sequencesSlice.reducer;

