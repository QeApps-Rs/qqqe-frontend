import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormSubmitHandler from "../FormSubmitHandler";
import toast from "react-hot-toast";

const GeneralInfo = ({ userData }) => {
  const {
    reset: resetPersonalInfo,
    register: registerPersonalInfo,
    handleSubmit: handleSubmitPersonalInfo,
    formState: { errors: errorsPersonalInfo },
  } = useForm();

  useEffect(() => {
    if (userData) {
      resetPersonalInfo({
        name: userData.name || "",
        phone: userData.phone || "",
      });
    }
  }, [userData, resetPersonalInfo]);

  const {
    reset: resetPassword,
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
  } = useForm();

  const handleFormSubmit = (handleSubmitFn, onSubmit) => (event) => {
    event.preventDefault();
    handleSubmitFn(onSubmit)(event);
  };

  const onSubmitPersonalInfo = async (data) => {
    try {
      console.log("Personal Info:", data);
      const resultOfPersonalInfo = await FormSubmitHandler({
        method: "post",
        url: "/user/update",
        data: data,
      });

      if (resultOfPersonalInfo.success) {
        toast.success(resultOfPersonalInfo.message);
      } else {
        toast.error(resultOfPersonalInfo.message);
      }
    } catch (error) {
      console.error("Error updating personal info:", error);
      toast.error(
        "An error occurred while updating your personal information."
      );
    }
  };

  const onSubmitPassword = async (data) => {
    try {
      console.log("Password:", data);
      const resultOfSubmitPassword = await FormSubmitHandler({
        method: "post",
        url: "/change-password",
        data: data,
      });
      console.log('resultOfSubmitPassword', resultOfSubmitPassword)
      if (resultOfSubmitPassword.success) {
        toast.success(resultOfSubmitPassword.message);
      } else {
        toast.error(resultOfSubmitPassword.data.message);
      }
      resetPassword();
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("An error occurred while changing your password.");
    }
  };

 
  return (
    <React.Fragment>
      <div className="mt-8">
        <form
          onSubmit={handleFormSubmit(
            handleSubmitPersonalInfo,
            onSubmitPersonalInfo
          )}
        >
          <h2 className="text-xl mb-2">Personal Information</h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              {...registerPersonalInfo("name", { required: true })}
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              id="name"
              type="text"
              placeholder="Enter name"
            />
            {errorsPersonalInfo.name && (
              <span className="text-red-500 text-xs italic">
                Name is required.
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone
            </label>
            <input
              {...registerPersonalInfo("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Phone number must contain only numbers",
                },
              })}
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              id="phone"
              type="tel"
              placeholder="Enter Phone"
            />
            {errorsPersonalInfo.phone && (
              <span className="text-red-500 text-xs italic">
                {errorsPersonalInfo.phone.message}
              </span>
            )}
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
      <div>
        <form
          onSubmit={handleFormSubmit(handleSubmitPassword, onSubmitPassword)}
          className="mt-6"
        >
          <h2 className="text-xl mb-2">Password</h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="old_password"
            >
              Current Password
            </label>
            <input
              {...registerPassword("old_password", {
                required: true,
              })}
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              id="old_password"
              type="password"
              placeholder="Enter current password"
            />
            {errorsPassword.old_password && (
              <span className="text-red-500 text-xs italic">
                {errorsPassword.old_password.message ||
                  "Current password is required."}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="new_password"
            >
              New Password
            </label>
            <input
              {...registerPassword("new_password", { required: true })}
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              id="new_password"
              type="password"
              placeholder="Enter new password"
            />
            {errorsPassword.new_password && (
              <span className="text-red-500 text-xs italic">
                New password is required.
              </span>
            )}
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Change Password
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default GeneralInfo;
