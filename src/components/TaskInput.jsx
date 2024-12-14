import { useDispatch } from "react-redux";
import {
  setNewTask,
  setPriority,
  setCategory,
} from "../redux/slices/taskSlice";

const TaskInput = ({ newTask, priority, category, onAdd }) => {
  console.log(newTask, priority, category);
  const dispatch = useDispatch();
  return (
    <div className="space-y-4 mb-6">
      <input
        type="text"
        value={newTask}
        onChange={(e) => dispatch(setNewTask(e.target.value))}
        placeholder="Enter a new task"
        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
      />
      <div className="flex gap-2">
        <select
          value={priority}
          onChange={(e) => dispatch(setPriority(e.target.value))}
          className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <select
          value={category}
          onChange={(e) => dispatch(setCategory(e.target.value))}
          className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Home">Home</option>
          <option value="Health">Health</option>
          <option value="Leisure">Leisure</option>
          <option value="General">General</option>
        </select>
      </div>
      <button
        onClick={onAdd}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition w-full"
      >
        Add Task
      </button>
    </div>
  );
};

export default TaskInput;
