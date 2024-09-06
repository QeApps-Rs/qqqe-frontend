import React, { useState } from "react";
import ChartOne from "../Charts/ChartOne";
import Modal from "../higherOrderComponent/Model/model";
import { useNavigate } from "react-router-dom";

const chart = {
  series: [
    {
      name: "Product One",
      data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 45],
    },
    {
      name: "Product Two",
      data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 51],
    },
  ],
  xaxis: {
    type: "category",
    categories: [
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
    ],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: "0px",
      },
    },
    min: 0,
    max: 100,
  },
};

const SuggestedAnalytics = ({ id, content }) => {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const onModalClose = () => {
    setOpenModal(false);
  };

  const confirmClickEvent = () => {
    navigate(`/template/list/${id}`);
    setOpenModal(false);
  };

  return (
    <main className="main-content todo-app w-full px-[var(--margin-x)] pb-8">
      <div className="mb-1 -mt-2 p-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between __web-inspector-hide-shortcut__"></div>
      <p className="mb-4 ml-2 font-medium">{content}</p>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
          <div className="bg-red-300 h-16">
            <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
              {content}
              <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                Suggested
              </span>
            </p>
          </div>
          <ChartOne chart={chart} />
          <div className="ml-5">
            <div className="mt-1 text-sm text-black max-md:mt-10 max-md:max-w-full">
              Increase in product interaction by 4%
            </div>
            <div className="mt-1 text-sm leading-6 text-black max-md:max-w-full">
              Increase in session by 6%
            </div>
            <div className="mt-1 text-sm leading-6 text-black max-md:max-w-full">
              Increase in product revenue by 7%
            </div>
            <button
              onClick={() => setOpenModal(true)}
              type="button"
              className="flex justify-center ml-80 mt-4 rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
            >
              Continue
            </button>
          </div>
        </div>
        {/* =============================Sencond Graph ========================== */}
        <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
          <div className="bg-green-300 h-16">
            <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
              Implement the discount of 30% in womens category on below 5
              products
              <span className="bg-blue-100 text-blue-800 text-xs  font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                Customized
              </span>
            </p>
          </div>

          <ChartOne chart={chart} />
          <div className="ml-5">
            <div className="mt-1 text-sm text-black max-md:mt-10 max-md:max-w-full">
              Increase the revenue by 5%
            </div>
            <div className="mt-1 text-sm leading-6 text-black max-md:max-w-full">
              Increase in customer retantion rate by 3%
            </div>
            <div className="mt-1 text-sm leading-6 text-black max-md:max-w-full">
              Increase in revenue in women category by 10%
            </div>

            <button
              onClick={() => setOpenModal(true)}
              type="button"
              className="flex justify-center ml-80 mt-4 rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
            >
              Continue
            </button>
          </div>
        </div>
      </div>

      {openModal && (
        <Modal
          isOpen={openModal}
          onClose={() => onModalClose()}
          onClickInChild={confirmClickEvent}
          body={
            <div className="mt-4">
              <p className="mb-4">
                Are you sure want to go with the following implementation?
              </p>
            </div>
          }
          btnClose="Discard"
          btnSubmit="Confirm"
          mdlTitle="Confirmation!!"
          showFooter={true}
          isAnalytics={false}
        />
      )}
    </main>
  );
};

export default SuggestedAnalytics;
