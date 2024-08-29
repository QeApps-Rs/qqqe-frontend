
import React from 'react';
import { Link } from "react-router-dom";


const TemplateCard = ({
  image,
  title,
  desc,
  buttonTitle,
}) => {
  return (
    <div className="w-full max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4">
     
      <div className="flex flex-col items-center pb-10">
        <img
          className="mb-3 shadow-lg rounded-full w-24 h-24"
          src={image}
          alt="Bonnie image"
          width={100}
          height={100}
          style={{ borderRadius: '50%' }}
        />
        <Link href="">
          <h5 className="mb-1 text-lg sm:text-xl font-medium text-gray-900 dark:text-white">
            {title}
          </h5>
        </Link>

        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 p-6">
          {desc}
        </p>

        <div className="w-full flex mb-2">
          <input
            type="email"
            id="email"
            className="bg-slate-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Email"
            required
          />
        </div>

        <div className="flex mt-4 md:mt-6">
          <a
            href="/"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {buttonTitle}
          </a>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
