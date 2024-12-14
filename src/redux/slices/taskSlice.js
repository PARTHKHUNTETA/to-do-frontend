import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
    name: "tasks",
    initialState: {
        newTask: ''
    },
    reducers: {
        setNewTask: (state, action) => {
            state.newTask = action.payload;
        }
    }
})

export const { setNewTask } = tasksSlice.actions;
export const selectNewTask = (state) => state.tasks.newTask;
export default tasksSlice.reducer;