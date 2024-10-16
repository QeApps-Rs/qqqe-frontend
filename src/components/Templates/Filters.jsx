/* eslint-disable react/prop-types */
import DownArrowSvg from "../../images/svg-icons/downArrowSvg";

const FilterBar = ({ keywords, setFilterKeyword }) => {
  const handleKeywordFilter = (e) => {
    setFilterKeyword(e.target.value);
  };
  return (
    <div className="mt-4 p-4  rounded-lg">
      <div className="flex items-center">
        <span className="font-semibold text-gray-600 mr-4">Filter:</span>
        <div className="flex space-x-6 ml-4">
          <div className="relative">
            <select className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
              <option>By Difficulty</option>
              <option>Easy</option>
              <option>Intermediate</option>
              <option>Advance</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
              <DownArrowSvg />
            </div>
          </div>
          <div className="relative">
            <select className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
              <option>By Industry</option>
              <option>Ecommerce</option>
              <option>Saas</option>
              <option>Service</option>
              <option>Media</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
              <DownArrowSvg />
            </div>
          </div>
          <div className="relative">
            <select className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
              <option>By Goal</option>
              <option>Build your list</option>
              <option>Boost conversions</option>
              <option>Increase sales</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
              <DownArrowSvg />
            </div>
          </div>
          <div className="relative">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
