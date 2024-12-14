import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
    name: "tasks",
    initialState: {
        newTask: '',
        priority: 'Medium',
        category: 'General'
    },
    reducers: {
        setNewTask: (state, action) => {
            state.newTask = action.payload;
        },
        setPriority: (state, action) => {
            state.priority = action.payload;
        },
        setCategory: (state, action) => {   
            state.category = action.payload;
        }
    }
})

export const { setNewTask, setPriority, setCategory } = tasksSlice.actions;
export const selectNewTask = (state) => state.tasks.newTask;
export const selectPriority = (state) => state.tasks.priority;
export const selectCategory = (state) => state.tasks.category;
export default tasksSlice.reducer;