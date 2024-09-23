import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BackIcon } from "../custIcon/svgIcon";
import FormSubmitHandler from "../FormSubmitHandler";
import { useNavigate } from "react-router-dom";
import Support from "../Support/Support";

const ProblemStatements = () => {

    const navigate = useNavigate()
    const [questionData, setQuestionData] = useState({});
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const resultOfLevelOneQuestionList = await FormSubmitHandler({
                    method: "get",
                    url: "level1/question/list",
                });
                if (resultOfLevelOneQuestionList.data) {
                    setQuestionData(resultOfLevelOneQuestionList.data);
                }
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
        main_div: "col-span-12 mt-4 rounded-sm border border-stroke bg-white px-5 pb-5 pt-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-3.5 xl:col-span-8",
        state_div: "ml-2 border-current pb-0.5 font-medium outline-none transition-colors duration-300 hover:text-primary/70 focus:text-primary/70 dark:text-accent-light dark:hover:text-accent-light/70 dark:focus:text-accent-light/70",
        badge_div: "inline-flex rounded-full py-1 px-3 text-sm font-medium text-white",
        badge_label: "text-white px-[7px] py-[4px] rounded-[4px] text-[14px] font-medium ml-[5px]",
        span_back_btn: "flex items-center gap-x-1 cursor-pointer bg-white border border-gray-300 pt-1.5 pb-1.5 pl-2.5 pr-2.5 text-[15px] rounded-md",
        priority: "text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300",
    }
    return (
        <main className="main-content todo-app w-full px-[var(--margin-x)] pb-8">
            <div className="mb-1 mt-2 p-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between __web-inspector-hide-shortcut__">
                <h2 className="text-lg text-title-md2 font-semibold text-black dark:text-white">
                    Identify the Problem
                </h2>
                <span onClick={() => navigate(-1)} className={classObject.span_back_btn}>
                    <BackIcon />Back
                </span>
            </div>
            <span className="p-2 text-sm text-black mb-3">Pinpoint the key issues affecting your customers</span>
            <span className={`bg-blue-500 ${classObject.badge_label}`}>Total Suggestions</span>
            <span className={`bg-success ${classObject.badge_label}`}>Applied Suggestions</span>
            <span className={`bg-warning ${classObject.badge_label}`}>Pending Suggestions</span>
            <span className={`bg-[#637381] ${classObject.badge_label}`}>Last Applied date</span>

            <div className={classObject.main_div}>
                <div className="flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
                    <div className="card px-4 pt-2 pb-4">
                        {
                            questionData && questionData.length > 0 ? questionData.map((data) => (
                                <div key={data.id} className="border-b border-slate-300  py-3 dark:border-navy-500 cursor-pointer">
                                    <div className="flex items-center space-x-5 sm:space-x-3">
                                        <div className="flex justify-between w-full flex-row space-x-2">
                                            <Link to={`/suggestion/list/${data.id}`}>
                                                <div className="flex items-center justify-center">
                                                    <div className={classObject.state_div}>
                                                        {data.problem_statement}
                                                    </div>
                                                    <div className="badge space-x-2 rounded-full float-right ml-3">
                                                        <div className="flex flex-row p-1 gap-x-[3px] gap-y-0">
                                                            <button className={`ml-3 bg-blue-500 ${classObject.badge_div}`}>
                                                                {data.total_suggestions_count}
                                                            </button>
                                                            <button className={`bg-success ${classObject.badge_div}`}>
                                                                {data.applied_suggestions_count}
                                                            </button>
                                                            <button className={`bg-warning ${classObject.badge_div}`}>
                                                                {data.pending_suggestions_count}
                                                            </button>
                                                            {
                                                                data.last_applied_date && (
                                                                    <button className={`bg-[#637381] ml-2 ${classObject.badge_div}`}>
                                                                        {data.last_applied_date}
                                                                    </button>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                            <div className="ml-auto flex justify-between items-center">
                                                <div className={`${classObject.priority} ${getPriorityClass(data.priority)}`}>
                                                    {data.priority}
                                                </div>
                                                <div title={data.tooltip_text} className="">
                                                    <i className="fa fa-info-circle text-[19px] text-[#6495ED]" aria-hidden="true"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )) : <div>No Problem Statement Found.</div>
                        }
                    </div>
                </div>
            </div>
            <Support />
        </main>
    );
};

export default ProblemStatements;
