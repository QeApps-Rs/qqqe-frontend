import React from "react";
import ProductCalc from "./ProductCalc";

const ActionPromptsPeople = () => {
  return (
    <>
      <main className="main-content todo-app w-full px-[var(--margin-x)] pb-8">
        <div className="mb-1 -mt-2 p-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg text-title-md2 font-semibold text-black dark:text-white">
            Level 3: Action Prompts (People)
          </h2>
        </div>
        <div className="mb-1 -mt-2 p-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h5 className="text-title-md5  text-black dark:text-white">
            Launch a win-back email campaign with customized offers like BOGO
            (Buy one and get one free) based on purchased history.
          </h5>
        </div>
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
          <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  General
                </h3>
              </div>
              <form action="#">
                <div className="p-6.5">
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Title Of the BOGO
                      </label>
                      <input
                        type="text"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Description
                      </label>
                      <input
                        type="text"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
                <ProductCalc />
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ActionPromptsPeople;
