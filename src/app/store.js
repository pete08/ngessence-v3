import { configureStore } from "@reduxjs/toolkit";
// import reducers
import topicsReducer from "../features/topics/topicsSlice";
import quizzesReducer from "../features/quizzes/quizzesSlice";
import cardsReducer from "../features/cards/cardsSlice";
import sequencesReducer from "../features/sequences/sequencesSlice";

export default configureStore({
  reducer: {
    topics: topicsReducer,
    quizzes: quizzesReducer,
    cards: cardsReducer,
    sequences: sequencesReducer,
  },
});
