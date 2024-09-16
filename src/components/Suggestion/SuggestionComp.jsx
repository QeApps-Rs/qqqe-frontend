import { useEffect, useState } from "react";
import "react-tippy/dist/tippy.css";

import Modal from "../higherOrderComponent/Model/model";
import SuggestedAnalytics from "./SuggestedAnalytics";
import FormSubmitHandler from "../FormSubmitHandler";
import { useNavigate, useParams } from "react-router-dom";
import { BackIcon } from "../custIcon/svgIcon";
import Support from "../Support/Support";

const SuggestionComp = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isShowAnalyticsModal, setAnalyticsModal] = useState(false);
    const [problemStatement, setProblemStatement] = useState({});
    const [expandedRows, setExpandedRows] = useState({});
    const [selectedOptions, setSelectedOptions] = useState({});
    const [settingContent, setSettingContent] = useState("");
    const [suggestionId, setSuggestionId] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const result = await FormSubmitHandler({
                    method: "get",
                    url: `level2/suggestion/${id}`,
                });
                if (result.data) {
                    console.log("result data ", result.data);
                    setProblemStatement(result.data);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    const toggleModal = (content) => {
        setSettingContent(content);
        setIsModalOpen(true);
    };

    const onModalClose = () => {
        if (isModalOpen) setIsModalOpen(false);
        if (isShowAnalyticsModal) setAnalyticsModal(false);
    };

    const confirmClickEvent = () => {
        setAnalyticsModal(true);
        setIsModalOpen(false);
    };

    const toggleCollapse = (rowId) => {
        setExpandedRows((prevExpandedRows) => {
            const newExpandedRows = Object.keys(prevExpandedRows).reduce(
                (acc, key) => {
                    acc[key] = false;
                    return acc;
                },
                {}
            );
            newExpandedRows[rowId] = !prevExpandedRows[rowId];
            return newExpandedRows;
        });
    };

    const handleRadioChange = (rowId, option) => {
        setSelectedOptions((prevSelectedOptions) => ({
            ...prevSelectedOptions,
            [rowId]: option,
        }));
    };

    const AccordionsIcon = ({ rotate, onClick }) => (
        <span onClick={onClick}>{rotate ? "▲" : "▼"}</span>
    );

    const SettingIcon = ({ onClick }) => (
        <span onClick={onClick} className="cursor-pointer">
            ⚙️
        </span>
    );

    useEffect(() => {
        const initialOptions = {};
        const initialCollapseOptions = {};

        problemStatement.tblLevel2 &&
            problemStatement.tblLevel2.forEach((statement) => {
                statement.suggestion?.suggestions.forEach((_, index) => {
                    initialOptions[`${statement.id}-${index}`] = "Product";
                    initialCollapseOptions[`${statement.id}-${index}`] = false;
                });
            });

        setSelectedOptions(initialOptions);
        setExpandedRows(initialCollapseOptions);
    }, [problemStatement]);

    const renderProductCustomerLabelTd = (rowId) => {
        return ["Product", "Customer"].map((option) => (
            <label
                key={option}
                className={`${selectedOptions[rowId] === option ? "bg-slate-300" : ""} rounded`}
            >
                <input
                    type="radio"
                    name={`option-${rowId}`}
                    value={option}
                    checked={selectedOptions[rowId] === option}
                    onChange={() =>
                        handleRadioChange(rowId, option)
                    }
                    className="hidden"
                />
                <div
                    className={`px-4 py-2 rounded-md cursor-pointer ${selectedOptions[rowId] === option
                        ? "bg-gray-400"
                        : "bg-gray-200"
                        }`}
                >
                    {option == 'Product' ? 'Product List' : 'Customer List'}
                </div>
            </label>
        ));
    }

    const renderPrblmStmtTd = (rowId, suggestion) => {
        return <>
            <button
                type="button"
                className="hover:text-primary mr-4"
                aria-label="Toggle details"
                onClick={() => toggleCollapse(rowId)}
            >
                <AccordionsIcon rotate={expandedRows[rowId]} />
            </button>
            <p className="text-black dark:text-white ml-5">
                {suggestion.suggestion}
            </p>
        </>;
    }

    const renderStatusTd = (statement) => {
        return <span className={`${statement.is_applied
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
            } text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300`}
        >
            {statement.is_applied ? "Applied" : "Not Applied"}
        </span>
    }

    const renderActionTd = (suggestion, statement) => {
        return <div className="flex align-center">
            <div title="Configuration" className={`ml-2 ${statement.is_applied ? "pointer-events-none opacity-50 cursor-not-allowed" : ""}`} data-id={statement.id}>
                <SettingIcon
                    onClick={() => {
                        toggleModal(suggestion.suggestion);
                        setSuggestionId(statement.id);
                    }}
                />
            </div>
        </div>;
    }

    const labelClass = "text-xs w-20 bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100";
    const titleClass = "mb-1 -mt-2 p-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between __web-inspector-hide-shortcut__";
    const backBtnClass = "flex items-center gap-x-1 cursor-pointer bg-white border border-gray-300 pt-1.5 pb-1.5 pl-2.5 pr-2.5 text-[15px] rounded-md";
    const prblmStmtClass = "rounded-sm border mt-4 border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1";
    const lblHeaderClass = "px-4 py-4 font-medium text-black dark:text-white";
    const comTdClass = "border-b border-[#eee] dark:border-strokedark";

    return (
        <>
            <div>
                <div className={titleClass}>
                    <h2 className="text-lg text-title-md2 font-semibold text-black dark:text-white">
                        Discover the Solution
                    </h2>
                    <span onClick={() => navigate(-1)} className={backBtnClass} >
                        <BackIcon /> Back
                    </span>
                </div>
                <span className="p-2 text-sm text-black mb-3">
                    Find effective strategies to solve these challenges.
                </span>

                <div className={prblmStmtClass}>
                    <p className="text-md text-lg font-bold text-gray-900 leading-relaxed mb-2">
                        {problemStatement.problem_statement}
                    </p>
                    <div className="max-w-full overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                    <th className={`min-w-[120px] ${lblHeaderClass}`}>
                                        Suggestions
                                    </th>
                                    <th className={`text-left ${lblHeaderClass}`}>
                                        Status
                                    </th>
                                    <th className={`${lblHeaderClass}`}>
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {problemStatement.tblLevel2 &&
                                    problemStatement.tblLevel2.map((statement) =>
                                        statement.suggestion?.suggestions.map(
                                            (suggestion, index) => {
                                                const rowId = `${statement.id}-${index}`;
                                                return (
                                                    <>
                                                        <tr key={rowId + 1}>
                                                            <td className={`flex px-4 py-5 ${comTdClass}`}>
                                                                {renderPrblmStmtTd(rowId, suggestion)}
                                                            </td>
                                                            {/* 
                                                            <td>
                                                                <div className="flex space-x-2">
                                                                    {renderProductCustomerLabelTd(rowId)}
                                                                </div>
                                                            </td> */}

                                                            <td aria-label="suggestions" className={`${comTdClass}`}>
                                                                {renderStatusTd(statement)}
                                                            </td>

                                                            <td aria-label="suggestions" className={`${comTdClass} px-4 py-5`}>
                                                                {renderActionTd(suggestion, statement)}
                                                            </td>
                                                        </tr>
                                                        {selectedOptions[rowId] === "Product" &&
                                                            expandedRows[rowId] == true && (
                                                                <tr
                                                                    key={rowId + 2}
                                                                    className="border-y border-transparent border-b-slate-200 dark:border-b-navy-500"
                                                                >
                                                                    <td
                                                                        className="p-0"
                                                                        colSpan={8}
                                                                        aria-label="Column header"
                                                                    >
                                                                        <div
                                                                            className={`w-full transition-all duration-300 ease-in-out ${expandedRows[rowId] != true
                                                                                ? "h-0 opacity-0"
                                                                                : "h-auto opacity-100"
                                                                                }`}
                                                                        >
                                                                            <div className="relative mx-auto my-4 flex w-full flex-col bg-clip-border text-gray-700 ">
                                                                                <table className="is-hoverable">
                                                                                    <thead>
                                                                                        <tr
                                                                                            className=""
                                                                                            aria-label="Column header"
                                                                                        >
                                                                                            <th
                                                                                                aria-label="Column header"
                                                                                                className="w-5 rounded-tl-lg bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5"
                                                                                            />
                                                                                            <th className="text-xs  bg-slate-200 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100">
                                                                                                Product Name
                                                                                            </th>

                                                                                            <th className={labelClass}>
                                                                                                Actual Product price($)
                                                                                            </th>
                                                                                            <th className={labelClass}>
                                                                                                Discounted product price (20%)
                                                                                            </th>
                                                                                            <th
                                                                                                aria-label="Column header"
                                                                                                className="bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5"
                                                                                            />
                                                                                            <th
                                                                                                aria-label="Column header"
                                                                                                className="rounded-tr-lg bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5"
                                                                                            />
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody>
                                                                                        <tr
                                                                                            className=""
                                                                                            aria-label="Column header"
                                                                                        >
                                                                                            <td
                                                                                                className="whitespace-nowrap px-4 py-3 sm:px-5 size-16 flex items-center"
                                                                                                aria-label="Column header"
                                                                                            >
                                                                                                <div className="avatar h-8 w-8 ">
                                                                                                    <div className="is-initial bg-slate-200 text-xs uppercase text-white ring ring-white dark:bg-navy-500 dark:ring-navy-700 flex items-center justify-center">
                                                                                                        <svg
                                                                                                            className="h-6 w-6 text-blue-700"
                                                                                                            viewBox="0 0 24 24"
                                                                                                            fill="none"
                                                                                                            stroke="currentColor"
                                                                                                            strokeWidth="2"
                                                                                                            strokeLinecap="round"
                                                                                                            strokeLinejoin="round"
                                                                                                        >
                                                                                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                                                                                            <circle
                                                                                                                cx="12"
                                                                                                                cy="7"
                                                                                                                r="4"
                                                                                                            />
                                                                                                        </svg>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </td>
                                                                                            <td className="whitespace-nowrap px-4 py-3 sm:px-5 w-[450px]">
                                                                                                {suggestion.product_name}
                                                                                            </td>
                                                                                            <td className="whitespace-nowrap px-4 py-2 my-5 sm:px-5">
                                                                                                <div className="border border-slate-400 px-3 py-2">
                                                                                                    {suggestion.product_price}
                                                                                                </div>
                                                                                            </td>
                                                                                            <td
                                                                                                className="whitespace-nowrap px-4 py-3 sm:px-5"
                                                                                                aria-label="Column header"
                                                                                            >
                                                                                                <div className="border border-slate-400 px-3 py-2">
                                                                                                    {
                                                                                                        suggestion.product_discounted_price
                                                                                                    }
                                                                                                </div>
                                                                                            </td>
                                                                                            <td
                                                                                                aria-label="Column header"
                                                                                                className="whitespace-nowrap px-4 py-3 sm:px-5"
                                                                                            />
                                                                                            <td
                                                                                                aria-label="Column header"
                                                                                                className="whitespace-nowrap px-4 py-3 sm:px-5"
                                                                                            />
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )}
                                                        {selectedOptions[rowId] === "Customer" &&
                                                            expandedRows[rowId] == true && (
                                                                <tr
                                                                    key={rowId + 3}
                                                                    className="border-y border-transparent border-b-slate-200 dark:border-b-navy-500"
                                                                >
                                                                    <td
                                                                        className="p-0"
                                                                        colSpan={8}
                                                                        aria-label="Column header"
                                                                    >
                                                                        <div
                                                                            className={`w-full transition-all duration-300 ease-in-out ${expandedRows[rowId] != true
                                                                                ? "h-0 opacity-0"
                                                                                : "h-auto opacity-100"
                                                                                }`}
                                                                        >
                                                                            <div className="relative mx-auto my-4 flex w-full flex-col bg-clip-border text-gray-700 ">
                                                                                <table className="is-hoverable">
                                                                                    <thead>
                                                                                        <tr
                                                                                            className=""
                                                                                            aria-label="Column header"
                                                                                        >
                                                                                            <th className={labelClass}>
                                                                                                User Name
                                                                                            </th>
                                                                                            <th className={labelClass}>
                                                                                                User Email
                                                                                            </th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody>
                                                                                        <tr
                                                                                            className=""
                                                                                            aria-label="Column header"
                                                                                        >
                                                                                            <td className="whitespace-nowrap px-4 py-2 my-5 sm:px-5 text-center">
                                                                                                {suggestion.user_name}
                                                                                            </td>
                                                                                            <td className="whitespace-nowrap px-4 py-2 my-5 sm:px-5 text-center">
                                                                                                {suggestion.user_email}
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )}
                                                    </>
                                                );
                                            }
                                        )
                                    )}
                            </tbody>
                        </table>
                    </div>

                    {isModalOpen && (
                        <Modal
                            isOpen={isModalOpen}
                            onClose={() => onModalClose()}
                            onClickInChild={confirmClickEvent}
                            body={
                                <div className="mt-4">
                                    <p className="mb-4">{settingContent}</p>
                                </div>
                            }
                            btnClose="Discard"
                            btnSubmit="Confirm"
                            mdlTitle="Please confirm the changes"
                            showFooter={true}
                            isAnalytics={false}
                        />
                    )}

                    {isShowAnalyticsModal && (
                        <Modal
                            isOpen={isShowAnalyticsModal}
                            onClose={() => onModalClose()}
                            onClickInChild={confirmClickEvent}
                            body={
                                <>
                                    <SuggestedAnalytics problemId={id} suggestionId={suggestionId} content={settingContent} />
                                </>
                            }
                            btnClose="Discard"
                            btnSubmit="Confirm"
                            mdlTitle="Action Prompts"
                            showFooter={false}
                            isAnalytics={true}
                        />
                    )}
                </div>

                <Support />
            </div>
        </>
    );
};
export default SuggestionComp;
