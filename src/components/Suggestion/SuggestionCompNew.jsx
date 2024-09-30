import { useEffect, useState } from "react";
import "react-tippy/dist/tippy.css";

import Modal from "../higherOrderComponent/Model/model";
import SuggestedAnalytics from "./SuggestedAnalytics";
import FormSubmitHandler from "../FormSubmitHandler";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BackIcon } from "../custIcon/svgIcon";
import Support from "../Support/Support";
import AccordionIconSvg from "../../images/svg-icons/AccordionIcon";
import UserOne from "../../images/user/user-01.png";
import PlusSvg from "../../images/svg-icons/plusSvg";
import MinusSvg from "../../images/svg-icons/minusSvg";
import SwitcherThree from "../Switchers/SwitcherThree";
import { set } from "react-hook-form";

const SuggestionCompNew = () => {
  const navigate = useNavigate();
  const defaultAccordionState = {
    icon: "",
    content: "block",
  };

  const collapsedAccordionState = {
    icon: "rotate-180",
    content: "hidden",
  };

  const activeTabObj = {
    active_tab: "border-primary",
    active_tab_body: "block",
  };

  const hiddenTabObj = {
    active_tab: "border-transparent",
    active_tab_body: "hidden",
  };

  const defaultInnerAccordion = {
    plus: "",
    minus: "hidden",
  };

  const collapsedInnerAccordion = {
    plus: "hidden",
    minus: "",
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShowAnalyticsModal, setAnalyticsModal] = useState(false);

    const [problemStatement, setProblemStatement] = useState({});
    const [suggestionId, setSuggestionId] = useState(null);
    const [manageAccordions, setManageAccordions] = useState([]);
    const [accordionTab, setAccordionTab] = useState({});
    const [discountObj, setDiscountObj] = useState({});
    const [updatedDiscountObj, setUpdatedDiscountObj] = useState({});
    const [inputTypeValue, setInputTypeValue] = useState(0);
    const [plusMinus, setPlusMinus] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchLevel2Suggestions = async () => {
            try {
                const result = await FormSubmitHandler({
                    method: "get",
                    url: `level2/suggestion/${id}`,
                });
                if (result.data) {
                    setProblemStatement(result.data);
                    const initialAccordions = [];
                    const innerAccordions = [];
                    result.data?.tblLevel2?.map((tblLevel) => {
                        initialAccordions.push(collapsedAccordionState);
                        return tblLevel?.suggestion?.data?.map((items) => {
                            Object.keys(items).map((item) => {
                                const defaultClass = (item == 'Customer_ID' || item == 'Customer_IP' || item == 'Days_After_Onboarding') ? activeTabObj : hiddenTabObj;
                                setAccordionTab(prev => ({ ...prev, [item]: defaultClass }));
                                return true;
                            })
                            return innerAccordions.push(defaultInnerAccordion)
                        })
                    });

          setManageAccordions(initialAccordions);
          setPlusMinus(innerAccordions);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

        fetchLevel2Suggestions();
    }, []);

    const toggleModal = () => {
        setIsModalOpen(true);
    };

  const onModalClose = () => {
    if (isModalOpen) setIsModalOpen(false);
    if (isShowAnalyticsModal) setAnalyticsModal(false);
  };

    const confirmClickEvent = () => {
        if (JSON.stringify(discountObj) === JSON.stringify(updatedDiscountObj)) {
            navigate(`/template/list/${id}s${suggestionId}`);
        } else {
            setAnalyticsModal(true);
            setIsModalOpen(false);
        }
    };

    const handleApplyDiscount = (number) => {
        setInputTypeValue(number);
        setUpdatedDiscountObj({
            ...discountObj,
            "discount_percentage": number,
            "description": discountObj.description.replace(discountObj.discount_percentage, number),
        });
    };

  // eslint-disable-next-line react/prop-types
  const SettingIcon = ({ onClick }) => (
    <span onClick={onClick} className="cursor-pointer">
      ⚙️
    </span>
  );

    const handleAccordionTab = (type) => {
        const tabTypes = Object.keys(accordionTab).map((tab) => {
            return tab;
        });
        const newAccordionState = tabTypes.reduce((acc, tab) => {
            acc[tab] = (tab === type) ? activeTabObj : hiddenTabObj;
            return acc;
        }, {});
        setAccordionTab(newAccordionState);
    }

  const handlePlusMinus = (i) => {
    const newPlusMinus = plusMinus.map((item, index) => {
      if (i != index) {
        return defaultInnerAccordion;
      }

            return item.plus === "hidden" ? defaultInnerAccordion : collapsedInnerAccordion;
        })
        setPlusMinus(newPlusMinus);
        setAccordionTab(prevAccordionTab => {
            const updatedAccordionTab = Object.keys(prevAccordionTab).reduce((acc, key) => {
                acc[key] = hiddenTabObj;
                return acc;
            }, {});

            updatedAccordionTab['Customer_ID'] = activeTabObj;
            updatedAccordionTab['Customer_IP'] = activeTabObj;
            updatedAccordionTab['Days_After_Onboarding'] = activeTabObj;

            return updatedAccordionTab;
        });
    }

    const renderAccordionTabs = (dataItem) => {
        return Object.keys(dataItem).map((key, index) => {
            return (
                <a
                    key={index}
                    className={`${accordionTabClass} ${accordionTab?.[key]?.active_tab}`}
                    onClick={() => handleAccordionTab(key)}
                >
                    {key}
                </a>
            );
        });
    };

  const renderProduct = (product, i) => (
    <div
      key={i}
      className="w-full rounded-md border border-stroke py-2.5 dark:border-strokedark"
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between p-4.5 hover:bg-[#F9FAFB] dark:hover:bg-meta-4">
          <div className="flex items-center">
            <div className="mr-4 h-[50px] w-full max-w-[50px] overflow-hidden rounded-full">
              <img
                src={UserOne}
                alt="User"
                className="rounded-full object-cover object-center"
              />
            </div>
            <div>
              <h4 className="text-base font-bold text-black dark:text-white">
                {product}
              </h4>
              <p className="text-sm">Price: 100</p>
              <p className="text-sm">Discount Price: 50</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

    const renderAccordionContent = (dataItem) => (
        <div>
            {
                Object.keys(accordionTab).map((tab, index) => {
                    if (!dataItem[tab]) return null;

                    if (Array.isArray(dataItem[tab])) {
                        return (
                            <div key={index} className={`leading-relaxed ${accordionTab?.[tab]?.active_tab_body}`}>
                                {dataItem[tab].map(renderProduct)}
                            </div>
                        );
                    }

                    return (
                        <div key={index} className={`leading-relaxed ${accordionTab?.[tab]?.active_tab_body}`}>
                            {dataItem[tab]}
                        </div>
                    );
                })
            }
        </div>
    );

  const renderProblemStmtTd = (index, suggestion) => {
    return (
      <>
        <div className="rounded-md border border-stroke p-4 shadow-9 dark:border-strokedark dark:shadow-none w-full">
          <button
            className="flex w-full items-center gap-1.5 sm:gap-3 xl:gap-6 active"
            onClick={() => handleAccordionClick(index)}
          >
            <div className="flex h-10.5 w-full max-w-10.5 items-center justify-center rounded-md bg-[#F3F5FC] dark:bg-meta-4">
              <AccordionIconSvg classRotate={manageAccordions?.[index]?.icon} />
            </div>
            <div>
              <h4 className="text-left font-medium text-black dark:text-white text-base">
                {suggestion.description}
              </h4>
            </div>
          </button>

                {
                    suggestion?.data?.length > 0 && (
                        suggestion?.data?.map((dataItem, i) => {
                            return (
                                <div key={i} className={`mt-5 ml-16.5 duration-200 ease-in-out ${manageAccordions?.[index]?.content}`}>
                                    <div className="rounded-md border border-stroke p-4 shadow-9 dark:border-strokedark dark:shadow-none md:p-6 xl:p-7.5">
                                        <button className="flex w-full items-center justify-between gap-2 " onClick={() => handlePlusMinus(i)}>
                                            {dataItem.Customer_ID || dataItem.Customer_IP || dataItem.Days_After_Onboarding}
                                            <div className="flex h-9 w-full max-w-9 items-center justify-center rounded-full border border-primary dark:border-white">
                                                <PlusSvg plusMinus={plusMinus?.[i]} />
                                                <MinusSvg plusMinus={plusMinus?.[i]} />
                                            </div>
                                        </button>
                                        <div className={`mt-5 duration-200 ease-in-out ${plusMinus?.[i].minus == "" ? "" : "hidden"}`}>
                                            <div className="rounded-sm">
                                                <div className="mb-6 flex flex-wrap gap-5 border-b border-stroke dark:border-strokedark sm:gap-10">
                                                    {
                                                        renderAccordionTabs(dataItem)
                                                    }
                                                </div>
                                                {
                                                    renderAccordionContent(dataItem)
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )
                }
            </div >
        </>;
    }

    const [toggleState, setToggleState] = useState({}); // Store toggle states uniquely by ID

  // Function to handle toggle status changes
  const changeAppliedStatus = async (problemId, statementId, currentStatus) => {
    try {
      const result = await FormSubmitHandler({
        method: "get",
        url: `suggestion/service-status/${statementId}`,
      });
      if (result.data) {
        console.log("result data ", result.data);
      }

      setToggleState((prevState) => ({
        ...prevState,
        [`${problemId}-${statementId}`]: !currentStatus, // Toggle the current state
      }));
    } catch (error) {
      console.error("Error in toggling status: ", error);
    }
  };

  // Function to render the status for each problem/suggestion
  const renderStatusTd = (problemId, statementId, is_applied, is_active) => {
    const currentStatus =
      toggleState[`${problemId}-${statementId}`] ?? is_active;
 
        return <span className={`${is_applied
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
            } text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300`}
        >
          {is_applied ? (
            <SwitcherThree
              isLabel={false}
              label={`${problemId}-${statementId}`}
              enabled={currentStatus} // Pass the current enabled state
              onToggle={() =>
                changeAppliedStatus(problemId, statementId, currentStatus)
              }
            />
          ) : (
            "Not Applied"
          )}
        </span>
        {is_applied && (
          <div className="flex items-center">
            <Link to={`/suggestion/analytics/${problemId}a${statementId}`}>
              <i
                className="fa fa-bar-chart fa fa-home text-[14px] bg-[#3292a9] text-white p-1 rounded-full h-6 w-6 flex items-center justify-center"
                aria-hidden="true"
              ></i>
            </Link>
          </div>
        )}
      </div>
    );
  };

  const renderPublishedDateTd = (publishedDate) => {
    const formattedDate = publishedDate
      ? new Intl.DateTimeFormat("en-GB").format(new Date(publishedDate))
      : "";
    if (formattedDate) {
      return (
        <button
          className={`bg-[#637381] ml-2 inline-flex rounded-full py-1 px-3 text-sm font-medium text-white`}
        >
          {formattedDate}
        </button>
      );
    }
  };

    const renderActionTd = (suggestion, suggestionId) => {
        return <div className="flex align-center">
            <div title="Configuration" className="ml-2" data-id={suggestionId}>
                <SettingIcon
                    onClick={() => {
                        toggleModal();
                        setSuggestionId(suggestionId);
                        setInputTypeValue(suggestion.discount_percentage);
                        setDiscountObj({
                            "description": suggestion.description,
                            "discount": suggestion.discount,
                            "discount_percentage": suggestion.discount_percentage
                        });
                        setUpdatedDiscountObj({
                            "description": suggestion.description,
                            "discount": suggestion.discount,
                            "discount_percentage": suggestion.discount_percentage
                        });
                    }
                    }
                />
            </div>
        </div>;
    }

    const toggleAccordionState = (currentState, defaultState) => {
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
        const newPlusMinus = plusMinus.map(() => {
            return defaultInnerAccordion;
        })
        setPlusMinus(newPlusMinus);
    };

    const modifyStringWithPercentage = (discountObj) => {
        if (discountObj.discount == 'yes') {
            const regex = /(\d+)%/g;
            return discountObj && discountObj.description.split(regex).map((part, index) => {
                if (!isNaN(part) && part.trim() !== "" && part == discountObj.discount_percentage) {
                    return (
                        <span key={index}>
                            <input
                                type="number"
                                className="border border-gray-300 p-1 w-15"
                                value={inputTypeValue}
                                onChange={(e) => handleApplyDiscount(e.target.value)}
                            />
                            %
                        </span>
                    );
                }

                return <span key={index}>{part}</span>;
            });
        } else {
            return discountObj && discountObj.description;
        }
    };

  // const labelClass = "text-xs w-20 bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100";
  const titleClass =
    "mb-1 -mt-2 p-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between __web-inspector-hide-shortcut__";
  const backBtnClass =
    "flex items-center gap-x-1 cursor-pointer bg-white border border-gray-300 pt-1.5 pb-1.5 pl-2.5 pr-2.5 text-[15px] rounded-md";
  const prblmStmtClass =
    "rounded-sm border mt-4 border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1";
  const lblHeaderClass = "px-4 py-4 font-medium text-black dark:text-white";
  const comTdClass = "border-b border-[#eee] dark:border-strokedark";
  const accordionTabClass =
    "border-b-2 py-4 text-sm font-medium hover:text-primary md:text-base";

  return (
    <>
      <div>
        <div className={titleClass}>
          <h2 className="text-lg text-title-md2 font-semibold text-black dark:text-white">
            Discover the Solution
          </h2>
          <span onClick={() => navigate(-1)} className={backBtnClass}>
            <BackIcon /> Back
          </span>
        </div>
        <span className="p-2 text-sm text-black mb-3">
          Find effective strategies to solve these challenges.
        </span>

        <div className={prblmStmtClass}>
          <p className="text-md text-lg font-bold text-gray-900 leading-relaxed mb-2">
            {problemStatement?.problem_statement}
          </p>
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className={`min-w-[120px] ${lblHeaderClass}`}>
                    Suggestions
                  </th>
                  <th className={`text-left ${lblHeaderClass}`}>Status</th>
                  <th className={`text-left ${lblHeaderClass}`}>
                    Published date
                  </th>
                  <th className={`${lblHeaderClass}`}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {problemStatement?.tblLevel2?.length > 0 ? (
                  problemStatement?.tblLevel2?.map((suggestion, index) => {
                    const rowId = `${suggestion.id}-${index}`;
                    return (
                      <tr key={rowId + 1}>
                        <td className={`flex px-4 py-5 ${comTdClass}`}>
                          {renderProblemStmtTd(index, suggestion.suggestion)}
                        </td>
                        <td
                          aria-label="suggestions"
                          className={`${comTdClass} min-w-[109px]`}
                          key={`${problemStatement.id}-${suggestion.id}`}
                        >
                          {renderStatusTd(
                            problemStatement.id,
                            suggestion.id,
                            suggestion.is_applied,
                            suggestion.service_status
                          )}
                        </td>
                        <td
                          aria-label="suggestions"
                          className={`${comTdClass} px-4 py-5`}
                        >
                          {renderPublishedDateTd(suggestion.published_date)}
                        </td>
                        <td
                          aria-label="suggestions"
                          className={`${comTdClass} px-4 py-5`}
                        >
                          {renderActionTd(suggestion.suggestion, suggestion.id)}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center p-6">
                      No suggestions found
                    </td>
                  </tr>
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
                                    {modifyStringWithPercentage(discountObj)}
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
                                    <SuggestedAnalytics
                                        problemId={id}
                                        suggestionId={suggestionId}
                                        discountObj={discountObj}
                                        updatedDiscountObj={updatedDiscountObj}
                                    />
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
