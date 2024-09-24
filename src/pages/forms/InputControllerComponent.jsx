import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import DropDown from "../../components/higherOrderComponent/Dropdown/Dropdown";
import {
  fieldValidationDropdownData,
  fieldTypeDropdownData,
} from "./masterFormConfig";
import { defaultBoxClassName } from "./masterFormConfig";
const InputControllerComponent = ({
  setAddedFields,
  templateHeading,
  setTemplateHeading,
  templateOfferAmount,
  setTemplateOfferAmount,
  templateSubHeading,
  setTemplateSubHeading,
  templateImage,
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
    }
  }, [inputControllerEditState]);

  // Function to handle adding or updating a field
  const handleAddField = () => {
    if (!fieldType || !fieldValidation || !fieldName || !placeholderText) {
      toast.error("Please select all fields before adding.");
      return;
    }

    setAddedFields((prevFields) => {
      if (isEditMode && editIndex !== null) {
        // Update the field being edited
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

    // Reset fields after adding or updating
    resetForm();
  };

  // Function to reset the form
  const resetForm = () => {
    setFieldType("");
    console.log(['fieldValidation1', fieldValidation, inputControllerEditState]);
    setFieldValidation("");
    setFieldName("");
    console.log(['fieldValidation2', fieldValidation, inputControllerEditState]);
    setPlaceholderText("");
    setIsEditMode(false);
    setEditIndex(null);
  };

  // Function to handle editing a field
  const handleEdit = (field, index) => {
    setFieldType(field.fieldType);
    setFieldValidation(field.fieldValidation);
    setFieldName(field.fieldName);
    setPlaceholderText(field.placeholderText);
    setIsEditMode(true);
    setEditIndex(index);
  };

  return (
    <div className="p-4 border-t">
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-12">
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
            <div className="w-full flex flex-col gap-9">
              <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <form action="#" onSubmit={(e) => e.preventDefault()}>
                  <div className="p-3">
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
                            const file = e.target.files[0]; // Get the selected file
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setTemplateImage(reader.result); // Set the image as base64 or URL
                              };
                              reader.readAsDataURL(file); // Read the file as a Data URL
                            }
                          }}
                        />
                        <span>
                          <svg
                            className="fill-current"
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                              fill="white"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M6.99992 5.83329C6.03342 5.83329 5.24992 6.61679 5.24992 7.58329C5.24992 8.54979 6.03342 9.33329 6.99992 9.33329C7.96642 9.33329 8.74992 8.54979 8.74992 7.58329C8.74992 6.61679 7.96642 5.83329 6.99992 5.83329ZM4.08325 7.58329C4.08325 5.97246 5.38909 4.66663 6.99992 4.66663C8.61075 4.66663 9.91659 5.97246 9.91659 7.58329C9.91659 9.19412 8.61075 10.5 6.99992 10.5C5.38909 10.5 4.08325 9.19412 4.08325 7.58329Z"
                              fill="white"
                            />
                          </svg>
                        </span>
                        <span>Edit</span>
                      </label>
                    </div>
                    <div className="p-3 rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
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
                      <div className="mt-3 flex justify-between flex-row items-center">
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
                    <div className="mt-4 p-3 rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
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
                      <div className="mt-3 flex justify-between flex-row items-center">
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
                    <div className="mt-4 p-3 rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
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
                      <div className="mt-3 flex justify-between flex-row items-center">
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
                          selectedValue: fieldValidation,
                          onChange: (value) => setFieldValidation(value),
                        }}
                      />
                    </div>
                    <div className="mb-6">
                      <DropDown
                        key={`fieldType-${renderKey}`}
                        jsonData={{
                          ...fieldTypeDropdownData,
                          selectedValue: fieldType,
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
    </div>
  );
};
export default InputControllerComponent;
