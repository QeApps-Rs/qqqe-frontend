const EmailDetailsModal = ({ isOpen, onClose, emailDetail }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div
        className="w-full max-w-3xl bg-white rounded-lg shadow-lg transform transition-transform scale-100 sm:mx-4 md:mx-0  mx-4" 
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        {/* Modal Header */}
        <div className="bg-dashboard_gradient text-white px-6 py-4 flex items-center justify-between rounded-t-lg">
          <h2 className="text-lg font-semibold">
            <i className="fa fa-envelope mr-2" aria-hidden="true"></i>Email Details
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-white hover:text-gray-200 focus:outline-none"
          >
            <i className="fa fa-times text-xl" aria-hidden="true"></i>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 max-h-[600px] overflow-y-auto sm:px-6 custom-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Name", value: `${emailDetail?.first_name || ""} ${emailDetail?.last_name || ""}`, icon: "fa-user" },
              { label: "Email", value: emailDetail?.email || "-", icon: "fa-envelope" },
              { label: "Phone", value: emailDetail?.phone || "-", icon: "fa-phone" },
              { label: "Address Line 1", value: emailDetail?.default_address?.address1 || "-", icon: "fa-map-marker" },
              { label: "Address Line 2", value: emailDetail?.default_address?.address2 || "-", icon: "fa-map-marker" },
              { label: "City", value: emailDetail?.default_address?.city || "-", icon: "fa-building" },
              {
                label: "Province",
                value: `${emailDetail?.default_address?.province || "-"} (Code: ${emailDetail?.default_address?.province_code || "-"})`,
                icon: "fa-globe",
              },
              {
                label: "Country",
                value: `${emailDetail?.default_address?.country || "-"} (Code: ${emailDetail?.default_address?.country_code || "-"})`,
                icon: "fa-flag",
              },
              { label: "Zip Code", value: emailDetail?.default_address?.zip || "-", icon: "fa-location-arrow" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 border-b pb-3"
              >
                <i className={`fa ${item.icon} text-blue-500`} aria-hidden="true"></i>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-600">{item.label}:</div>
                  <div className="text-gray-800">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailDetailsModal;
