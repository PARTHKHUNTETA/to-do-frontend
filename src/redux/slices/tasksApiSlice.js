import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const tasksApiSlice = createApi({
    reducerPath: 'tasksApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: ({ priority, category }) => {
                const params = new URLSearchParams();
                if (priority) params.append('priority', priority);
                if (category) params.append('category', category);
                return `/tasks?${params.toString()}`;
            },
            providesTags: [{ type: 'Task', id: 'LIST' }],
        }),
        addTask: builder.mutation({
            query: (task) => ({
                url: '/tasks',
                method: 'POST',
                body: task,
            }),
            invalidatesTags: [{ type: 'Task', id: 'LIST' }],
        }),
        deleteTask: builder.mutation({
            query: (id) => ({
                url: `/tasks/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Task', id: 'LIST' }]
        }),
        editTask: builder.mutation({
            query: ({ id, title, priority, category }) => ({
                url: `/tasks/${id}`,
                method: 'PUT',
                body: { title, priority, category },
            }),
            invalidatesTags: [{ type: 'Task', id: 'LIST' }],
        }),
        deleteAllTasks: builder.mutation({
            query: () => ({
                url: '/tasks',
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Task', id: 'LIST' }],
        }),
        invalidatesTags: [{ type: 'Task', id: 'LIST' }],
    }),
});

export const { useGetTasksQuery, useAddTaskMutation, useDeleteTaskMutation, useEditTaskMutation, useDeleteAllTasksMutation } = tasksApiSlice;
export default tasksApiSlice;