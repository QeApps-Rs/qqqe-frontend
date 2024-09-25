import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import DropDown from "../../components/higherOrderComponent/Dropdown/Dropdown";
import {
  fieldValidationDropdownData,
  fieldTypeDropdownData,
} from "./masterFormConfig";
import { defaultBoxClassName } from "./masterFormConfig";
import { CameraIcon } from "../../components/custIcon/svgIcon";
const InputControllerComponent = ({
  setAddedFields,
  templateHeading,
  setTemplateHeading,
  templateOfferAmount,
  setTemplateOfferAmount,
  templateSubHeading,
  setTemplateSubHeading,
  setTemplateImage,
  templateDesign,
  onTemplateChange,
  inputControllerEditState,
}) => {
  const [fieldType, setFieldType] = useState("");
  const [fieldValidation, setFieldValidation] = useState("");
  const [fieldName, setFieldName] = useState("");
  const [placeholderText, setPlaceholderText] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [renderKey, setRenderKey] = useState(0);

  useEffect(() => {
    if (inputControllerEditState?.fieldType) {
      setFieldType(inputControllerEditState?.fieldType);
      setFieldValidation(inputControllerEditState?.fieldValidation);
      setFieldName(inputControllerEditState?.fieldName);
      setPlaceholderText(inputControllerEditState?.placeholderText);
      +setIsEditMode(true);
      setEditIndex(inputControllerEditState?.index);
    }
  }, [inputControllerEditState]);

  const handleAddField = () => {
    if (!fieldType || !fieldValidation || !fieldName || !placeholderText) {
      toast.error("Please select all fields before adding.");
      return;
    }

    setAddedFields((prevFields) => {
      if (isEditMode && editIndex !== null) {
        const updatedFields = [...prevFields];
        updatedFields[editIndex] = {
          fieldType,
          fieldValidation,
          fieldName,
          placeholderText,
        };
        return updatedFields;
      } else {
        return [
          ...prevFields,
          {
            fieldType,
            fieldValidation,
            fieldName,
            placeholderText,
          },
        ];
      }
    });

    resetForm();
  };

  const resetForm = () => {
    setFieldType("");
    setFieldValidation("");
    setFieldName("");
    setPlaceholderText("");
    setIsEditMode(false);
    setEditIndex(null);
    setRenderKey((prevKey) => prevKey + 1);
  };

  const inputControllerFieldClass =
    "p-3 rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark";
  const styleControllerFieldClass =
    "mt-3 flex justify-between flex-row items-center";
  return (
    <div className="p-4 border-t">
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-12">
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
            <div className="w-full flex flex-col gap-9">
              <form action="#" onSubmit={(e) => e.preventDefault()}>
                <div className={inputControllerFieldClass}>
                  <div className="mb-6">
                    <label className="mb-2.5 block text-black dark:text-white font-semibold">
                      Template Picture Upload
                    </label>
                    <label
                      htmlFor="cover"
                      className="flex cursor-pointer items-center justify-center gap-2 rounded bg-primary py-2 px-2 text-sm font-medium text-white hover:bg-opacity-90 xsm:px-4"
                    >
                      <input
                        type="file"
                        name="cover"
                        id="cover"
                        className="sr-only"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setTemplateImage(reader.result);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      <span>
                        <CameraIcon />
                      </span>
                      <span>Edit</span>
                    </label>
                  </div>
                  <div className={inputControllerFieldClass}>
                    <label className="mb-2.5 block text-black dark:text-white font-semibold">
                      Template Heading
                    </label>
                    <input
                      type="text"
                      value={templateHeading}
                      onChange={(e) => setTemplateHeading(e.target.value)}
                      placeholder="pleaser enter template heading"
                      className="w-full p-2 border rounded-md focus:outline-none"
                    />
                    <div className={styleControllerFieldClass}>
                      <span>Font-Size :</span>
                      <input
                        id="border-thickness"
                        type="number"
                        placeholder="px"
                        className={`${defaultBoxClassName} h-10`}
                        value={
                          templateDesign.templateHeadingFontSize.replace(
                            "px",
                            ""
                          ) || ""
                        }
                        onChange={(e) =>
                          onTemplateChange("templateHeadingFontSize")(
                            e.target.value + "px"
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className={`mt-4 ${inputControllerFieldClass}`}>
                    <label className="mb-2.5 block text-black dark:text-white font-semibold">
                      Template Offer Number
                    </label>
                    <input
                      type="text"
                      value={templateOfferAmount}
                      onChange={(e) => setTemplateOfferAmount(e.target.value)}
                      placeholder="pleaser enter template offer number"
                      className="w-full p-2 border rounded-md focus:outline-none"
                    />
                    <div className={styleControllerFieldClass}>
                      <span>Font-Size :</span>
                      <input
                        id="border-thickness"
                        type="number"
                        placeholder="px"
                        className={`${defaultBoxClassName} h-10`}
                        value={
                          templateDesign.templateOfferFontSize.replace(
                            "px",
                            ""
                          ) || ""
                        }
                        onChange={(e) =>
                          onTemplateChange("templateOfferFontSize")(
                            e.target.value + "px"
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className={`mt-4 ${inputControllerFieldClass}`}>
                    <label className="mb-2.5 block text-black dark:text-white font-semibold">
                      Template Sub-Heading
                    </label>
                    <input
                      type="text"
                      value={templateSubHeading}
                      onChange={(e) => setTemplateSubHeading(e.target.value)}
                      placeholder="pleaser enter template sub-heading"
                      className="w-full p-2 border rounded-md focus:outline-none"
                    />
                    <div className={styleControllerFieldClass}>
                      <span>Font-Size :</span>
                      <input
                        id="border-thickness"
                        type="number"
                        placeholder="px"
                        className={`${defaultBoxClassName} h-10`}
                        value={
                          templateDesign.templateSubheadingFontSize.replace(
                            "px",
                            ""
                          ) || ""
                        }
                        onChange={(e) =>
                          onTemplateChange("templateSubheadingFontSize")(
                            e.target.value + "px"
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="mb-2.5 block text-black dark:text-white font-semibold">
                      Field Name
                    </label>

                    <input
                      type="text"
                      value={fieldName}
                      onChange={(e) => setFieldName(e.target.value)}
                      placeholder="pleaser enter field name"
                      className="w-full p-2 border rounded-md focus:outline-none"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="mb-2.5 block text-black dark:text-white font-semibold">
                      Field Placeholder
                    </label>

                    <input
                      type="text"
                      value={placeholderText}
                      placeholder="pleaser enter field placeholder"
                      onChange={(e) => setPlaceholderText(e.target.value)}
                      className="w-full p-2 border rounded-md focus:outline-none"
                    />
                  </div>
                  <div className="mb-6">
                    <DropDown
                      key={`fieldValidation-${renderKey}`}
                      jsonData={{
                        ...fieldValidationDropdownData,
                        defaultValue: fieldValidation,
                        onChange: (value) => setFieldValidation(value),
                      }}
                    />
                  </div>
                  <div className="mb-6">
                    <DropDown
                      key={`fieldType-${renderKey}`}
                      jsonData={{
                        ...fieldTypeDropdownData,
                        defaultValue: fieldType,
                        onChange: (value) => setFieldType(value),
                      }}
                    />
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
  );
};
export default InputControllerComponent;
