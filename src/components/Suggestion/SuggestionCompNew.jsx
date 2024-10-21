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
import toast from "react-hot-toast";
import Loader from "../../common/Loader";
import NeedHelpPage from "../NeedHelp";

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
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchLevel2Suggestions = async () => {
      try {
        setLoading(true);
        await FormSubmitHandler({
          method: "get",
          url: `level2/suggestion/${id}`,
        })
          .then((res) => {
            if (res.data) {
              setProblemStatement(res.data);
              const initialAccordions = [];
              const innerAccordions = [];
              res.data?.tblLevel2?.map((tblLevel) => {
                initialAccordions.push(collapsedAccordionState);
                Object.keys(tblLevel?.suggestion?.data).length > 0 &&
                  tblLevel?.suggestion?.data?.map((items) => {
                    Object.keys(items).map((item) => {
                      const defaultClass =
                        item == "Customer_ID" ||
                        item == "Customer_IP" ||
                        item == "Days_After_Onboarding"
                          ? activeTabObj
                          : hiddenTabObj;
                      setAccordionTab((prev) => ({
                        ...prev,
                        [item]: defaultClass,
                      }));
                      return true;
                    });
                    return innerAccordions.push(defaultInnerAccordion);
                  });
              });

              setManageAccordions(initialAccordions);
              setPlusMinus(innerAccordions);
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
      discount_percentage: number,
      description: discountObj.description.replace(
        discountObj.discount_percentage,
        number
      ),
    });
  };

  // eslint-disable-next-line react/prop-types
  const SettingIcon = ({ onClick, disabled }) => (
    <span
      onClick={disabled ? null : onClick}
      className={`${
        disabled ? "cursor-not-allowed opacity-50 " : "cursor-pointer "
      }`}
    >
      {/* <span onClick={onClick} className={`cursor-pointer`}> */}
      <i className="fa fa-cog text-primary text-xl" aria-hidden="true"></i>
    </span>
  );

  const handleAccordionTab = (type) => {
    const tabTypes = Object.keys(accordionTab).map((tab) => {
      return tab;
    });
    const newAccordionState = tabTypes.reduce((acc, tab) => {
      acc[tab] = tab === type ? activeTabObj : hiddenTabObj;
      return acc;
    }, {});
    setAccordionTab(newAccordionState);
  };

  const handlePlusMinus = (i) => {
    const newPlusMinus = plusMinus.map((item, index) => {
      if (i != index) {
        return defaultInnerAccordion;
      }

      return item.plus === "hidden"
        ? defaultInnerAccordion
        : collapsedInnerAccordion;
    });
    setPlusMinus(newPlusMinus);
    setAccordionTab((prevAccordionTab) => {
      const updatedAccordionTab = Object.keys(prevAccordionTab).reduce(
        (acc, key) => {
          acc[key] = hiddenTabObj;
          return acc;
        },
        {}
      );

      updatedAccordionTab["Customer_ID"] = activeTabObj;
      updatedAccordionTab["Customer_IP"] = activeTabObj;
      updatedAccordionTab["Days_After_Onboarding"] = activeTabObj;

      return updatedAccordionTab;
    });
  };

  const renderAccordionTabs = (dataItem) => {
    return Object.keys(dataItem)
      .filter(
        (key) =>
          ![
            "product_list",
            "customer_detail",
            "top_abandoned_product_list",
            "top_selling_product_list",
          ].includes(key)
      )
      .map((key, index) => {
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

  const renderProductsWithDetails = (product, i) => (
    <div
      key={i}
      className="w-full rounded-md border border-stroke py-2.5 dark:border-strokedark"
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between p-4.5 hover:bg-[#F9FAFB] dark:hover:bg-meta-4">
          <div className="flex items-center">
            <div className="mr-4 h-[50px] w-full max-w-[50px] overflow-hidden rounded-full">
              <img
                src={product?.product_image}
                alt="User"
                className="rounded-full object-cover object-center"
              />
            </div>
            <div>
              <span className="block text-customGray">
                Product ID:{" "}
                <strong className="text-black font-bold text-md">
                  {product?.product_id}
                </strong>
              </span>
              <span className="block text-customGray">
                Title:{" "}
                <strong className="text-black font-bold text-md">
                  {product?.title}
                </strong>
              </span>
              <span className="block text-customGray">
                Price:{" "}
                <strong className="text-black font-bold text-md">
                  {product?.price}
                </strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAccordionContent = (dataItem) => (
    <div>
      {Object.keys(accordionTab).map((tab, index) => {
        if (
          !dataItem[tab] ||
          tab == "product_list" ||
          tab == "customer_detail" ||
          tab == "top_abandoned_product_list" ||
          tab == "top_selling_product_list"
        )
          return null;
        if (tab == "Products" && dataItem?.product_list?.length > 0) {
          return (
            <div
              key={index}
              className={`leading-relaxed ${accordionTab?.[tab]?.active_tab_body}`}
            >
              {dataItem["product_list"]?.map(renderProductsWithDetails)}
            </div>
          );
        } else if (
          tab == "Top_Selling_Products" &&
          dataItem?.top_selling_product_list?.length > 0
        ) {
          return (
            <div
              key={index}
              className={`leading-relaxed ${accordionTab?.[tab]?.active_tab_body}`}
            >
              {dataItem["top_selling_product_list"]?.map(
                renderProductsWithDetails
              )}
            </div>
          );
        } else if (
          tab == "Top_Abandoned_Products" &&
          dataItem?.top_abandoned_product_list?.length > 0
        ) {
          return (
            <div
              key={index}
              className={`leading-relaxed ${accordionTab?.[tab]?.active_tab_body}`}
            >
              {dataItem["top_abandoned_product_list"]?.map(
                renderProductsWithDetails
              )}
            </div>
          );
        } else if (Array.isArray(dataItem[tab])) {
          return (
            <div
              key={index}
              className={`leading-relaxed ${accordionTab?.[tab]?.active_tab_body}`}
            >
              {dataItem[tab]?.map(renderProduct)}
            </div>
          );
        } else if (
          tab == "Customer_ID" &&
          dataItem.Customer_ID &&
          dataItem?.customer_detail?.displayName
        ) {
          return (
            <div
              key={index}
              className={`w-full rounded-md border border-stroke py-2.5 dark:border-strokedark ${accordionTab?.[tab]?.active_tab_body}`}
            >
              <div className="flex flex-col">
                <div className="flex items-center justify-between p-4.5 hover:bg-[#F9FAFB] dark:hover:bg-meta-4">
                  <div className="flex items-center">
                    <div>
                      <span className="block text-customGray">
                        Customer ID:{" "}
                        <strong className="text-black font-bold text-md">
                          {dataItem.Customer_ID}{" "}
                        </strong>
                      </span>
                      <span className="block text-customGray">
                        Customer Name:{" "}
                        <strong className="text-black font-bold text-md">
                          {dataItem?.customer_detail?.displayName}
                        </strong>
                      </span>
                      <span className="block text-customGray">
                        Email:{" "}
                        <strong className="text-black font-bold text-md">
                          {dataItem?.customer_detail?.email}
                        </strong>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <div
              key={index}
              className={`leading-relaxed ${accordionTab?.[tab]?.active_tab_body}`}
            >
              {dataItem[tab]}
            </div>
          );
        }
      })}
    </div>
  );

  const renderProblemStmtTd = (index, suggestion) => {
    return (
      <>
        <div className="rounded-md border border-stroke p-4 shadow-9 dark:border-strokedark dark:shadow-none w-full  hover:shadow-lg   hover:-translate-y-2  hover:-translate-y-1 transition duration-300">
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

          {suggestion?.data?.length > 0 &&
            suggestion?.data?.map((dataItem, i) => {
              return (
                <div
                  key={i}
                  className={`mt-5 ml-16.5 duration-200 ease-in-out ${manageAccordions?.[index]?.content}`}
                >
                  <div className="rounded-md border border-stroke p-4 shadow-9 dark:border-strokedark dark:shadow-none md:p-6 xl:p-7.5">
                    <button
                      className="flex w-full items-center justify-between gap-2 "
                      onClick={() => handlePlusMinus(i)}
                    >
                      {renderTabTitle(dataItem)}
                      <div className="flex h-9 w-full max-w-9 items-center justify-center rounded-full border border-primary dark:border-white">
                        <PlusSvg plusMinus={plusMinus?.[i]} />
                        <MinusSvg plusMinus={plusMinus?.[i]} />
                      </div>
                    </button>
                    <div
                      className={`mt-5 duration-200 ease-in-out ${
                        plusMinus?.[i].minus == "" ? "" : "hidden"
                      }`}
                    >
                      <div className="rounded-sm">
                        <div className="mb-6 flex flex-wrap gap-5 border-b border-stroke dark:border-strokedark sm:gap-10">
                          {renderAccordionTabs(dataItem)}
                        </div>
                        {renderAccordionContent(dataItem)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </>
    );
  };

  const renderTabTitle = (dataItem) => {
    if (dataItem.Customer_ID) {
      return dataItem?.customer_detail?.displayName || dataItem.Customer_ID;
    }
    return (
      dataItem.Customer_ID ||
      dataItem.Customer_IP ||
      dataItem.Days_After_Onboarding
    );
  };

  const [toggleState, setToggleState] = useState({}); // Store toggle states uniquely by ID

  // Function to handle toggle status changes
  const changeAppliedStatus = async (problemId, statementId, currentStatus) => {
    try {
      const result = await FormSubmitHandler({
        method: "post",
        url: `suggestion/service-status`,
        data: {
          pid: problemId,
          sid: statementId,
        },
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
  // const renderStatusTd = (problemId, statementId, is_applied, is_active) => {
  const renderStatusTd = (problemId, suggestion) => {
    const { statementId, is_applied, is_active, customer_template_id } =
      suggestion;
    const currentStatus =
      toggleState[`${problemId}-${statementId}`] ?? is_active;

    return (
      <div className="flex items-center">
        <span
          className={`${
            !is_applied ? "text-white bg-red-600 " : " "
          }rounded-lg text-sm font-medium py-2 px-2 rounded dark:bg-gray-700 dark:text-gray-300`}
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
            <Link to={`/campaigns-details/${customer_template_id}`}>
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
          className={`bg-green-500 ml-2 inline-flex rounded-full py-1 px-3 text-sm font-medium text-black`}
        >
          {formattedDate}
        </button>
      );
    }
  };

  const renderActionTd = (data) => {
    const { suggestion, id, is_applied } = data;
    return (
      <div className="flex align-center">
        <div title="Configuration" className="ml-2 " data-id={id}>
          <SettingIcon
            onClick={() => {
              toggleModal();
              setSuggestionId(id);
              setInputTypeValue(suggestion.discount_percentage);
              setDiscountObj({
                description: suggestion.description,
                discount: suggestion.discount,
                discount_percentage: suggestion.discount_percentage,
              });
              setUpdatedDiscountObj({
                description: suggestion.description,
                discount: suggestion.discount,
                discount_percentage: suggestion.discount_percentage,
              });
            }}
            disabled={is_applied}
          />
        </div>
      </div>
    );
  };

  const toggleAccordionState = (currentState, defaultState) => {
    const isCollapsed =
      JSON.stringify(currentState) === JSON.stringify(defaultState);
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
    });
    setPlusMinus(newPlusMinus);
  };

  const modifyStringWithPercentage = (discountObj) => {
    if (discountObj.discount == "yes") {
      const regex = /(\d+)%/g;
      return (
        discountObj &&
        discountObj.description.split(regex).map((part, index) => {
          if (
            !isNaN(part) &&
            part.trim() !== "" &&
            part == discountObj.discount_percentage
          ) {
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
        })
      );
    } else {
      return discountObj && discountObj.description;
    }
  };

  // const labelClass = "text-xs w-20 bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100";
  const titleClass =
    "mb-1 -mt-2 p-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between __web-inspector-hide-shortcut__";
  const backBtnClass =
    "flex items-center gap-x-1 cursor-pointer bg-white border border-gray-300 pt-1.5 pb-1.5 pl-2.5 pr-2.5 text-[15px] rounded-md hover:bg-black hover:text-white transition-colors duration-300";
  const prblmStmtClass =
    "rounded-sm border mt-4 border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1";
  const lblHeaderClass = "px-4 py-4 font-medium text-black dark:text-white";
  const comTdClass = "border-b border-[#eee] dark:border-strokedark";
  const accordionTabClass =
    "border-b-2 py-4 text-sm font-medium hover:text-primary md:text-base";

  return (
    <>
      {loading && <Loader />}
      <div>
        <div className={titleClass}>
          <h2 className="text-3xl font-bold text-black">
            Discover the Solution
          </h2>
          <span onClick={() => navigate(-1)} className={backBtnClass}>
            <BackIcon /> Back
          </span>
        </div>
        <span className="p-2 text-md text-black mb-3">
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
                          {/* {renderStatusTd(
                            problemStatement.id,
                            suggestion.id,
                            suggestion.is_applied,
                            suggestion.service_status
                          )} */}
                          {renderStatusTd(problemStatement.id, suggestion)}
                        </td>
                        <td
                          aria-label="suggestions"
                          className={`${comTdClass} px-4 py-5`}
                        >
                          {renderPublishedDateTd(suggestion.applied_at)}
                        </td>
                        <td
                          aria-label="suggestions"
                          className={`${comTdClass} px-4 py-5`}
                        >
                          {renderActionTd(suggestion)}
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
        <div className="my-20">
          <Support />
        </div>
        <NeedHelpPage />
      </div>
    </>
  );
};
export default SuggestionCompNew;
