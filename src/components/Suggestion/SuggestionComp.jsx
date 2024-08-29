'use client';

// import { useParams, usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

import 'react-tippy/dist/tippy.css';

// import ConfirmPop from '../ConfirmPop/ConfirmPop';
import {
  AccordionsIcon,
  DeleteIcon,
  EditIcon,
  GraphIcon,
  SettingIcon,
} from '../custIcon/svgIcon';
import Button from '../higherOrderComponent/button/button';
import Modal from '../higherOrderComponent/Model/model';
import SuggestedAnalytics from './SuggestedAnalytics';
// import ProductDetails from './productDetails/ProductDetails';
// import UserDetails from './userDetails/UserDetails';

// import { reduxSliceData } from '@/utils/redux/features/reduxData';
// import { service } from '@/utils/service/service';


const SuggestionComp = () => {
  // const router = useRouter();
  // const params = useParams();
  // const pathname = usePathname();
  // const segments = pathname.split('/');
  // const actionPath = segments[segments.length - 2];
  // const checkProductPath = pathname.includes('Product');
  // const checkPricePath = pathname.includes('Price');

  // const dispatch = useDispatch();
  const [suggestionsList, setSuggestionsList] = useState([]);
  const [problemStatement, setProblemStatement] = useState('');
  const [toggleId, setToggleId] = useState();
  const [suggestionId, setSuggestionId] = useState();
  const [percentage, setPercentage] = useState(null);

  const [expandedRow, setExpandedRow] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [updatedString, setUpdatedString] = useState('');
  const [discount, setDiscount] = useState(0);
  const [suggestionOffer, setSuggestionOffer] = useState(1);
  const [collapsed, setCollapsed] = useState(false)
  const [selected, setSelected] = useState('Product');
  const [isShowAnalyticsModal, setAnalyticsModal] = useState(false)

  const handleInputChange = (event) => {
    setDiscount(event.target.value);
  };

  const toggleCollapse = (status) => {
    setExpandedRow(status);
  };

  // const toggleModal = (id: any, suggestItem: any) => {
  //   setDiscount(suggestItem?.suggestion?.suggestionOffer.value);
  //   setUpdatedString(suggestItem?.suggestion?.suggestion);
  //   setPercentage(suggestItem?.suggestion?.suggestionOffer.value);
  //   setToggleId(id);
  //   setSuggestionId(suggestItem.id);
  //   setIsModalOpen(true);
  // };

  const toggleModal = () => {
    console.log("sfsfsfsfsf")
    setIsModalOpen(true);
  };

const onModalClose = () => {
  if(isModalOpen) setIsModalOpen(false);
  if(isShowAnalyticsModal) setAnalyticsModal(false)
};

const confirmClickEvent = () => {
  // console.log(isShowAnalyticsModal,"sfsfs")
  setAnalyticsModal(true)
  setIsModalOpen(false);
}

return (
  <div>
    <div className="mb-1 -mt-2 p-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between __web-inspector-hide-shortcut__">
      <h2 className="text-lg text-title-md2 font-semibold text-black dark:text-white">
        Level 2: Action Prompts (People)
      </h2>
    </div>

    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <p className="text-md text-lg font-medium text-gray-900 leading-relaxed mb-2">
        19% customer are not purchasing product again
      </p>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Suggestions
              </th>
              <th>
              </th>
              {/* {!checkProductPath && ( */}
              <th className="px-4 py-4 text-left font-medium text-black dark:text-white">
                Applied
              </th>
              {/* )} */}
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="flex px-4 py-5 border-b border-[#eee] dark:border-strokedark" >
                <button
                  type="button"
                  className="hover:text-primary mr-4"
                  aria-label="Toggle details"
                >
                  <AccordionsIcon
                    rotate={expandedRow}
                    onClick={() =>
                      toggleCollapse(!expandedRow ? true : false)
                    }
                  />
                </button>

                <p
                  className={`text-black dark:text-white ml-5}`}
                >
                  Implement the discount of 20% in womens category on below 5 products
                </p>
              </td>

              <td>
                <div className="flex space-x-2">
                  <label className={`${selected === 'Product' && 'bg-slate-300'} rounded`}>
                    <input
                      type="radio"
                      name="option"
                      value="Product"
                      checked={selected === 'Product'}
                      onChange={() => setSelected('Product')}
                      className="hidden"
                    />
                    <div
                      className={`px-4 py-2 rounded-md cursor-pointer ${selected === 'Product' ? 'bg-gray-400' : 'bg-gray-200'
                        }`}
                    >
                      Product
                    </div>
                  </label>
                  <label className={`${selected === 'Customer' && 'bg-slate-300'} rounded`}>
                    <input
                      type="radio"
                      name="option"
                      value="Customer"
                      checked={selected === 'Customer'}
                      onChange={() => setSelected('Customer')}
                      className="hidden"
                    />
                    <div
                      className={`px-4 py-2 rounded-md cursor-pointer ${selected === 'Customer' ? 'bg-gray-400' : 'bg-gray-200'
                        }`}
                    >
                      Customer
                    </div>
                  </label>
                </div>
              </td>

              <td
                aria-label="suggestions"
                className={'border-b border-[#eee] dark:border-strokedark'}
              >
                {/* {flagData?.flag === true ? ( */}
                {/* <span className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                            Applied
                          </span> */}
                {/* ) : ( */}
                <span className="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                  UnApplied
                </span>
                {/* )} */}
              </td>
              {/* ${index === lastIndex ? 'px-4 py-5 dark:border-strokedark' : 'border-b border-[#eee] px-4 py-5 dark:border-strokedark'} */}
              <td
                className={'border-b border-[#eee] px-4 py-5 dark:border-strokedark'}
                aria-label="suggestions"
              >
                {/* {flagData?.flag ? (
                          <> */}
                {/* <button
                              type="button"
                              className=" mr-2"
                              aria-label="Edit item"
                              title="Analytics"
                              // onClick={() => router.push('/level-1-analytics')}
                            >
                              <GraphIcon />
                            </button>
                            <button
                              type="button"
                              className=" mr-2"
                              aria-label="Edit item"
                              title="Delete"
                              // onClick={handleDelete}
                            >
                              <DeleteIcon />
                            </button> */}
                {/* </> */}
                {/* ) : suggestItem.suggestion.suggestionOffer ? ( */}
                <div className="flex align-center">
                  {/* <div title="Edit">
                      <EditIcon
                        onClick={() => toggleModal(index, suggestItem)}
                      />
                    </div> */}
                  <div title="Configuration" className="ml-2">
                    <SettingIcon
                      onClick={() => toggleModal()}
                    />
                  </div>
                </div>
                {/* ) : ( */}
                {/* <div title="Configuration" className="ml-2">
                            <SettingIcon
                              onClick={() =>
                                handleSetting(index, suggestItem?.suggestion_id)
                              }
                            />
                          </div> */}
                {/* )} */}
              </td>
            </tr>
            {(selected === 'Product' && expandedRow) && <tr className="border-y border-transparent border-b-slate-200 dark:border-b-navy-500">
              <td className="p-0" colSpan={8} aria-label="Column header">
                <div
                  className={`w-full transition-all duration-300 ease-in-out ${collapsed ? 'h-0 opacity-0' : 'h-auto opacity-100'}`}
                >
                  <div className="relative mx-auto my-4 flex w-full flex-col bg-clip-border text-gray-700 ">
                    <table className="is-hoverable">
                      <thead>
                        <tr className="" aria-label="Column header">
                          <th
                            aria-label="Column header"
                            className="w-5 rounded-tl-lg bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5"
                          />
                          <th className="text-xs  bg-slate-200 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100">
                            Product Name
                          </th>

                          <th className="text-xs w-20 bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100">
                            Actual Product price
                          </th>
                          <th className="text-xs w-20 bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100">
                            Discounted product price (20%)
                          </th>
                          <th
                            aria-label="Column header"
                            className="bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5"
                          />
                          <th
                            aria-label="Column header"
                            className="rounded-tr-lg bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5"
                          />
                        </tr>
                      </thead>
                      <tbody>
                        {/* {suggestItem?.product_detail?.length > 0 &&
                            suggestItem?.product_detail?.map((productItem) => {
                              return ( */}
                        <tr className="" aria-label="Column header">
                          <td
                            className="whitespace-nowrap px-4 py-3 sm:px-5 size-16 flex items-center"
                            aria-label="Column header"
                          >
                            <div className="avatar h-8 w-8 ">
                              <div className="is-initial bg-slate-200 text-xs uppercase text-white ring ring-white dark:bg-navy-500 dark:ring-navy-700 flex items-center justify-center">
                                <svg
                                  className="h-6 w-6 text-blue-700"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                  <circle cx="12" cy="7" r="4" />
                                </svg>
                              </div>
                            </div>
                          </td>
                          <td
                            className="whitespace-nowrap px-4 py-3 sm:px-5"
                            style={{
                              width: '450px;',
                            }}
                          >
                            Women's black cotton t-shirt, small
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 my-5 sm:px-5">
                            <div className="border border-slate-400 px-3 py-2">
                              400
                            </div>
                          </td>
                          <td
                            className="whitespace-nowrap px-4 py-3 sm:px-5"
                            aria-label="Column header"
                          >
                            <div className="border border-slate-400 px-3 py-2">
                              460
                            </div>
                          </td>
                          <td
                            aria-label="Column header"
                            className="whitespace-nowrap px-4 py-3 sm:px-5"
                          />
                          <td
                            aria-label="Column header"
                            className="whitespace-nowrap px-4 py-3 sm:px-5"
                          />
                        </tr>
                        {/* );
                            })} */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </td>
            </tr>}
            {(selected === 'Customer' && expandedRow) && <tr className="border-y border-transparent border-b-slate-200 dark:border-b-navy-500">
              <td className="p-0" colSpan={8} aria-label="Column header">
                <div
                  className={`w-full transition-all duration-300 ease-in-out ${collapsed ? 'h-0 opacity-0' : 'h-auto opacity-100'}`}
                >
                  <div className="relative mx-auto my-4 flex w-full flex-col bg-clip-border text-gray-700 ">
                    <table className="is-hoverable">
                      <thead>
                        <tr className="" aria-label="Column header">

                          <th className="text-xs w-20 bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100">
                            User Name
                          </th>
                          <th className="text-xs w-20 bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100">
                            User Email
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* {userDetail?.length > 0 &&
                            userDetail?.map((userItem: any) => {
                              return ( */}
                        <tr className="" aria-label="Column header">
                          <td className="whitespace-nowrap px-4 py-2 my-5 sm:px-5 text-center">
                            Admin
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 my-5 sm:px-5 text-center">
                            admin@test.com
                          </td>
                        </tr>
                        {/* );
                            })} */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </td>
            </tr>}
            {/* </>
                ); */}
            {/* })} */}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => onModalClose()}
          onClickInChild={confirmClickEvent}
          body={
            <div className="mt-4">
              <p className="mb-4">
                Implement the discount of 20% in womens category on below 5 products.
              </p>
            </div>
          }
          btnClose="Discard"
          btnSubmit="Confirm"
          mdlTitle="Please select the percentage"
          showFooter={true}
          isAnalytics={false}
        />
      )}

      {isShowAnalyticsModal && (
        <Modal
          isOpen={isShowAnalyticsModal}
          onClose={() => onModalClose()}
          onClickInChild={confirmClickEvent}
          body={
            <>
            <SuggestedAnalytics/>
            </>
          }
          btnClose="Discard"
          btnSubmit="Confirm"
          mdlTitle="Level 2: Action Prompts (People)"
          showFooter= {false}
          isAnalytics={true}
        />
      )}

      {/* <ConfirmPop
          isOpen={deleteModal}
          headingText="Confirmation"
          onClose={() => setDeleteModal(false)}
          onClickInChild={handleConfirmDelete}
          title="Are you sure you want to delete this item? This action cannot be undone"
          footerButton={{
            closeText: 'Cancle',
            confirmText: 'Delete',
          }}
        /> */}
    </div>
  </div>
);
}
export default SuggestionComp;
