/* eslint-disable react/prop-types */
import { useState } from "react";
import toast from "react-hot-toast";
import { Tooltip } from "react-tippy";
import { CameraIcon } from "../custIcon/svgIcon";
import ColorPicker from "../higherOrderComponent/ColorPicker/ColorPicker";
import {
  borderStyles,
  defaultBoxClassName,
  fontFamilyList,
} from "../../pages/forms/masterFormConfig";

const EmailTemplateControllerComponent = ({
  uploadedIcon,
  setUploadedIcon,
  emailTemplateJSON,
  setEmailTemplateJSON,
  handleEmailTemplateChange,
}) => {
  const styleFieldTitleClass =
    "text-lg font-bold mb-6 text-gray-700 dark:text-white";

  const [newButtonName, setNewButtonName] = useState("");
  const [newButtonUrl, setNewButtonUrl] = useState("");
  const [editingButtonIndex, setEditingButtonIndex] = useState(null);
  const [showAddFields, setShowAddFields] = useState(false);
  const [advanceDesignOption, setAdvanceDesignOption] = useState(false);

  const handleAdvanceDesignOption = () => {
    setAdvanceDesignOption(!advanceDesignOption);
  };

  const handleAddButtonClick = () => {
    setShowAddFields(true);
    setNewButtonName("");
    setNewButtonUrl("");
  };

  const handleCloseButtonClick = () => {
    setShowAddFields(false);
  };

  const addButton = () => {
    if (newButtonName.trim() === "" || newButtonUrl.trim() === "") {
      toast.error("Please fill out both fields before adding.");
      return;
    }
    setEmailTemplateJSON((prev) => ({
      ...prev,
      header_banner_style: {
        ...prev.header_banner_style,
        nav_links: [
          ...prev.header_banner_style.nav_links,
          { navName: newButtonName, navUrl: newButtonUrl },
        ],
      },
    }));
    toast.success("Button added successfully!");
    setShowAddFields(false);
    setNewButtonName("");
    setNewButtonUrl("");
  };

  const editButton = (index) => {
    const button = emailTemplateJSON.header_banner_style.nav_links[index];
    setEditingButtonIndex(index);
    setNewButtonName(button.navName);
    setNewButtonUrl(button.navUrl);
  };

  const saveEditButton = () => {
    setEmailTemplateJSON((prev) => {
      const updatedNavLinks = [...prev.header_banner_style.nav_links];
      updatedNavLinks[editingButtonIndex] = {
        navName: newButtonName,
        navUrl: newButtonUrl,
      };
      return {
        ...prev,
        header_banner_style: {
          ...prev.header_banner_style,
          nav_links: updatedNavLinks,
        },
      };
    });
    toast.success("Changes saved successfully!");
    setNewButtonName("");
    setNewButtonUrl("");
    setEditingButtonIndex(null);
  };

  const deleteButton = (index) => {
    setEmailTemplateJSON((prev) => ({
      ...prev,
      header_banner_style: {
        ...prev.header_banner_style,
        nav_links: prev.header_banner_style.nav_links.filter(
          (_, i) => i !== index
        ),
      },
    }));
    toast.success("Button deleted successfully!");
  };

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

  return (
    <div className="p-4 border-t border-white">
      <div className="p-4 bg-white rounded-lg shadow-lg mb-4">
        <label className={styleFieldTitleClass}>Logo Upload</label>
        <label
          htmlFor="cover"
          className="mt-2 flex cursor-pointer items-center justify-center gap-2 rounded-md bg-blue-500 py-3 px-2 text-sm font-medium text-white hover:bg-blue-600 xsm:px-4"
        >
          <input
            type="file"
            name="cover"
            id="cover"
            accept="image/*"
            className="sr-only"
            onChange={(e) =>
              setEmailTemplateJSON((prev) => ({
                ...prev,
                header_banner_style: {
                  ...prev.header_banner_style,
                  imageIcon: URL.createObjectURL(e.target.files[0]),
                },
              }))
            }
          />
          <CameraIcon className="h-5 w-5 text-gray-700" />
          <span>Upload Logo</span>
        </label>
      </div>
      <div className="p-4 bg-white rounded-lg shadow-lg">
        <h2 className={styleFieldTitleClass}>Manage Navigation Buttons</h2>

        <div className=" max-h-[300px] overflow-auto pr-2  overflow-x-hidden">
          {emailTemplateJSON?.header_banner_style?.nav_links.map(
            (button, index) => (
              <div
                key={index}
                className="relative items-start mb-6 p-4 bg-white  rounded-lg shadow-lg border border-bodydark "
              >
                <div className="flex  justify-end top-1 right-3  absolute ">
                  <Tooltip title="Delete" position="top" trigger="mouseenter">
                    <button
                      type="button"
                      onClick={() => deleteButton(index)}
                      className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors duration-200 ml-4"
                    >
                      <i className="fa fa-times" aria-hidden="true"></i>
                    </button>
                  </Tooltip>
                </div>
                <div className="flex-grow">
                  {editingButtonIndex === index ? (
                    <div>
                      <label className="block mb-2 text-gray-700 dark:text-gray-200 font-semibold">
                        Button Name
                      </label>
                      <input
                        type="text"
                        value={newButtonName}
                        onChange={(e) => setNewButtonName(e.target.value)}
                        className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-lg shadow-sm mb-2 dark:bg-gray-800 dark:text-white"
                        placeholder="Edit button name"
                      />
                      <label className="block mt-4 mb-2 text-gray-700 dark:text-gray-200 font-semibold">
                        Button URL
                      </label>
                      <input
                        type="text"
                        value={newButtonUrl}
                        onChange={(e) => setNewButtonUrl(e.target.value)}
                        className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-lg shadow-sm dark:bg-gray-800 dark:text-white"
                        placeholder="Edit button URL"
                      />
                      <div className="flex justify-end mt-2">
                        <button
                          type="button"
                          onClick={saveEditButton}
                          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-200"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <span className="block text-gray-800 dark:text-gray-300 font-semibold">
                        {button.navName}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 text-sm">
                        {button.navUrl}
                      </span>
                      <div className="mt-2">
                        <Tooltip
                          title="Edit"
                          position="top"
                          trigger="mouseenter"
                        >
                          <button
                            type="button"
                            onClick={() => editButton(index)}
                            className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition-colors duration-200"
                          >
                            <i className="fa fa-pencil" aria-hidden="true"></i>{" "}
                            Edit
                          </button>
                        </Tooltip>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          )}
        </div>

        {showAddFields && (
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md my-6">
            <label className="block mb-2 text-gray-700 dark:text-gray-200 font-semibold">
              Nav Button Name
            </label>
            <input
              type="text"
              value={newButtonName}
              onChange={(e) => setNewButtonName(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg shadow-sm focus:border-blue-500 focus:outline-none transition-all duration-300 dark:bg-gray-800 dark:text-white"
              placeholder="Enter name"
            />

            <label className="block mt-4 mb-2 text-gray-700 dark:text-gray-200 font-semibold">
              Nav Button URL
            </label>
            <input
              type="text"
              value={newButtonUrl}
              onChange={(e) => setNewButtonUrl(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg shadow-sm focus:border-blue-500 focus:outline-none transition-all duration-300 dark:bg-gray-800 dark:text-white"
              placeholder="Enter URL"
            />

            <div className="flex justify-end mt-4 space-x-2">
              <button
                type="button"
                onClick={addButton}
                className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-lg hover:bg-green-600 transition-all duration-200"
              >
                Add Nav Button
              </button>
              <button
                type="button"
                onClick={handleCloseButtonClick}
                className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md transition-all duration-200 hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {!showAddFields && editingButtonIndex === null && (
          <button
            type="button"
            onClick={handleAddButtonClick}
            className="mt-5 w-full bg-blue-500 text-white font-semibold rounded-lg shadow-md px-4 py-2 transition-all duration-200 hover:bg-blue-600"
          >
            Add New Nav Button
          </button>
        )}
      </div>

      <div className="p-4 bg-white rounded-lg shadow-lg my-4">
        <div className="flex items-center justify-between items-center">
          <span className="mr-2 font-semibold">Background Color:</span>
          <ColorPicker
            defaultColor={
              emailTemplateJSON.header_banner_style.background_color
            }
            onChange={(color) =>
              handleEmailTemplateChange(
                { background_color: color },
                "header_banner_style"
              )
            }
          />
        </div>
        <div className="flex items-center mt-4 justify-between i">
          <span className="mr-2 font-semibold">Navbar Text Color:</span>
          <ColorPicker
            defaultColor={
              emailTemplateJSON.header_banner_style.nav_bar_text_color
            }
            onChange={(color) =>
              handleEmailTemplateChange(
                { nav_bar_text_color: color },
                "header_banner_style"
              )
            }
          />
        </div>
        {advanceDesignOption && (
          <>
            <div className="mt-3 flex justify-between items-center">
              <span className="mr-2 font-semibold">Navbar Font Family:</span>
              <select
                onChange={(e) =>
                  handleEmailTemplateChange(
                    { nav_bar_font_family: e.target.value },
                    "header_banner_style"
                  )
                }
                value={
                  emailTemplateJSON.header_banner_style.nav_bar_font_family
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
              <span className="mr-2 font-semibold">Navbar Font Size:</span>
              <input
                id="border-thickness"
                type="number"
                className={`${defaultBoxClassName} h-12`}
                placeholder="px"
                value={
                  parseInt(
                    emailTemplateJSON.header_banner_style.nav_bar_font_size
                  ) || ""
                }
                onChange={(e) =>
                  handleEmailTemplateChange(
                    { nav_bar_font_size: e.target.value + "px" },
                    "header_banner_style"
                  )
                }
              />
            </div>
            <div className="mt-3 flex justify-between items-center">
              <span className="mr-2 font-semibold">Border Radius:</span>
              <input
                id="border-thickness"
                type="number"
                className={`${defaultBoxClassName} h-12`}
                placeholder="px"
                value={
                  parseInt(
                    emailTemplateJSON.header_banner_style.border_radius
                  ) || ""
                }
                onChange={(e) =>
                  handleEmailTemplateChange(
                    { border_radius: e.target.value + "px" },
                    "header_banner_style"
                  )
                }
              />
            </div>
            <div className="mt-3 flex justify-between flex-row items-center">
              <span className="mr-2 font-semibold">Border Style:</span>
              <select
                onChange={(e) =>
                  handleEmailTemplateChange(
                    { border_style: e.target.value },
                    "header_banner_style"
                  )
                }
                value={emailTemplateJSON.header_banner_style.border_style}
                className={`${defaultBoxClassName} h-12`}
              >
                {borderStyles.map((style) => (
                  <option key={style.value} value={style.value}>
                    {style.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-3 flex justify-between items-center">
              <span className="mr-2 font-semibold">Border Width:</span>
              <input
                id="border-thickness"
                type="number"
                className={`${defaultBoxClassName} h-12`}
                placeholder="px"
                value={
                  parseInt(
                    emailTemplateJSON.header_banner_style.border_width
                  ) || ""
                }
                onChange={(e) =>
                  handleEmailTemplateChange(
                    { border_width: e.target.value + "px" },
                    "header_banner_style"
                  )
                }
              />
            </div>
            <div className="flex items-center mt-4 justify-between items-center">
              <span className="mr-2 font-semibold">Border Color:</span>
              <ColorPicker
                defaultColor={
                  emailTemplateJSON.header_banner_style.border_color
                }
                onChange={(color) =>
                  handleEmailTemplateChange(
                    { border_color: color },
                    "header_banner_style"
                  )
                }
              />
            </div>
            <div className="mt-3">
              <span className="mr-2 font-semibold">Padding (PX):</span>
              <div className="grid grid-cols-2">
                {["top", "bottom", "left", "right"].map((position, i) =>
                  renderPaddingMarginField(
                    `${position}`,
                    emailTemplateJSON.header_banner_style[
                      `padding_${position}`
                    ],
                    (value) =>
                      handleEmailTemplateChange(
                        { [`padding_${position}`]: value },
                        "header_banner_style"
                      ),
                    `padding_${position}`,
                    "px",
                    i
                  )
                )}
              </div>
            </div>
            <div className="mt-3">
              <span className="mr-2 font-semibold">Margin (PX):</span>
              <div className="grid grid-cols-2">
                {["top", "bottom", "left", "right"].map((position, i) =>
                  renderPaddingMarginField(
                    `${position}`,
                    emailTemplateJSON.header_banner_style[
                      `margin_${position}`
                    ],
                    (value) =>
                      handleEmailTemplateChange(
                        { [`margin_${position}`]: value },
                        "header_banner_style"
                      ),
                    `margin_${position}`,
                    "px",
                    i
                  )
                )}
              </div>
            </div>{" "}
          </>
        )}

        <span
          type="button"
          className="inline-flex items-center text-blue-600 font-semibold p-2 mt-4 rounded transition-colors duration-200 ease-in-out hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          onClick={handleAdvanceDesignOption}
        >
          {advanceDesignOption ? (
            <>
              <span>Hide design options</span>
              <i
                className="fa fa-arrow-up ml-2 w-5 h-5 transform transition-transform duration-300 rotate-180"
                aria-hidden="true"
              ></i>
            </>
          ) : (
            <>
              <span>More design options</span>
              <i
                className="fa fa-arrow-down ml-2 w-5 h-5 transform transition-transform duration-300"
                aria-hidden="true"
              ></i>
            </>
          )}
        </span>
      </div>
    </div>
  );
};

export default EmailTemplateControllerComponent;
