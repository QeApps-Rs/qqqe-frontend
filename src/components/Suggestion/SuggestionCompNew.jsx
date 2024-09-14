import { useEffect, useState } from "react";
import "react-tippy/dist/tippy.css";

import Modal from "../higherOrderComponent/Model/model";
import SuggestedAnalytics from "./SuggestedAnalytics";
import FormSubmitHandler from "../FormSubmitHandler";
import { useNavigate, useParams } from "react-router-dom";
import { BackIcon } from "../custIcon/svgIcon";
import Support from "../Support/Support";
import AccordionIconSvg from "../../images/svg-icons/AccordionIcon";
import UserOne from '../../images/user/user-01.png';

const SuggestionCompNew = () => {
    const navigate = useNavigate();
    const defaultAccordionState = {
        icon: '',
        content: 'block',
    };

    const collapsedAccordionState = {
        icon: 'rotate-180',
        content: 'hidden',
    };

    const activeTabObj = {
        'active_tab': 'border-primary',
        'active_tab_body': 'block'
    }

    const hiddenTabObj = {
        'active_tab': 'border-transparent',
        'active_tab_body': 'hidden'
    }

    const dummyData = {
        "id": 1,
        "master_tbl_level1_id": 4,
        "problem_statement": "2 premium customers have not purchased in 30 days.",
        "tblLevel2": [
            {
                "id": 1,
                "description": "Offer these premium customers 24 hours time-limited buy-one-get-one deal or bundle discounts of 10% on their favorite products.",
                "data": [
                    {
                        "Customer_ID": 8274700009821,
                        "Products": [
                            7412513669286
                        ]
                    },
                    {
                        "Customer_ID": 8307147637085,
                        "Products": [
                            5846695379110,
                            6769581654182
                        ]
                    }
                ],
                "is_applied": false
            },
            {
                "id": 2,
                "description": "Launch a win-back email campaign with customized offers (BOGO, 10% off, Free shipping) based on purchased history.",
                "data": [
                    {
                        "Customer_ID": 8274700009821,
                        "Products": [
                            8676385849693
                        ]
                    },
                    {
                        "Customer_ID": 8307147637085,
                        "Products": [
                            8676385849693
                        ]
                    }
                ],
                "is_applied": true
            },
            {
                "id": 3,
                "description": "Offer a cross-sell opportunity on these complementary products that align with their needs and preferences for 1 premium customers.",
                "data": [
                    {
                        "Customer_ID": 8307147637085,
                        "Products": [
                            6793129689254,
                            5864535523494,
                            5948189540518,
                            8450889089373
                        ]
                    }
                ],
                "is_applied": false
            }
        ]
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isShowAnalyticsModal, setAnalyticsModal] = useState(false);

    // const [problemStatement, setProblemStatement] = useState({});
    const [problemStatement, setProblemStatement] = useState(dummyData);
    const [settingContent, setSettingContent] = useState("");
    const [suggestionId, setSuggestionId] = useState(null);
    const [manageAccordions, setManageAccordions] = useState([]);
    const [accordionTab, setAccordionTab] = useState({
        'customer': activeTabObj,
        'product': hiddenTabObj
    });
    const { id } = useParams();

    useEffect(() => {
        if (problemStatement && problemStatement?.tblLevel2?.length > 0) {
            const initialAccordions = problemStatement?.tblLevel2?.map(() => ({
                icon: 'rotate-180',
                content: 'hidden',
            }));
            setManageAccordions(initialAccordions);
        }
    }, [problemStatement]);

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

    const SettingIcon = ({ onClick }) => (
        <span onClick={onClick} className="cursor-pointer">⚙️</span>
    );

    const handleAccordionTab = (type) => {
        if (type == 'customer') {
            setAccordionTab({
                'customer': activeTabObj,
                'product': hiddenTabObj
            });
        } else {
            setAccordionTab({
                'customer': hiddenTabObj,
                'product': activeTabObj
            });
        }
    }

    const renderPrblmStmtTd = (index, suggestion) => {
        return <>
            <div className="rounded-md border border-stroke p-4 shadow-9 dark:border-strokedark dark:shadow-none w-full">
                <button className="flex w-full items-center gap-1.5 sm:gap-3 xl:gap-6 active" onClick={() => handleAccordionClick(index)}>
                    <div className="flex h-10.5 w-full max-w-10.5 items-center justify-center rounded-md bg-[#F3F5FC] dark:bg-meta-4">
                        {/* <AccordionIconSvg classRotate={isDisplayAccordionIcon} /> */}
                        <AccordionIconSvg classRotate={manageAccordions?.[index]?.icon} />
                    </div>
                    <div>
                        <h4 className="text-left font-medium text-black dark:text-white text-base">
                            {suggestion}
                        </h4>
                    </div>
                </button>
                {/* <div className={`mt-5 ml-16.5 duration-200 ease-in-out ${isDisplayAccordionContent}`}> */}
                <div className={`mt-5 ml-16.5 duration-200 ease-in-out ${manageAccordions?.[index]?.content}`}>
                    <div className="rounded-sm">
                        <div className="mb-6 flex flex-wrap gap-5 border-b border-stroke dark:border-strokedark sm:gap-10">
                            <a className={`${accordionTabClass} ${accordionTab?.customer?.active_tab}`} onClick={() => handleAccordionTab('customer')}>
                                Customer
                            </a>
                            <a className={`${accordionTabClass} ${accordionTab?.product?.active_tab}`} onClick={() => handleAccordionTab('product')}>
                                Product
                            </a>
                        </div>
                        <div>
                            <div className={`leading-relaxed ${accordionTab?.customer?.active_tab_body}`}>
                                Harshil Solanki
                            </div>
                            <div className={`leading-relaxed ${accordionTab?.product?.active_tab_body}`}>
                                <div className="w-full rounded-md border border-stroke py-2.5 dark:border-strokedark">
                                    <div className="flex flex-col">
                                        <div className="flex items-center justify-between p-4.5 hover:bg-[#F9FAFB] dark:hover:bg-meta-4">
                                            <div className="flex items-center">
                                                <div className="mr-4 h-[50px] w-full max-w-[50px] overflow-hidden rounded-full">
                                                    <img src={UserOne} alt="User" className="rounded-full object-cover object-center" />
                                                </div>
                                                <div>
                                                    <h4 className="text-base font-bold text-black dark:text-white">
                                                        Cherry Lip Tint
                                                    </h4>
                                                    <p className="text-sm">Price: 100</p>
                                                    <p className="text-sm">Discount Price: 50</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>;
    }

    const renderStatusTd = (is_applied) => {
        return <span className={`${is_applied
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
            } text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300`}
        >
            {is_applied ? "Applied" : "Not Applied"}
        </span>
    }

    const renderActionTd = (suggestion, suggestionId) => {
        return <div className="flex align-center">
            {/* <div title="Configuration" className="ml-2 pointer-events-none opacity-50 cursor-not-allowed" data-id={statement.id}> */}
            <div title="Configuration" className="ml-2" data-id={suggestionId}>
                <SettingIcon
                    onClick={() => {
                        toggleModal(suggestion);
                        setSuggestionId(suggestionId);
                    }
                    }
                />
            </div>
        </div>;
    }

    const toggleAccordionState = (currentState, defaultState) => {
        setAccordionTab({
            'customer': activeTabObj,
            'product': hiddenTabObj
        });
        const isCollapsed = JSON.stringify(currentState) === JSON.stringify(defaultState);
        return isCollapsed ? collapsedAccordionState : defaultAccordionState;
    };

    const handleAccordionClick = (clickedIndex) => {
        const updatedAccordions = manageAccordions.map((accordion, index) => {
            if (index === clickedIndex) {
                return toggleAccordionState(accordion, defaultAccordionState);
            }
            return collapsedAccordionState;
        });

        setManageAccordions(updatedAccordions);
    };

    const labelClass = "text-xs w-20 bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100";
    const titleClass = "mb-1 -mt-2 p-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between __web-inspector-hide-shortcut__";
    const backBtnClass = "flex items-center gap-x-1 cursor-pointer bg-white border border-gray-300 pt-1.5 pb-1.5 pl-2.5 pr-2.5 text-[15px] rounded-md";
    const prblmStmtClass = "rounded-sm border mt-4 border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1";
    const lblHeaderClass = "px-4 py-4 font-medium text-black dark:text-white";
    const comTdClass = "border-b border-[#eee] dark:border-strokedark";
    const accordionTabClass = "border-b-2 py-4 text-sm font-medium hover:text-primary md:text-base";

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
                                {
                                    problemStatement?.tblLevel2?.length > 0 ? (
                                        problemStatement?.tblLevel2?.map((suggestion, index) => {
                                            const rowId = `${suggestion.id}-${index}`;
                                            return (
                                                <tr key={rowId + 1}>
                                                    <td className={`flex px-4 py-5 ${comTdClass}`}>
                                                        {renderPrblmStmtTd(index, suggestion.description)}
                                                    </td>
                                                    <td aria-label="suggestions" className={`${comTdClass} min-w-[109px]`}>
                                                        {renderStatusTd(suggestion.is_applied)}
                                                    </td>

                                                    <td aria-label="suggestions" className={`${comTdClass} px-4 py-5`}>
                                                        {renderActionTd(suggestion.description, suggestion.id)}
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="text-center p-6">
                                                No suggestions found
                                            </td>
                                        </tr>
                                    )
                                }
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
export default SuggestionCompNew;
