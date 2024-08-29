import React, { useState } from "react";

const Account = ({ userData }) => {
  const [isShow, setShow] = useState(false);
  const onToggle = (status) => {
    setShow(status ? false : true);
  };
  const platforms = [
    { name: "Custom Website", value: "customWebsite" },
    { name: "Magneto", value: "magneto" },
    { name: "Big Commerce", value: "bigCommerce" },
    { name: "WordPress", value: "wordpress" },
    { name: "Shopify", value: "shopify" },
    { name: "Other platform", value: "other" },
  ];
  return (
    <React.Fragment>
      <div className="p-6">
        <div className="mb-4 mt-5 bg-slate-100">
          <div
            className="flex justify-between items-center border-b border-gray-400 pb-2 mb-2 cursor-pointer"
            onClick={() => onToggle(isShow)}
          >
            <div className="p-4 flex items-center space-x-2">
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentcolor"
                  viewBox="0 0 1024 1024"
                >
                  <path d="M663.9 188.4a25.6 25.6 0 0 0-47.8-18.4l-256 665.6a25.6 25.6 0 1 0 47.8 18.4l256-665.6ZM298.2 313.3a25.6 25.6 0 0 1 2.9 36.2L161.7 512l139.3 162.6a25.6 25.6 0 0 1-38.9 33.2l-153.6-179.2a25.6 25.6 0 0 1 0-33.2l153.6-179.2a25.6 25.6 0 0 1 36.1-2.8Zm427.6 423a25.6 25.6 0 0 1-2.9-36.1l139.4-162.6-139.4-162.5a25.6 25.6 0 1 1 39-33.3l153.6 179.2a25.6 25.6 0 0 1 0 33.2l-153.6 179.2a25.6 25.6 0 0 1-36.1 2.9Z"></path>
                </svg>
              </p>
              <span className="text-gray-700">Installation code</span>
              <span className="text-sm text-gray-500">
                How to insert the code
              </span>
            </div>
          </div>

          {isShow && (
            <div className="flex justify-between items-center">
              <div className="p-4 flex items-center space-x-2">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book
              </div>
            </div>
          )}
        </div>
        <div className="mb-4 mt-11">
          <label className="block text-gray-700">User</label>
          <input
            type="email"
            className="rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            placeholder="Invite by email address"
          />
          <button className="mt-2 ml-2 rounded-md bg-blue-500 text-white px-4 py-4">
            Invite
          </button>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-bold">Connect your website</h3>
          <p>Connect your website to make your campaign live</p>
          <div className="mt-2">
            <span>amazon.in</span>
            <button className="ml-4 text-blue-500">Change</button>
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 mb-2">
              What e-commerce platform do you use?
            </label>
            <div className="grid grid-cols-3 gap-4">
              {platforms.map((platform) => (
                <button
                  key={platform.value}
                  className={`border p-2 rounded-md ${
                    userData.platform === platform.value
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-slate-100"
                  }`}
                  disabled={userData.platform === platform.value}
                >
                  {platform.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">API Keys</label>
          <div className="flex space-x-4 items-center">
            <input
              type="text"
              className="rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              placeholder="Enter your API"
            />
          </div>
          <div className="mt-5">
            <button className="bg-blue-500 rounded-md text-white px-4 py-2">
              Generate new API key
            </button>
            <button className="bg-red-500 rounded-md text-white px-4 py-2 ml-2">
              Delete API key
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Account;
