const TaskItem = ({
  task,
  onEdit,
  onDelete,
  onStartEdit,
  editedTaskTitle,
  setEditedTaskTitle,
  editedPriority,
  setEditedPriority,
  editedCategory,
  setEditedCategory,
}) => (
  <li key={task.id} className="flex justify-between items-center border-b pb-2">
    {task.isEditing ? (
      <div className="flex flex-col w-full">
        <input
          type="text"
          value={editedTaskTitle}
          onChange={(e) => setEditedTaskTitle(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300 mb-2"
        />
        <div className="flex gap-2">
          <select
            value={editedPriority}
            onChange={(e) => setEditedPriority(e.target.value)}
            className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <select
            value={editedCategory}
            onChange={(e) => setEditedCategory(e.target.value)}
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
          onClick={onEdit}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition mt-2"
        >
          Save
        </button>
      </div>
    ) : (
      <>
        <div className="flex-1">
          <p>
            <strong>{task.title}</strong>
          </p>
          <p className="text-sm text-gray-600">
            Priority: {task.priority}, Category: {task.category}
          </p>
        </div>
        <div>
          <button
            onClick={() =>
              onStartEdit(task.id, task.title, task.priority, task.category)
            }
            className="text-blue-500 hover:text-blue-700 transition mr-2"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-red-500 hover:text-red-700 transition"
          >
            Delete
          </button>
        </div>
      </>
    )}
  </li>
);

export default TaskItem;
