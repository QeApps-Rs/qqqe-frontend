import React, { useState, useEffect } from "react";
import DropDown from "../../components/higherOrderComponent/Dropdown/Dropdown";
import ColorPicker from "../../components/higherOrderComponent/ColorPicker/ColorPicker";
import {
    templateFieldCss,
    inputColorFields,
    inputTextColorFields,
    templateBgField,
    fontFamilyList,
    borderStyles,
    visitorsDropdown,
    formTypeDropdown,
    widthDropdown,
    timingOptions,
    deviceOptions,
    tabs,
    templateEditorCollapseOptions,
    defaultBoxClassName,
} from "./masterFormConfig";
const StyleComponent = ({ templateDesign, onTemplateChange }) => {
    

    const [activeTab, setActiveTab] = useState("Desktop");

    const handleTabClick = (tab) => {
        setActiveTab(tab);
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
                                        {/* Form Type Dropdown */}
                                        <div className="mb-6">
                                            <label className="mb-2.5 block">
                                                <div className="mb-6">
                                                    <DropDown
                                                        jsonData={{
                                                            ...formTypeDropdown,
                                                            onChange: (value) => onTemplateChange("formType", value),
                                                            defaultValue: templateDesign.formType,
                                                        }}
                                                    />
                                                </div>
                                            </label>
                                        </div>

                                        {/* Form Width Dropdown */}
                                        <div className="mb-6">
                                            <label className="mb-2.5 block">
                                                <div className="mb-6">
                                                    <DropDown
                                                        jsonData={{
                                                            ...widthDropdown,
                                                            onChange: (value) => onTemplateChange("formWidth", value),
                                                            defaultValue: templateDesign.formWidth,
                                                        }}
                                                    />
                                                </div>
                                            </label>
                                        </div>

                                        {/* Minimum Height Input */}
                                        <div className="mt-3 flex justify-between flex-row ">
                                            <span>Minimum Height(px):</span>
                                            <input
                                                id="minimum-height"
                                                type="number"
                                                value={templateDesign.templateMinHeight.replace("px", "") || ""}
                                                onChange={(e) =>
                                                    onTemplateChange("templateMinHeight", e.target.value + "px")
                                                }
                                                className={`${defaultBoxClassName} h-10`}
                                            />
                                        </div>

                                        {/* Tab for Desktop/Mobile */}
                                        <div className="mt-3 font font-semibold text-black">
                                            Show On
                                        </div>
                                        <div className="flex items-center space-x-2 bg-slate-100 p-2 rounded-md">
                                            {tabs.map((tab) => (
                                                <button
                                                    key={tab.name}
                                                    onClick={() => handleTabClick(tab.name)}
                                                    className={`flex items-center space-x-1 px-4 py-2 rounded-md ${activeTab === tab.name
                                                        ? "bg-white shadow-sm text-gray-900"
                                                        : "text-gray-500 hover:text-gray-700"
                                                        }`}
                                                >
                                                    <span>{tab.name}</span>
                                                </button>
                                            ))}
                                        </div>

                                        {/* Form Background Colors */}
                                        <div className="mb-4.5 mt-3 border-b border-black pb-4">
                                            <label className="mb-2.5 block text-black dark:text-white font-semibold">
                                                Form Background
                                            </label>
                                            {templateBgField.map(({ label, colorType }) => (
                                                <div className="mt-3 flex justify-between flex-row items-center" key={colorType}>
                                                    <span>{label}:</span>
                                                    <ColorPicker
                                                        defaultColor={templateDesign[colorType]}
                                                        onChange={(value) => onTemplateChange(colorType, value)}
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        {/* Form Styles (Corner Radius) */}
                                        {/* <div className="mb-4.5 border-b border-black pb-4">
                        <label className="mb-2.5 block text-black dark:text-white font-semibold">
                          Form Styles
                        </label>
                        <div className="mt-3 flex justify-between flex-row items-center">
                          <span>Corner Radius(px):</span>
                          <input
                            id="border-radius"
                            type="number"
                            placeholder="px"
                            value={templateDesign.borderRadius.replace("px", "") || ""}
                            onChange={(e) =>
                              onTemplateChange("borderRadius", e.target.value + "px")
                            }
                            className={`${defaultBoxClassName} h-10`}
                          />
                        </div>
                      </div> */}
                                        <div className="mb-4.5 border-b border-black pb-4">
                                            <label className="mb-2.5 block text-black dark:text-white font-semibold">
                                                Form Styles
                                            </label>
                                            <div className="mt-3 flex justify-between flex-row items-center">
                                                <span>Corner Radius(px):</span>
                                                <input
                                                    id="border-radius"
                                                    type="number"
                                                    placeholder="px"
                                                    value={
                                                        templateDesign.borderRadius.replace(
                                                            "px",
                                                            ""
                                                        ) || ""
                                                    }
                                                    onChange={(e) =>
                                                        onTemplateChange("borderRadius")(
                                                            e.target.value + "px"
                                                        )
                                                    }
                                                    className={`${defaultBoxClassName} h-10`}
                                                />
                                            </div>
                                            <div className="mt-3 flex justify-between flex-row items-center">
                                                <span>Border style:</span>
                                                <select
                                                    onChange={(e) =>
                                                        onTemplateChange("formBorderStyle")(
                                                            e.target.value
                                                        )
                                                    }
                                                    value={templateDesign.formBorderStyle}
                                                    className={`${defaultBoxClassName} h-12`}
                                                >
                                                    {borderStyles.map((style) => (
                                                        <option
                                                            key={style.value}
                                                            value={style.value}
                                                        >
                                                            {style.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            {templateDesign.formBorderStyle != "none" && (
                                                <>
                                                    <div className="mt-3 flex justify-between flex-row ">
                                                        <span>Border color:</span>
                                                        <ColorPicker
                                                            defaultColor={
                                                                templateDesign.templateBorderColor
                                                            }
                                                            onChange={(color) =>
                                                                onTemplateChange(
                                                                    "templateBorderColor"
                                                                )(color)
                                                            }
                                                        />
                                                    </div>
                                                    <div className="mt-3 flex justify-between flex-row ">
                                                        <span>Border Thickness:</span>
                                                        <input
                                                            id="border-thickness"
                                                            type="number"
                                                            placeholder="px"
                                                            className={`${defaultBoxClassName} h-10`}
                                                            value={
                                                                templateDesign.borderWidth.replace(
                                                                    "px",
                                                                    ""
                                                                ) || ""
                                                            }
                                                            onChange={(e) =>
                                                                onTemplateChange("borderWidth")(
                                                                    e.target.value + "px"
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </>
                                            )}
                                            <div className="flex flex-col">
                                                <label className="mb-2">Padding(px):</label>
                                                <div className="flex gap-4 justify-end">
                                                    <div className="flex flex-col">
                                                        <label className="mb-1">Top</label>
                                                        <div className="flex items-center">
                                                            <input
                                                                type="number"
                                                                className={`${defaultBoxClassName} h-10`}
                                                                placeholder="px"
                                                                value={
                                                                    templateDesign.templatePaddingTop.replace(
                                                                        "px",
                                                                        ""
                                                                    ) || ""
                                                                }
                                                                onChange={(e) =>
                                                                    onTemplateChange(
                                                                        "templatePaddingTop"
                                                                    )(e.target.value + "px")
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <label className="mb-1">Bottom</label>
                                                        <div className="flex items-center">
                                                            <input
                                                                type="number"
                                                                className={`${defaultBoxClassName} h-10`}
                                                                placeholder="px"
                                                                value={
                                                                    templateDesign.templatePaddingBottom.replace(
                                                                        "px",
                                                                        ""
                                                                    ) || ""
                                                                }
                                                                onChange={(e) =>
                                                                    onTemplateChange(
                                                                        "templatePaddingBottom"
                                                                    )(e.target.value + "px")
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-4 mt-4 justify-end">
                                                    <div className="flex flex-col">
                                                        <label className="mb-1">Left</label>
                                                        <div className="flex items-center">
                                                            <input
                                                                type="number"
                                                                className={`${defaultBoxClassName} h-10`}
                                                                placeholder="px"
                                                                value={
                                                                    templateDesign.templatePaddingLeft.replace(
                                                                        "px",
                                                                        ""
                                                                    ) || ""
                                                                }
                                                                onChange={(e) =>
                                                                    onTemplateChange(
                                                                        "templatePaddingLeft"
                                                                    )(e.target.value + "px")
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <label className="mb-1">Right</label>
                                                        <div className="flex items-center">
                                                            <input
                                                                type="number"
                                                                className={`${defaultBoxClassName} h-10`}
                                                                placeholder="px"
                                                                value={
                                                                    templateDesign.templatePaddingRight.replace(
                                                                        "px",
                                                                        ""
                                                                    ) || ""
                                                                }
                                                                onChange={(e) =>
                                                                    onTemplateChange(
                                                                        "templatePaddingRight"
                                                                    )(e.target.value + "px")
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-4.5 border-b border-black pb-4">
                                            <label className="mb-2.5 block text-black dark:text-white font-semibold">
                                                Input Field Text Styles
                                            </label>
                                            <div className="mt-3 flex justify-between flex-row items-center">
                                                <span>Font:</span>
                                                <select
                                                    onChange={(e) =>
                                                        onTemplateChange("fontFamily")(
                                                            e.target.value
                                                        )
                                                    }
                                                    value={templateDesign.fontFamily}
                                                    className={`${defaultBoxClassName} h-12`}
                                                >
                                                    {fontFamilyList.map((item) => (
                                                        <option
                                                            key={item.label}
                                                            value={item.label}
                                                        >
                                                            {item.label}
                                                        </option>
                                                    ))}
                                                </select>
                                                <input
                                                    id="border-thickness"
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
                                            <div className="mt-3 flex justify-between flex-row items-center">
                                                <span>Font weight:</span>
                                                <select
                                                    onChange={(e) =>
                                                        onTemplateChange("fontWeight")(
                                                            e.target.value
                                                        )
                                                    }
                                                    value={templateDesign.fontWeight}
                                                    className={`${defaultBoxClassName} h-12`}
                                                >
                                                    <option value="700">Bold</option>
                                                    <option value="400">Normal</option>
                                                    <option value="800">Extra Bold</option>
                                                </select>
                                            </div>
                                            <div className="mt-3 flex justify-between flex-row items-center">
                                                <span>Letter Spacing(px):</span>
                                                <input
                                                    id="letter-spacing"
                                                    type="number"
                                                    className={`${defaultBoxClassName} h-10`}
                                                    placeholder="px"
                                                    value={
                                                        templateDesign.letterSpacing.replace(
                                                            "px",
                                                            ""
                                                        ) || ""
                                                    }
                                                    onChange={(e) =>
                                                        onTemplateChange("letterSpacing")(
                                                            e.target.value + "px"
                                                        )
                                                    }
                                                />
                                            </div>
                                            {inputTextColorFields.map(
                                                ({ label, colorType }) => (
                                                    <div
                                                        className="mt-3 flex justify-between items-center"
                                                        key={colorType}
                                                    >
                                                        <span>{label}:</span>
                                                        <ColorPicker
                                                            defaultColor={
                                                                templateDesign[colorType]
                                                            }
                                                            onChange={onTemplateChange(
                                                                colorType
                                                            )}
                                                        />
                                                    </div>
                                                )
                                            )}
                                        </div>
                                        <div className="mb-4.5 border-b border-black pb-4">
                                            <label className="mb-2.5 block text-black dark:text-white font-semibold">
                                                Input Field Styles
                                            </label>
                                            {inputColorFields.map(
                                                ({ label, colorType }) => (
                                                    <div
                                                        className="mt-3 flex justify-between items-center"
                                                        key={colorType}
                                                    >
                                                        <span>{label}:</span>
                                                        <ColorPicker
                                                            defaultColor={
                                                                templateDesign[colorType]
                                                            }
                                                            onChange={onTemplateChange(
                                                                colorType
                                                            )}
                                                        />
                                                    </div>
                                                )
                                            )}
                                        </div>
                                        <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                            Save
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

export default StyleComponent