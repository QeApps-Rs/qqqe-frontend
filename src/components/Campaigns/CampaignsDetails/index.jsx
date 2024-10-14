/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import SwitcherThree from "../../Switchers/SwitcherThree";
import { Link, useLocation } from "react-router-dom";
import { defaultBoxClassName } from "../../../pages/forms/masterFormConfig";
import SalesLineGraph from "../Graphs/SalesLineGraph";
import SalesPieGraph from "../Graphs/SalesPieGraph";
import SalesBarGraph from "../Graphs/SaleBarChart";
import Loader from "../../../common/Loader";
import FormSubmitHandler from "../../FormSubmitHandler";
import product1Img from "../../../images/product1.png";
import customerImg from "../../../images/customer-standing.png";
import toast from "react-hot-toast";

const CampaignsDetailsPage = ({ id }) => {
  const { state } = useLocation();
  const { openInNewTab, switch: initialSwitchState } = state || {};
  const [switchStates, setSwitchStates] = useState({ openInNewTab });
  const [activeTab, setActiveTab] = useState("medium");
  const handleToggle = (key) => {
    setSwitchStates((prevStates) => ({
      ...prevStates,
      [key]: !prevStates[key],
    }));
  };
  const productData = [
    {
      variant: "Customer",
      productDataImg: customerImg,
      conversions_rate: "0%",
      conversions: 0,
      impressions: 0,
    },
    {
      variant: "Product",
      conversions_rate: "0%",
      productDataImg: product1Img,
      conversions: 0,
      impressions: 0,
    },
  ];

  const renderTab = (tab, label, activeColor) => (
    <div
      onClick={() => setActiveTab(tab)}
      className={`flex items-center cursor-pointer px-4 py-2 transition-colors duration-200 ${
        activeTab === tab ? activeColor : "bg-gray-200 text-gray-700"
      }`}
    >
      {label}
    </div>
  );
  const handleChange = (e) => {
    const selectedValue = e.target.value;
    console.log(["selectedValue", selectedValue]);
  };

  const renderCampaignBox = (title, value, rate, item1) => (
    <div
      className="campaigns-boxs p-4 bg-white rounded-lg shadow-md"
      key={item1}
    >
      <span className="box-title block text-indigo-600 font-semibold text-lg mb-2">
        {title}
      </span>
      <div className="flex items-end">
        <h2 className="text-3xl font-bold text-gray-800 mr-2">{value}</h2>
        <span className="text-green-500 font-semibold">{rate}</span>
      </div>
    </div>
  );

  const surveyData = [
    {
      id: 1,
      title: "Survey Type style",
      description: "none",
      answer: "",
      moreProduct: "and",
    },
    {
      id: 2,
      title: "Survey Type style",
      description: "review",
      answer: "5",
      moreProduct: "and",
    },
  ];
  const bundleData = [
    {
      id: 1,
      title: "No of Products:",
      description: "3",
      answer: "",
      moreProduct: "and",
    },
    {
      id: 2,
      title: "Select Product",
      description:
        "10Club Red Metal Vase | Elegant Flower Vase for Home Decor | Durable Metal (H - 17.5 cm, 600 gram) - 1Pc (without Flower) (Red Color) , 11 Rules For Life: Secrets to Level Up",
      answer: "710.00",
      moreProduct: "and",
    },
    {
      id: 3,
      title: "Select Collection",
      description: "Artificial Plants and Vases , Arts and craft supplies",
      answer: "",
      moreProduct: "and",
    },
    {
      id: 4,
      title: "Targeted select Product",
      description:
        "10Club Red Metal Vase | Elegant Flower Vase for Home Decor | Durable Metal (H - 17.5 cm, 600 gram) - 1Pc (without Flower) (Red Color) , 11 Rules For Life: Secrets to Level Up",
      answer: "710.00",
      moreProduct: "and",
    },
    {
      id: 4,
      title: "Targeted select collection",
      description: "Artificial Plants and Vases , Arts and craft supplies",
      answer: "",
      moreProduct: "and",
    },
    {
      id: 5,
      title: "Discount For",
      description: "Product",
      answer: "",
      moreProduct: "and",
    },
    {
      id: 6,
      title: "Discount Type",
      description: "Fixed Amount",
      answer: "",
      moreProduct: "and",
    },
    {
      id: 7,
      title: "Discount Amount",
      description: "54%",
      answer: "",
      moreProduct: "and",
    },
  ];

  const salesBarData = [10, 41, 35, 51, 49, 62, 69, 91, 148];

  const barCategories = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
  ];
  const baryAxisTitle = "Sales Amount";

  const salesLineData = [10, 41, 35, 51, 49, 62, 69, 91, 148];
  const lineCategories = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
  ];
  const lineyAxisTitle = "Sales Amount";

  const seriesData = [44, 55, 13, 43, 22];
  const labels = [
    "Product A",
    "Product B",
    "Product C",
    "Product D",
    "Product E",
  ];
  const chartTitle = "Sales by Product Category";

  const [productDetailsData, setProductDetailsData] = useState({});

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSuggestionDetailsData = async () => {
      try {
        setLoading(true);
        await FormSubmitHandler({
          method: "get",
          url: `applied/suggestion/${state.id}`,
        })
          .then((res) => {
            if (res.data) {
              setProductDetailsData(res.data);
            }
            if (initialSwitchState !== undefined) {
              setSwitchStates((prev) => ({
                ...prev,
                [id]: initialSwitchState,
              }));
            }
          })
          .catch((err) => {
            toast.error(err.message);
          })
          .finally(() => {
            setLoading(false);
          });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchSuggestionDetailsData();
  }, [id, initialSwitchState]);

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
    <>
      {loading && <Loader />}

      <div className="mb-25">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {state?.title}
        </h1>
        <span className="block">{state?.description}</span>

        <div className="rounded-sm border border-stroke bg-white shadow-default mt-4 p-4 flex justify-between">
          <div className="flex items-center">
            <h2 className="font-semibold text-xl text-customGray mr-4">
              Status and Schedule
            </h2>
            <SwitcherThree
              label="Open in new tab"
              enabled={switchStates.openInNewTab}
              onToggle={() => handleToggle("openInNewTab")}
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <label>Priority</label>
              <div className="flex border-stroke rounded-sm border mx-2">
                {renderTab("low", "Low", "bg-blue-500 text-white")}
                {renderTab("medium", "Medium", "bg-blue-500 text-white")}
                {renderTab("high", "High", "bg-red-500 text-white")}
              </div>
              <i
                className="fa fa-info-circle cursor-pointer"
                aria-hidden="true"
              ></i>
            </div>
          </div>
        </div>

        <div className="rounded-sm border border-stroke bg-white shadow-default mt-4 p-4">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-xl text-customGray">
              A/B Test Center
            </h2>
            <div className="flex ">
              <div className="flex items-center">
                <span>Conversion</span>
                <select
                  onChange={handleChange}
                  className={`${defaultBoxClassName} h-12 mx-4 w-full`}
                  defaultValue="Campaign Conversion"
                >
                  <option value="Campaign Conversion">
                    Campaign Conversion
                  </option>
                  <option value="Roboto">Roboto</option>
                </select>
                <i
                  className="fa fa-info-circle cursor-pointer"
                  aria-hidden="true"
                ></i>
              </div>
              <div className="flex items-center">
                <select
                  onChange={handleChange}
                  className={`${defaultBoxClassName} h-12 mx-4 w-full`}
                  defaultValue="Campaign Conversion"
                >
                  <option value="Campaign Conversion">
                    Campaign Conversion
                  </option>
                  <option value="Roboto">Roboto</option>
                </select>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-6 border-stroke py-4.5 px-4 sm:grid-cols-8 md:px-6 2xl:px-7.5">
            {["Variants", "Impressions", "Conversions", "Conversions rate"].map(
              (header, index1) => (
                <div className="col-span-2" key={index1}>
                  <p className="text-black font-bold">{header}</p>
                </div>
              )
            )}
          </div>
          {productData?.map((product, index) => (
            <div
              className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 sm:grid-cols-8 md:px-6 2xl:px-7.5"
              key={index}
            >
              <div className="col-span-2 flex items-center">
                <img
                  src={product.productDataImg}
                  alt="product"
                  className="w-30 max-h-30 object-contain"
                />
                <div className="ml-2 text-graydark">
                  <Link to="/campaigns-details">
                    <span className="text-blue-600">{product.variant}</span>
                  </Link>
                </div>
              </div>
              {["impressions", "conversions", "conversions_rate"].map(
                (field, idx) => (
                  <div className="col-span-2 flex items-center" key={idx}>
                    <p className="text-sm text-graydark">{product[field]}</p>
                  </div>
                )
              )}
            </div>
          ))}
          {/* <div className="flex items-center cursor-pointer text-blue-600">
            <i
              className="fa fa-plus-circle mr-2 text-2xl"
              aria-hidden="true"
            ></i>
            <span className="font-black">Add A/B test experience</span>
          </div> */}
        </div>

        <h2 className="text-xl font-bold text-gray-800 my-4">
          Campaigns Statistics
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {renderCampaignBox("Impressions", 0, "0%")}
          {renderCampaignBox("Clicks", "0%", "0%")}
          {renderCampaignBox("Conversions", 0, "0%")}
        </div>
        <div className="grid gap-4 mt-4">
          <SalesLineGraph
            salesLineData={salesLineData}
            lineCategories={lineCategories}
            lineyAxisTitle={lineyAxisTitle}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <SalesPieGraph
              seriesData={seriesData}
              labels={labels}
              chartTitle={chartTitle}
            />
            <SalesBarGraph
              salesBarData={salesBarData}
              barCategories={barCategories}
              baryAxisTitle={baryAxisTitle}
            />{" "}
            <SalesPieGraph
              seriesData={seriesData}
              labels={labels}
              chartTitle={chartTitle}
            />
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <h1 className="text-lg font-bold text-gray-800">Campaigns</h1>
          <div className="flex items-center">
            <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 mr-2">
              Edit Setting{" "}
            </button>
            <Link
              to={`/master-form/${productDetailsData.pid}s${productDetailsData.sid}`}
              state={{
                subTemplateId: productDetailsData.sub_template_id,
              }}
            >
              <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 mr-2">
                Edit Template
              </button>
            </Link>
          </div>
        </div>

        <div className="rounded-sm border border-stroke bg-white shadow-default mt-4 p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-xl text-customGray uppercase	">
              When will the popup show up
            </h2>
          </div>
          <div className="flex relative justify-between items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-orange-200 rounded-md flex items-center justify-center mr-3">
                <i
                  className={`fa fa-clock-o text-red-500 text-2xl`}
                  aria-hidden="true"
                ></i>
              </div>
              <div>
                <h3 className="text-lg font-bold text-black">Timing</h3>
                {productDetailsData?.json_response?.target_behaviors?.display
                  ?.timing?.type === "immediately" && (
                  <span className="text-customGray"> Immediately </span>
                )}
                {productDetailsData?.json_response?.target_behaviors?.display
                  ?.timing?.type === "only_on_a_custom_trigger" && (
                  <span className="text-customGray">
                    Only on a custom trigger
                  </span>
                )}
                {productDetailsData?.json_response?.target_behaviors?.display
                  ?.timing?.type === "on_rules" && (
                  <ul className="list-decimal pl-5">
                    {productDetailsData?.json_response?.target_behaviors
                      ?.display?.timing?.settings?.existing_page
                      ?.is_selected && (
                      <li>
                        <span className="text-customGray">
                          When visitor is exiting the page
                        </span>
                      </li>
                    )}
                    {productDetailsData?.json_response?.target_behaviors
                      ?.display?.timing?.settings?.after_delay_time
                      ?.is_selected && (
                      <li>
                        <span className="text-customGray">
                          After time delay{" "}
                          {productDetailsData?.json_response?.target_behaviors
                            ?.display?.timing?.settings?.after_delay_time
                            ?.value != "" && (
                            <strong className="text-black font-bold text-md">
                              Show again after:{" "}
                              {
                                productDetailsData?.json_response
                                  ?.target_behaviors?.display?.timing?.settings
                                  ?.after_delay_time?.value
                              }
                            </strong>
                          )}
                        </span>
                      </li>
                    )}
                    {productDetailsData?.json_response?.target_behaviors
                      ?.display?.timing?.settings?.after_scroll_distance
                      ?.is_selected && (
                      <li>
                        <span className="text-customGray">
                          After visitor has scrolled a certain amount{" "}
                          {productDetailsData?.json_response?.target_behaviors
                            ?.display?.timing?.settings?.after_scroll_distance
                            ?.value != "" && (
                            <strong className="text-black font-bold text-md">
                              Scroll distance:{" "}
                              {
                                productDetailsData?.json_response
                                  ?.target_behaviors?.display?.timing?.settings
                                  ?.after_scroll_distance?.value
                              }
                            </strong>
                          )}
                        </span>
                      </li>
                    )}
                    {productDetailsData?.json_response?.target_behaviors
                      ?.display?.timing?.settings?.after_pages_visit
                      ?.is_selected && (
                      <li>
                        <span className="text-customGray">
                          After visitor sees a certain number of pages{" "}
                          {productDetailsData?.json_response?.target_behaviors
                            ?.display?.timing?.settings?.after_pages_visit
                            ?.value != "" && (
                            <strong className="text-black font-bold text-md">
                              After:{" "}
                              {
                                productDetailsData?.json_response
                                  ?.target_behaviors?.display?.timing?.settings
                                  ?.after_pages_visit?.value
                              }
                            </strong>
                          )}
                        </span>
                      </li>
                    )}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {productDetailsData?.json_response?.target_behaviors?.display
            ?.frequency?.after_show_days > 0 && (
            <div className="flex relative justify-between items-center">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-orange-200 rounded-md flex items-center justify-center mr-3">
                  <i
                    className={`fa fa-signal text-red-500 text-2xl`}
                    aria-hidden="true"
                  ></i>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-black">Frequency</h3>
                  <ul className="list-decimal pl-5">
                    <li>
                      <span className="text-customGray">
                        After a visitor closes this form, show again after{" "}
                        {
                          productDetailsData?.json_response?.target_behaviors
                            ?.display?.frequency?.after_show_days
                        }{" "}
                        days
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
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
                  show_to_email_subscribers_only:
                    "Show to email subscribers only",
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
                          <strong>
                            {showVisitorsCertainLocations?.location}
                          </strong>
                        </span>
                      )}

                      {/* Do not show locations */}
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

        <div className="rounded-sm border border-stroke bg-white shadow-default mt-4 p-8">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-xl text-customGray uppercase	">
              Who should see the popup
            </h2>
          </div>
          <div className="flex ">
            <div className="border-l-[1.5px] border-customGray pl-10 mt-3  w-full">
              {surveyData.map((item, index) => (
                <>
                  <div
                    key={item.id}
                    className="flex items-center border-b-[1.5px] border-customGray mb-4 pb-3 relative"
                  >
                    {/* <div className="w-10 h-10 bg-orange-200 rounded-md flex items-center justify-center mr-3">
                      <i
                        className={`fa ${item.icon} text-red-500 text-2xl`}
                        aria-hidden="true"
                      ></i>
                    </div> */}
                    <div className="block">
                      <h3 className="text-lg font-bold text-black">
                        {item.title}
                      </h3>
                      <span className="text-customGray block">
                        {item.description}
                      </span>
                      <span className="text-customGray block">
                        {item.answer}
                      </span>
                    </div>
                    {index !== surveyData.length - 1 && (
                      <span className="bg-blue-400 p-1 uppercase rounded-sm text-sm text-white font-bold absolute left-[-60px] top-[50px]">
                        {item.moreProduct}
                      </span>
                    )}
                    {index === surveyData.length - 1 && (
                      <div className="absolute left-[-25px] top-[50px] w-8 h-1 bg-customGray rounded-full transform -translate-x-1/2"></div>
                    )}
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-sm border border-stroke bg-white shadow-default mt-4 p-8">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-xl text-customGray uppercase	">
              Who should see the popup
            </h2>
          </div>
          <div className="flex ">
            <div className="border-l-[1.5px] border-customGray pl-10 mt-3  w-full">
              {bundleData.map((item, index) => (
                <>
                  <div
                    key={item.id}
                    className="flex items-center border-b-[1.5px] border-customGray mb-4 pb-3 relative"
                  >
                    {/* <div className="w-10 h-10 bg-orange-200 rounded-md flex items-center justify-center mr-3">
                      <i
                        className={`fa ${item.icon} text-red-500 text-2xl`}
                        aria-hidden="true"
                      ></i>
                    </div> */}
                    <div className="block">
                      <h3 className="text-lg font-bold text-black">
                        {item.title}
                      </h3>
                      <span className="text-customGray block">
                        {item.description}
                      </span>
                      <span className="text-customGray block">
                        {item.answer}
                      </span>
                    </div>
                    {index !== bundleData.length - 1 && (
                      <span className="bg-blue-400 p-1 uppercase rounded-sm text-sm text-white font-bold absolute left-[-60px] top-[50px]">
                        {item.moreProduct}
                      </span>
                    )}
                    {index === bundleData.length - 1 && (
                      <div className="absolute left-[-25px] top-[50px] w-8 h-1 bg-customGray rounded-full transform -translate-x-1/2"></div>
                    )}
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CampaignsDetailsPage;
