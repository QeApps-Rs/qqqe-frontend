import { Tooltip } from "react-tippy";
import { CameraIcon } from "../custIcon/svgIcon";
import { useState } from "react";

/* eslint-disable react/prop-types */
const EmailTemplateBadgeControllerComponent = ({
  emailTemplateJSON,
  setEmailTemplateJSON,
}) => {
  const inputControllerFieldClass =
    "p-3 rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark";
  const handleBadgeChange = (index, key, value) => {
    setEmailTemplateJSON((prev) => {
      const updatedBadges = [...prev.badge_section_style];
      updatedBadges[index] = { ...updatedBadges[index], [key]: value };
      return {
        ...prev,
        badge_section_style: updatedBadges,
      };
    });
  };

  return (
    <div className="p-4 border-t">
      <div className={inputControllerFieldClass}>
        <label className="block text-black dark:text-white font-semibold">
          Badge Section
        </label>

        <div className="space-y-3 max-h-[300px] overflow-y-auto overflow-x-hidden pr-2">
          {emailTemplateJSON.badge_section_style.map((badge, index) => (
            <div
              key={index}
              className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-transform duration-200 hover:scale-105"
            >
              {/* Badge Image Upload */}
              <label
                htmlFor={`badgeImage-${index}`}
                className="flex cursor-pointer items-center gap-2 rounded-md bg-blue-500 py-2 px-4 text-sm font-medium text-white hover:bg-blue-600"
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
                className="ml-4 p-2 border rounded-md w-full dark:bg-gray-800 dark:text-white"
                placeholder="Edit Badge Name"
              />

              {/* Delete Badge Button */}
              <Tooltip title="Delete" position="top" trigger="mouseenter">
                <button
                  type="button"
                  onClick={() => {
                    setEmailTemplateJSON((prev) => ({
                      ...prev,
                      badge_section_style: prev.badge_section_style.filter(
                        (_, i) => i !== index
                      ),
                    }));
                  }}
                  className="text-red-500 hover:text-red-700 dark:hover:text-red-400 ml-4"
                >
                  <i className="fa fa-times" aria-hidden="true"></i>
                </button>
              </Tooltip>
            </div>
          ))}
        </div>

        {/* Add New Badge Button */}
        <button
          type="button"
          onClick={() =>
            setEmailTemplateJSON((prev) => ({
              ...prev,
              badge_section_style: [
                ...prev.badge_section_style,
                { badgeImage: "", badgeName: "New Badge" },
              ],
            }))
          }
          className="mt-6 w-full bg-blue-500 text-white font-semibold rounded-lg shadow-md px-4 py-2 transition-all duration-200 hover:bg-blue-600"
        >
          Add Badge
        </button>
      </div>
    </div>
  );
};

export default EmailTemplateBadgeControllerComponent;
