import React, { useState, useEffect } from "react";
import {
  defaultBoxClassName,
  surveyTypeStyles,
  surveyReviewCount,
} from "./masterFormConfig";
import toast from "react-hot-toast";

const SurveyControllerComponent = ({
  templateDesign,
  onTemplateChange,
  setAddedQuestion,
  surveyControllerEditState,
}) => {
  const styleFieldTitleClass =
    "mb-2.5 block text-black dark:text-white font-semibold";
  const [fieldName, setFieldName] = useState("");
  const [options, setOptions] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [renderKey, setRenderKey] = useState(0);
  const [optionsText, setOptionsText] = useState("");

  useEffect(() => {
    if (surveyControllerEditState?.fieldName) {
      setFieldName(surveyControllerEditState?.fieldName);
      setOptionsText(surveyControllerEditState?.options);
      setIsEditMode(true);
      setEditIndex(surveyControllerEditState?.index);
    }
  }, [surveyControllerEditState]);

  const handleAddField = (e) => {
    e.preventDefault();
    const optionsArray = optionsText.split(",").map((option) => option.trim());

    if (optionsArray.length === 0 || optionsArray[0] === "") {
      toast.error("Please fill all fields before adding.");
      return;
    }

    setOptions(optionsArray);

    setAddedQuestion((prevFields) => {
      if (isEditMode && editIndex !== null) {
        const updatedFields = [...prevFields];
        updatedFields[editIndex] = {
          fieldName,
          options: optionsArray,
        };
        return updatedFields;
      } else {
        return [
          ...prevFields,
          {
            fieldName,
            options: optionsArray,
          },
        ];
      }
    });

    resetForm();
  };

  const resetForm = () => {
    setFieldName("");
    setOptions("");
    setOptionsText("");
    setIsEditMode(false);
    setEditIndex(null);
    setRenderKey((prevKey) => prevKey + 1);
  };

  const handleAddButton = () => {
    
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
                          onChange={(e) =>
                            onTemplateChange("formBorderStyle")(e.target.value)
                          }
                          value={templateDesign.formBorderStyle}
                          className={`${defaultBoxClassName} h-12`}
                        >
                          {surveyTypeStyles.map((style) => (
                            <option key={style.value} value={style.value}>
                              {style.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      {templateDesign.formBorderStyle === "review" && (
                        <>
                          <div className="mt-3 flex justify-between flex-row">
                            <span>Review Count:</span>
                            <select
                              onChange={(e) =>
                                onTemplateChange("reviewCount")(e.target.value)
                              }
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
                      {templateDesign.formBorderStyle === "rating" && (
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
                                onTemplateChange("ratingCount")(count);
                              }}
                            />
                          </div>
                        </>
                      )}
                      {templateDesign.formBorderStyle === "survey" && (
                        <>
                          <div className="mb-6">
                            <label className="mb-2.5 block text-black dark:text-white font-semibold">
                              Survey Question
                            </label>

                            <input
                              type="text"
                              value={fieldName}
                              onChange={(e) => setFieldName(e.target.value)}
                              placeholder="Please Enter The Question"
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
                              placeholder="Ex. Good, Better, As Expected"
                              className="w-full p-2 border rounded-md focus:outline-none"
                            />
                          </div>
                        </>
                      )}
                       {templateDesign.formBorderStyle === "button" && (
                        <>
                          <div className="mb-6">
                            <label className="mb-2.5 block text-black dark:text-white font-semibold">
                              Button Label
                            </label>

                            <input
                              type="text"
                              value={fieldName}
                              onChange={(e) => setFieldName(e.target.value)}
                              placeholder="Please Enter The Question"
                              className="w-full p-2 border rounded-md focus:outline-none"
                            />
                          </div>
                          <div className="mb-6">
                            <label className="mb-2.5 block text-black dark:text-white font-semibold">
                             Button Link
                            </label>
                            <input
                              type="text"
                              value={optionsText}
                              onChange={(e) => setOptionsText(e.target.value)}
                              placeholder="Ex. fb.com/username"
                              className="w-full p-2 border rounded-md focus:outline-none"
                            />
                          </div>
                        </>
                      )}
                    </div>
                    {templateDesign.formBorderStyle === "survey" && (
                      <button
                        className="bg-blue-500 text-white py-2 px-4 rounded w-full"
                        onClick={handleAddField}
                      >
                        {isEditMode ? "Update Field" : "Add Field"}
                      </button>
                    )}
                    {templateDesign.formBorderStyle === "button" && (
                      <button
                        className="bg-blue-500 text-white py-2 px-4 rounded w-full"
                        onClick={handleAddButton}
                      >
                        {isEditMode ? "Update Button" : "Add Button"}
                      </button>
                    )}
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
