import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BackIcon } from "../custIcon/svgIcon";
import FormSubmitHandler from "../FormSubmitHandler";
import { useNavigate } from "react-router-dom";
import Support from "../Support/Support";
import toast from "react-hot-toast";
import Loader from "../../common/Loader";
import NeedHelpPage from "../NeedHelp";

const ProblemStatements = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [questionData, setQuestionData] = useState({});
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        await FormSubmitHandler({
          method: "get",
          url: "level1/question/list",
        })
          .then((res) => {
            if (res.data) {
              setQuestionData(res.data);
            }
          })
          .catch((err) => {
            toast.error(err.message);
          })
          .finally(() => {
            setLoading(false);
          });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const getPriorityClass = (priority) => {
    const priorityClasses = {
      Critical: "bg-red-100 text-red-800",
      Average: "bg-green-100 text-green-800",
      Minor: "bg-yellow-100 text-yellow-800",
    };

    return priorityClasses[priority] || "bg-gray-100 text-gray-800";
  };

  const classObject = {
    main_div: "col-span-12 px-10 xl:col-span-8 mt-8",
    state_div:
      "ml-2 border-current pb-0.5 font-medium outline-none transition-colors duration-300 text-[#282b31] hover:text-blue-700 focus:text-blue-700 ",
    badge_div:
      "inline-flex rounded-full py-1 px-3 text-sm font-medium text-white",
    badge_label:
      "text-white p-2 rounded-[4px] text-[14px] font-medium ml-4",
    span_back_btn:
      "flex items-center gap-x-1 cursor-pointer bg-white border border-gray-300 pt-1.5 pb-1.5 pl-2.5 pr-2.5 text-[15px] rounded-md hover:bg-black hover:text-white transition-colors duration-300",
    priority:
      "text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300",
  };
  return (
    <>
      {loading && <Loader />}
      <main className="main-content todo-app w-full px-[var(--margin-x)] pb-8">
        <div className="mb-1 mt-2 p-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between __web-inspector-hide-shortcut__">
          <h2 className="text-3xl font-bold text-black">
            Identify the Problem
          </h2>
          <span
            onClick={() => navigate(-1)}
            className={classObject.span_back_btn}
          >
            <BackIcon />
            Back
          </span>
        </div>
        <div className="flex items-center">
          <span className="p-2 text-md text-black">
            Pinpoint the key issues affecting your customers
          </span>
          <span className={`bg-blue-500 ${classObject.badge_label}`}>
            Total Suggestions
          </span>
          <span className={`bg-success ${classObject.badge_label}`}>
            Applied Suggestions
          </span>
          <span className={`bg-danger ${classObject.badge_label}`}>
            Pending Suggestions
          </span>
          <span className={`bg-[#637381] ${classObject.badge_label}`}>
            Last Applied date
          </span>
        </div>
        <div className={classObject.main_div}>
          <div className="flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
            <div className="">
              {questionData && questionData.length > 0 ? (
                questionData.map((data) => (
                  <div
                    key={data.id}
                    className="p-4 bg-white shadow-sm rounded-lg mb-6 hover:bg-zinc-200 hover:shadow-lg  hover:-translate-x-1 hover:-translate-y-1 transition duration-300"
                  >
                    <div className="flex items-center space-x-5 sm:space-x-3">
                      <div className="flex justify-between w-full flex-row space-x-2">
                        <Link to={`/suggestion/list/${data.id}`}>
                          <div className="flex items-center justify-center">
                            <div className={classObject.state_div}>
                              {data.problem_statement}
                            </div>
                            <div className="badge space-x-2 rounded-full float-right ml-3">
                              <div className="flex flex-row p-1 gap-x-[3px] gap-y-0">
                                <button
                                  className={`ml-3 bg-blue-500 ${classObject.badge_div}`}
                                >
                                  {data.total_suggestions_count}
                                </button>
                                <button
                                  className={`bg-success ${classObject.badge_div}`}
                                >
                                  {data.applied_suggestions_count}
                                </button>
                                <button
                                  className={`bg-danger ${classObject.badge_div}`}
                                >
                                  {data.pending_suggestions_count}
                                </button>
                                {data.last_applied_date && (
                                  <button
                                    className={`bg-[#637381] ml-2 ${classObject.badge_div}`}
                                  >
                                    {data.last_applied_date}
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </Link>
                        <div className="ml-auto flex justify-between items-center">
                          <div
                            className={`${
                              classObject.priority
                            } ${getPriorityClass(data.priority)}`}
                          >
                            {data.priority}
                          </div>
                          <div
                            title={data.tooltip_text}
                            className="cursor-pointer"
                          >
                            <i
                              className="fa fa-info-circle text-[19px] text-[#6495ED]"
                              aria-hidden="true"
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div>No Problem Statement Found.</div>
              )}
            </div>
          </div>
        </div>
        <div className="my-20">
          <Support />
        </div>
        <NeedHelpPage />
      </main>
    </>
  );
};

export default ProblemStatements;
