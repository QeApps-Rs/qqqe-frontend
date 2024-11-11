import { useState } from "react";
import toast from "react-hot-toast";
import { Tooltip } from "react-tippy";
import { CameraIcon } from "../custIcon/svgIcon";

const EmailTemplateControllerComponent = ({
  navButtons,
  setNavButtons,
  uploadedIcon,
  setUploadedIcon,
}) => {
  const styleFieldTitleClass =
    "text-xl font-bold mb-6 text-gray-700 dark:text-white";

  const [newButtonName, setNewButtonName] = useState("");
  const [newButtonUrl, setNewButtonUrl] = useState("");
  const [editingButtonIndex, setEditingButtonIndex] = useState(null);
  const [showAddFields, setShowAddFields] = useState(false);

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
    setNavButtons([
      ...navButtons,
      { navName: newButtonName, navUrl: newButtonUrl },
    ]);
    toast.success("Button added successfully!");
    setShowAddFields(false);
    setNewButtonName("");
    setNewButtonUrl("");
  };

  const editButton = (index) => {
    setEditingButtonIndex(index);
    setNewButtonName(navButtons[index].navName);
    setNewButtonUrl(navButtons[index].navUrl);
  };

  const saveEditButton = () => {
    const updatedButtons = [...navButtons];
    updatedButtons[editingButtonIndex] = {
      navName: newButtonName,
      navUrl: newButtonUrl,
    };
    setNavButtons(updatedButtons);
    toast.success("Changes saved successfully!");
    setNewButtonName("");
    setNewButtonUrl("");
    setEditingButtonIndex(null);
  };

  const deleteButton = (index) => {
    setNavButtons(navButtons.filter((_, i) => i !== index));
    toast.success("Button deleted successfully!");
  };

  return (
    <div className="p-4 rounded-lg shadow-lg max-w-lg mx-auto">
      <div className="p-4  bg-white rounded-lg shadow-lg ">
        <h2 className={styleFieldTitleClass}>
          Manage Navigation Buttons
        </h2>

        <div className="space-y-3 max-h-[300px] overflow-y-auto overflow-x-hidden">
          {navButtons.map((button, index) => (
            <div
              key={index}
              className="flex items-start p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-transform duration-200 hover:scale-105"
            >
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
                      <Tooltip title="Edit" position="top" trigger="mouseenter">
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
          ))}
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
                className="px-4 py-2  bg-red-500 text-white font-semibold rounded-lg shadow-md px-4 py-2 transition-all duration-200 hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
        {!showAddFields && (
          <>
            <button
              type="button"
              onClick={handleAddButtonClick}
              className="mt-6 w-full bg-blue-500 text-white font-semibold rounded-lg shadow-md px-4 py-2 transition-all duration-200 hover:bg-blue-600"
            >
              Add Nav New Button
            </button>
          </>
        )}
      </div>
      <div className="p-4  bg-white rounded-lg shadow-lg my-4 ">
        <label className={styleFieldTitleClass}>
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
                  setUploadedIcon((prev) => ({
                    ...prev,
                    image: reader.result,
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
    </div>
  );
};

export default EmailTemplateControllerComponent;
