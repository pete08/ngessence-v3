import { createSlice } from "@reduxjs/toolkit";

const quizzesSlice = createSlice({
    name: 'quizzes',
    initialState: {
        quizzes: {}
    },
    reducers: {
        addQuiz: (state, action) => {
            const {id, name, topicId, cardIds} = action.payload;
            state.quizzes[id] = {
                "id": id,
                "name": name,
                "topicId": topicId,
                "cardIds": cardIds,
            }
        }
    },
    extraReducers: {},
})


// export the selector (of quizzes)
export const selectQuizzes = (state) => state.quizzes.quizzes;

// export the actions from slice 
export const {addQuiz} = quizzesSlice.actions;

// export reducer from the creatSlice function
export default quizzesSlice.reducer;