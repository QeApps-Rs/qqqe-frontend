/* eslint-disable react/prop-types */
import ChartOne from "../Charts/ChartOne";
import { useNavigate } from "react-router-dom";
import { Tooltip } from 'react-tippy';

const chart = {
    series: [
        {
            name: "Product One",
            data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 45],
        },
        {
            name: "Product Two",
            data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 51],
        },
    ],
    xaxis: {
        type: "category",
        categories: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    yaxis: {
        title: {
            style: {
                fontSize: "0px",
            },
        },
        min: 0,
        max: 100,
    },
};

const SuggestedAnalytics = ({ problemId, suggestionId, discountObj, updatedDiscountObj }) => {
    const navigate = useNavigate();

    const confirmClickEvent = () => {
        navigate(`/template/list/${problemId}s${suggestionId}`);
    };

    return (
        <>
            <main className="main-content todo-app w-full px-[var(--margin-x)]">
                <div className="mb-1 -mt-2 p-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between __web-inspector-hide-shortcut__"></div>
                <p className="mb-4 ml-2 font-medium">{discountObj.description}</p>

                <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
                    <div className="col-span-12 rounded-sm border border-stroke bg-white px-4 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-6">
                        <div className="flex bg-red-300 h-16 items-center space-x-2">
                            <Tooltip
                                title={discountObj.description}
                                position="bottom"
                                trigger="mouseenter"
                            >
                                <p className="text-black font-medium text-sm w-[280px] overflow-hidden inline-block text-ellipsis whitespace-nowrap px-4 sm:px-5">
                                    {discountObj.description}
                                </p>
                            </Tooltip>
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                                Suggested
                            </span>
                        </div>

                        <ChartOne chart={chart} />
                        <div className="ml-5">
                            <div className="mt-1 text-sm text-black max-md:mt-10 max-md:max-w-full">
                                Increase in product interaction by 4%
                            </div>
                            <div className="mt-1 text-sm leading-6 text-black max-md:max-w-full">
                                Increase in session by 6%
                            </div>
                            <div className="mt-1 text-sm leading-6 text-black max-md:max-w-full">
                                Increase in product revenue by 7%
                            </div>
                            <div className="text-center">
                                <button
                                    onClick={() => confirmClickEvent()}
                                    type="button"
                                    className="justify-center mt-4 rounded bg-primary px-6 py-2 text-sm text-gray hover:bg-opacity-90"
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* =============================Sencond Graph ========================== */}
                    <div className="col-span-12 rounded-sm border border-stroke bg-white px-4 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-6">
                        <div className="flex bg-green-300 h-17 items-center">
                            <Tooltip
                                title={updatedDiscountObj.description}
                                position="bottom"
                                trigger="mouseenter"
                            >
                                <p className="text-black font-medium text-sm w-[280px] overflow-hidden inline-block text-ellipsis whitespace-nowrap px-4 sm:px-5">
                                    {updatedDiscountObj.description}
                                </p>
                            </Tooltip>
                            <span className="bg-blue-100 text-blue-800 text-xs  font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                                Customized
                            </span>
                        </div>

                        <ChartOne chart={chart} />
                        <div className="ml-5">
                            <div className="mt-1 text-sm text-black max-md:mt-10 max-md:max-w-full">
                                Increase the revenue by 5%
                            </div>
                            <div className="mt-1 text-sm leading-6 text-black max-md:max-w-full">
                                Increase in customer retantion rate by 3%
                            </div>
                            <div className="mt-1 text-sm leading-6 text-black max-md:max-w-full">
                                Increase in revenue in women category by 10%
                            </div>

                            <div className="text-center">
                                <button
                                    onClick={() => confirmClickEvent()}
                                    type="button"
                                    className="justify-center mt-4 rounded bg-primary px-6 py-2 text-sm text-gray hover:bg-opacity-90"
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default SuggestedAnalytics;
