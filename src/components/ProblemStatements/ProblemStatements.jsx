import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { InfoIcon } from "../custIcon/svgIcon";
import FormSubmitHandler from "../FormSubmitHandler";

const ProblemStatements = () => {
  const [questionData, setQuestionData] = useState({});
  const getBadgeBackgroundClass = (priority) => {
    const priorityBackgroundClasses = {
      Critical: "bg-red-100 text-red-800",
      Average: "bg-green-100 text-green-800",
      Minor: "bg-yellow-100 text-yellow-800",
      default: "bg-gray-100 text-gray-800", // default case if none of the above
    };

    return (
      priorityBackgroundClasses[priority] || priorityBackgroundClasses.default
    );
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const resultOfLevelOneQuestionList = await FormSubmitHandler({
          method: "get",
          url: "level1/question/list",
        });
        // console.log(
        //   "resultOfLevelOneQuestionList",
        //   resultOfLevelOneQuestionList
        // );
        if (resultOfLevelOneQuestionList.data) {
          setQuestionData(resultOfLevelOneQuestionList.data);
          const responseData = resultOfLevelOneQuestionList.data;
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
  return (
    <main className="main-content todo-app w-full px-[var(--margin-x)] pb-8">
      <div className="mb-1 -mt-2 p-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between __web-inspector-hide-shortcut__">
        <h2 className="text-lg text-title-md2 font-semibold text-black dark:text-white">
          Level 1: App Intelligence (people)
        </h2>
      </div>

      <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
        <div className="flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
          <div className="card px-4 pt-2 pb-4">
            {questionData && questionData.length > 0
              ? questionData.map((data) => (
                  <div
                    key={data.id} // Use a unique identifier from the data instead of index
                    className="border-b border-slate-150 py-3 dark:border-navy-500 cursor-pointer"
                  >
                    <div className="flex items-center space-x-5 sm:space-x-3">
                      <div className="flex justify-between w-full flex-row space-x-2">
                        <Link to="/suggestion/list/2">
                          <div className="ml-2 border-current pb-0.5 font-medium outline-none transition-colors duration-300 hover:text-primary/70 focus:text-primary/70 dark:text-accent-light dark:hover:text-accent-light/70 dark:focus:text-accent-light/70">
                            {data.problem_statement}
                          </div>
                        </Link>
                        <div className="ml-auto flex justify-between items-center">
                          <div
                            className={`text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 ${
                              data.priority === "Critical"
                                ? "bg-red-100 text-red-800"
                                : data.priority === "Average"
                                ? "bg-green-100 text-green-800"
                                : data.priority === "Minor"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {data.priority}
                          </div>
                          <div
                            title="35% of customer abandoned cart in last year."
                            className=""
                          >
                            <InfoIcon />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : ""}
          </div>
        </div>

        <div />
      </div>
    </main>
  );
};

export default ProblemStatements;
