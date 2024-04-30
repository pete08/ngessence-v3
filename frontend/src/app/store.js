import { configureStore } from "@reduxjs/toolkit";
// import reducers
import sequencesReducer from "../features/sequences/sequencesSlice.js";
// import sequencesReducer from "../features/sequences/sequencesSlice";

const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  try {
    // Save state to localStorage after each update
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (error) {
    console.error("Error saving state to localStorage:", error);
  }

  return result;
};

const loadState = () => {
  try {
    // Load state from localStorage
    const serializedState = localStorage.getItem("reduxState");
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (error) {
    console.error("Error loading state from localStorage:", error);
    return undefined;
  }
};

export default configureStore({
  reducer: {
    sequences: sequencesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
  preloadedState: loadState(), // Initialize with the state from localStorage
});
