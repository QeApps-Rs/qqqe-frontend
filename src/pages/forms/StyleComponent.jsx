/* eslint-disable react/prop-types */
import { useState } from "react";
import DropDown from "../../components/higherOrderComponent/Dropdown/Dropdown";
import ColorPicker from "../../components/higherOrderComponent/ColorPicker/ColorPicker";
import {
  inputColorFields,
  inputTextColorFields,
  templateBgField,
  fontFamilyList,
  borderStyles,
  formTypeDropdown,
  widthDropdown,
  tabs,
  defaultBoxClassName,
} from "./masterFormConfig";

const StyleComponent = ({
  templateDesign,
  onTemplateChange,
  isProductBundle,
  isCrossSellPopup,
  isPurchaseSatisfactionSurvey
}) => {
  const [activeTab, setActiveTab] = useState("Desktop");

  const handleTabClick = (tab) => setActiveTab(tab);

  const renderDropDown = (label, dropdownConfig) => (
    <div className="mb-6">
      <DropDown
        jsonData={{
          ...dropdownConfig,
          onChange: onTemplateChange(dropdownConfig.name),
          defaultValue: dropdownConfig.defaultValue,
        }}
        selectedValue={templateDesign[dropdownConfig.name]}
        setSelectedValue={onTemplateChange(dropdownConfig.name)}
      />
    </div>
  );

  const renderInputField = (label, value, onChange, id, placeholder) => (
    <div className="mt-3 mr-2 flex justify-between items-center">
      <span className="block">{label}:</span>
      <input
        id={id}
        type="number"
        placeholder={placeholder}
        value={value.replace("px", "") || ""}
        onChange={(e) => onChange(e.target.value + "px")}
        className={`${defaultBoxClassName} h-10`}
      />
    </div>
  );
  const renderPaddingMarginField = (
    label,
    value,
    onChange,
    id,
    placeholder,
    index = 1
  ) => (
    <div key={index} className="mt-3 grid justify-end">
      <span className="block">{label}:</span>
      <input
        id={id}
        type="number"
        placeholder={placeholder}
        value={value.replace("px", "") || ""}
        onChange={(e) => onChange(e.target.value + "px")}
        className={`${defaultBoxClassName} h-10`}
      />
    </div>
  );
  const renderColorPicker = (label, colorType, index = 1) => (
    <div key={index} className="mt-3 flex justify-between items-center">
      <span>{label}:</span>
      <ColorPicker
        defaultColor={templateDesign[colorType]}
        onChange={onTemplateChange(colorType)}
      />
    </div>
  );

  return (
    <div className="p-4 border-t">
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-12">
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
            <div className="w-full flex flex-col gap-9">
              <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <form>
                  <div className="p-3">
                    {!isProductBundle &&
                      !isCrossSellPopup &&(
                        <>
                          {renderDropDown("Form Type", {
                            ...formTypeDropdown,
                            name: "formType",
                            defaultValue: templateDesign.formType,
                          })}
                          {renderDropDown("Form Width", {
                            ...widthDropdown,
                            name: "formWidth",
                            defaultValue: templateDesign.formWidth,
                          })}
                          {/* {renderInputField(
                            "Minimum Height(px)",
                            templateDesign.templateMinHeight,
                            onTemplateChange("templateMinHeight"),
                            "minimum-height",
                            "px"
                          )} */}
                        </>
                      )}

                    <div className="mt-3 font-semibold text-black">Show On</div>
                    <div className="flex items-center space-x-2 bg-slate-100 p-2 rounded-md">
                      {tabs.map((tab) => (
                        <button
                          key={tab.name}
                          type="button"
                          onClick={() => handleTabClick(tab.name)}
                          className={`flex items-center space-x-1 px-4 py-2 rounded-md ${
                            activeTab === tab.name
                              ? "bg-white shadow-sm text-gray-900"
                              : "text-gray-500 hover:text-gray-700"
                          }`}
                        >
                          <span>{tab.name}</span>
                        </button>
                      ))}
                    </div>

                    <div className="mb-4.5 mt-3 border-b border-black pb-4">
                      <label className="mb-2 block text-black dark:text-white font-semibold">
                        Form Background
                      </label>
                      {templateBgField.map(({ label, colorType }, i) =>
                        renderColorPicker(label, colorType, i)
                      )}
                    </div>

                    <div className="mb-4.5 border-b border-black pb-4">
                      <label className="mb-2 block text-black dark:text-white font-semibold">
                        Form Styles
                      </label>
                      {renderInputField(
                        "Corner Radius(px)",
                        templateDesign.borderRadius,
                        onTemplateChange("borderRadius"),
                        "border-radius",
                        "px"
                      )}
                      <div className="mt-3 flex justify-between flex-row items-center">
                        <span>Border style:</span>
                        <select
                          onChange={(e) => {
                            onTemplateChange("formBorderStyle")(e.target.value);
                            onTemplateChange("borderWidth")("");
                          }}
                          value={templateDesign.formBorderStyle}
                          className={`${defaultBoxClassName} h-12`}
                        >
                          {borderStyles.map((style) => (
                            <option key={style.value} value={style.value}>
                              {style.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      {templateDesign.formBorderStyle !== "none" && (
                        <>
                          {renderColorPicker(
                            "Border color",
                            "templateBorderColor"
                          )}
                          {renderInputField(
                            "Border Thickness",
                            templateDesign.borderWidth,
                            onTemplateChange("borderWidth"),
                            "border-thickness",
                            "px"
                          )}
                        </>
                      )}

                      <label className="block mt-4">Padding (px):</label>
                      <div className="grid grid-cols-2">
                        {["Top", "Bottom", "Left", "Right"].map((position, i) =>
                          renderPaddingMarginField(
                            `${position}`,
                            templateDesign[`templatePadding${position}`],
                            onTemplateChange(`templatePadding${position}`),
                            `templatePadding${position}`,
                            "px",
                            i
                          )
                        )}
                      </div>
                      <label className="block mt-4">Margin (px):</label>
                      <div className="grid grid-cols-2">
                        {["Top", "Bottom", "Left", "Right"].map((position, i) =>
                          renderPaddingMarginField(
                            `${position}`,
                            templateDesign[`templateMargin${position}`],
                            onTemplateChange(`templateMargin${position}`),
                            `templateMargin${position}`,
                            "px",
                            i
                          )
                        )}
                      </div>
                    </div>

                    {!isProductBundle &&
                      !isCrossSellPopup && !isPurchaseSatisfactionSurvey &&(
                        <>
                          <div className="mb-4.5 border-b border-black pb-4">
                            <label className="mb-2 block text-black dark:text-white font-semibold">
                              Input Field Text Styles
                            </label>
                            <div className="mt-3 flex justify-between flex-row items-center">
                              <span>Font:</span>
                              <select
                                onChange={(e) =>
                                  onTemplateChange("fontFamily")(e.target.value)
                                }
                                value={templateDesign.fontFamily}
                                className={`${defaultBoxClassName} h-12`}
                              >
                                {fontFamilyList.map((item) => (
                                  <option key={item.label} value={item.label}>
                                    {item.label}
                                  </option>
                                ))}
                              </select>
                              <input
                                id="font-size"
                                type="number"
                                className={`${defaultBoxClassName} h-10`}
                                placeholder="px"
                                value={
                                  templateDesign.inputFontSize.replace(
                                    "px",
                                    ""
                                  ) || ""
                                }
                                onChange={(e) =>
                                  onTemplateChange("inputFontSize")(
                                    e.target.value + "px"
                                  )
                                }
                              />
                            </div>
                            {inputTextColorFields.map(
                              ({ label, colorType }, i) =>
                                renderColorPicker(label, colorType, i)
                            )}
                          </div>
                          <div className="mb-4.5 border-b border-black pb-4">
                            <label className="mb-2 block text-black dark:text-white font-semibold">
                              Input Field Styles
                            </label>
                            {inputColorFields.map(({ label, colorType }, i) =>
                              renderColorPicker(label, colorType, i)
                            )}
                          </div>
                        </>
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

export default StyleComponent;
