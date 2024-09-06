
import React from 'react';

const Modal = ({
  isOpen,
  onClose,
  body,
  onClickInChild,
  btnClose,
  btnSubmit,
  mdlDesc,
  mdlTitle,
  showFooter,
  isAnalytics
}) => {
  if (!isOpen) return null;

  return (
    <div className="w-full fixed z-10 inset-0">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-slate-500 opacity-75" />
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          className={`${isAnalytics ? 'w-6/12' : 'w-4/12'} inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pt-5 pb-4 max-h-[500px] overflow-x-hidden overflow-y-auto">
            <div className="sm:flex sm:items-start">
              <div className="text-center sm:mt-0 sm:text-left">
                <div className="p-1 border-b rounded-t dark:border-gray-600">
                  <h2 className="font-semibold text-black dark:text-white">
                    {mdlTitle}
                  </h2>
                </div>
                <div className="">
                  <p className="text-xs text-gray-500">{mdlDesc}</p>
                </div>
                {body}
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={onClose}
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              {btnClose}
            </button>

            {showFooter && <button
              onClick={onClickInChild}
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              {btnSubmit}
            </button>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
