import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './slices/taskSlice'
import tasksApiSlice from './slices/tasksApiSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    [tasksApiSlice.reducerPath]: tasksApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tasksApiSlice.middleware),
});