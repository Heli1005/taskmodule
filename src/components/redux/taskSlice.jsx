import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    taskdata: []
}

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        allTasks: (state, action) => {
            state.taskdata = [...action.payload];
            return state
        },
        addTask: (state, action) => {
            state.taskdata.push(action.payload);
            return state
        },
        removeTask: (state, action) => {
            state.taskdata = state.taskdata?.filter(task => task._id !== action.payload);
            return state
        },
        updateTask: (state, action) => {
            const index = state.taskdata.findIndex(task => task._id === action.payload._id);
            if (index !== -1) {
                state.taskdata[index] = action.payload;
            }
            return state
        },
    },
})

export const { allTasks,addTask, removeTask, updateTask } = taskSlice.actions;
export default taskSlice.reducer
