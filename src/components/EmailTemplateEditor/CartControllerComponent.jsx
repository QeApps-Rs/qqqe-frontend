import { Tooltip } from "react-tippy";
import {
  defaultBoxClassName,
  fontFamilyList,
} from "../../pages/forms/masterFormConfig";
import { CameraIcon } from "../custIcon/svgIcon";
import ColorPicker from "../higherOrderComponent/ColorPicker/ColorPicker";

/* eslint-disable react/prop-types */
const EmailTemplateCartControllerComponent = ({
  emailTemplateJSON,
  handleEmailTemplateChange,
  setEmailTemplateJSON,
}) => {
  const inputControllerFieldClass =
    "p-3 rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark";

  const handleTextAddComponent = () => {
    console.log("first");
  };
  return (
    <div className="p-4 border-t">
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-12">
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
            <div className="w-full flex flex-col gap-9">
              <form action="#" onSubmit={(e) => e.preventDefault()}>
                <div className={inputControllerFieldClass}>
                  <div className="mb-6">
                    <label className="block text-black dark:text-white font-semibold">
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
                  <div className="mb-6">
                    <input
                      type="text"
                      value={emailTemplateJSON?.cart_banner_style?.heading}
                      onChange={(e) =>
                        handleEmailTemplateChange(
                          { heading: e.target.value },
                          "cart_banner_style"
                        )
                      }
                      name="fieldName"
                      placeholder="Please enter text"
                      className="w-full p-2 border rounded-md focus:outline-none"
                    />
                    <div className="mt-3 flex justify-between flex-row items-center">
                      <span className="mr-2">Font:</span>
                      <select
                        onChange={(e) =>
                          handleEmailTemplateChange(
                            { font_family: e.target.value },
                            "cart_banner_style"
                          )
                        }
                        value={emailTemplateJSON.cart_banner_style.font_family}
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
                          parseInt(
                            emailTemplateJSON.cart_banner_style.font_size
                          ) || "16px"
                        } // Convert '16px' to '16'
                        onChange={(e) =>
                          handleEmailTemplateChange(
                            { font_size: e.target.value + "px" },
                            "cart_banner_style"
                          )
                        }
                      />
                    </div>
                    <div className="flex items-center mt-3">
                      <span className="mr-2">Color:</span>
                      <ColorPicker
                        defaultColor={
                          emailTemplateJSON.cart_banner_style.text_color
                        }
                        onChange={(color) =>
                          handleEmailTemplateChange(
                            { text_color: color },
                            "cart_banner_style"
                          )
                        }
                      />
                    </div>
                    <div className="flex items-center mt-3">
                      <span className="mr-2">Background Color:</span>
                      <ColorPicker
                        defaultColor={
                          emailTemplateJSON.cart_banner_style.background_color
                        }
                        onChange={(color) =>
                          handleEmailTemplateChange(
                            { background_color: color },
                            "cart_banner_style"
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-3 max-h-[300px] overflow-y-auto overflow-x-hidden pr-2">
                    {emailTemplateJSON?.cart_banner_style?.text_components.map(
                      (component, index) => (
                        <div
                          key={index}
                          className="flex items-start p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-transform duration-200 hover:scale-105"
                        >
                          <div className="flex-grow">
                            {1 === index ? (
                              <div>
                                <label className="block mb-2 text-gray-700 dark:text-gray-200 font-semibold">
                                  Button Name
                                </label>
                                <input
                                  type="text"
                                  // value={newButtonName}
                                  // onChange={(e) =>
                                  //   setNewButtonName(e.target.value)
                                  // }
                                  className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-lg shadow-sm mb-2 dark:bg-gray-800 dark:text-white"
                                  placeholder="Edit button name"
                                />
                                <label className="block mt-4 mb-2 text-gray-700 dark:text-gray-200 font-semibold">
                                  Button URL
                                </label>
                                <input
                                  type="text"
                                  // value={newButtonUrl}
                                  // onChange={(e) =>
                                  //   setNewButtonUrl(e.target.value)
                                  // }
                                  className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-lg shadow-sm dark:bg-gray-800 dark:text-white"
                                  placeholder="Edit button URL"
                                />
                                <div className="flex justify-end mt-2">
                                  <button
                                    type="button"
                                    // onClick={saveEditButton}
                                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-200"
                                  >
                                    Save
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div>
                                <span className="block text-gray-800 dark:text-gray-300 font-semibold">
                                  {component.heading}
                                </span>
                                <div className="mt-2">
                                  <Tooltip
                                    title="Edit"
                                    position="top"
                                    trigger="mouseenter"
                                  >
                                    <button
                                      type="button"
                                      // onClick={() => editButton(index)}
                                      className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition-colors duration-200"
                                    >
                                      <i
                                        className="fa fa-pencil"
                                        aria-hidden="true"
                                      ></i>
                                    </button>
                                  </Tooltip>
                                </div>
                              </div>
                            )}
                          </div>
                          <Tooltip
                            title="Delete"
                            position="top"
                            trigger="mouseenter"
                          >
                            <button
                              type="button"
                              // onClick={() => deleteButton(index)}
                              className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors duration-200 ml-4"
                            >
                              <i className="fa fa-times" aria-hidden="true"></i>
                            </button>
                          </Tooltip>
                        </div>
                      )
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={handleTextAddComponent}
                    className="mt-6 w-full bg-blue-500 text-white font-semibold rounded-lg shadow-md px-4 py-2 transition-all duration-200 hover:bg-blue-600"
                  >
                    Add Text
                  </button>
                  {/* <div>
                    <label className="mb-2.5 block text-black dark:text-white font-semibold">
                      Sub-Heading
                    </label>
                    <input
                      type="text"
                      value={emailTemplateJSON?.cart_banner_style?.sub_heading}
                      onChange={(e) =>
                        handleEmailTemplateChange(
                          { sub_heading: e.target.value },
                          "cart_banner_style"
                        )
                      }
                      name="fieldName"
                      placeholder="Please enter sub-heading"
                      className="w-full p-2 border rounded-md focus:outline-none"
                    />
                  </div> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailTemplateCartControllerComponent;
