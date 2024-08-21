import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import FormSubmitHandler from "../FormSubmitHandler";

const GeneralInfo = () => {
  const {
    register: registerPersonalInfo,
    handleSubmit: handleSubmitPersonalInfo,
    formState: { errors: errorsPersonalInfo },
  } = useForm();

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
  } = useForm();

  const handleFormSubmit = (handleSubmitFn, onSubmit) => (event) => {
    event.preventDefault();
    handleSubmitFn(onSubmit)(event);
  };

  const onSubmitPersonalInfo = async (data) => {
    console.log("Personal Info:", data);
    const result = await FormSubmitHandler({
      method: "post",
      url: "http://localhost:6052/user/update",
      data: data,
    });
    console.log("result", result);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await FormSubmitHandler({
          method: "get",
          url: "http://localhost:6052/user",
        });
        console.log("result", result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const onSubmitPassword = (data) => {
    console.log("Password:", data);
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
              {...registerPersonalInfo("phone", { required: true })}
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              id="phone"
              type="text"
              placeholder="Enter Phone"
            />
            {errorsPersonalInfo.phone && (
              <span className="text-red-500 text-xs italic">
                Phone is required.
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
              htmlFor="currentPassword"
            >
              Current Password
            </label>
            <input
              {...registerPassword("currentPassword", { required: true })}
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              id="currentPassword"
              type="password"
              placeholder="Enter current password"
            />
            {errorsPassword.currentPassword && (
              <span className="text-red-500 text-xs italic">
                Current password is required.
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="newPassword"
            >
              New Password
            </label>
            <input
              {...registerPassword("newPassword", { required: true })}
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              id="newPassword"
              type="password"
              placeholder="Enter new password"
            />
            {errorsPassword.newPassword && (
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
