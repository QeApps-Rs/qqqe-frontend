/* eslint-disable react/prop-types */
const TargetingAndBehaviorControlComponent = ({ productDetailsData }) => {
  const deviceVisitorLocationHtml = (
    icon,
    title,
    description,
    moreProduct,
    isLast
  ) => {
    return (
      <div className="flex items-center border-b-[1.5px] border-customGray mb-4 pb-3 relative">
        <div className="w-10 h-10 bg-orange-200 rounded-md flex items-center justify-center mr-3">
          <i
            className={`fa ${icon} text-red-500 text-2xl`}
            aria-hidden="true"
          ></i>
        </div>
        <div className="block">
          <h3 className="text-lg font-bold text-black">{title}</h3>
          <span className="text-customGray">{description}</span>
        </div>
        {moreProduct && (
          <span className="bg-blue-400 p-1 uppercase rounded-sm text-sm text-white font-bold absolute left-[-60px] top-[50px]">
            {moreProduct}
          </span>
        )}
        {isLast && (
          <div className="absolute left-[-25px] top-[50px] w-8 h-1 bg-customGray rounded-full transform -translate-x-1/2"></div>
        )}
      </div>
    );
  };
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default mt-4 p-8">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-xl text-customGray uppercase	">
          Who should see the popup
        </h2>
      </div>
      <div className="flex ">
        <div className="border-l-[1.5px] border-customGray pl-10 mt-3  w-full">
          {(() => {
            let desc = "";
            let device =
              productDetailsData?.json_response?.target_behaviors?.display
                ?.devices?.display_on;
            if (device == "both_desktop_and_mobile") {
              desc = "Both desktop and mobile";
            } else if (device == "desktop") {
              desc = "Desktop only";
            } else if (device == "mobile") {
              desc = "Mobile only";
            }
            return deviceVisitorLocationHtml(
              "fa-desktop",
              "Devices",
              desc,
              "and",
              false
            );
          })()}
          {(() => {
            const on_mobile =
              productDetailsData?.json_response?.target_behaviors?.display
                ?.devices?.click_outside_close?.on_mobile;
            const on_desktop =
              productDetailsData?.json_response?.target_behaviors?.display
                ?.devices?.click_outside_close?.on_desktop;
            let desc = "-";
            if (on_mobile && on_desktop) {
              desc = "Both mobile and desktop";
            } else if (on_mobile && !on_desktop) {
              desc = "On mobile";
            } else if (!on_mobile && on_desktop) {
              desc = "On desktop";
            }
            return deviceVisitorLocationHtml(
              "fa-window-close-o",
              "Click outside form to close",
              desc,
              "and",
              false
            );
          })()}
          {(() => {
            const key =
              productDetailsData?.json_response?.target_behaviors?.targeting
                ?.visitors;
            const visotors = {
              all: "All",
              don_t_show_to_existing_klaviyo_profiles:
                "Don’t show to existing Klaviyo profiles",
              show_to_all_visitors: "Show to all visitors",
              show_to_any_existing_profile: "Show to any existing profile",
              show_to_email_subscribers_only: "Show to email subscribers only",
              show_to_sms_subscribers_only: "Show to SMS subscribers only",
              show_to_specific_profiles_in_a_list_or_segment:
                "Show to specific profiles in a list or segment",
            };
            return deviceVisitorLocationHtml(
              "fa-eye",
              "Visitors",
              visotors[key],
              "and",
              false
            );
          })()}
          {(() => {
            const showVisitorsCertainLocations =
              productDetailsData?.json_response?.target_behaviors?.targeting
                ?.locations?.show_visitors_certain_locations;

            const notShowVisitorsCertainLocations =
              productDetailsData?.json_response?.target_behaviors?.targeting
                ?.locations?.not_show_visitors_certain_locations;

            return (
              <div className="flex items-center border-b-[1.5px] border-customGray mb-4 pb-3 relative">
                <div className="min-w-10 min-h-10 bg-orange-200 rounded-md flex items-center justify-center mr-3">
                  <i
                    className={`fa fa-map-marker text-red-500 text-2xl`}
                    aria-hidden="true"
                  ></i>
                </div>
                <div className="block">
                  <h3 className="text-lg font-bold text-black">Location</h3>
                  {showVisitorsCertainLocations?.is_selected && (
                    <span className="text-customGray block">
                      Show to visitors in certain locations:{" "}
                      <strong>{showVisitorsCertainLocations?.location}</strong>
                    </span>
                  )}

                  {notShowVisitorsCertainLocations?.is_selected && (
                    <span className="text-customGray">
                      Don’t show to visitors in certain locations:{" "}
                      <strong>
                        {notShowVisitorsCertainLocations?.location}
                      </strong>
                    </span>
                  )}
                </div>
                <div className="absolute left-[-25px] top-[50px] w-8 h-1 bg-customGray rounded-full transform -translate-x-1/2"></div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
};

export default TargetingAndBehaviorControlComponent;
