/* eslint-disable react/prop-types */
import { Tooltip } from "react-tippy";
import {
  defaultBoxClassName,
  fontFamilyList,
} from "../../pages/forms/masterFormConfig";
import { CameraIcon } from "../custIcon/svgIcon";
import ColorPicker from "../higherOrderComponent/ColorPicker/ColorPicker";
import { useState } from "react";

const EmailTemplateCartControllerComponent = ({
  emailTemplateJSON,
  setEmailTemplateJSON,
}) => {
  const [editingTextComponentIndex, setEditingTextComponentIndex] =
    useState(null);

  const handleTextAddComponent = () => {
    setEmailTemplateJSON((prev) => ({
      ...prev,
      cart_banner_style: {
        ...prev.cart_banner_style,
        text_components: [
          ...prev.cart_banner_style.text_components,
          {
            heading: "New Heading",
            font_size: "16px",
            font_family: "Arial, sans-serif",
            text_color: "black",
          },
        ],
      },
    }));
  };

  const handleEditTextComponent = (index, newValues) => {
    setEmailTemplateJSON((prev) => {
      const updatedTextComponents = [...prev.cart_banner_style.text_components];
      updatedTextComponents[index] = {
        ...updatedTextComponents[index],
        ...newValues,
      };
      return {
        ...prev,
        cart_banner_style: {
          ...prev.cart_banner_style,
          text_components: updatedTextComponents,
        },
      };
    });
  };

  const handleDeleteTextComponent = (index) => {
    setEmailTemplateJSON((prev) => {
      const updatedTextComponents =
        prev.cart_banner_style.text_components.filter((_, i) => i !== index);
      return {
        ...prev,
        cart_banner_style: {
          ...prev.cart_banner_style,
          text_components: updatedTextComponents,
        },
      };
    });
  };

  return (
    <div className="p-4 border-t">
      <div className="p-4 bg-white rounded-lg shadow-lg mb-4">
        <label className="text-lg font-bold mb-6 text-gray-700 dark:text-white">
          Logo Upload
        </label>

        <label
          htmlFor="cover"
          className="mt-2 flex cursor-pointer items-center justify-center gap-2 rounded-md bg-blue-500 py-3 px-2 text-sm font-medium text-white hover:bg-blue-600 xsm:px-4"
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
                  setEmailTemplateJSON((prev) => ({
                    ...prev,
                    cart_banner_style: {
                      ...prev.cart_banner_style,
                      imageIcon: reader.result,
                    },
                  }));
                };
                reader.readAsDataURL(file);
              }
            }}
          />
          <span>
            <CameraIcon />
          </span>
          <span>Upload</span>
        </label>
      </div>
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5 p-4 bg-white rounded-lg shadow-lg " >
        <div className="col-span-12 xl:col-span-12">
          <div className="space-y-3 max-h-[380px] overflow-y-auto overflow-x-hidden pr-2">
            {emailTemplateJSON?.cart_banner_style?.text_components.map(
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
                          <span className="mr-2 font-semibold">
                            Font Size:
                          </span>
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
                          <span className="mr-2 font-semibold">
                          Color:
                          </span>
                        <ColorPicker
                          defaultColor={component.text_color}
                          onChange={(color) =>
                            handleEditTextComponent(index, {
                              text_color: color,
                            })
                          }
                        />
                        </div>
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
            className="mt-6 w-full bg-blue-500 text-white rounded-lg px-4 py-2"
          >
            Add Text
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailTemplateCartControllerComponent;
