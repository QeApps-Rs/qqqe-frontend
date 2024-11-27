import { Tooltip } from "react-tippy";
import { CameraIcon } from "../custIcon/svgIcon";
import { useState } from "react";
import ColorPicker from "../higherOrderComponent/ColorPicker/ColorPicker";
import {
  defaultBoxClassName,
  fontFamilyList,
} from "../../pages/forms/masterFormConfig";

/* eslint-disable react/prop-types */
const EmailTemplateBadgeControllerComponent = ({
  emailTemplateJSON,
  setEmailTemplateJSON,
  handleEmailTemplateChange,
  isAbandonmentCartSecondDesign
}) => {
  const inputControllerFieldClass =
    "p-3 rounded-lg border border-stroke bg-white shadow-default mb-4 ";
  const [editingTextComponentIndex, setEditingTextComponentIndex] =
    useState(null);
  const handleBadgeChange = (index, key, value) => {
    setEmailTemplateJSON((prev) => {
      const updatedBadges = [...prev.badge_section_style.badge_icon];
      updatedBadges[index] = { ...updatedBadges[index], [key]: value };
      return {
        ...prev,
        badge_section_style: {
          ...prev.badge_section_style,
          badge_icon: updatedBadges,
        },
      };
    });
  };

  const handleAddBadge = () => {
    setEmailTemplateJSON((prev) => ({
      ...prev,
      badge_section_style: {
        ...prev.badge_section_style,
        badge_icon: [
          ...prev.badge_section_style.badge_icon,
          { badgeImage: "", badgeName: "New Badge" },
        ],
      },
    }));
  };

  const handleDeleteBadge = (index) => {
    setEmailTemplateJSON((prev) => ({
      ...prev,
      badge_section_style: {
        ...prev.badge_section_style,
        badge_icon: prev.badge_section_style.badge_icon.filter(
          (_, i) => i !== index
        ),
      },
    }));
  };
  const handleDeleteTextComponent = (index) => {
    setEmailTemplateJSON((prev) => {
      const updatedTextComponents =
        prev.badge_section_style.text_components.filter((_, i) => i !== index);
      return {
        ...prev,
        badge_section_style: {
          ...prev.badge_section_style,
          text_components: updatedTextComponents,
        },
      };
    });
  };

  const handleEditTextComponent = (index, newValues) => {
    setEmailTemplateJSON((prev) => {
      const updatedTextComponents = [
        ...prev.badge_section_style.text_components,
      ];
      updatedTextComponents[index] = {
        ...updatedTextComponents[index],
        ...newValues,
      };
      return {
        ...prev,
        badge_section_style: {
          ...prev.badge_section_style,
          text_components: updatedTextComponents,
        },
      };
    });
  };
  const handleTextAddComponent = () => {
    setEmailTemplateJSON((prev) => ({
      ...prev,
      badge_section_style: {
        ...prev.badge_section_style,
        text_components: [
          ...prev.badge_section_style.text_components,
          {
            heading: "New Heading",
            font_size: "16",
            font_family: "Arial, sans-serif",
            text_color: "#000000",
            text_position: "center",
          },
        ],
      },
    }));
  };

  return (
    <div className="p-4 border-t border-white">
      {isAbandonmentCartSecondDesign && <div className={inputControllerFieldClass}>
        <div className="col-span-12 xl:col-span-12">
          <div className="space-y-3 max-h-[380px] overflow-y-auto overflow-x-hidden pr-2">
            {emailTemplateJSON?.badge_section_style?.text_components.map(
              (component, index) => (
                <div
                  key={index}
                  className="relative items-start p-4 bg-white rounded-lg shadow-lg border border-bodydark"
                >
                  <div className="flex  justify-end top-1 right-3  absolute ">
                    <Tooltip title="Delete" position="top">
                      <button
                        onClick={() => handleDeleteTextComponent(index)}
                        className="text-red-500 "
                      >
                        <i className="fa fa-times"></i>
                      </button>
                    </Tooltip>
                  </div>

                  <div className="mt-6">
                    {editingTextComponentIndex === index ? (
                      <>
                        <input
                          type="text"
                          value={component.heading}
                          onChange={(e) =>
                            handleEditTextComponent(index, {
                              heading: e.target.value,
                            })
                          }
                          className="w-full p-2 border rounded-md"
                          placeholder="Edit heading"
                        />
                        <div className="mt-3 flex justify-between items-center">
                          <span className="mr-2 font-semibold">
                            Font Family:
                          </span>
                          <select
                            value={component.font_family}
                            onChange={(e) =>
                              handleEditTextComponent(index, {
                                font_family: e.target.value,
                              })
                            }
                            className={`${defaultBoxClassName} h-12 mr-2`}
                          >
                            {fontFamilyList.map((item) => (
                              <option key={item.label} value={item.label}>
                                {item.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="mt-3 flex justify-between items-center">
                          <span className="mr-2 font-semibold">Font Size:</span>
                          <input
                            type="number"
                            value={parseInt(component.font_size) || "16"}
                            onChange={(e) =>
                              handleEditTextComponent(index, {
                                font_size: e.target.value + "px",
                              })
                            }
                            className={`${defaultBoxClassName} h-12`}
                          />
                        </div>
                        <div className="mt-3 flex justify-between items-center">
                          <span className="mr-2 font-semibold">Color:</span>
                          <ColorPicker
                            defaultColor={component.text_color}
                            onChange={(color) =>
                              handleEditTextComponent(index, {
                                text_color: color,
                              })
                            }
                          />
                        </div>
                        {/* <div className="mt-3 flex justify-between items-center">
                          <span className="mr-2 font-semibold">
                            Text Position:
                          </span>
                          <select
                            value={component.text_position}
                            onChange={(e) =>
                              handleEditTextComponent(index, {
                                text_position: e.target.value,
                              })
                            }
                            className={`${defaultBoxClassName} h-12 mr-2`}
                          >
                            {textPositionList.map((item) => (
                              <option key={item.label} value={item.label}>
                                {item.label}
                              </option>
                            ))}
                          </select>
                        </div> */}
                        <button
                          onClick={() => setEditingTextComponentIndex(null)}
                          className="mt-2 w-full bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600"
                        >
                          Save
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="block text-gray-800 font-semibold">
                          {component.heading}
                        </span>
                        <Tooltip title="Edit" position="top">
                          <button
                            onClick={() => setEditingTextComponentIndex(index)}
                            className="text-blue-500"
                          >
                            <i className="fa fa-pencil mr-1"></i>
                            Edit
                          </button>
                        </Tooltip>
                      </>
                    )}
                  </div>
                </div>
              )
            )}
          </div>
          <button
            onClick={handleTextAddComponent}
            className="mt-6 w-full bg-blue-500 hover:bg-blue-700 text-white rounded-lg px-4 py-2"
          >
            Add Text
          </button>
        </div>
      </div>}

      <div className={inputControllerFieldClass}>
        <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2">
          {emailTemplateJSON?.badge_section_style?.badge_icon?.map(
            (badge, index) => (
              <div
                key={index}
                className="relative p-4 bg-white rounded-lg shadow-lg border border-bodydark"
              >
                {/* Badge Image Upload */}
                <Tooltip title="Delete" position="top" trigger="mouseenter">
                  <button
                    type="button"
                    onClick={() => handleDeleteBadge(index)}
                    className="text-red-500 hover:text-red-700 dark:hover:text-red-400 ml-4 absolute top-2 right-2"
                  >
                    <i className="fa fa-times" aria-hidden="true"></i>
                  </button>
                </Tooltip>
                <label
                  htmlFor={`badgeImage-${index}`}
                  className="mt-4 justify-center flex cursor-pointer items-center gap-2 rounded-md bg-blue-500 py-2 px-4 text-sm font-medium text-white hover:bg-blue-600"
                >
                  <input
                    type="file"
                    id={`badgeImage-${index}`}
                    className="sr-only"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          handleBadgeChange(index, "badgeImage", reader.result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <CameraIcon />
                  <span>Upload</span>
                </label>

                {/* Display Uploaded Image */}
                {/* {badge.badgeImage && (
                  <img
                    src={badge.badgeImage}
                    alt="Badge"
                    className="h-12 w-12 object-contain rounded-full ml-4"
                  />
                )} */}

                {/* Edit Badge Name */}
                <input
                  type="text"
                  value={badge.badgeName}
                  onChange={(e) =>
                    handleBadgeChange(index, "badgeName", e.target.value)
                  }
                  className="mt-4 p-2 border rounded-md w-full"
                  placeholder="Edit Badge Name"
                />
              </div>
            )
          )}
        </div>

        {/* Add New Badge Button */}
        <button
          type="button"
          onClick={handleAddBadge}
          className="mt-6 w-full bg-blue-500 text-white font-semibold rounded-lg shadow-md px-4 py-2 transition-all duration-200 hover:bg-blue-600"
        >
          Add Badge
        </button>
      </div>

      <div className={inputControllerFieldClass}>
      <div className="flex items-center mt-4 justify-between items-center">
          <span className="mr-2 font-semibold">Color:</span>
          <ColorPicker
            defaultColor={emailTemplateJSON.badge_section_style.background_color}
            onChange={(color) =>
              handleEmailTemplateChange({ background_color: color }, "badge_section_style")
            }
          />
        </div>
        <div className="mt-3 flex justify-between items-center">

          <span className="mr-2 font-semibold">Font Family:</span>
          <select
            onChange={(e) =>
              handleEmailTemplateChange(
                { font_family: e.target.value },
                "badge_section_style"
              )
            }
            value={emailTemplateJSON.badge_section_style.font_family}
            className={`${defaultBoxClassName} h-12 mr-2`}
          >
            {fontFamilyList.map((item) => (
              <option key={item.label} value={item.label}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-3 flex justify-between items-center">
          <span className="mr-2 font-semibold">Font Size:</span>
          <input
            id="border-thickness"
            type="number"
            className={`${defaultBoxClassName} h-12`}
            placeholder="px"
            value={
              parseInt(emailTemplateJSON.badge_section_style.font_size) || ""
            }
            onChange={(e) =>
              handleEmailTemplateChange(
                { font_size: e.target.value + "px" },
                "badge_section_style"
              )
            }
          />
        </div>
        <div className="flex items-center mt-4 justify-between items-center">
          <span className="mr-2 font-semibold">Color:</span>
          <ColorPicker
            defaultColor={emailTemplateJSON.badge_section_style.color}
            onChange={(color) =>
              handleEmailTemplateChange({ color: color }, "badge_section_style")
            }
          />
        </div>
      </div>
    </div>
  );
};

export default EmailTemplateBadgeControllerComponent;
