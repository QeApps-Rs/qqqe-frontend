import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BackIcon } from "../custIcon/svgIcon";
import FormSubmitHandler from "../FormSubmitHandler";
import { useNavigate } from "react-router-dom";
import Support from "../Support/Support";
import toast from "react-hot-toast";
import Loader from "../../common/Loader";
import NeedHelpPage from "../NeedHelp";

const ProblemStatements = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryParam = searchParams.get("category");

  const [loading, setLoading] = useState(false);
  const [questionData, setQuestionData] = useState({});
  const [visibleItemId, setVisibleItemId] = useState(null);

  const toggleVisibility = (id) => {
    setVisibleItemId((prevId) => (prevId === id ? null : id));
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        await FormSubmitHandler({
          method: "get",
          url: "level1/question/list?category=" + categoryParam,
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
    state_div:
      "lg:mr-2 mr-0 lg:mb-0 mb-2 pb-0.5 font-bold  outline-none transition duration-300 text-gray-800 hover:text-blue-700 focus:text-blue-700",
    badge_div: "inline-flex rounded-full py-1 px-3 text-sm font-medium",
    badge_label:
      "text-white p-2 rounded-md text-[14px] font-medium transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg w-full sm:w-auto animate-badgeHover px-4 py-2 rounded text-white col-span-1",
    span_back_btn:
      "inline-flex items-center gap-x-1 cursor-pointer bg-white border border-gray-300 pt-1.5 pb-1.5 px-3 text-sm rounded-md hover:bg-black hover:text-white transition-colors duration-300",
    priority:
      "text-sm font-medium me-2 px-2.5 py-0.5 rounded bg-gray-700 text-gray-300",
  };

  return (
    <>
      {loading && <Loader />}
      <main className="main-content todo-app w-full px-[var(--margin-x)] pb-8">
        <div className="p-4 rounded-lg bg-white shadow-xl sm:flex sm:items-center sm:justify-between animate-fadeIn">
          <h2 className="text-2xl font-bold text-gray-800 ">
            Identify the Problem
          </h2>
          <span
            onClick={() => navigate(-1)}
            className={`${classObject.span_back_btn} transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg`}
          >
            <BackIcon />
            Back
          </span>
        </div>
        <div className="flex flex-col md:flex-row flex-wrap items-center gap-4 mt-6 animate-fadeIn text-center">
          <span className="p-2 text-justify text-gray-700 w-full md:w-auto">
            Pinpoint the key issues affecting your customers
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 w-full">
            <span className={`bg-blue-500 ${classObject.badge_label} `}>
              Total Suggestions
            </span>
            <span className={`bg-success ${classObject.badge_label} `}>
              Applied Suggestions
            </span>
            <span className={`bg-danger ${classObject.badge_label} `}>
              Pending Suggestions
            </span>
            <span className={`bg-[#637381] ${classObject.badge_label} `}>
              Last Applied Date
            </span>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex flex-wrap gap-4">
            {questionData && questionData.length > 0 ? (
              questionData.map((data) => (
                <div
                  key={data.id}
                  className="w-full md:w-[48%] lg:w-[100%] lg:p-5  p-4 bg-white shadow-md rounded-lg transition-all duration-300 transform hover:bg-zinc-100 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="flex lg:flex-row flex-col h-full lg:items-center items-start flex-wrap ">
                    <div className="w-full flex justify-between">
                      <div className="flex items-center space-x-2">
                        {data?.customerLevel1Version.length > 0 && (
                          <div
                            className="min-w-10 h-10 bg-dashboard_gradient rounded-full flex items-center justify-center cursor-pointer  transition-all duration-300 ease-in-out"
                            onClick={() => toggleVisibility(data.id)}
                          >
                            {visibleItemId === data.id ? (
                              <i
                                className="fa fa-arrow-up text-white"
                                aria-hidden="true"
                              ></i>
                            ) : (
                              <i
                                class="fa fa-arrow-down text-white"
                                aria-hidden="true"
                              ></i>
                            )}
                          </div>
                        )}
                        <Link
                          to={`/suggestion/list/${data.id}`}
                          className="lg:flex items-baseline block"
                        >
                          <div className={classObject.state_div}>
                            {data.problem_statement}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="badge flex space-x-2 rounded-full">
                              <button
                                className={`bg-blue-500 text-white px-2 py-1 rounded-full ${classObject.badge_div}`}
                              >
                                {data.total_suggestions_count}
                              </button>
                              <button
                                className={`bg-success text-white px-2 py-1 rounded-full ${classObject.badge_div}`}
                              >
                                {data.applied_suggestions_count}
                              </button>
                              <button
                                className={`bg-danger text-white px-2 py-1 rounded-full ${classObject.badge_div}`}
                              >
                                {data.pending_suggestions_count}
                              </button>
                              {data.last_applied_date && (
                                <button
                                  className={`bg-graydark  text-white px-2 py-1 rounded-full ${classObject.badge_div}`}
                                >
                                  {data.last_applied_date}
                                </button>
                              )}
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div className="flex items-center lg:justify-normal justify-between lg:w-auto w-full ">
                        <div
                          className={`${
                            classObject.priority
                          } ${getPriorityClass(
                            data.priority
                          )} text-sm font-semibold`}
                        >
                          {data.priority}
                        </div>
                        <div
                          title={data.tooltip_text}
                          className="cursor-pointer"
                        >
                          <i className="fa fa-info-circle text-[19px] text-blue-500"></i>
                        </div>
                      </div>
                    </div>

                    {visibleItemId === data.id && (
                      <div className="w-full ml-9 transition-all duration-500 ease-out transform scale-95 ">
                        {data?.customerLevel1Version.length > 0 &&
                          data.customerLevel1Version.map((version, index) => (
                            <div
                              key={index}
                              className="w-full flex items-center md:w-[48%] lg:w-[100%] lg:p-5 p-4 border border-zinc-300  shadow-md rounded-lg transition-all duration-300 transform hover:shadow-lg hover:-translate-y-1 mt-4"
                            >
                              <div className="flex w-full  items-center space-x-2">
                                <span className="text-md font-medium leading-none mr-2 ">
                                  {version?.problem_statement}
                                </span>

                                <div className="badge flex space-x-2 rounded-full">
                                  <button
                                    className={`bg-blue-500 text-white px-2 py-1 rounded-full ${classObject.badge_div}`}
                                  >
                                    {data.total_suggestions_count}
                                  </button>
                                  <button
                                    className={`bg-success text-white px-2 py-1 rounded-full ${classObject.badge_div}`}
                                  >
                                    {data.applied_suggestions_count}
                                  </button>
                                  <button
                                    className={`bg-danger text-white px-2 py-1 rounded-full ${classObject.badge_div}`}
                                  >
                                    {data.pending_suggestions_count}
                                  </button>
                                  <span className="bg-graydark  text-white px-2 py-1 rounded-full inline-flex rounded-full py-1 px-3 text-sm font-medium">
                                    {version?.created_at}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center lg:justify-normal justify-between lg:w-auto w-full ">
                                <div
                                  className={`${
                                    classObject.priority
                                  } ${getPriorityClass(
                                    data.priority
                                  )} text-sm font-semibold`}
                                >
                                  {data.priority}
                                </div>
                                <div
                                  title={data.tooltip_text}
                                  className="cursor-pointer"
                                >
                                  <i className="fa fa-info-circle text-[19px] text-blue-500"></i>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full text-center text-lg font-semibold text-gray-600">
                No Problem Statement Found.
              </div>
            )}
          </div>
        </div>
          <Support />
      </main>
    </>
  );
};

export default ProblemStatements;
