import { createSlice } from "@reduxjs/toolkit";
import { addQuiz } from "../quizzes/quizzesSlice";

// slice 
const topicsSlice = createSlice({
    name:'topics',
    initialState: {
        topics:{}
    },
    reducers: {
        addTopic: (state, action) => {
            const {id, name, icon} = action.payload;
            state.topics[id] = {
                id: id,
                name: name,
                icon: icon,
                quizIds: []
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addQuiz, (state, action) => {
                const {id, topicId} = action.payload;
                state.topics[topicId].quizIds.push(id);
            })
    }
})

// selector of state topics
export const selectTopics = (state) => state.topics.topics;

//export the actions
export const { addTopic } = topicsSlice.actions;

// Slice reducer
export default topicsSlice.reducer;


