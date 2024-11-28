import { Tooltip } from "react-tippy";
import {
  defaultBoxClassName,
  fontFamilyList,
  textPositionList,
} from "../../pages/forms/masterFormConfig";
import ColorPicker from "../higherOrderComponent/ColorPicker/ColorPicker";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CameraIcon } from "../custIcon/svgIcon";

/* eslint-disable react/prop-types */
const FooterControllerComponent = ({
  emailTemplateJSON,
  setEmailTemplateJSON,
  handleFooterIconChange,
  handleEmailTemplateChange,
  isAbandonmentCartSecondDesign,
}) => {
  const styleFieldTitleClass =
    "text-lg font-bold mb-6 text-gray-700 dark:text-white";
  const [editingTextComponentIndex, setEditingTextComponentIndex] =
    useState(null);
  const [editingButtonIndex, setEditingButtonIndex] = useState(null);
  const [newButtonName, setNewButtonName] = useState("");
  const [showAddFields, setShowAddFields] = useState(false);
  const [newButtonUrl, setNewButtonUrl] = useState("");

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
  const editButton = (index) => {
    const button = emailTemplateJSON.header_banner_style.nav_links[index];
    setEditingButtonIndex(index);
    setNewButtonName(button.navName);
    setNewButtonUrl(button.navUrl);
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
  const handleTextAddComponent = () => {
    setEmailTemplateJSON((prev) => ({
      ...prev,
      footer_banner_style: {
        ...prev.footer_banner_style,
        text_components: [
          ...prev.footer_banner_style.text_components,
          {
            heading: "New Heading",
            font_size: "16px",
            font_family: "Arial, sans-serif",
            text_color: "#000000",
            text_position: "center",
          },
        ],
      },
    }));
  };
  // const handleEditTextComponent = (index, newValues) => {
  //   setEmailTemplateJSON((prev) => {
  //     const updatedTextComponents = [...prev.footer_banner_style.text_components];
  //     if (updatedTextComponents[index]) {
  //       updatedTextComponents[index] = {
  //         ...updatedTextComponents[index],
  //         ...newValues,
  //       };
  //     }
  //     return {
  //       ...prev,
  //       footer_banner_style: {
  //         ...prev.footer_banner_style,
  //         text_components: updatedTextComponents,
  //       },
  //     };
  //   });
  // };

  const handleEditTextComponent = (index, newValues) => {
    setEmailTemplateJSON((prev) => {
      const updatedTextComponents = [
        ...prev.footer_banner_style.text_components,
      ];
      updatedTextComponents[index] = {
        ...updatedTextComponents[index],
        ...newValues,
      };
      return {
        ...prev,
        footer_banner_style: {
          ...prev.footer_banner_style,
          text_components: updatedTextComponents,
        },
      };
    });
  };

  const handleDeleteTextComponent = (index) => {
    setEmailTemplateJSON((prev) => {
      const updatedTextComponents =
        prev.footer_banner_style.text_components.filter((_, i) => i !== index);
      return {
        ...prev,
        footer_banner_style: {
          ...prev.footer_banner_style,
          text_components: updatedTextComponents,
        },
      };
    });
  };

  const socialMediaPlatforms = [
    { label: "Facebook", icon: "facebook", key: "facebook" },
    { label: "Twitter", icon: "twitter", key: "twitter" },
    { label: "Instagram", icon: "instagram", key: "insta" },
    { label: "YouTube", icon: "youtube-play", key: "youtube" },
  ];

  return (
    <div className="border-t border-white">
      <div className="p-4">
        <div className="p-4 bg-white rounded-lg shadow-lg mb-4 ">
          <div className="flex items-center justify-between mb-4">
            <span className="mr-2 font-semibold">Background Color:</span>
            <ColorPicker
              defaultColor={
                emailTemplateJSON.footer_banner_style.background_color
              }
              onChange={(color) =>
                handleEmailTemplateChange(
                  { background_color: color },
                  "footer_banner_style"
                )
              }
            />
          </div>
          {isAbandonmentCartSecondDesign && (
            <>
              <div className="flex items-center justify-between">
                <span className="mr-2 font-semibold">Nav-Bar Text Color:</span>
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
            </>
          )}
        </div>
        {isAbandonmentCartSecondDesign && (
          <>
            <div className="p-4 bg-white rounded-lg shadow-lg mb-4">
              <h2 className={styleFieldTitleClass}>
                Manage Navigation Buttons
              </h2>

              <div className=" max-h-[300px] overflow-auto pr-2  overflow-x-hidden">
                {emailTemplateJSON?.header_banner_style?.nav_links.map(
                  (button, index) => (
                    <div
                      key={index}
                      className="relative items-start mb-6 p-4 bg-white  rounded-lg shadow-lg border border-bodydark "
                    >
                      <div className="flex  justify-end top-1 right-3  absolute ">
                        <Tooltip
                          title="Delete"
                          position="top"
                          trigger="mouseenter"
                        >
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
                                  <i
                                    className="fa fa-pencil"
                                    aria-hidden="true"
                                  ></i>{" "}
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
                  onChange={(e) => {
                    const file = e.target.files[0];

                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setEmailTemplateJSON((prev) => ({
                          ...prev,
                          footer_banner_style: {
                            ...prev.footer_banner_style,
                            imageIcon: reader.result,
                          },
                        }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <CameraIcon className="h-5 w-5 text-gray-700" />
                <span>Upload Logo</span>
              </label>
            </div>
          </>
        )}

        <div className="p-4 bg-white rounded-lg shadow-lg mb-4 ">
          {socialMediaPlatforms.map(({ label, key }) => (
            <div key={key} className="mb-6">
              <label className="mb-2.5 block text-black dark:text-white font-semibold">
                {label} URL
              </label>
              <input
                type="text"
                value={
                  emailTemplateJSON.footer_banner_style.social_media_icon[key]
                }
                onChange={(e) =>
                  handleFooterIconChange(
                    { [key]: e.target.value },
                    "social_media_icon"
                  )
                }
                placeholder={`Please enter ${label} URL`}
                className="w-full p-2 border rounded-md focus:outline-none"
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5 p-4 bg-white rounded-lg shadow-lg">
          <div className="col-span-12 xl:col-span-12">
            <div className="space-y-3 max-h-[380px] overflow-y-auto overflow-x-hidden pr-2">
              {emailTemplateJSON?.footer_banner_style?.text_components.map(
                (component, index) => (
                  <>
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
                            <div className="mt-3 flex justify-between items-center">
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
                                onClick={() =>
                                  setEditingTextComponentIndex(index)
                                }
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
                  </>
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
        </div>
      </div>
    </div>

    // <div className="p-4 border-t">
    //   <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
    //     <div className="col-span-12 xl:col-span-12">
    //       <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
    //         <div className="w-full flex flex-col gap-9">
    //           <form action="#" onSubmit={(e) => e.preventDefault()}>
    //             <div className={inputControllerFieldClass}>
    //               {socialMediaPlatforms.map(({ label, key }) => (
    //                 <div key={key} className="mb-6">
    //                   <label className="mb-2.5 block text-black dark:text-white font-semibold">
    //                     {label} URL
    //                   </label>
    //                   <input
    //                     type="text"
    //                     value={
    //                       emailTemplateJSON.footer_banner_style
    //                         .social_media_icon[key]
    //                     }
    //                     onChange={(e) =>
    //                       handleFooterIconChange(
    //                         { [key]: e.target.value },
    //                         "social_media_icon"
    //                       )
    //                     }
    //                     placeholder={`Please enter ${label} URL`}
    //                     className="w-full p-2 border rounded-md focus:outline-none"
    //                   />
    //                 </div>
    //               ))}
    //               <div className="mb-6">
    //                 <label className="mb-2.5 block text-black dark:text-white font-semibold">
    //                   Email
    //                 </label>
    //                 <input
    //                   type="text"
    //                   value={emailTemplateJSON?.footer_banner_style?.email}
    //                   onChange={(e) =>
    //                     handleEmailTemplateChange(
    //                       { email: e.target.value },
    //                       "footer_banner_style"
    //                     )
    //                   }
    //                   name="email"
    //                   placeholder="Please enter email"
    //                   className="w-full p-2 border rounded-md focus:outline-none"
    //                 />
    //               </div>
    //               <div className="mb-6">
    //                 <label className="mb-2.5 block text-black dark:text-white font-semibold">
    //                   Address
    //                 </label>
    //                 <textarea
    //                   type="text"
    //                   value={emailTemplateJSON?.footer_banner_style?.address}
    //                   onChange={(e) =>
    //                     handleEmailTemplateChange(
    //                       { address: e.target.value },
    //                       "footer_banner_style"
    //                     )
    //                   }
    //                   name="address"
    //                   placeholder="Please enter your address"
    //                   className="w-full p-2 border rounded-md focus:outline-none"
    //                 />
    //               </div>
    //               <div className="mb-6">
    //                 <label className="mb-2.5 block text-black dark:text-white font-semibold">
    //                   Company Name
    //                 </label>
    //                 <input
    //                   type="text"
    //                   value={
    //                     emailTemplateJSON?.footer_banner_style?.company_name
    //                   }
    //                   onChange={(e) =>
    //                     handleEmailTemplateChange(
    //                       { company_name: e.target.value },
    //                       "footer_banner_style"
    //                     )
    //                   }
    //                   name="companyname"
    //                   placeholder="Please enter your company name"
    //                   className="w-full p-2 border rounded-md focus:outline-none"
    //                 />
    //               </div>
    //             </div>
    //           </form>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default FooterControllerComponent;
