import React from "react";
import {
  FaBriefcase,
  FaHome,
  FaUser,
  FaStar,
  FaNotesMedical,
  FaChartLine,
  FaBolt,
} from "react-icons/fa";

const FilterTask = ({
  setFilterCategory,
  setFilterPriority,
  filterPriority,
  filterCategory,
}) => {
  const priorities = [
    {
      label: "All Priorities",
      value: "",
      gradient: "bg-gradient-to-r from-gray-300 to-gray-400",
    },
    {
      label: "High",
      value: "High",
      gradient: "bg-gradient-to-r from-red-500 to-red-600",
    },
    {
      label: "Medium",
      value: "Medium",
      gradient: "bg-gradient-to-r from-yellow-400 to-yellow-500",
    },
    {
      label: "Low",
      value: "Low",
      gradient: "bg-gradient-to-r from-green-400 to-green-500",
    },
  ];

  const categories = [
    { label: "All Categories", value: "", icon: <FaStar /> },
    { label: "Work", value: "Work", icon: <FaBriefcase /> },
    { label: "Personal", value: "Personal", icon: <FaUser /> },
    { label: "Home", value: "Home", icon: <FaHome /> },
    { label: "Health", value: "Health", icon: <FaNotesMedical /> },
    { label: "Leisure", value: "Leisure", icon: <FaChartLine /> },
    { label: "General", value: "General", icon: <FaBolt /> },
  ];

  const FilterButton = ({
    label,
    gradient,
    isActive,
    onClick,
    icon = null,
  }) => (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-5 py-2 rounded-full transition-transform transform 
        ${
          isActive
            ? `${gradient} text-white shadow-md scale-105`
            : "bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-sm"
        }`}
      aria-pressed={isActive}
    >
      {icon && <span className="text-lg">{icon}</span>}
      <span className="font-semibold">{label}</span>
    </button>
  );

  return (
    <div className="mb-6 bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">
        🎯 Filter Tasks
      </h2>

      {/* Filter by Priority */}
      <fieldset className="mb-6">
        <legend className="text-base font-semibold mb-3 text-gray-700">
          Filter by Priority:
        </legend>
        <div className="flex flex-wrap gap-3 justify-center">
          {priorities.map(({ label, value, gradient }) => (
            <FilterButton
              key={value}
              label={label}
              gradient={gradient}
              isActive={filterPriority === value}
              onClick={() => setFilterPriority(value)}
            />
          ))}
        </div>
      </fieldset>

      {/* Filter by Category */}
      <fieldset>
        <legend className="text-base font-semibold mb-3 text-gray-700">
          Filter by Category:
        </legend>
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map(({ label, value, icon }) => (
            <FilterButton
              key={value}
              label={label}
              icon={icon}
              gradient="bg-gradient-to-r from-blue-400 to-blue-600"
              isActive={filterCategory === value}
              onClick={() => setFilterCategory(value)}
            />
          ))}
        </div>
      </fieldset>
    </div>
  );
};

export default FilterTask;
