import { createSlice } from "@reduxjs/toolkit";
// import { addSequenceExecution } from "../sequences/sequencesexecutionSlice";

// slice 
const sequencesSlice = createSlice({
    name:'sequences',
    initialState: {
        sequences:{}
    },
    reducers: {
        addSequence: (state, action) => {
            const {id, name, timestamp, sequenceResult} = action.payload;
            state.sequences[id] = {
                id: id,
                timestamp: timestamp,
                name: name,
                sequenceResult: sequenceResult,
            }
        }
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
export const { addSequence } = sequencesSlice.actions;

// Slice reducer
export default sequencesSlice.reducer;


