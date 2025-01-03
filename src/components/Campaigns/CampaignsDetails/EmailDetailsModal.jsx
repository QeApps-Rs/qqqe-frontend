/* eslint-disable react/prop-types */

const EmailDetailsModal = ({ isOpen, onClose, emailDetail }) => {
  if (!isOpen) return null;
  return (
    <div className="w-full fixed z-10 inset-0">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-slate-500 opacity-75" />
        </div>
        <div
          className={`w-2/4 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle relative top-25`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-slate-500 w-full flex justify-between p-4">
            <h2>Email Details</h2>
          </div>
          <div className="bg-white px-4 pt-5 pb-4 max-h-[500px] overflow-x-hidden overflow-y-auto">
            <div className="flex items-center">
              <label className="mr-2">Name:</label>
              <p className="m-0">
                {emailDetail?.first_name + " " + emailDetail?.last_name}
              </p>
            </div>
            <div className="flex items-center">
              <label className="mr-2">Email:</label>
              <p className="m-0">{emailDetail?.email}</p>
            </div>
            <div className="flex items-center">
              <label className="mr-2">Phone:</label>
              <p className="m-0">
                {emailDetail?.phone ? emailDetail?.phone : "-"}
              </p>
            </div>
            <div className="flex items-center">
              <label className="mr-2">Address Line 1: </label>
              <p className="m-0">{emailDetail?.default_address?.address1}</p>
            </div>
            <div className="flex items-center">
              <label className="mr-2">Address Line 2: </label>
              <p className="m-0">
                {emailDetail?.default_address?.address2
                  ? emailDetail?.default_address?.address2
                  : "-"}
              </p>
            </div>
            <div className="flex items-center">
              <label className="mr-2">City: </label>
              <p className="m-0">{emailDetail?.default_address?.city}</p>
            </div>
            <div className="flex items-center">
              <label className="mr-2">Province: </label>
              <p className="m-0">
                {emailDetail?.default_address?.province} (Code:
                {emailDetail?.default_address?.province_code})
              </p>
            </div>
            <div className="flex items-center">
              <label className="mr-2">Country: </label>
              <p className="m-0">
                {emailDetail?.default_address?.country} (Code:
                {emailDetail?.default_address?.country_code})
              </p>
            </div>
            <div className="flex items-center">
              <label className="mr-2">Zip Code: </label>
              <p className="m-0">
                {emailDetail?.default_address?.zip} (Code:
                {emailDetail?.default_address?.zip})
              </p>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={onClose}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailDetailsModal;
