import React, { useState } from "react";
import { toast } from "react-hot-toast";
import DropDown from "../../components/higherOrderComponent/Dropdown/Dropdown";
import { fieldValidationDropdownData, fieldTypeDropdownData } from "./masterFormConfig";

const InputControllerComponent = ({ setAddedFields }) => {
    const [fieldType, setFieldType] = useState("");
    const [fieldValidation, setFieldValidation] = useState("");
    const [fieldName, setFieldName] = useState("");
    const [placeholderText, setPlaceholderText] = useState(""); // New state for placeholder text
    const [renderKey, setRenderKey] = useState(0);

    const handleAddField = () => {
        if (!fieldType || !fieldValidation || !fieldName || !placeholderText) {
            toast.error("Please select all fields before adding a new field.");
            return;
        }

        setAddedFields((prevFields) => [
            ...prevFields,
            { fieldType, fieldValidation, fieldName, placeholderText },
        ]);

        setFieldType("");
        setFieldValidation("");
        setFieldName("");
        setPlaceholderText(""); // Clear the placeholder text as well


        setRenderKey((prevKey) => prevKey + 1);
    };

    return (
        <div className="p-4 border-t">
            <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
                <div className="col-span-12 xl:col-span-12">
                    <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
                        <div className="w-full flex flex-col gap-9">
                            <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                <form action="#" onSubmit={(e) => e.preventDefault()}>
                                    <div className="p-3">
                                        <div className="mb-6">
                                            <label className="mb-2.5 block text-black dark:text-white font-semibold">
                                                Enter Field Name
                                            </label>

                                            <input
                                                type="text"
                                                value={fieldName}
                                                onChange={(e) => setFieldName(e.target.value)}
                                                placeholder="write here..."
                                                className="w-full p-2 border rounded-md focus:outline-none"
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <label className="mb-2.5 block text-black dark:text-white font-semibold">
                                                Enter Field Placeholder
                                            </label>

                                            <input
                                                type="text"
                                                value={placeholderText}
                                                placeholder="write here..."
                                                onChange={(e) => setPlaceholderText(e.target.value)}
                                                className="w-full p-2 border rounded-md focus:outline-none"
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <DropDown
                                                key={`fieldValidation-${renderKey}`}
                                                jsonData={{
                                                    ...fieldValidationDropdownData,
                                                    selectedValue: fieldValidation,
                                                    onChange: (value) => setFieldValidation(value),
                                                }}
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <DropDown
                                                key={`fieldType-${renderKey}`}
                                                jsonData={{
                                                    ...fieldTypeDropdownData,
                                                    selectedValue: fieldType,
                                                    onChange: (value) => setFieldType(value),
                                                }}
                                            />
                                        </div>
                                        <button
                                            className="bg-blue-500 text-white py-2 px-4 rounded w-full"
                                            onClick={handleAddField}
                                        >
                                            Add Field
                                        </button>
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
export default InputControllerComponent
