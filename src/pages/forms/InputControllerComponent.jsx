/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import DropDown from "../../components/higherOrderComponent/Dropdown/Dropdown";
import {
  fieldValidationDropdownData,
  fieldTypeDropdownData,
  defaultBoxClassName,
  fontFamilyList,
  imagePositionDropdownData,
} from "./masterFormConfig";
import { CameraIcon } from "../../components/custIcon/svgIcon";
import ColorPicker from "../../components/higherOrderComponent/ColorPicker/ColorPicker";
const InputControllerComponent = ({
  setAddedFields,
  templateDesign,
  onTemplateChange,
  inputControllerEditState,
  isProductBundle,
  setTemplateDesign,
  isCrossSellPopup,
  isPurchaseSatisfactionSurvey,
}) => {
  const [fieldState, setFieldState] = useState({
    fieldType: "",
    fieldValidation: "",
    fieldName: "",
    placeholderText: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [renderKey, setRenderKey] = useState(0);

  useEffect(() => {
    if (inputControllerEditState?.fieldType) {
      setFieldState({
        fieldType: inputControllerEditState?.fieldType,
        fieldValidation: inputControllerEditState?.fieldValidation,
        fieldName: inputControllerEditState?.fieldName,
        placeholderText: inputControllerEditState?.placeholderText,
      });
      setIsEditMode(true);
      setEditIndex(inputControllerEditState?.index);
    }
  }, [inputControllerEditState]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFieldState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddField = () => {
    const { fieldType, fieldValidation, fieldName, placeholderText } =
      fieldState;
    if (!fieldType || !fieldValidation || !fieldName || !placeholderText) {
      toast.error("Please select all fields before adding.");
      return;
    }

    setAddedFields((prevFields) => {
      if (isEditMode && editIndex !== null) {
        const updatedFields = [...prevFields];
        updatedFields[editIndex] = { ...fieldState };
        return updatedFields;
      } else {
        return [...prevFields, { ...fieldState }];
      }
    });

    resetForm();
  };

  const resetForm = () => {
    setFieldState({
      fieldType: "",
      fieldValidation: "",
      fieldName: "",
      placeholderText: "",
    });
    setIsEditMode(false);
    setEditIndex(null);
    setRenderKey((prevKey) => prevKey + 1);
  };

  const inputControllerFieldClass =
    "p-3 rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark";

  return (
    <div className="p-4 border-t">
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-12">
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
            <div className="w-full flex flex-col gap-9">
              <form action="#" onSubmit={(e) => e.preventDefault()}>
                <div className={inputControllerFieldClass}>
                  {!isProductBundle && !isCrossSellPopup ? (
                    <>
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
                                  setTemplateDesign((prev) => ({
                                    ...prev,
                                    image: reader.result,
                                  }));
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
                      <div className="mb-6">
                        <DropDown
                          jsonData={{
                            ...imagePositionDropdownData,
                          }}
                          selectedValue={templateDesign.imagePosition}
                          setSelectedValue={onTemplateChange("imagePosition")}
                        />
                      </div>
                    </>
                  ) : (
                    ""
                  )}

                  <div className={inputControllerFieldClass}>
                    <label className="mb-2.5 block text-black dark:text-white font-semibold">
                      Template Heading
                    </label>
                    <input
                      type="text"
                      value={templateDesign.heading}
                      onChange={(e) =>
                        setTemplateDesign((prev) => ({
                          ...prev,
                          heading: e.target.value,
                        }))
                      }
                      placeholder="pleaser enter template heading"
                      className="w-full p-2 border rounded-md focus:outline-none"
                    />

                    <div className="mt-3 flex justify-between flex-row items-center">
                      <span className="mr-2">Font:</span>
                      <select
                        onChange={(e) =>
                          onTemplateChange("templateHeadingFontFamily")(
                            e.target.value
                          )
                        }
                        value={templateDesign.templateHeadingFontFamily}
                        className={`${defaultBoxClassName} h-12 mr-2`}
                      >
                        {fontFamilyList.map((item) => (
                          <option key={item.label} value={item.label}>
                            {item.label}
                          </option>
                        ))}
                      </select>
                      <input
                        id="border-thickness"
                        type="number"
                        className={`${defaultBoxClassName} h-12`}
                        placeholder="px"
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
                    <div className="flex items-center mt-3">
                      <span className="mr-2">Color:</span>
                      <ColorPicker
                        defaultColor={templateDesign.templateHeadingColor}
                        onChange={(color) =>
                          onTemplateChange("templateHeadingColor")(color)
                        }
                      />
                    </div>
                  </div>
                  {!isCrossSellPopup ? (
                    <>
                      {" "}
                      {!isPurchaseSatisfactionSurvey ? (
                        <div className={`mt-4 ${inputControllerFieldClass}`}>
                          <>
                            <label className="mb-2.5 block text-black dark:text-white font-semibold">
                              Template Offer Number
                            </label>
                            <input
                              type="text"
                              value={templateDesign.offerAmount}
                              onChange={(e) =>
                                setTemplateDesign((prev) => ({
                                  ...prev,
                                  offerAmount: e.target.value,
                                }))
                              }
                              placeholder="pleaser enter template offer number"
                              className="w-full p-2 border rounded-md focus:outline-none"
                            />
                          </>

                          <div className="mt-3 flex justify-between flex-row items-center">
                            <span className="mr-2">Font:</span>
                            <select
                              onChange={(e) =>
                                onTemplateChange("templateOfferFontFamily")(
                                  e.target.value
                                )
                              }
                              value={templateDesign.templateOfferFontFamily}
                              className={`${defaultBoxClassName} h-12 mr-2`}
                            >
                              {fontFamilyList.map((item) => (
                                <option key={item.label} value={item.label}>
                                  {item.label}
                                </option>
                              ))}
                            </select>
                            <input
                              id="border-thickness"
                              type="number"
                              placeholder="px"
                              className={`${defaultBoxClassName} h-12`}
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
                          <div className="flex items-center mt-3">
                            <span className="mr-2">Color:</span>
                            <ColorPicker
                              defaultColor={templateDesign.templateOfferColor}
                              onChange={(color) =>
                                onTemplateChange("templateOfferColor")(color)
                              }
                            />
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      <div className={`mt-4 ${inputControllerFieldClass}`}>
                        <label className="mb-2.5 block text-black dark:text-white font-semibold">
                          Template Sub-Heading
                        </label>

                        <input
                          type="text"
                          value={templateDesign.subHeading}
                          onChange={(e) =>
                            setTemplateDesign((prev) => ({
                              ...prev,
                              subHeading: e.target.value,
                            }))
                          }
                          placeholder="pleaser enter template sub-heading"
                          className="w-full p-2 border rounded-md focus:outline-none"
                        />
                        <div className="mt-3 flex justify-between flex-row items-center">
                          <span className="mr-2">Font:</span>
                          <select
                            onChange={(e) =>
                              onTemplateChange("templateSubHeadingFontFamily")(
                                e.target.value
                              )
                            }
                            value={templateDesign.templateSubHeadingFontFamily}
                            className={`${defaultBoxClassName} h-12 mr-2`}
                          >
                            {fontFamilyList.map((item) => (
                              <option key={item.label} value={item.label}>
                                {item.label}
                              </option>
                            ))}
                          </select>
                          <input
                            id="border-thickness"
                            type="number"
                            placeholder="px"
                            className={`${defaultBoxClassName} h-12`}
                            value={
                              templateDesign.templateSubHeadingFontSize.replace(
                                "px",
                                ""
                              ) || ""
                            }
                            onChange={(e) =>
                              onTemplateChange("templateSubHeadingFontSize")(
                                e.target.value + "px"
                              )
                            }
                          />
                        </div>
                        <div className="flex items-center mt-3">
                          <span className="mr-2">Color:</span>
                          <ColorPicker
                            defaultColor={
                              templateDesign.templateSubHeadingColor
                            }
                            onChange={(color) =>
                              onTemplateChange("templateSubHeadingColor")(color)
                            }
                          />
                        </div>
                      </div>{" "}
                    </>
                  ) : (
                    ""
                  )}
                 {!isPurchaseSatisfactionSurvey ?  <div className="mb-6">
                    <div className={`mt-4 ${inputControllerFieldClass}`}>
                      <label className="mb-2.5 block text-black dark:text-white font-semibold">
                        Button Name
                      </label>
                      <input
                        type="text"
                        value={templateDesign.button}
                        onChange={(e) =>
                          setTemplateDesign((prev) => ({
                            ...prev,
                            button: e.target.value,
                          }))
                        }
                        placeholder="pleaser enter button name"
                        className="w-full p-2 border rounded-md focus:outline-none"
                      />
                      <div className="flex items-center mt-3 justify-between">
                        <span>Color:</span>
                        <ColorPicker
                          defaultColor={templateDesign.templateButtonBgColor}
                          onChange={(color) =>
                            onTemplateChange("templateButtonBgColor")(color)
                          }
                        />
                      </div>
                    </div>
                  </div> : ""}
                  {!isProductBundle && !isCrossSellPopup && !isPurchaseSatisfactionSurvey? (
                    <>
                      <div className="mb-6">
                        <label className="mb-2.5 block text-black dark:text-white font-semibold">
                          Field Name
                        </label>
                        <input
                          type="text"
                          name="fieldName"
                          value={fieldState.fieldName}
                          onChange={handleInputChange}
                          placeholder="Please enter field name"
                          className="w-full p-2 border rounded-md focus:outline-none"
                        />
                      </div>
                      <div className="mb-6">
                        <label className="mb-2.5 block text-black dark:text-white font-semibold">
                          Field Placeholder
                        </label>
                        <input
                          type="text"
                          name="placeholderText"
                          value={fieldState.placeholderText}
                          placeholder="Please enter field placeholder"
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded-md focus:outline-none"
                        />
                      </div>
                      <div className="mb-6">
                        <DropDown
                          key={`fieldValidation-${renderKey}`}
                          jsonData={{
                            ...fieldValidationDropdownData,
                          }}
                          selectedValue={fieldState.fieldValidation}
                          setSelectedValue={(value) =>
                            setFieldState((prevState) => ({
                              ...prevState,
                              fieldValidation: value,
                            }))
                          }
                        />
                      </div>
                      <div className="mb-6">
                        <DropDown
                          key={`fieldType-${renderKey}`}
                          jsonData={{
                            ...fieldTypeDropdownData,
                          }}
                          selectedValue={fieldState.fieldType}
                          setSelectedValue={(value) =>
                            setFieldState((prevState) => ({
                              ...prevState,
                              fieldType: value,
                            }))
                          }
                        />
                      </div>
                      <button
                        className="bg-blue-500 text-white py-2 px-4 rounded w-full"
                        onClick={handleAddField}
                      >
                        {isEditMode ? "Update Field" : "Add Field"}
                      </button>
                    </>
                  ) : (
                    ""
                  )}
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
