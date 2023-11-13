import { createSlice } from "@reduxjs/toolkit";

//action creator
// export const addTopic = ({id, name, icon}) => {
//     console.log(`addTopic's id:${id}, \nname:${name},\n icon:${icon}`)
//     return {
//         type: "addTopic",
//         payload: {
//             "id": id,
//             "name": name,
//             "icon": icon,
//             "quizIds": []
//         }
//     }
// }

// slice 
const topicsSlice = createSlice({
    name:'topics',
    initialState: {
        topics:{}
    },
    reducers: {
        addTopic: (state, action) => {
            state[action.payload.id] = {
                "id": action.payload.id,
                "name": action.payload.name,
                "icon": action.payload.icon,
                "quizIds": []
            }
        }
    },
    extraReducers: {}

})

// selector of state topics
export const selectTopics = (state) => state.topics;
//export the actions
export const { addTopic } = topicsSlice.actions;

// Slice reducer
export default topicsSlice.reducer;