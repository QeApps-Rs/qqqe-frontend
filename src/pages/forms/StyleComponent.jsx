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
  isPurchaseSatisfactionSurvey,
  isFeedbackSurvey,
  isAttributionSurvey,
  isAbandonmentPopup,
  isPreviewPopup,
  isUpSellPopup,
  isExitProductRecommenderPopup,
  isSocialMediaConnectPopup,
  isWorldWideWelcomePopup,
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
      <span className="block font-semibold">{label}:</span>
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
      <span className="block font-semibold">{label}:</span>
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
      <span className="block font-semibold">{label}:</span>
      <ColorPicker
        defaultColor={templateDesign[colorType]}
        onChange={onTemplateChange(colorType)}
      />
    </div>
  );

  return (
    <div className="p-4 border-t border-white">
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-12">
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
            <div className="w-full flex flex-col gap-9">
              <form>
                {/* {!isProductBundle &&
                  !isCrossSellPopup &&
                  !isAbandonmentPopup &&
                  !isUpSellPopup &&
                  !isExitProductRecommenderPopup && (
                    <div className="p-4 rounded-lg border border-stroke bg-white shadow-default mb-4">
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
                        {renderInputField(
                            "Minimum Height(px)",
                            templateDesign.templateMinHeight,
                            onTemplateChange("templateMinHeight"),
                            "minimum-height",
                            "px"
                          )}
                      </>

                      <div className="font-semibold text-black">Show On</div>
                    <div className="mt-2 flex items-center space-x-2 bg-slate-100 p-2 rounded-md">
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
                    </div>
                  )} */}
                <div className="p-4 rounded-lg border border-stroke bg-white shadow-default mb-4">
                  <div className="mb-4.5 border-b border-black pb-4">
                    <label className="mb-2 block text-black dark:text-white font-semibold">
                      Form Background
                    </label>
                    {/* {templateBgField.map(({ label, colorType }, i) =>
                        renderColorPicker(label, colorType, i)
                      )} */}
                    {templateBgField
                      .filter(({ colorType }) => {
                        return (
                          colorType !== "templateOverlayColor" ||
                          (!isAttributionSurvey &&
                            !isExitProductRecommenderPopup &&
                            !isSocialMediaConnectPopup &&
                            !isWorldWideWelcomePopup)
                        );
                      })
                      .map(({ label, colorType }, i) =>
                        renderColorPicker(label, colorType, i)
                      )}
                  </div>

                  <div className="mb-4.5  pb-4">
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

                    {!isPreviewPopup && (
                      <>
                        <div className="mt-3 flex justify-between flex-row items-center">
                          <span>Border style:</span>
                          <select
                            onChange={(e) => {
                              onTemplateChange("formBorderStyle")(
                                e.target.value
                              );
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
                      </>
                    )}
                    <label className="block mt-4 font-semibold">
                      Padding (px):
                    </label>
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
                    <label className="block mt-4 font-semibold">
                      Margin (px):
                    </label>
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
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleComponent;
