
import React from 'react';

const ProductModel = ({
  isOpen,
  onClose,
  body,
  onClickInChild,
  btnClose,
  btnSubmit,
  mdlDesc,
  mdlTitle,
}) => {
  if (!isOpen) return null;

  return (
    <div className="w-full fixed z-999 inset-0">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" />
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          className="w-6/12 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-6">
            <div className="sm:flex sm:items-start">
              <div className="w-full text-center sm:mt-0 sm:text-left">

              <div className="mb-1 -mt-2 p-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between __web-inspector-hide-shortcut__">
                <h2 className="text-lg text-title-md2 font-semibold text-black dark:text-white">
                  {mdlTitle}
                </h2>
                </div>
                <p className="mb-4 ml-3 font-medium">{mdlDesc}</p>
              
                {body}
              </div>
            </div>
          </div>
          {/* <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={onClose}
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              {btnClose}
            </button>

            <button
              onClick={onClickInChild}
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              {btnSubmit}
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProductModel;
