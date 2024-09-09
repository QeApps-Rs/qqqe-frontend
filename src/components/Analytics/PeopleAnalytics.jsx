import { useEffect, useState } from "react";
import BarChart from "../Charts/BarChart";

import FormSubmitHandler from "../FormSubmitHandler";
import DonutChart from "../Charts/DonutChart";
import SlopeChart from "../Charts/SlopeChart";
import LineChart from "../Charts/LineChart";
import StepLineChart from "../Charts/StepLineChart";
import BarChartCustomer from "../Charts/BarChartCustomer";
import { getWeekData } from "./GetDataVisitCustomer";
import ColumnChart from "../Charts/ColumnChart";
import PieChart from "../Charts/PieChart";
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import Loader from "../../common/Loader";
import GraphCard from "./GraphCard";
const PeopleAnalytics = () => {
  const [loading, setLoading] = useState(false);
  const [countryData, setCountryData] = useState({
    apiStatus: false,
    apiData: {},
  });
  const [browserData, setBrowserData] = useState({
    apiStatus: false,
    apiData: {},
  });
  const [pagesData, setPagesData] = useState({
    apiStatus: false,
    apiData: {},
  });
  const [entryPagesData, setEntryPagesData] = useState({
    apiStatus: false,
    apiData: {},
  });
  const [productData, setProductData] = useState({
    apiStatus: false,
    apiData: {},
  });
  const [productSeries, setProductSeries] = useState([]); // State for product series
  const [productCategories, setProductCategories] = useState([]);

  const [categoriesData, setCategoriesData] = useState({
    apiStatus: false,
    apiData: {},
  });
  const [categoriesSeries, setCategoriesSeries] = useState([]); // State for categories series
  const [categoriesCategories, setCategoriesCategories] = useState([]);

  const [visitedPagesData, setVisitedPagesData] = useState({
    apiStatus: false,
    apiData: {},
  });
  const [visitedPagesSeries, setVisitedPagesSeries] = useState([]); // State for visitedPages series
  const [visitedPagesVisitedPages, setVisitedPagesVisitedPages] = useState([]);

  const [combinedSeries, setCombinedSeries] = useState([]); // State for combinedSeries series
  const [combinedCategories, setCombinedCategories] = useState([]);
  ///Mansi Patel////


  //  Top Search Keyword Count
  const searchData = [
    { keyword: "snowboard", count: 5 },
    { keyword: "jacket", count: 7 },
    { keyword: "gloves", count: 2 },
    { keyword: "Shoes", count: 8 },
    { keyword: "hat", count: 3 },
    { keyword: "heels", count: 2 },
    { keyword: "Baby & Toddler Shoesat", count: 10 },
    { keyword: "Slippers", count: 3 },
    { keyword: "heels", count: 9 },
    { keyword: "hat", count: 3 },
    { keyword: "gloves", count: 2 },
    { keyword: "Athletic Shoes", count: 6 },
    { keyword: "hat", count: 1 },
    { keyword: "Flats", count: 7 },
    { keyword: "Trousers", count: 8 },
    { keyword: "Cargo Pants", count: 12 },
    { keyword: "Jeans", count: 10 },
    { keyword: "Glue Guns", count: 15 },
  ];

  const getTopNKeywords = (n) => {
    const sortedKeywords = searchData
      .sort((a, b) => b.count - a.count)
      .slice(0, n);

    return sortedKeywords;
  };

  const topKeywords = getTopNKeywords(10);

  //visited customers data
  const [weekNumber, setWeekNumber] = useState(1);

  const { oneTimeVisit, multiTimeVisit } = getWeekData(weekNumber);

  ////////////////////////////


  // HARSHIL CREATED STATES START
  const [orderCountDeviceWise, setOrderCountDeviceWise] = useState({ status: false, data: {} });
  const [orderCountCountryWise, setOrderCountCountryWise] = useState({ status: false, data: {} });
  const [productSoldUnSoldCount, setProductSoldUnSoldCount] = useState({ status: false, data: {} });
  const [activeTab, setActiveTab] = useState(0);
  const [mostPurchasedProduct, setMostPurchasedProduct] = useState([]);
  const [unsoldProduct, setUnsoldProduct] = useState([]);
  const [top7Product, setTop7Product] = useState([]);

  const [customerTopOrderList, setCustomerTopOrderList] = useState({ status: false, data: [] });
  const [customerCountCountryWise, setCustomerCountCountryWise] = useState({ status: false, data: {} });
  const [customerCount, setCustomerCount] = useState({ status: false, data: {} });
  const [orderSaleCount, setOrderSaleCount] = useState({ status: false, data: {} });
  const orderSalesData = ["Order Count", "Order Sales", "Order Average"];
  const [orderSaleValue, setOrderSaleValue] = useState([0, 0, 0]);
  const [activeButton, setActiveButton] = useState("day");

  const handleButtonClick = (id) => {
    setActiveButton(id);
  };

  const getButtonClasses = (id) => {
    const baseClasses = "px-4 py-2 font-semibold rounded focus:outline-none focus:ring";
    const activeClasses = "bg-blue-500 text-white hover:bg-blue-600";
    const inactiveClasses = "bg-gray-200 text-gray-700 hover:bg-gray-300";

    return id === activeButton ? `${baseClasses} ${activeClasses}` : `${baseClasses} ${inactiveClasses}`;
  };

  // HARSHIL CREATED STATES END

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const resultOfLevelOneQuestionList = await FormSubmitHandler({
          method: "get",
          url: "getCustomerJourneyData",
        });

        console.log(
          "resultOfLevelOneQuestionList",
          resultOfLevelOneQuestionList
        );

        if (resultOfLevelOneQuestionList) {
          setCountryData({
            apiStatus: true, // Update this based on actual response structure
            apiData: resultOfLevelOneQuestionList.countryCount, // Update this based on actual response structure
          });
          setBrowserData({
            apiStatus: true, // Update this based on actual response structure
            apiData: resultOfLevelOneQuestionList.ipCount.repeated, // Update this based on actual response structure
          });
          setPagesData({
            apiStatus: true, // Update this based on actual response structure
            apiData: resultOfLevelOneQuestionList.pagesCount, // Update this based on actual response structure
          });
          setEntryPagesData({
            apiStatus: true, // Update this based on actual response structure
            apiData: resultOfLevelOneQuestionList.entryExitPageCount, // Update this based on actual response structure
          });

          setProductData({
            apiStatus: true, // Update this based on actual response structure
            apiData: resultOfLevelOneQuestionList.viewProductCount, // Update this based on actual response structure
          });
          setProductSeries([
            {
              name: "Products",
              data: resultOfLevelOneQuestionList.viewProductCount.map(
                (item) => item.views
              ),
            },
          ]);

          setProductCategories(
            resultOfLevelOneQuestionList.viewProductCount.map(
              (item) => item.title
            )
          );

          setCategoriesData({
            apiStatus: true, // Update this based on actual response structure
            apiData: resultOfLevelOneQuestionList.viewCollectionCount, // Update this based on actual response structure
          });
          setCategoriesSeries([
            {
              name: "Categories",
              data: resultOfLevelOneQuestionList.viewCollectionCount.map(
                (item) => item.views
              ),
            },
          ]);

          setCategoriesCategories(
            resultOfLevelOneQuestionList.viewCollectionCount.map(
              (item) => item.title
            )
          );

          setVisitedPagesData({
            apiStatus: true, // Update this based on actual response structure
            apiData: resultOfLevelOneQuestionList.viewPagesCount, // Update this based on actual response structure
          });
          setVisitedPagesSeries([
            {
              name: "VisitedPages",
              data: resultOfLevelOneQuestionList.viewPagesCount.map(
                (item) => item.views
              ),
            },
          ]);

          setVisitedPagesVisitedPages(
            resultOfLevelOneQuestionList.viewPagesCount.map(
              (item) => item.title
            )
          );

          setCombinedSeries([

            {
              name: "Products",
              data: resultOfLevelOneQuestionList.viewProductCount.map(
                (item) => item.views
              ),
            },
            {
              name: "Categories",
              data: resultOfLevelOneQuestionList.viewCollectionCount.map(
                (item) => item.views
              ),
            },
            {
              name: "Pages",
              data: resultOfLevelOneQuestionList.viewPagesCount.map(
                (item) => item.views
              ),
            },
          ]);
          setCombinedCategories(
            [
              ...resultOfLevelOneQuestionList.viewProductCount.map(
                (item) => item.title
              ),
              ...resultOfLevelOneQuestionList.viewCollectionCount.map(
                (item) => item.title
              ),
              ...resultOfLevelOneQuestionList.viewPagesCount.map(
                (item) => item.title
              )]
          );
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchOrderCountDeviceCountryWise = async () => {
      try {
        const response = await FormSubmitHandler({
          method: "get",
          url: "order/count/device/country/wise",
        });

        if (response.data) {
          /* DEVICE WISE ORDER COUNT START */
          const deviceCount = response.data.device_wise_order;
          setOrderCountDeviceWise({
            status: true,
            data: {
              categories: Object.keys(deviceCount),
              seriesData: [{
                name: 'Series 1',
                data: Object.values(deviceCount),
                color: "#b1399e",
              }],
              xtitle: "Device",
              ytitle: "Order Count",
            }
          });
          /* DEVICE WISE ORDER COUNT END */

          /* COUNTRY WISE ORDER COUNT START */
          const countryCount = response.data.country_wise_order;
          setOrderCountCountryWise({
            status: true,
            data: {
              categories: Object.keys(countryCount),
              seriesData: [{
                name: 'Series 1',
                data: Object.values(countryCount),
                color: "#b1399e",
              }],
              xtitle: "Country",
              ytitle: "Order Count",
            }
          });
          /* COUNTRY WISE ORDER COUNT END */

          /* PRODUCT WISE ORDER COUNT START */
          const top_7ProductsList = response.data.top_7_products_list;
          setProductSoldUnSoldCount({
            status: true,
            data: {
              labels: ['Most Purchased Products', 'Un-sold Products', 'Top Selling Products'],
              pieSeries: [
                response.data.most_purchase_product_count,
                response.data.unsold_product_count,
                top_7ProductsList.length,
              ],
            }
          });
          setMostPurchasedProduct(top_7ProductsList);
          setUnsoldProduct(response.data.unsold_product_list);
          setTop7Product(top_7ProductsList);
          /* PRODUCT WISE ORDER COUNT END */
        }
      } catch (error) {
        console.error("Error fetching order count:", error);
      }
    };

    const fetchCustomerChartCount = async () => {
      try {
        const response = await FormSubmitHandler({
          method: "get",
          url: "customer/count",
        });
        if (response.data) {
          console.log(['customer', response.data]);

          /* COUNTRY WISE CUSTOMER COUNT START */
          const countryCount = response.data.countries;
          setCustomerCountCountryWise({
            status: true,
            data: {
              categories: Object.keys(countryCount),
              seriesData: [{
                name: 'Series 1',
                data: Object.values(countryCount),
                color: "#b1399e",
              }],
              xtitle: "Country",
              ytitle: "Customer Count",
            }
          });
          /* COUNTRY WITH CUSTOMER COUNT END */

          /* CUSTOMER WITH ORDER COUNT START */
          const customerWithOrder = response.data.customer_with_order;
          const customerWithoutOrder = response.data.customer_without_order;
          const repeatedCustomer = response.data.customer.repeated_customer;
          const nonRepeatedCustomer = response.data.customer.non_repeated_customer;
          const customerTopOrders = response.data.customer.customer_top_orders;
          setCustomerTopOrderList({
            status: true,
            data: customerTopOrders.slice(0, 5)
          })

          setCustomerCount({
            status: true,
            data: {
              labels: [
                'Customer with order', 'Customer without order', 'Repeated customer', 'Non repeated customer', 'Customer top orders'
              ],
              pieSeries: [
                customerWithOrder,
                customerWithoutOrder,
                repeatedCustomer,
                nonRepeatedCustomer,
                customerTopOrders.length,
              ],
            }
          });
          /* CUSTOMER WITH ORDER COUNT END */
        }
      } catch (error) {
        console.error("Error fetching customer count:", error);
      }
    };

    fetchUserData();
    fetchOrderCountDeviceCountryWise();
    fetchCustomerChartCount();
  }, []);

  useEffect(() => {
    const fetchOrderSalesChartCount = async () => {
      const param = getDateRangeParams(activeButton);
      const response = await FormSubmitHandler({
        method: "get",
        url: `order/sales/count?${param}`,
      });
      if (response.data) {
        const orderValues = [
          response.data.order_count,
          response.data.order_sales,
          response.data.order_average,
        ];
        setOrderSaleCount({
          status: true,
          data: {
            categories: orderSalesData,
            seriesData: [{
              name: 'Order Count',
              data: orderValues,
              color: "#b1399e",
            }],
            xtitle: "Order Sales Report",
            ytitle: "Number",
          }
        });
        setOrderSaleValue(orderValues);
      }
    }

    fetchOrderSalesChartCount();
  }, [activeButton]);

  const renderTable = (data) => (
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-2 text-left dark:bg-meta-4">
          <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Title</th>
        </tr>
      </thead>
      <tbody>
        {
          data.map((item, key) => (
            <tr key={key}>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">{item.title}</p>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );

  const renderCustomerTopOrderTable = (data) => (
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-2 text-left dark:bg-meta-4">
          <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Name</th>
          <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Order Count</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, key) => (
          <tr key={key}>
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <p className="text-black dark:text-white">{item.name}</p>
            </td>
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <p className="text-black dark:text-white">{item.orders_count}</p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const getDateRangeParams = (filterType) => {
    let startDate, endDate;
    const today = new Date();

    if (filterType === "year") {
      startDate = new Date(`${today.getFullYear()}-01-01`);
      endDate = new Date(`${today.getFullYear()}-12-31`);
    } else if (filterType === "month") {
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      startDate = new Date(`${year}-${month.toString().padStart(2, '0')}-01`);
      endDate = new Date(year, month, 0);
      endDate.setHours(23, 59, 59, 999);
    } else if (filterType === "day") {
      startDate = endDate = today;
    }

    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = endDate.toISOString().split('T')[0];

    return `start_date=${formattedStartDate}&end_date=${formattedEndDate}`;
  };

  return (
    <>
      {!loading && <Loader />}
      <main className="main-content todo-app w-full px-[var(--margin-x)] pb-8">
        <div className="mb-1 -mt-2 p-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between __web-inspector-hide-shortcut__"></div>
        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          {/* HARSHIL CREATED CHARTS START */}
          {
            orderSaleCount && (
              <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-12">
                <div className="toolbar flex space-x-2 pt-4 justify-end">
                  <button className={getButtonClasses("day")} onClick={() => handleButtonClick("day")}>
                    Day
                  </button>
                  <button className={getButtonClasses("month")} onClick={() => handleButtonClick("month")}>
                    Month
                  </button>
                  <button className={getButtonClasses("year")} onClick={() => handleButtonClick("year")}>
                    Year
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
                  {
                    orderSalesData.map((orderSaleTitle, key) => (
                      <div key={key} className="col-span-12 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark  xl:col-span-4 h-29 align-center flex flex justify-center items-center">
                        <div className="block">
                          <h2 className="block text-3xl ">{orderSaleTitle}</h2>
                          <span className="block text-center text-1xl  font-extrabold">
                            {orderSaleValue[key]}
                          </span>
                        </div>
                      </div>
                    ))
                  }
                </div>
                <div>
                  <div className="bg-green-300 h-16">
                    <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
                      Order Sales
                    </p>
                  </div>
                  <ColumnChart chartData={orderSaleCount.data} />
                </div>
              </div>
            )
          }
          {
            orderCountDeviceWise.status && (
              <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
                <div className="bg-green-300 h-16">
                  <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
                    Order Count By Device
                  </p>
                </div>

                <ColumnChart chartData={orderCountDeviceWise.data} />
              </div>
            )
          }
          {
            orderCountCountryWise.status && (
              <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
                <div className="bg-green-300 h-16">
                  <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
                    Order Count By Country
                  </p>
                </div>

                <ColumnChart chartData={orderCountCountryWise.data} />
              </div>
            )
          }
          {
            productSoldUnSoldCount.status && (
              <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
                <div className="bg-green-300 h-16">
                  <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
                    Product Chart
                  </p>
                </div>
                <PieChart chartData={productSoldUnSoldCount.data} />
              </div>
            )
          }
          {
            productSoldUnSoldCount.status && (
              <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
                <div className="bg-green-300 h-16">
                  <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
                    Product Categories
                  </p>
                </div>
                <div className="container mx-auto p-4">
                  <Tabs selectedIndex={activeTab} onSelect={(index) => setActiveTab(index)}>
                    <TabList>
                      <Tab style={{ backgroundColor: "#078bf0" }}>Most Purchased Products</Tab>
                      <Tab style={{ backgroundColor: "#04e590" }}>Un-Sold Products</Tab>
                      <Tab style={{ backgroundColor: "#feb130" }}>Top 7 Products</Tab>
                    </TabList>

                    <TabPanel>
                      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                        <div className="max-w-full overflow-x-auto">
                          {renderTable(mostPurchasedProduct)}
                        </div>
                      </div>
                    </TabPanel>

                    <TabPanel>
                      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                        <div className="max-w-full overflow-x-auto">
                          {renderTable(unsoldProduct)}
                        </div>
                      </div>
                    </TabPanel>

                    <TabPanel>
                      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                        <div className="max-w-full overflow-x-auto">
                          {renderTable(top7Product)}
                        </div>
                      </div>
                    </TabPanel>
                  </Tabs>
                </div>
              </div>
            )
          }
          {
            customerCountCountryWise.status && (
              <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
                <div className="bg-green-300 h-16">
                  <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
                    Customer Count By Country
                  </p>
                </div>

                <ColumnChart chartData={customerCountCountryWise.data} />
              </div>
            )
          }
          {
            customerTopOrderList.status && (
              <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
                <div className="bg-green-300 h-16">
                  <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
                    Customer Top Orders
                  </p>
                </div>
                <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                  <div className="max-w-full overflow-x-auto">
                    {renderCustomerTopOrderTable(customerTopOrderList.data)}
                  </div>
                </div>
              </div>
            )
          }
          {
            customerCount.status && (
              <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
                <div className="bg-green-300 h-16">
                  <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
                    Customer Chart
                  </p>
                </div>
                <PieChart chartData={customerCount.data} />
              </div>
            )
          }
          {/* HARSHIL CREATED CHARTS END */}
          <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
            <div className="bg-green-300 h-16">
              <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit,
                assumenda.
                {/* <span className="bg-blue-100 text-blue-800 text-xs  font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                Customized
              </span> */}
              </p>
            </div>

            {pagesData.apiStatus && (
              <DonutChart
                chartData={pagesData.apiData}
                name="Visited Pages"
                title="Customer Distribution by Visited Pages"
                isHorizontal={true}
                dataLabelStatus={false}
              />
            )}
          </div>
          <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
            <div className="bg-green-300 h-16">
              <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit,
                assumenda.
                {/* <span className="bg-blue-100 text-blue-800 text-xs  font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                Customized
              </span> */}
              </p>
            </div>

            {entryPagesData.apiStatus && (
              <SlopeChart
                chartData={entryPagesData.apiData}
                name="Visited Pages"
                title="Customer Distribution by Visited Pages"
                isHorizontal={true}
                dataLabelStatus={false}
              />
            )}
          </div>
          <GraphCard title=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, aspernatur." colSpanClass="col-span-12 xl:col-span-6">
            {countryData.apiStatus && (
              <BarChart
                chartData={countryData.apiData}
                name="Country"
                title="Customer Distribution by Country"
                isHorizontal={false}
                dataLabelStatus={true}
                colors={["#00C49F", "#FFBB28"]}
              />
            )}
          </GraphCard>
          {/* <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
            <div className="bg-green-300 h-16">
              <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae,
                aspernatur.
                <span className="bg-blue-100 text-blue-800 text-xs  font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                Customized
              </span>
              </p>
            </div>
            {countryData.apiStatus && (
              <BarChart
                chartData={countryData.apiData}
                name="Country"
                title="Customer Distribution by Country"
                isHorizontal={false}
                dataLabelStatus={true}
                colors={["#00C49F", "#FFBB28"]}
              />
            )}
          </div> */}
          {/* =============================Sencond Graph ========================== */}
          <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
            <div className="bg-green-300 h-16">
              <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit,
                assumenda.
                {/* <span className="bg-blue-100 text-blue-800 text-xs  font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                Customized
              </span> */}
              </p>
            </div>

            {browserData.apiStatus && (
              <BarChart
                chartData={browserData.apiData}
                name="IP Address"
                title="Customer Distribution by IP Address"
                isHorizontal={true}
                dataLabelStatus={false}
              />
            )}
          </div>

          <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-12">
            <div className="bg-green-300 h-16">
              <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit,
                assumenda.
                {/* <span className="bg-blue-100 text-blue-800 text-xs  font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                Customized
              </span> */}
              </p>
            </div>

            <LineChart
              series={combinedSeries}
              title="Combined Top Views (Products, Categories, Pages)"
              categories={combinedCategories}
            />
          </div>

          <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-4">
            <div className="bg-green-300 h-16">
              <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit,
                assumenda.
                {/* <span className="bg-blue-100 text-blue-800 text-xs  font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                Customized
              </span> */}
              </p>
            </div>
            {productData.apiStatus && (
              <LineChart
                series={productSeries}
                title="Top Viewed Products"
                categories={productCategories}
              />
            )}
          </div>
          <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-4">
            <div className="bg-green-300 h-16">
              <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit,
                assumenda.
                {/* <span className="bg-blue-100 text-blue-800 text-xs  font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                Customized
              </span> */}
              </p>
            </div>
            {categoriesData.apiStatus && (
              <LineChart
                series={categoriesSeries}
                title="Top Viewed Categories"
                categories={categoriesCategories}
              />
            )}
          </div>
          <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-4">
            <div className="bg-green-300 h-16">
              <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit,
                assumenda.
                {/* <span className="bg-blue-100 text-blue-800 text-xs  font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                Customized
              </span> */}
              </p>
            </div>
            {visitedPagesData.apiStatus && (
              <LineChart
                series={visitedPagesSeries}
                title="Top Viewed Pages"
                categories={visitedPagesVisitedPages}
              />
            )}
          </div>
          <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
            <div className="bg-green-300 h-16">
              <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit,
                assumenda.
                {/* <span className="bg-blue-100 text-blue-800 text-xs  font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                Customized
              </span> */}
              </p>
            </div>

            <StepLineChart
              data={topKeywords}
              title="Top Keywords by Search Count"
            />
          </div>
          <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
            <div className="bg-green-300 h-16">
              <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit,
                assumenda.
                {/* <span className="bg-blue-100 text-blue-800 text-xs  font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                Customized
              </span> */}
              </p>
            </div>

            <BarChartCustomer
              chartData={oneTimeVisit}
              name="One-Time Visits"
              title={`One-Time Visits for Weeks ${weekNumber}`}
              isHorizontal={false}
              dataLabelStatus={true}
              barColors={["#FFBB28"]}
            />
          </div>
          <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
            <div className="bg-green-300 h-16">
              <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit,
                assumenda.
                {/* <span className="bg-blue-100 text-blue-800 text-xs  font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                Customized
              </span> */}
              </p>
            </div>

            <BarChartCustomer
              chartData={multiTimeVisit}
              name="Multi-Time Visits"
              title={`Multi-Time Visits for Weeks ${weekNumber}`}
              isHorizontal={false}
              dataLabelStatus={true}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default PeopleAnalytics;
