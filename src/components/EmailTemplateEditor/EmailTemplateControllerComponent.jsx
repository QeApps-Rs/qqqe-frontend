import { useState } from "react";
import toast from "react-hot-toast";

const EmailTemplateControllerComponent = () => {
  const styleFieldTitleClass = "mb-2.5 block text-black dark:text-white font-semibold";

  const [buttons, setButtons] = useState([]);
  const [newButtonName, setNewButtonName] = useState("");
  const [editingButtonIndex, setEditingButtonIndex] = useState(null);

  const addButton = () => {
    if (newButtonName.trim() === "") {
      toast.error("Please select all fields before adding.");
      return;
    }
    setButtons([...buttons, newButtonName]);
    setNewButtonName("");
  };

  const editButton = (index) => {
    setEditingButtonIndex(index);
    setNewButtonName(buttons[index]);
  };

  const saveEditButton = () => {
    const updatedButtons = [...buttons];
    updatedButtons[editingButtonIndex] = newButtonName;
    setButtons(updatedButtons);
    setNewButtonName("");
    setEditingButtonIndex(null);
  };

  const deleteButton = (index) => {
    setButtons(buttons.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4 border-t">
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-12">
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
            <div className="w-full flex flex-col gap-9">
              <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <form action="#">
                  <div className="p-3">
                    <div className="mb-4.5 border-b border-black pb-4">
                      <label className={styleFieldTitleClass}>Nav Button</label>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newButtonName}
                          onChange={(e) => setNewButtonName(e.target.value)}
                          className="border border-gray-300 p-2 rounded"
                          placeholder="Enter button name"
                        />
                        {editingButtonIndex !== null ? (
                          <button
                            type="button"
                            onClick={saveEditButton}
                            className="bg-blue-500 text-white p-2 rounded"
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={addButton}
                            className="bg-green-500 text-white p-2 rounded"
                          >
                            Add
                          </button>
                        )}
                      </div>

                      <div className="mt-4">
                        <ul>
                          {buttons.map((button, index) => (
                            <li key={index} className="flex items-center justify-between mb-2 group relative">
                              <span>{button}</span>
                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-red-500 hover:text-red-700"
                                  onClick={() => deleteButton(index)}
                                  aria-label="Delete"
                                >
                                  <i className="fa fa-times" aria-hidden="true"></i>
                                </button>
                                <button
                                  type="button"
                                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-blue-500 hover:text-blue-700"
                                  onClick={() => editButton(index)}
                                  aria-label="Edit"
                                >
                                  <i className="fa fa-pencil" aria-hidden="true"></i>
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailTemplateControllerComponent;
