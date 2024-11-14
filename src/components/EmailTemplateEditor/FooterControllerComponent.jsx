import { Tooltip } from "react-tippy";
import {
  defaultBoxClassName,
  fontFamilyList,
  textPositionList,
} from "../../pages/forms/masterFormConfig";
import ColorPicker from "../higherOrderComponent/ColorPicker/ColorPicker";
import { useState } from "react";

/* eslint-disable react/prop-types */
const FooterControllerComponent = ({
  emailTemplateJSON,
  setEmailTemplateJSON,
  handleFooterIconChange,
  handleEmailTemplateChange
}) => {
  const [editingTextComponentIndex, setEditingTextComponentIndex] =
    useState(null);

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
            text_color: "black",
            text_position: "center",
          },
        ],
      },
    }));
  };

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
        <div className="p-4 bg-white rounded-lg shadow-lg ">
          <div className="flex items-center justify-between">
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
        </div>
      </div>
      <div className="p-4">
        <div className="p-4 bg-white rounded-lg shadow-lg ">
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
      </div>
      <div className="p-4">
        <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5 p-4 bg-white rounded-lg shadow-lg ">
          <div className="col-span-12 xl:col-span-12">
            <div className="space-y-3 max-h-[380px] overflow-y-auto overflow-x-hidden pr-2">
              {emailTemplateJSON?.footer_banner_style?.text_components.map(
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
