import React, { useState } from "react";
import {
  useAddTaskMutation,
  useDeleteAllTasksMutation,
  useDeleteTaskMutation,
  useEditTaskMutation,
  useGetTasksQuery,
} from "./redux/slices/tasksApiSlice";
import { FaList } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  selectNewTask,
  setNewTask,
  setPriority,
  setCategory,
} from "./redux/slices/taskSlice";
import TaskInput from "./components/TaskInput";
import TaskItem from "./components/TaskItem";
import FilterTask from "./components/FilterTask";
import TaskSkeleton from "./components/TaskSkeleton";

const App = () => {
  const [filterPriority, setFilterPriority] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const newTask = useSelector(selectNewTask);
  const priority = useSelector((state) => state.tasks.priority);
  const category = useSelector((state) => state.tasks.category);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskTitle, setEditedTaskTitle] = useState("");
  const [editedPriority, setEditedPriority] = useState("Medium");
  const [editedCategory, setEditedCategory] = useState("General");

  const { data: tasks = [], isLoading } = useGetTasksQuery({
    priority: filterPriority,
    category: filterCategory,
  });
  const [addTask] = useAddTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [editTask] = useEditTaskMutation();
  const [deleteAllTasks] = useDeleteAllTasksMutation();
  const dispatch = useDispatch();

  const handleAddTask = async () => {
    if (!newTask.trim()) return;
    await addTask({ title: newTask, priority, category });
    dispatch(setNewTask(""));
    dispatch(setPriority("Medium"));
    dispatch(setCategory("General"));
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
  };

  const handleEditTask = async () => {
    if (!editedTaskTitle.trim()) return;
    await editTask({
      id: editingTaskId,
      title: editedTaskTitle,
      priority: editedPriority,
      category: editedCategory,
    });
    setEditingTaskId(null);
    setEditedTaskTitle("");
    setEditedPriority("Medium");
    setEditedCategory("General");
  };

  const handleDeleteAllTasks = async () => {
    await deleteAllTasks();
  };

  const handleStartEdit = (id, title, category, priority) => {
    setEditingTaskId(id);
    setEditedTaskTitle(title);
    setEditedCategory(category);
    setEditedPriority(priority);
  };

  if (isLoading) return <TaskSkeleton />;

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-indigo-50 flex items-center justify-center py-10">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-4xl">
        {/* Header */}
        <h1 className="text-4xl font-extrabold mb-6 text-center text-indigo-700">
          <div className="flex items-center justify-center gap-2">
            <FaList className="text-indigo-600 text-4xl" />
            <h1 className="text-4xl font-extrabold text-indigo-700">
              To-Do List
            </h1>
          </div>
        </h1>

        {/* Input and Filter */}
        <TaskInput
          newTask={newTask}
          priority={priority}
          category={category}
          onAdd={handleAddTask}
        />
        <FilterTask
          setFilterCategory={setFilterCategory}
          setFilterPriority={setFilterPriority}
          filterPriority={filterPriority}
          filterCategory={filterCategory}
        />

        {/* Task List */}
        <div className="mt-8">
          {tasks.length > 0 ? (
            <ul className="space-y-4">
              {tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={{
                    ...task,
                    isEditing: task.id === editingTaskId,
                    title:
                      task.id === editingTaskId ? editedTaskTitle : task.title,
                  }}
                  onStartEdit={handleStartEdit}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                  editedTaskTitle={editedTaskTitle}
                  setEditedTaskTitle={setEditedTaskTitle}
                  editedPriority={editedPriority}
                  setEditedPriority={setEditedPriority}
                  editedCategory={editedCategory}
                  setEditedCategory={setEditedCategory}
                />
              ))}
            </ul>
          ) : (
            <div className="text-gray-500 text-center mt-12 flex flex-col items-center">
              <img
                src="https://via.placeholder.com/200"
                alt="Empty"
                className="w-40 h-40 mb-4 opacity-80"
              />
              <p className="text-lg font-medium">No tasks available.</p>
              <p className="text-sm text-gray-400">
                Add a new task or adjust your filters.
              </p>
            </div>
          )}
        </div>

        {/* Delete All Tasks */}
        {tasks.length > 0 && (
          <button
            onClick={handleDeleteAllTasks}
            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-all mt-8 w-full font-semibold shadow-md hover:shadow-lg"
          >
            🗑 Delete All Tasks
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
