import React from "react";

const TaskSkeleton = () => {
  const skeletonItems = new Array(10).fill(null); // 8 placeholder tasks
  
  return (
    <div className="p-4">
      {skeletonItems.map((_, index) => (
        <div
          key={index}
          className="flex justify-between items-center border-b py-4 animate-pulse"
        >
          {/* Left Section: Task Title & Details */}
          <div className="flex flex-col gap-2 w-3/4">
            <div className="h-4 bg-gray-300 rounded w-1/2"></div> {/* Task Title */}
            <div className="h-3 bg-gray-200 rounded w-1/3"></div> {/* Priority & Category */}
          </div>

          {/* Right Section: Edit/Delete Placeholder */}
          <div className="flex gap-4">
            <div className="h-4 w-12 bg-gray-300 rounded"></div> {/* Edit */}
            <div className="h-4 w-12 bg-gray-300 rounded"></div> {/* Delete */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskSkeleton;
