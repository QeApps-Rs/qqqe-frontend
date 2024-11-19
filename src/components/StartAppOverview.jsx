/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import BookSlotModal from "./BookSlot";
import { useState } from "react";


const StartAppOverviewPage = ({ title, url, priorityCount }) => {
  const [showIframe, setShowIframe] = useState(false);

const handlePageClick = () => {
  setShowIframe(true);
};
const handleClosePageClick = () => {
  setShowIframe(false);
};

const classObject = {
  priorityTag:
    "flex items-center text-sm font-semibold py-2 px-4 rounded-lg shadow transition-all duration-300",
  button:
    "w-full sm:w-auto font-bold h-[40px] px-4 bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 transition-colors duration-300 hover:shadow-xl transform hover:scale-105",
};
  return (
    <>
      <div className="bg-white rounded-lg shadow-lg px-6 py-4 animate-fadeIn">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <Link to={url} state={{ priorityCount: priorityCount }}>
            <h1 className="flex items-center text-2xl sm:text-4xl leading-normal font-bold text-black hover:text-blue-700 transition-colors duration-300 transform hover:scale-105">
              <i className="mr-3 fa fa-home bg-blue-600 hover:bg-blue-500 text-white p-1 rounded-full h-8 w-8 flex items-center justify-center text-lg"></i>
              {title}
            </h1>
          </Link>
          <span className="text-center sm:text-left text-sm font-bold py-2 px-4 rounded-full bg-green-700 text-white w-fit">
            {priorityCount?.count || 0} Suggestions
          </span>
        </div>

        <p className="text-md font-medium text-black leading-relaxed mt-3 ">
          Analyze customer data, including demographics. We provide insights on
          various aspects to help you understand your audience better.
        </p>

        <div className="flex flex-col sm:flex-row mt-6 sm:space-x-3 space-y-3 sm:space-y-0">
          <span
            className={`${classObject.priorityTag} bg-red-200 text-red-800 hover:bg-red-300`}
          >
            <i className="fa fa-exclamation-circle mr-2"></i> Critical{" "}
            {priorityCount?.critical || 0}
          </span>
          <span
            className={`${classObject.priorityTag} bg-yellow-200 text-yellow-800 hover:bg-yellow-300`}
          >
            <i className="fa fa-exclamation-triangle mr-2"></i> Minor{" "}
            {priorityCount?.minor || 0}
          </span>
          <span
            className={`${classObject.priorityTag} bg-green-200 text-green-800 hover:bg-green-300`}
          >
            <i className="fa fa-check-circle mr-2"></i> Average{" "}
            {priorityCount?.average || 0}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center mt-6 gap-4">
          <Link
            to={url}
            state={{ priorityCount: priorityCount }}
            className="w-full sm:w-auto"
          >
            <button className={classObject.button}>
              <i
                className="mr-2 fa fa-lg fa-external-link-square"
                aria-hidden="true"
              ></i>
              Get Started
            </button>
          </Link>

          <button className={classObject.button} onClick={handlePageClick}>
            <i className="fa fa-headphones mr-2 text-xl" aria-hidden="true"></i>
            Talk to our Expert
          </button>
        </div>
      </div>
      {showIframe ? (
        <BookSlotModal
          showModal={showIframe}
          handleClosePageClick={handleClosePageClick}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default StartAppOverviewPage;
