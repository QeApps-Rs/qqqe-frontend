/* eslint-disable react/prop-types */
import DownArrowSvg from "../../images/svg-icons/downArrowSvg";

const FilterBar = ({
  selectedGoals,
  setSelectedGoals,
  goals,
  selectedTags,
  setSelectedTags,
  tags,
  formatTag,
  handleCheckboxChange,
  keywords,
  setFilterKeyword,
}) => {
  const handleGoalSelectChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    if (selectedGoals.length > selectedOptions.length) {
      selectedGoals.forEach((selectedGoal) => {
        if (!selectedOptions.includes(selectedGoal)) {
          handleCheckboxChange("goals", formatTag(selectedGoal), false);
        }
      });
    } else if (selectedOptions.length > selectedGoals.length) {
      selectedOptions.forEach((selectedOption) => {
        if (!selectedGoals.includes(selectedOption)) {
          handleCheckboxChange("goals", formatTag(selectedOption), true);
        }
      });
    }
    setSelectedGoals(selectedOptions);
  };

  const handleTagSelectChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    if (selectedTags.length > selectedOptions.length) {
      selectedTags.forEach((selectedTag) => {
        if (!selectedOptions.includes(selectedTag)) {
          handleCheckboxChange("tags", formatTag(selectedTag), false);
        }
      });
    } else if (selectedOptions.length > selectedTags.length) {
      selectedOptions.forEach((selectedOption) => {
        if (!selectedTags.includes(selectedOption)) {
          handleCheckboxChange("tags", formatTag(selectedOption), true);
        }
      });
    }
    setSelectedTags(selectedOptions);
  };

  const handleKeywordFilter = (e) => {
    setFilterKeyword(e.target.value);
  };

  return (
    <div className="mt-4 p-4  rounded-lg">
      <div className="flex items-center">
        <span className="font-semibold text-gray-600 mr-4">Filter:</span>
        <div className="flex space-x-6 ml-4">
          <div className="relative">
            <select
              multiple
              value={selectedTags}
              onChange={handleTagSelectChange}
              className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option>By Tag</option>
              {tags?.map((tag, index) => (
                <option value={formatTag(tag)} key={index}>
                  {tag}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
              <DownArrowSvg />
            </div>
          </div>
          <div className="relative">
            <select
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
          </div>
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
