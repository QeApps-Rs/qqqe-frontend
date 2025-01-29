import { useEffect, useState } from "react";
import activityLogImg from "../images/change-log-img.jpg";
import toast from "react-hot-toast";
import Loader from "../common/Loader";
import FormSubmitHandler from "../components/FormSubmitHandler";
import noDataAnimationIcon from "../images/no-data.png";

const ActivityLog = () => {
  const [loading, setLoading] = useState(false);
  const [stepsData, setStepsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchActivityLogs = async () => {
      try {
        setLoading(true);
        await FormSubmitHandler({
          method: "get",
          url: `activity/log/list`,
        })
          .then((res) => {
            if (res.data.length > 0) {
              setStepsData(res.data);
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

    fetchActivityLogs();
  }, []);

  // Step 2: Group data by date
  const groupedByDate = stepsData.reduce((acc, step) => {
    if (!acc[step.date]) {
      acc[step.date] = [];
    }
    acc[step.date].push(step);
    return acc;
  }, {});

  let groupedData = Object.entries(groupedByDate).map(([date, items]) => ({
    date,
    items,
  }));

  // Step 3: Pagination logic based on grouped data
  groupedData = groupedData.slice(0, 5);
  const totalPages = groupedData.length;

  const paginatedData = groupedData[currentPage - 1] || { date: "", items: [] };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="block ">
        <div className="w-full bg-activity_log_bg_gradient flex justify-between items-center shadow-[0_0_11px_#ccc]">
          <div className="block sm:pl-10 sm:p-0 p-4">
            <h1 className="text-3xl font-bold text-whiter">Activity Log</h1>
          </div>
          <img src={activityLogImg} alt="" className="w-60 sm:block hidden" />
        </div>
        <div className="grid grid-cols-1  sm:grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5 mt-10 ">
          <div className="lg:col-span-9 md:col-span-8 sm:col-span-7 col-span-12 p-6 rounded-lg">
            {paginatedData?.items.map((step, index) => (
              <div key={index} className="flex w-full mb-6">
                <div className="w-1/6 ">
                  {index === 0 && (
                    <span className="text-gray-600 text-md font-semibold uppercase break-words">
                      {paginatedData.date}
                    </span>
                  )}
                </div>
                <div className="relative flex flex-col items-center">
                  <div className="w-6 h-6 flex items-center justify-center rounded-full bg-custom_gradient shadow-md">
                    <div className="w-3 h-3 rounded-full border-2 border-white bg-white"></div>
                  </div>
                  {index !== paginatedData.length - 1 && (
                    <div className="absolute top-6 w-px h-full bg-cyan-950"></div>
                  )}
                </div>
                <div className="w-3/4 pl-4">
                  {/* Title */}
                  <h3 className="font-extrabold text-lg text-gray-800 mb-6 tracking-wide uppercase">
                    {step.title}
                  </h3>

                  {/* Suggestions List */}
                  <ul className="space-y-4">
                    {step?.suggestions?.length > 0 &&
                      step?.suggestions?.map((suggestion, index) => (
                        <li
                          key={index}
                          className="relative text-gray-800 text-base bg-gradient-to-br from-gray-50 to-gray-200 shadow-lg border-l-4
                           border-blue-700 min-h-[40px] rounded-lg flex items-center font-semibold px-6 py-4 
                           before:content-[''] before:absolute before:inset-0 before:-z-10 
                           before:rounded-lg before:bg-gradient-to-r before:from-indigo-100 before:via-blue-200 before:to-purple-200 
                           before:opacity-10 hover:before:opacity-30"
                        >
                          {suggestion?.title}
                        </li>
                      ))}
                  </ul>

                  {/* Change Log Type Badge */}
                  <span
                    className={`inline-block py-2 px-6 rounded-full font-bold text-sm text-whiten mt-8 shadow-md  ${
                      step.activity_log_type === "Improvement"
                        ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-500 hover:to-green-700"
                        : step.activity_log_type === "Feature"
                        ? "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700"
                        : "bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-500 hover:to-teal-700"
                    }`}
                  >
                    {step.activity_log_type}
                  </span>
                </div>
              </div>
            ))}
            {paginatedData?.items?.length === 0 && (
              <div className="w-full justify-center flex items-center h-full">
                <img
                  src={noDataAnimationIcon}
                  alt="no data"
                  style={{ width: "400px", height: "auto" }}
                />
              </div>
            )}

            <div className="flex justify-center mt-4 mb-20 ">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`py-1 px-3 mx-1 rounded font-semibold ${
                    currentPage === i + 1
                      ? "bg-custom_gradient text-white"
                      : "bg-gray-300"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActivityLog;
