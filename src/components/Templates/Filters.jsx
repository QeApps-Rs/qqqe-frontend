/* eslint-disable react/prop-types */
import DownArrowSvg from "../../images/svg-icons/downArrowSvg";
import { useState } from "react";
const FilterBar = ({
  selectedGoals,
  goals,
  selectedTags,
  tags,
  formatTag,
  handleCheckboxChange,
  keywords,
  setFilterKeyword,
}) => {
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const [showGoalDropdown, setShowGoalDropdown] = useState(false);
  const handleTagToggle = () => setShowTagDropdown((prev) => !prev);
  const handleGoalToggle = () => setShowGoalDropdown((prev) => !prev);

  const handleGoalSelectChange = (e) => {
    let isChecked = true;
    if (selectedGoals.includes(formatTag(e))) {
      isChecked = false;
      handleCheckboxChange("goals", formatTag(e), false);
    }
    if (isChecked) {
      handleCheckboxChange("goals", formatTag(e), true);
    }
  };

  const handleTagSelectChange = (e) => {
    let isChecked = true;
    if (selectedTags.includes(formatTag(e))) {
      isChecked = false;
      handleCheckboxChange("tags", formatTag(e), false);
    }
    if (isChecked) {
      handleCheckboxChange("tags", formatTag(e), true);
    }
  };

  const handleKeywordFilter = (e) => {
    setFilterKeyword(e.target.value);
  };

  const renderDropdown = (items, selectedItems, onChange) =>
    items.map((item, index) => (
      <div
        key={index}
        className="inline-flex items-center space-x-2 p-2 hover:bg-gray-100 cursor-pointer"
        onClick={() => onChange(item)}
      >
        <input
          type="checkbox"
          checked={selectedItems.includes(formatTag(item))}
          onChange={() => onChange(item)}
          className="form-checkbox h-4 w-4 text-blue-600"
        />
        <span className="text-sm text-gray-700">{item}</span>
      </div>
    ));

  return (
    <div className="mt-4 p-4  rounded-lg">
      <div className="flex items-center">
        <span className="font-semibold text-gray-600 mr-4">Filter:</span>
        <div className="flex w-full space-x-4">
          <div className="relative w-1/6">
            <button
              onClick={handleTagToggle}
              className="w-full flex justify-between items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Filter by Tags
              <i
                className={`fa ${
                  showTagDropdown ? "fa-chevron-up" : "fa-chevron-down"
                }`}
                aria-hidden="true"
              ></i>
            </button>
            {showTagDropdown && (
              <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-40 overflow-y-auto">
                {renderDropdown(tags, selectedTags, handleTagSelectChange)}
              </div>
            )}
          </div>
          <div className="relative w-1/6">
            <button
              onClick={handleGoalToggle}
              className="w-full flex justify-between items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Filter by Goals
              <i
                className={`fa ${
                  showGoalDropdown ? "fa-chevron-up" : "fa-chevron-down"
                }`}
                aria-hidden="true"
              ></i>
            </button>
            {showGoalDropdown && (
              <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-40 overflow-y-auto">
                {renderDropdown(goals, selectedGoals, handleGoalSelectChange)}
              </div>
            )}
          </div>
          {/* <select
              multiple
              value={selectedGoals}
              onChange={handleGoalSelectChange}
              className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option>By Goal</option>
              {goals?.map((goal, index) => (
                <option value={formatTag(goal)} key={index}>
                  {goal}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
              <DownArrowSvg />
            </div>
          </div> */}
          {/* <div className="relative">
            <select
              onChange={handleKeywordFilter}
              className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option value="">By Keyword</option>
              {keywords?.map((item, index) => (
                <option value={item?.title} key={index}>
                  {item?.title}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
              <DownArrowSvg />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
