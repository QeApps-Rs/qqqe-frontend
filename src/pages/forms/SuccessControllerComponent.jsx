/* eslint-disable react/prop-types */
import DropDown from "../../components/higherOrderComponent/Dropdown/Dropdown";
import {
  defaultBoxClassName,
  fontFamilyList,
  successContainPositionDropdownData,
} from "./masterFormConfig";
import { CameraIcon } from "../../components/custIcon/svgIcon";
import ColorPicker from "../../components/higherOrderComponent/ColorPicker/ColorPicker";
const SuccessControllerComponent = ({
  templateDesign,
  onTemplateChange,
  setTemplateDesign,
}) => {
  return (
    <div className="p-4 border-t border-white">
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-12">
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
            <div className="w-full flex flex-col gap-9">
              <form action="#" onSubmit={(e) => e.preventDefault()}>
                <div className="p-4 rounded-lg border border-stroke bg-white shadow-default mb-4">
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
                  <DropDown
                    jsonData={{
                      ...successContainPositionDropdownData,
                    }}
                    selectedValue={templateDesign.containPosition}
                    setSelectedValue={onTemplateChange("containPosition")}
                  />
                </div>
                <div className="p-4 rounded-lg border border-stroke bg-white shadow-default mb-4">
                  <label className="mb-2.5 block text-black dark:text-white font-semibold">
                    Template Heading
                  </label>
                  <input
                    type="text"
                    value={templateDesign.successHeading}
                    onChange={(e) =>
                      setTemplateDesign((prev) => ({
                        ...prev,
                        successHeading: e.target.value,
                      }))
                    }
                    placeholder="pleaser enter template heading"
                    className="w-full p-2 border rounded-md focus:outline-none"
                  />

                  <div className="mt-3 flex justify-between flex-row items-center">
                    <span className="block font-semibold">Font:</span>
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
                      min="0"
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
                  <div className="flex items-center mt-3 justify-between">
                    <span className="block font-semibold">Color:</span>
                    <ColorPicker
                      defaultColor={templateDesign.successHeadingColor}
                      onChange={(color) =>
                        onTemplateChange("successHeadingColor")(color)
                      }
                    />
                  </div>
                </div>
                <div className="p-4 rounded-lg border border-stroke bg-white shadow-default mb-4">
                  <label className="mb-2.5 block text-black dark:text-white font-semibold">
                    Template Sub-heading
                  </label>

                  <input
                    type="text"
                    value={templateDesign.successSubHeading}
                    onChange={(e) =>
                      setTemplateDesign((prev) => ({
                        ...prev,
                        successSubHeading: e.target.value,
                      }))
                    }
                    placeholder="pleaser enter template sub-heading"
                    className="w-full p-2 border rounded-md focus:outline-none cursor-not-allowed"
                    disabled
                  />
                  <div className="mt-3 flex justify-between flex-row items-center">
                    <span className="block font-semibold">Font:</span>
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
                      min="0"
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
                  <div className="flex items-center mt-3 justify-between">
                    <span className="block font-semibold">Color:</span>
                    <ColorPicker
                      defaultColor={templateDesign.successSubHeadingColor}
                      onChange={(color) =>
                        onTemplateChange("successSubHeadingColor")(color)
                      }
                    />
                  </div>
                </div>
                <div className="p-4 rounded-lg border border-stroke bg-white shadow-default mb-4">
                  <label className="mb-2.5 block text-black dark:text-white font-semibold">
                    Description
                  </label>
                  <input
                    type="text"
                    value={templateDesign.successDescription}
                    onChange={(e) =>
                      setTemplateDesign((prev) => ({
                        ...prev,
                        successDescription: e.target.value,
                      }))
                    }
                    placeholder="pleaser enter template offer number"
                    className="w-full p-2 border rounded-md focus:outline-none"
                  />
                  <div className="mt-3 flex justify-between flex-row items-center">
                    <span className="block font-semibold">Font:</span>
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
                      min="0"
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
                  <div className="flex items-center mt-3 justify-between">
                    <span className="block font-semibold">Color:</span>
                    <ColorPicker
                      defaultColor={templateDesign.successDescriptionColor}
                      onChange={(color) =>
                        onTemplateChange("successDescriptionColor")(color)
                      }
                    />
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
