import React, { useState, useEffect } from "react";
import {
  defaultBoxClassName,
  surveyTypeStyles,
  surveyReviewCount,
} from "./masterFormConfig";

const SurveyControllerComponent = ({
  templateDesign,
  onTemplateChange,
  setAddedQuestion,
  surveyControllerEditState,
  onAddButton,
  setSurveyController,
  surveyController,
  setQuestionsArray,
}) => {
  const styleFieldTitleClass =
    "mb-2.5 block text-black dark:text-white font-semibold";
  const [fieldName, setFieldName] = useState("");
  const [options, setOptions] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [renderKey, setRenderKey] = useState(0);
  const [optionsText, setOptionsText] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [buttonLink, setButtonLink] = useState("");

  const [buttonsArray, setButtonsArray] = useState([]);

  useEffect(() => {
    if (surveyControllerEditState?.fieldName) {
      setFieldName(surveyControllerEditState?.fieldName);
      setOptionsText(surveyControllerEditState?.options);
      setIsEditMode(true);
      setEditIndex(surveyControllerEditState?.index); // Store the index of the button being edited
    }
    if (surveyControllerEditState?.buttonText) {
      setButtonText(surveyControllerEditState?.buttonText || "");
      setButtonLink(surveyControllerEditState?.buttonLink || "");
      setIsEditMode(true);
      setEditIndex(surveyControllerEditState?.index);
    }
  }, [surveyControllerEditState]);

  const handleAddField = (e) => {
    e.preventDefault();
    const optionsArray = optionsText.split(",").map((option) => option.trim());

    if (fieldName) {
      if (isEditMode && editIndex !== null) {
        setSurveyController((prevState) => {
          const updatedSurvey = [...prevState.survey];
          updatedSurvey[editIndex] = {
            question: fieldName,
            answers: optionsArray,
          };
          return {
            ...prevState,
            survey: updatedSurvey,
          };
        });

        setAddedQuestion((prevFields) => {
          const updatedFields = [...prevFields];
          updatedFields[editIndex] = {
            fieldName,
            options: optionsArray,
          };
          return updatedFields;
        });
      } else {
        setSurveyController((prevState) => ({
          ...prevState,
          survey: [
            ...prevState.survey,
            {
              question: fieldName,
              answers: optionsArray,
            },
          ],
        }));

        setAddedQuestion((prevFields) => [
          ...prevFields,
          {
            fieldName,
            options: optionsArray,
          },
        ]);
      }
    }

    if (buttonText && buttonLink) {
      onAddButton(buttonText, buttonLink, isEditMode, editIndex);
      setSurveyController((prevState) => {
        const updatedButtons = [...prevState.new_button];
        if (isEditMode && editIndex !== null) {
          updatedButtons[editIndex] = { buttonText, buttonLink };
        } else {
          updatedButtons.push({ buttonText, buttonLink });
        }
        return {
          ...prevState,
          new_button: updatedButtons,
        };
      });
    }

    resetForm();
  };

  const resetForm = () => {
    setFieldName("");
    setOptions("");
    setOptionsText("");
    setIsEditMode(false);
    setEditIndex(null);
    setRenderKey((prevKey) => prevKey + 1);
    setButtonText("");
    setButtonLink("");
  };

  return (
    <div className="p-4 border-t">
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-12">
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
            <div className="w-full flex flex-col gap-9">
              <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <form action="#">
                  <div className="p-3">
                    <div className="mb-4.5 border-b border-black pb-4">
                      <label className={styleFieldTitleClass}>
                        Survey Styles
                      </label>

                      <div className="mt-3 flex justify-between flex-row items-center">
                        <span>Survey Type style:</span>
                        <select
                          onChange={(e) => {
                            setSurveyController({
                              ...surveyController,
                              survey_type: e.target.value,
                            });
                            onTemplateChange("reviewType")(e.target.value);
                          }}
                          value={templateDesign.reviewType}
                          className={`${defaultBoxClassName} h-12`}
                        >
                          {surveyTypeStyles.map((style) => (
                            <option key={style.value} value={style.value}>
                              {style.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      {templateDesign.reviewType === "review" && (
                        <>
                          <div className="mt-3 flex justify-between flex-row">
                            <span>Review Count:</span>
                            <select
                              onChange={(e) => {
                                setSurveyController({
                                  ...surveyController,
                                  review: e.target.value,
                                });
                                onTemplateChange("reviewCount")(e.target.value);
                              }}
                              value={templateDesign.reviewCount || "5"}
                              className={`${defaultBoxClassName} h-12`}
                            >
                              {surveyReviewCount.map((style) => (
                                <option key={style.value} value={style.value}>
                                  {style.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </>
                      )}
                      {templateDesign.reviewType === "rating" && (
                        <>
                          <div className="mt-3 flex justify-between flex-row">
                            <span>Rating Count:</span>
                            <input
                              id="rating-count"
                              type="number"
                              placeholder="count"
                              className={`${defaultBoxClassName} h-10`}
                              value={templateDesign.ratingCount || ""}
                              min={templateDesign.ratingMinCount || ""}
                              max={templateDesign.ratingMaxCount || ""}
                              onChange={(e) => {
                                const count = parseInt(e.target.value, 10) || 0;
                                setSurveyController({
                                  ...surveyController,
                                  rating: e.target.value,
                                });
                                onTemplateChange("ratingCount")(count);
                              }}
                            />
                          </div>
                        </>
                      )}
                      {templateDesign.reviewType === "survey" && (
                        <>
                          <div className="mb-6">
                            <label className="mb-2.5 block text-black dark:text-white font-semibold">
                              Survey Question
                            </label>

                            <input
                              type="text"
                              value={fieldName}
                              onChange={(e) => setFieldName(e.target.value)}
                              placeholder="pleaser enter survey question"
                              className="w-full p-2 border rounded-md focus:outline-none"
                            />
                          </div>
                          <div className="mb-6">
                            <label className="mb-2.5 block text-black dark:text-white font-semibold">
                              Options (comma-separated)
                            </label>
                            <input
                              type="text"
                              value={optionsText}
                              onChange={(e) => setOptionsText(e.target.value)}
                              placeholder="e.g., good, better, as expected"
                              className="w-full p-2 border rounded-md focus:outline-none"
                            />
                          </div>
                        </>
                      )}
                      {templateDesign.reviewType === "button" && (
                        <>
                          <div className="mb-6">
                            <label className="mb-2.5 block text-black dark:text-white font-semibold">
                              Button Text
                            </label>
                            <input
                              type="text"
                              value={buttonText}
                              onChange={(e) => setButtonText(e.target.value)}
                              placeholder="Please enter Button Text"
                              className="w-full p-2 border rounded-md focus:outline-none"
                            />
                          </div>
                          <div className="mb-6">
                            <label className="mb-2.5 block text-black dark:text-white font-semibold">
                              Button Link
                            </label>
                            <input
                              type="text"
                              value={buttonLink}
                              onChange={(e) => setButtonLink(e.target.value)}
                              placeholder="Please enter Button Link"
                              className="w-full p-2 border rounded-md focus:outline-none"
                            />
                          </div>
                        </>
                      )}
                    </div>
                    <button
                      className="bg-blue-500 text-white py-2 px-4 rounded w-full"
                      onClick={handleAddField}
                    >
                      {isEditMode ? "Update Field" : "Add Field"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyControllerComponent;
