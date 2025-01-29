/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import SwitcherThree from "../../Switchers/SwitcherThree";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { defaultBoxClassName } from "../../../pages/forms/masterFormConfig";
import SalesLineGraph from "../Graphs/SalesLineGraph";
import SalesPieGraph from "../Graphs/SalesPieGraph";
import SalesBarGraph from "../Graphs/SaleBarChart";
import Loader from "../../../common/Loader";
import FormSubmitHandler from "../../FormSubmitHandler";
import product1Img from "../../../images/product1.png";
import customerImg from "../../../images/customer-standing.png";
import toast from "react-hot-toast";
import BundleCampaignComponent from "./BundleCampaignComponent";
import TargetingAndBehaviorControlComponent from "./TargetAndBehaviourCampaignComponent";
import SurveyCampaignCompon from "./SurveyCampaignComponent";
import NeedHelpPage from "../../NeedHelp";
import Support from "../../Support/Support";
import EmailDetailsModal from "./EmailDetailsModal";
import { BackIcon } from "../../custIcon/svgIcon";

const CampaignsDetailsPage = () => {
  const defaultDayCount = [0, 0, 0, 0, 0, 0, 0];
  const defaultMonthCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const navigate = useNavigate();

  const defaultDayName = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const defaultMonthName = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const { state } = useLocation();
  const { openInNewTab, switch: initialSwitchState } = state || {};
  const [switchStates, setSwitchStates] = useState({ openInNewTab });

  const handleToggle = (key) => {
    setSwitchStates((prevStates) => ({
      ...prevStates,
      [key]: !prevStates[key],
    }));
  };

  const [toggleState, setToggleState] = useState(false);

  const [weeklyImpressionCount, setWeeklyImpressionCount] = useState([
    ...defaultDayCount,
  ]);
  const [monthlyImpressionCount, setMonthlyImpressionCount] = useState([
    ...defaultMonthCount,
  ]);

  const [weeklyViewCount, setWeeklyViewCount] = useState([...defaultDayCount]);
  const [monthlyViewCount, setMonthlyViewCount] = useState([
    ...defaultMonthCount,
  ]);

  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("medium");
  const location = useLocation();
  const refToTop = useRef();

  useEffect(() => {
    refToTop.current.scrollIntoView({ behavior: "auto" });
  }, []);
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get("type");

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

  const seriesData = [44, 55, 13, 43, 22];
  const labels = [
    "Product A",
    "Product B",
    "Product C",
    "Product D",
    "Product E",
  ];

  const [countryWiseCustomerChart, setCountryWiseCustomerChart] = useState({
    seriesData: [],
    labels: [],
  });
  const [productDetailsData, setProductDetailsData] = useState({});
  const [abTest, setAbTest] = useState([]);

  const [loading, setLoading] = useState(false);
  const [emailList, setEmailList] = useState([]);

  const [impressionCount, setImpressionCount] = useState(0);
  const [conversionCount, setConversionCount] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [viewCount, setViewCount] = useState(0);

  const [readCount, setReadCount] = useState(0);
  const [openRateCount, setOpenRateCount] = useState(0);
  const [eClickCount, setEClickCount] = useState(0);
  const [readClickConversionCount, setReadClickConversionCount] = useState(0);

  const [customers, setCustomers] = useState([]);
  const [devices, setDevices] = useState([]);
  const [addedEmails, setAddedEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [emailDetail, setEmailDetail] = useState("");
  const [emailTemplateDetail, setEmailTemplateDetail] = useState([]);
  const [emailDetailsModal, setEmailDetailsModal] = useState(false);
  const emailLabels = ["Read", "Open Rate", "Click", "Conversions Rate"];
  const emailSeriesData = [
    readCount,
    openRateCount,
    eClickCount,
    readClickConversionCount,
  ];

  const emailSalesBarData = emailSeriesData;
  const EmailBarCategories = ["Read", "Open Rate", "Click", "Conversions Rate"];
  const emailBaryAxisTitle = "Count";

  const onEmailModalOpenClose = () => {
    setEmailDetailsModal(!emailDetailsModal);
  };

  const changeAppliedStatus = async (problemId, statementId, currentStatus) => {
    try {
      const result = await FormSubmitHandler({
        method: "post",
        url: `suggestion/service-status`,
        data: {
          pid: problemId,
          sid: statementId,
        },
      });
      if (result.success) {
        setToggleState(!currentStatus);
      }
    } catch (error) {
      console.error("Error in toggling status: ", error);
    }
  };

  useEffect(() => {
    const fetchSuggestionDetailsData = async () => {
      try {
        setLoading(true);
        let countWeekImpression = [...defaultDayCount];
        let countMonthImpression = [...defaultMonthCount];

        let countWeekView = [...defaultDayCount];
        let countMonthView = [...defaultMonthCount];
        await FormSubmitHandler({
          method: "get",
          url: `applied/suggestion/${id}?type=${type}`,
        })
          .then((res) => {
            let impCount = 0;
            let comCount = 0;
            let clickCount = 0;
            let viewCount = 0;

            if (res.data) {
              setToggleState(res.data?.service_status);
              setProductDetailsData(res.data);
              if (res.data.campaignResult) {
                setAbTest(Object.values(res.data.campaignResult));
              }
              res.data?.weeklyImpressionValues?.map((iValue, iKey) => {
                countWeekImpression[iKey] += iValue;
              });
              setWeeklyImpressionCount(countWeekImpression);

              res.data?.monthlyImpressionValues?.map((iValue, iKey) => {
                countMonthImpression[iKey] += iValue;
              });
              setMonthlyImpressionCount(countMonthImpression);

              res.data?.weeklyViewValues?.map((iValue, iKey) => {
                countWeekView[iKey] += iValue;
              });
              setWeeklyViewCount(countWeekView);

              res.data?.monthlyViewValues?.map((iValue, iKey) => {
                countMonthView[iKey] += iValue;
              });
              setMonthlyViewCount(countMonthView);

              if (res.data.campaignCount) {
                if (
                  res?.data?.campaignCount?.impressions &&
                  res?.data?.campaignCount?.impressions != "-"
                ) {
                  impCount = impCount + res?.data?.campaignCount?.impressions;
                }
                if (
                  res?.data?.campaignCount?.conversions &&
                  res?.data?.campaignCount?.conversions != "-"
                ) {
                  const num = parseFloat(
                    res?.data?.campaignCount?.conversions_rate
                  );
                  comCount = parseFloat(comCount) + num;
                }
                if (
                  res?.data?.campaignCount?.clicks &&
                  res?.data?.campaignCount?.clicks != "-"
                ) {
                  clickCount = clickCount + res?.data?.campaignCount?.clicks;
                }
                if (
                  res?.data?.campaignCount?.views &&
                  res?.data?.campaignCount?.views != "-"
                ) {
                  viewCount = viewCount + res?.data?.campaignCount?.views;
                }
                setImpressionCount(impCount);
                setConversionCount(comCount);
                setClickCount(clickCount);
                setViewCount(viewCount);
              }
              if (res.data?.countryWiseChartData?.seriesData?.length > 0) {
                setCountryWiseCustomerChart({
                  ...countryWiseCustomerChart,
                  ...res.data.countryWiseChartData,
                });
              }

              if (res?.data?.customersData?.length > 0) {
                setCustomers(res?.data?.customersData);
              }

              if (res?.data?.devices?.length > 0) {
                setDevices(res?.data?.devices);
              }

              setAddedEmails(res?.data?.addedEmails);

              setEmailTemplateDetail(res?.data?.emailTemplateTracking);
              let readAtCount = 0;
              let openRateCount = 0;
              let clickCountForE = 0;
              res?.data?.emailTemplateTracking?.map(
                (emailTemplateTrackingItem) => {
                  if (emailTemplateTrackingItem?.read_at) {
                    readAtCount += 1;
                    openRateCount += 1;
                  }
                  if (emailTemplateTrackingItem?.click_at) {
                    clickCountForE += 1;
                  }
                }
              );

              setReadCount(readAtCount);
              setOpenRateCount(openRateCount);
              setEClickCount(clickCountForE);
              if (readAtCount) {
                setReadClickConversionCount(
                  (clickCountForE / readAtCount) * 100
                );
              }
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
  }, [id]);

  useEffect(() => {
    if (selectedEmail) {
      getEmailDetailFromStore(selectedEmail);
    }
  }, [selectedEmail]);

  const getEmailDetailFromStore = async (email) => {
    try {
      setLoading(true);
      await FormSubmitHandler({
        method: "get",
        url: `customer?email=${email}`,
      })
        .then((res) => {
          if (res.data) {
            setEmailDetail(res.data);
            toast.success(res.message);
          }
        })
        .catch((err) => {
          toast.error(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.error("Error fetching email data:", error);
    }
  };

  const handleSendEmail = async () => {
    if (productDetailsData?.suggestion?.data?.length > 0) {
      try {
        setLoading(true);
        await FormSubmitHandler({
          method: "post",
          url: `sent/email/to-customers`,
          data: {
            productDetailsData: productDetailsData,
          },
        })
          .then((res) => {
            if (res.data) {
              toast.success(res.message);
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
    }
  };
  const DashboardTitle = ({ title }) => {
    return (
      <div className="h-16 bg-dashboard_gradient rounded-t-lg flex justify-between items-center px-4">
        <p className="text-white font-bold flex items-center h-full ">
          {title}
        </p>
        <div className="text-white text-xl hover:bg-white hover:text-black w-10 h-10 rounded-full flex items-center justify-center cursor-pointer">
          <i className="fa fa-exclamation" aria-hidden="true"></i>
        </div>
      </div>
    );
  };

  const colFullWidthGraph =
    "rounded-lg border border-stroke bg-white shadow-md p-4 hover:shadow-xl transition-shadow duration-300 min-h-[450px] ";
  const NoDataFound = () => (
    <div className="h-[calc(100%-70px)] flex flex-col justify-center items-center text-center text-red-500">
      <i className="fa fa-exclamation-triangle text-4xl mb-2"></i>{" "}
      {/* Example using Font Awesome */}
      <p className="font-bold text-lg">No data available</p>
      <p className="text-gray-500 text-sm mt-1">
        Please check back later or adjust your filters.
      </p>
    </div>
  );
  return (
    <>
      {loading && <Loader />}

      <div ref={refToTop} className="mb-25">
        <div className="flex w-full items-center">
          <div className="w-9/12">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {productDetailsData?.problem_statement}
            </h1>
            <span className="block">
              {productDetailsData?.suggestion?.description}
            </span>
          </div>
          <div className="w-3/12 justify-end flex">
            <div className="flex">
              <div className="flex items-center">
                <Link
                  // to={`/master-form/${productDetailsData.pid}s${productDetailsData.sid}`}
                  to={`${productDetailsData.url}`}
                  state={{
                    subTemplateId: productDetailsData.sub_template_id,
                  }}
                >
                  <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 mr-2">
                    Edit Template
                  </button>
                </Link>
              </div>
              {type === "email_template" && (
                <div className="flex items-center">
                  <Link onClick={handleSendEmail}>
                    <button className="border border-blue-600 text-blue-600 hover:text-white font-bold py-2 px-4 rounded hover:bg-blue-600 mr-2 bg-transparent">
                      Send Email
                    </button>
                  </Link>
                </div>
              )}
              <span
                onClick={() => navigate(-1)}
                className="flex items-center gap-x-1 cursor-pointer bg-white border border-gray-300 pt-1.5 pb-1.5 pl-2.5 pr-2.5 text-[15px] rounded-md mr-4 hover:bg-black hover:text-white transition-colors duration-300"
              >
                <BackIcon /> Back
              </span>
            </div>
          </div>
        </div>
        <div className="rounded-sm border border-stroke bg-white shadow-default mt-4 p-4 flex justify-between">
          <div className="flex items-center">
            <h2 className="font-semibold text-xl text-customGray mr-4">
              Status and Schedule
            </h2>
            <SwitcherThree
              isLabel={false}
              label="Open in new tab"
              enabled={toggleState}
              onToggle={() =>
                changeAppliedStatus(
                  productDetailsData?.pid,
                  productDetailsData?.sid,
                  toggleState
                )
              }
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
              <div
                title={productDetailsData?.tooltip_text}
                className="cursor-pointer"
              >
                <i
                  className="fa fa-info-circle cursor-pointer"
                  aria-hidden="true"
                ></i>
              </div>
            </div>
          </div>
        </div>

        {type === "suggestion" && (
          <>
            <h2 className="text-xl font-bold text-gray-800 my-4">
              Campaigns Statistics
            </h2>
            <div className="grid grid-cols-4 gap-4">
              {renderCampaignBox("Impressions", impressionCount)}
              {renderCampaignBox("Clicks", clickCount)}
              {renderCampaignBox("Conversions", conversionCount)}
              {renderCampaignBox("Views", viewCount)}
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-5">
              <div className={colFullWidthGraph}>
                <DashboardTitle title={"Weekly impression charts"} />
                <SalesLineGraph
                  salesLineData={weeklyImpressionCount}
                  lineCategories={[...defaultDayName]}
                  lineyAxisTitle="Impression counts"
                  tooltipTitle="Impression"
                />
              </div>
              <div className={colFullWidthGraph}>
                <DashboardTitle title={"Monthly impression charts"} />

                <SalesBarGraph
                  salesBarData={monthlyImpressionCount}
                  barCategories={[...defaultMonthName]}
                  baryAxisTitle="Impression counts"
                  tooltipTitle="Impression"
                />
              </div>

              <div className={colFullWidthGraph}>
                <DashboardTitle title={"Weekly view charts"} />

                <SalesLineGraph
                  salesLineData={weeklyViewCount}
                  lineCategories={[...defaultDayName]}
                  lineyAxisTitle="View counts"
                  tooltipTitle="View"
                />
              </div>
              <div className={colFullWidthGraph}>
                <DashboardTitle title={"Monthly view charts"} />

                <SalesBarGraph
                  salesBarData={monthlyViewCount}
                  barCategories={[...defaultMonthName]}
                  baryAxisTitle="View counts"
                  tooltipTitle="View"
                />
              </div>
            </div>
          </>
        )}

        {type === "suggestion" && (
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
                  {/* <i
                    className="fa fa-info-circle cursor-pointer"
                    aria-hidden="true"
                  ></i> */}
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
              {[
                "Variants",
                "Impressions",
                "Conversions",
                "Conversions rate",
              ].map((header, index1) => (
                <div className="col-span-2" key={index1}>
                  <p className="text-black font-bold">{header}</p>
                </div>
              ))}
            </div>

            {abTest.map((product, index) => (
              <div
                className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 sm:grid-cols-8 md:px-6 2xl:px-7.5"
                key={index}
              >
                <div className="col-span-2 flex items-center">
                  <img
                    src={
                      product.variant === "Product" ? product1Img : customerImg
                    }
                    alt="product"
                    className="w-30 max-h-30 object-contain"
                  />
                  <div className="ml-2 text-graydark">
                    <span className="text-blue-600">{product.variant}</span>
                  </div>
                </div>
                {["impressions", "conversions", "conversions_rate"].map(
                  (field, idx) => (
                    <div className="col-span-2 flex items-center" key={idx}>
                      <p className="text-md font-bold">{product[field]}</p>
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
        )}

        {type === "suggestion" && (
          <div
            className={`grid grid-cols-${
              countryWiseCustomerChart.seriesData.length > 0 ? 3 : 2
            } gap-4 mt-5`}
          >
            {countryWiseCustomerChart.seriesData.length > 0 && (
              <div className={colFullWidthGraph}>
                <DashboardTitle title={"Country wise customers"} />
                <SalesPieGraph
                  seriesData={countryWiseCustomerChart.seriesData}
                  labels={countryWiseCustomerChart.labels}
                />
              </div>
            )}

            <div className={colFullWidthGraph}>
              <DashboardTitle title={"Product Sales"} />
              <SalesBarGraph
                salesBarData={salesBarData}
                barCategories={barCategories}
                baryAxisTitle={baryAxisTitle}
              />
            </div>
            <div className={colFullWidthGraph}>
              <DashboardTitle title={"Sales by Product Category"} />
              <SalesPieGraph seriesData={seriesData} labels={labels} />
            </div>
          </div>
        )}
        {type === "email_template" && (
          <div className={`grid grid-cols-2 gap-4 mt-5`}>
            <div className={colFullWidthGraph}>
              <DashboardTitle title={"Email bar Chart"} />
              {emailSalesBarData[0] != 0 &&
              emailSalesBarData[1] != 0 &&
              emailSalesBarData[2] != 0 &&
              emailSalesBarData[3] != 0 ? (
                <SalesBarGraph
                  salesBarData={emailSalesBarData}
                  barCategories={EmailBarCategories}
                  baryAxisTitle={emailBaryAxisTitle}
                  title=""
                  tooltipTitle="Count"
                />
              ) : (
                <NoDataFound />
              )}
            </div>
            <div className={colFullWidthGraph}>
              <DashboardTitle title={"Email Pia Chart"} />
              {emailSeriesData[0] != 0 &&
              emailSeriesData[1] != 0 &&
              emailSeriesData[2] != 0 &&
              emailSeriesData[3] != 0 ? (
                <SalesPieGraph
                  seriesData={emailSeriesData}
                  labels={emailLabels}
                />
              ) : (
                <NoDataFound />
              )}
            </div>
          </div>
        )}

        {customers?.length > 0 && (
          <div className="rounded-sm border border-stroke bg-white shadow-default mt-4 p-4">
            <h2 className="font-semibold text-xl text-black">Customer Data</h2>
            <div className="grid grid-cols-2 border-stroke py-4.5 px-4 md:px-6 2xl:px-7.5">
              {["Name", "Email"].map((header, index1) => (
                <div className="col-span-1" key={index1}>
                  <p className="text-black font-bold">{header}</p>
                </div>
              ))}
            </div>
            {customers?.map((customer, index) => (
              <div
                className="grid grid-cols-2 border-t border-stroke py-4.5 px-48 md:px-6 2xl:px-7.5"
                key={index}
              >
                <div className="col-span-1 flex items-center">
                  <div className="text-graydark">
                    <span className="text-blue-600">{customer.name}</span>
                  </div>
                </div>
                <div className="col-span-1 flex items-center">
                  <div className="text-graydark">
                    <span className="text-blue-600">{customer.email}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {devices?.length > 0 && (
          <>
            <h1 className="text-lg font-bold text-gray-800 my-5">
              Device Data
            </h1>
            <div className="rounded-sm border border-stroke bg-white shadow-default mt-4 p-4">
              <div className="grid grid-cols-4 border-stroke py-4.5 px-4 md:px-6 2xl:px-7.5">
                {["Type", "Country", "Customer Ip", "Browser"].map(
                  (header, index1) => (
                    <div className="col-span-1" key={index1}>
                      <p className="text-black font-bold">{header}</p>
                    </div>
                  )
                )}
              </div>
              <div className="max-h-80 overflow-y-auto custom-scrollbar">
                {devices?.map((device, index) => (
                  <div
                    className="grid grid-cols-4 border-t border-stroke py-4.5 px-48 md:px-6 2xl:px-7.5"
                    key={index}
                  >
                    <div className="col-span-1 flex items-center">
                      <div className="text-graydark">
                        <span className="text-blue-600">
                          {device.type
                            ?.replace(/-/g, " ")
                            .replace(
                              /\w\S*/g,
                              (word) =>
                                word.charAt(0).toUpperCase() +
                                word.slice(1).toLowerCase()
                            )}
                        </span>
                      </div>
                    </div>
                    <div className="col-span-1 flex items-center">
                      <div className="text-graydark">
                        <span className="text-blue-600">{device.country}</span>
                      </div>
                    </div>
                    <div className="col-span-1 flex items-center">
                      <div className="text-graydark">
                        <span className="text-blue-600">{device.ip}</span>
                      </div>
                    </div>
                    <div className="col-span-1 flex items-center">
                      <div className="text-graydark">
                        <span className="text-blue-600">{device.browser}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        {addedEmails?.length > 0 && (
          <div className="rounded-sm border border-stroke bg-white shadow-default mt-4 p-4">
            <h2 className="font-semibold text-xl text-black">
              Subscription Email Data
            </h2>
            <div className="grid grid-cols-4 border-stroke py-4.5 px-4 md:px-6 2xl:px-7.5">
              {["Email"].map((header, index1) => (
                <div className="col-span-1" key={index1}>
                  <p className="text-black font-bold">{header}</p>
                </div>
              ))}
            </div>
            <div className="max-h-80 overflow-y-auto custom-scrollbar">
              {addedEmails?.map((addedEmail, index) => (
                <div
                  className="grid grid-cols-4 border-t border-stroke py-4.5 px-48 md:px-6 2xl:px-7.5"
                  key={index}
                >
                  <div className="col-span-1 flex items-center">
                    <div className="text-graydark">
                      <span className="text-blue-600">{addedEmail}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="grid grid-cols-4 gap-4 my-5">
          {renderCampaignBox("Read", readCount)}
          {renderCampaignBox("Open Rate", openRateCount)}
          {renderCampaignBox("Click", eClickCount)}
          {renderCampaignBox(
            "Conversions Rate",
            readClickConversionCount + "%"
          )}
        </div>
        {emailTemplateDetail?.length > 0 && (
          <>
            <h1 className="text-lg font-bold text-gray-800 my-5">
              Email List Details
            </h1>
            <div className="rounded-sm border border-stroke bg-white shadow-default mt-4 p-4">
              <div className="grid grid-cols-5 border-stroke pb-4.5 px-4 md:px-6 2xl:px-7.5">
                {["Email", "Sent At", "Read", "Open Rate", "Click"].map(
                  (header, index1) => (
                    <div className="col-span-1" key={index1}>
                      <p className="text-black font-bold">{header}</p>
                    </div>
                  )
                )}
              </div>
              <div
                className="max-h-80 overflow-y-auto custom-scrollbar"
                style={{ width: "calc(100% + 13px)" }}
              >
                {emailTemplateDetail?.map((etdRecord, index) => (
                  <div
                    className="grid grid-cols-5 border-t border-stroke py-4.5 px-48 md:px-6 2xl:px-7.5"
                    key={index}
                  >
                    <div className="col-span-1 flex items-center">
                      <div
                        className="text-graydark cursor-pointer items-center"
                        onClick={() => {
                          setEmailDetailsModal(true);
                          setSelectedEmail(etdRecord.email);
                        }}
                      >
                        <i
                          className="fa fa-external-link text-blue-600 text-lg"
                          aria-hidden="true"
                        ></i>{" "}
                        <span className="text-blue-600 decoration-slice">
                          {etdRecord.email}
                        </span>
                      </div>
                    </div>
                    <div className="col-span-1 flex items-center">
                      <div className="text-graydark">
                        <span className="text-blue-600">
                          {etdRecord.created_at}
                        </span>
                      </div>
                    </div>
                    <div className="col-span-1 flex items-center">
                      <div className="text-graydark">
                        <span className="text-blue-600">
                          {etdRecord.read_at ? "Yes" : "No"}
                        </span>
                      </div>
                    </div>
                    <div className="col-span-1 flex items-center">
                      <div className="text-graydark">
                        <span className="text-blue-600">
                          {etdRecord.read_at ? "Yes" : "No"}
                        </span>
                      </div>
                    </div>
                    <div className="col-span-1 flex items-center">
                      <div className="text-graydark">
                        <span className="text-blue-600">
                          {etdRecord.click_at ? "Yes" : "No"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        {type === "suggestion" && (
          <>
            <div className="flex justify-between items-center mt-4">
              <h1 className="text-lg font-bold text-gray-800">Campaigns</h1>
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
                    {productDetailsData?.json_response?.target_behaviors
                      ?.display?.timing?.type === "immediately" && (
                      <span className="text-customGray"> Immediately </span>
                    )}
                    {productDetailsData?.json_response?.target_behaviors
                      ?.display?.timing?.type ===
                      "only_on_a_custom_trigger" && (
                      <span className="text-customGray">
                        Only on a custom trigger
                      </span>
                    )}
                    {productDetailsData?.json_response?.target_behaviors
                      ?.display?.timing?.type === "on_rules" && (
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
                              {productDetailsData?.json_response
                                ?.target_behaviors?.display?.timing?.settings
                                ?.after_delay_time?.value != "" && (
                                <strong className="text-black font-bold text-md">
                                  Show again after:{" "}
                                  {
                                    productDetailsData?.json_response
                                      ?.target_behaviors?.display?.timing
                                      ?.settings?.after_delay_time?.value
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
                              {productDetailsData?.json_response
                                ?.target_behaviors?.display?.timing?.settings
                                ?.after_scroll_distance?.value != "" && (
                                <strong className="text-black font-bold text-md">
                                  Scroll distance:{" "}
                                  {
                                    productDetailsData?.json_response
                                      ?.target_behaviors?.display?.timing
                                      ?.settings?.after_scroll_distance?.value
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
                              {productDetailsData?.json_response
                                ?.target_behaviors?.display?.timing?.settings
                                ?.after_pages_visit?.value != "" && (
                                <strong className="text-black font-bold text-md">
                                  After:{" "}
                                  {
                                    productDetailsData?.json_response
                                      ?.target_behaviors?.display?.timing
                                      ?.settings?.after_pages_visit?.value
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
                      <h3 className="text-lg font-bold text-black">
                        Frequency
                      </h3>
                      <ul className="list-decimal pl-5">
                        <li>
                          <span className="text-customGray">
                            After a visitor closes this form, show again after{" "}
                            {
                              productDetailsData?.json_response
                                ?.target_behaviors?.display?.frequency
                                ?.after_show_days
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

            <TargetingAndBehaviorControlComponent
              productDetailsData={productDetailsData}
            />

            <SurveyCampaignCompon productDetailsData={productDetailsData} />

            <BundleCampaignComponent productDetailsData={productDetailsData} />
          </>
        )}
        <Support />
      </div>
      <EmailDetailsModal
        isOpen={emailDetailsModal}
        onClose={onEmailModalOpenClose}
        emailDetail={emailDetail}
      />
    </>
  );
};

export default CampaignsDetailsPage;
