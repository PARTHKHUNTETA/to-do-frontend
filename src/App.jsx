import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  useAddTaskMutation,
  useDeleteAllTasksMutation,
  useDeleteTaskMutation,
  useEditTaskMutation,
  useGetTasksQuery,
} from "./redux/slices/tasksApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectNewTask, setNewTask } from "./redux/slices/taskSlice";

const App = () => {
  const { data: tasks = [], isLoading } = useGetTasksQuery();
  const [addTask] = useAddTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [editTask] = useEditTaskMutation();
  const [deleteAllTasks] = useDeleteAllTasksMutation();
  const dispatch = useDispatch();
  const newTask = useSelector(selectNewTask);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskTitle, setEditedTaskTitle] = useState("");

  const handleAddTask = async () => {
    if (!newTask.trim()) return;
    await addTask({ title: newTask });
    dispatch(setNewTask(""));
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
  };

  const handleEditTask = async () => {
    if (!editedTaskTitle.trim()) return;
    await editTask({ id: editingTaskId, title: editedTaskTitle });
    setEditingTaskId(null);
    setEditedTaskTitle("");
  };

  const handleDeleteAllTasks = async () => {
    await deleteAllTasks();
  };

  if (isLoading) return <p>Loading tasks...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">To-Do List</h1>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => dispatch(setNewTask(e.target.value))}
            placeholder="Enter a new task"
            className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center border-b pb-2"
            >
              {editingTaskId === task.id ? (
                <>
                  <input
                    type="text"
                    value={editedTaskTitle}
                    onChange={(e) => setEditedTaskTitle(e.target.value)}
                    className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                  />
                  <button
                    onClick={handleEditTask}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition ml-2"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span>{task.title}</span>
                  <div>
                    <button
                      onClick={() => {
                        setEditingTaskId(task.id);
                        setEditedTaskTitle(task.title);
                      }}
                      className="text-blue-500 hover:text-blue-700 transition mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
        {tasks.length > 0 && (
          <button
            onClick={handleDeleteAllTasks}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition mt-4 w-full"
          >
            Delete All
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
