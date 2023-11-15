import {createSlice} from "@reduxjs/toolkit";


const cardsSlice = createSlice({
    name: "cards",
    initialState: {
        cards: {}
    },
    reducers: {
        addCards: (state, action) => {
            state.cards[action.payload.id] = {
                id: action.payload.id,
                front: action.payload.front,
                back: action.payload.back
            }
        }   
    }
})

//export selector for all Cards
//selector
export const selectCards = (state) => state.cards.cards;

//export cardSlice action creators
export const { addCards } = cardsSlice.actions;

//export cardSlice reducer
export default cardsSlice.reducer;