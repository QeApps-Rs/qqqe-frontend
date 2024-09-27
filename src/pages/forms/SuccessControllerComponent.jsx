import React, { useState } from "react";
import { toast } from "react-hot-toast";
import DropDown from "../../components/higherOrderComponent/Dropdown/Dropdown";
import {
  defaultBoxClassName,
  fontFamilyList,
  successContainPositionDropdownData,
} from "./masterFormConfig";
import { CameraIcon } from "../../components/custIcon/svgIcon";
import ColorPicker from "../../components/higherOrderComponent/ColorPicker/ColorPicker";
const SuccessControllerComponent = ({
  templateData,
  setTemplateData,
  templateDesign,
  onTemplateChange,
}) => {
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
                              setTemplateData((prev) => ({
                                ...prev,
                                successImage: reader.result,
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
                        ...successContainPositionDropdownData,
                        onChange: onTemplateChange("containPosition"),
                        defaultValue: templateDesign.containPosition,
                      }}
                    />
                  </div>
                  <div className={inputControllerFieldClass}>
                    <label className="mb-2.5 block text-black dark:text-white font-semibold">
                      Template Heading
                    </label>
                    <input
                      type="text"
                      value={templateData.successHeading}
                      onChange={(e) =>
                        setTemplateData((prev) => ({
                          ...prev,
                          successHeading: e.target.value,
                        }))
                      }
                      placeholder="pleaser enter template heading"
                      className="w-full p-2 border rounded-md focus:outline-none"
                    />

                    <div className="mt-3 flex justify-between flex-row items-center">
                      <span className="mr-2">Font:</span>
                      <select
                        onChange={(e) =>
                          onTemplateChange("successHeadingFontFamily")(
                            e.target.value
                          )
                        }
                        value={templateDesign.successHeadingFontFamily}
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
                          templateDesign.successHeadingFontSize.replace(
                            "px",
                            ""
                          ) || ""
                        }
                        onChange={(e) =>
                          onTemplateChange("successHeadingFontSize")(
                            e.target.value + "px"
                          )
                        }
                      />
                    </div>
                    <div className="flex items-center mt-3">
                      <span className="mr-2">Color:</span>
                      <ColorPicker
                        defaultColor={templateDesign.successHeadingColor}
                        onChange={(color) =>
                          onTemplateChange("successHeadingColor")(color)
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
                      value={templateData.successSubHeading}
                      onChange={(e) =>
                        setTemplateData((prev) => ({
                          ...prev,
                          successSubHeading: e.target.value,
                        }))
                      }
                      placeholder="pleaser enter template sub-heading"
                      className="w-full p-2 border rounded-md focus:outline-none"
                    />
                    <div className="mt-3 flex justify-between flex-row items-center">
                      <span className="mr-2">Font:</span>
                      <select
                        onChange={(e) =>
                          onTemplateChange("successSubHeadingFontFamily")(
                            e.target.value
                          )
                        }
                        value={templateDesign.successSubHeadingFontFamily}
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
                          templateDesign.successSubHeadingFontSize.replace(
                            "px",
                            ""
                          ) || ""
                        }
                        onChange={(e) =>
                          onTemplateChange("successSubHeadingFontSize")(
                            e.target.value + "px"
                          )
                        }
                      />
                    </div>
                    <div className="flex items-center mt-3">
                      <span className="mr-2">Color:</span>
                      <ColorPicker
                        defaultColor={templateDesign.successSubHeadingColor}
                        onChange={(color) =>
                          onTemplateChange("successSubHeadingColor")(color)
                        }
                      />
                    </div>
                  </div>
                  <div className={`mt-4 ${inputControllerFieldClass}`}>
                    <label className="mb-2.5 block text-black dark:text-white font-semibold">
                      Description
                    </label>
                    <input
                      type="text"
                      value={templateData.successDescription}
                      onChange={(e) =>
                        setTemplateData((prev) => ({
                          ...prev,
                          successDescription: e.target.value,
                        }))
                      }
                      placeholder="pleaser enter template offer number"
                      className="w-full p-2 border rounded-md focus:outline-none"
                    />
                    <div className="mt-3 flex justify-between flex-row items-center">
                      <span className="mr-2">Font:</span>
                      <select
                        onChange={(e) =>
                          onTemplateChange("successDescriptionFontFamily")(
                            e.target.value
                          )
                        }
                        value={templateDesign.successDescriptionFontFamily}
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
                          templateDesign.successDescriptionFontSize.replace(
                            "px",
                            ""
                          ) || ""
                        }
                        onChange={(e) =>
                          onTemplateChange("successDescriptionFontSize")(
                            e.target.value + "px"
                          )
                        }
                      />
                    </div>
                    <div className="flex items-center mt-3">
                      <span className="mr-2">Color:</span>
                      <ColorPicker
                        defaultColor={templateDesign.successDescriptionColor}
                        onChange={(color) =>
                          onTemplateChange("successDescriptionColor")(color)
                        }
                      />
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
export default SuccessControllerComponent;
