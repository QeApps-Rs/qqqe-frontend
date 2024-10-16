import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../../higherOrderComponent/Model/model";
import AccordionIconSvg from "../../../images/svg-icons/AccordionIcon";

/* eslint-disable react/prop-types */
const SurveyCampaignCompon = ({ productDetailsData }) => {
  const deviceVisitorLocationHtml = (
    title,
    description,
    moreProduct,
    isLast = false
  ) => {
    return (
      <div className="flex items-center border-b-[1.5px] border-customGray mb-4 pb-3 relative">
        <div className="block">
          <h3 className="text-lg font-bold text-black">{title}</h3>
          {description === "" && (
            <span className="text-customGray">Not Found</span>
          )}
          <span className="text-customGray">{description}</span>
        </div>
        {moreProduct && (
          <span className="bg-blue-400 p-1 uppercase rounded-sm text-sm text-white font-bold absolute left-[-60px] top-[50px]">
            {moreProduct}
          </span>
        )}
        {isLast && (
          <div className="absolute left-[-25px] top-[50px] w-8 h-1 bg-customGray rounded-full transform -translate-x-1/2"></div>
        )}
      </div>
    );
  };
  const surveyState = productDetailsData?.json_response?.survey_controller;
  const defaultSurveyState = surveyState?.survey?.map(() => {
    return { icon: "rotate-180", content: "hidden" };
  });

  const [manageAccordions, setManageAccordions] = useState([]);
  const [surveyDetailModal, setSurveyDetailModal] = useState(false);

  const onModalOpenClose = () => {
    setSurveyDetailModal(!surveyDetailModal);
    setManageAccordions(defaultSurveyState);
  };

  const collapsedAccordionState = {
    icon: "rotate-180",
    content: "hidden",
  };
  const defaultAccordionState = {
    icon: "",
    content: "block",
  };

  const toggleAccordionState = (currentState, defaultState) => {
    const isCollapsed =
      JSON.stringify(currentState) === JSON.stringify(defaultState);
    return isCollapsed ? collapsedAccordionState : defaultAccordionState;
  };

  const handleAccordionClick = (clickedIndex) => {
    const updatedAccordions = manageAccordions?.map((accordion, index) => {
      if (index === clickedIndex) {
        return toggleAccordionState(accordion, defaultAccordionState);
      }
      return collapsedAccordionState;
    });
    setManageAccordions(updatedAccordions);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default mt-4 p-8">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-xl text-customGray uppercase	">
          Who should see the popup
        </h2>
      </div>
      <div className="flex ">
        <div className="border-l-[1.5px] border-customGray pl-10 mt-3 w-full">
          {deviceVisitorLocationHtml(
            "Survey Type",
            surveyState?.survey_type,
            surveyState?.survey_type != "none" && "and"
          )}
          {surveyState?.survey_type == "review" && (
            <>{deviceVisitorLocationHtml("Review", surveyState?.review, "")}</>
          )}
          {surveyState?.survey_type == "rating" && (
            <>{deviceVisitorLocationHtml("Rating", surveyState?.rating, "")}</>
          )}
          {surveyState?.survey_type == "survey" && (
            <div className="inline-flex items-center font-bold text-md transform hover:scale-125 transition duration-300 ease-in-out text-blue-700 cursor-pointer hover:text-blue-900 transition duration-500 ease-in-out">
              <i className="fa fa-eye mr-2" aria-hidden="true"></i>
              <span
                className="hover:underline"
                onClick={() => onModalOpenClose()}
              >
                View survey details
              </span>
            </div>
          )}
          {surveyState?.survey_type == "button" && (
            <div className="flex items-center border-b-[1.5px] border-customGray mb-4 pb-3 relative flex-wrap gap-2">
              <div className="block">
                {surveyState?.new_button?.length === 0 && (
                  <span className="text-customGray">Not Found</span>
                )}
              </div>
              {surveyState?.new_button?.map((button, index) => (
                <Link key={index} to={button?.buttonLink} target="_blank">
                  <button
                    type="button"
                    className="  text-[#5a50fe] bg-blue-600 text-white font-medium rounded-lg py-2 px-4 "
                  >
                    {button?.buttonText}
                  </button>
                </Link>
              ))}
              <div className="absolute left-[-25px] top-[50px] w-8 h-1 bg-customGray rounded-full transform -translate-x-1/2"></div>
            </div>
          )}
        </div>
      </div>
      {surveyDetailModal && (
        <Modal
          isOpen={surveyDetailModal}
          onClose={() => onModalOpenClose()}
          onClickInChild=""
          body={
            <>
              <div className="block">
                {manageAccordions?.map((accordion, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-bodydark2  p-5 shadow-lg transition-transform duration-300 ease-in-out hover:shadow-xl w-full my-4 "
                  >
                    <button
                      className="flex w-full items-center gap-3"
                      onClick={() => handleAccordionClick(index)}
                    >
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full bg-gray-3 dark:bg-blue-800 transform transition-transform duration-300 ${accordion.icon}`}
                      >
                        <AccordionIconSvg classRotate={accordion.icon} />
                      </div>
                      <div>
                        <h4 className="text-left font-semibold text-customGray dark:text-blue-200 text-lg">
                          {surveyState?.survey[index].question}
                        </h4>
                      </div>
                    </button>
                    <div
                      className={`mt-4 transition-all duration-500 ease-in-out ${accordion.content}`}
                    >
                      <ul className="pl-8 list-disc text-customGray dark:text-blue-300">
                        {surveyState?.survey[index]?.answers?.map(
                          (answer, key) => (
                            <li key={key} className="my-2 text-base">
                              {answer}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </>
          }
          btnClose="Close"
          btnSubmit=""
          mdlTitle="Survey Details"
          showFooter={false}
          isAnalytics={true}
        />
      )}
    </div>
  );
};

export default SurveyCampaignCompon;
