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
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import Loader from "../../common/Loader";
import { GraphCard, TabCard } from "./GraphCard";
import PolarAnalytics from "./PolarAnalaytics";

const PeopleAnalytics = () => {
  const [loading, setLoading] = useState(false);
  const initialState = {
    apiStatus: false,
    apiData: {},
  };
  const [countryData, setCountryData] = useState(initialState);
  const [browserData, setBrowserData] = useState(initialState);
  const [pagesData, setPagesData] = useState(initialState);
  const [entryPagesData, setEntryPagesData] = useState(initialState);
  const [productData, setProductData] = useState(initialState);
  const [productSeries, setProductSeries] = useState([]); // State for product series
  const [productCategories, setProductCategories] = useState([]);

  const [categoriesData, setCategoriesData] = useState(initialState);
  const [categoriesSeries, setCategoriesSeries] = useState([]); // State for categories series
  const [categoriesCategories, setCategoriesCategories] = useState([]);

  const [visitedPagesData, setVisitedPagesData] = useState(initialState);
  const [visitedPagesSeries, setVisitedPagesSeries] = useState([]); // State for visitedPages series
  const [visitedPagesVisitedPages, setVisitedPagesVisitedPages] = useState([]);

  const [combinedSeries, setCombinedSeries] = useState([]); // State for combinedSeries series
  const [combinedCategories, setCombinedCategories] = useState([]);

  const [topKeywords, setTopKeywords] = useState([]);
  ///Mansi Patel////

  const [graphDescription, setGraphDescription] = useState({
    SalesCountByDevice: "Sales Count by Device refers to the total number of sales categorized by the type of device used by customers, such as mobile, desktop, or tablet. This metric helps businesses understand which devices are driving the most sales.",
    SalesCountByCountry: `"Sales Count by Country" tracks the total number of sales based on the customer's location, providing insights into which countries contribute the most to overall sales.`,
    DistributionByVisitedPages: "Customer Distribution by Page refers to the breakdown of where customers are engaging or converting across different pages of a website, helping to identify the most visited or highest-performing pages.",
    DistributionByVisitedEntryExitPages: "Customer Entry and Exit Pages refer to the first page customers land on when visiting a website and the last page they view before leaving. These metrics help analyze user behavior, showing which pages attract visitors and where they tend to exit the site.",
    DistributionByCountry: "Customer Distribution by Country shows the geographical breakdown of customers, providing insights into where your customers are located and which regions contribute the most to your customer base.",
    DistributionByIP: "Customer Distribution by IP Address tracks the geographical distribution of customers based on their IP addresses, helping to understand the location patterns of visitors and customers.",
    CustomerCountByCountry: "Customer Count by Country refers to the total number of unique customers from each country, offering insights into geographical distribution and market reach.",
    CustomerCountByOrders: "Top Customers by Orders highlights the customers with the highest number of purchases, providing insights into your most frequent buyers.",
  });

  const getTopNKeywords = (n, searchData) => {
    const sortedKeywords = searchData
      .sort((a, b) => b.count - a.count)
      .slice(0, n);

    return sortedKeywords;
  };

  //visited customers data
  const [weekNumber, setWeekNumber] = useState(1);

  const { oneTimeVisit, multiTimeVisit } = getWeekData(weekNumber);

  ////////////////////////////

  // HARSHIL CREATED STATES START
  const [orderCountDeviceWise, setOrderCountDeviceWise] =
    useState(initialState);
  const [orderCountCountryWise, setOrderCountCountryWise] =
    useState(initialState);
  const [productSoldUnSoldCount, setProductSoldUnSoldCount] =
    useState(initialState);
  const [activeTab, setActiveTab] = useState(0);
  const [mostPurchasedProduct, setMostPurchasedProduct] = useState([]);
  const [unsoldProduct, setUnsoldProduct] = useState([]);
  const [top7Product, setTop7Product] = useState([]);

  const [customerTopOrderList, setCustomerTopOrderList] = useState({
    apiStatus: false,
    apiData: [],
  });
  const [customerCountCountryWise, setCustomerCountCountryWise] =
    useState(initialState);
  const [customerCount, setCustomerCount] = useState(initialState);
  const [orderSaleCount, setOrderSaleCount] = useState(initialState);
  const orderSalesData = [
    "Total Order Count",
    "Total Revenue($)",
    "Average Order Revenue ($)",
  ];
  const [orderSaleValue, setOrderSaleValue] = useState([0, 0, 0]);
  const [activeButton, setActiveButton] = useState("year");

  const handleButtonClick = (id) => {
    setActiveButton(id);
  };

  const getButtonClasses = (id) => {
    const baseClasses =
      "px-4 py-2 font-semibold rounded focus:outline-none focus:ring";
    const activeClasses = "bg-blue-500 text-white hover:bg-blue-600";
    const inactiveClasses = "bg-gray-200 text-gray-700 hover:bg-gray-300";

    return id === activeButton
      ? `${baseClasses} ${activeClasses}`
      : `${baseClasses} ${inactiveClasses}`;
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
          setCombinedCategories([
            ...resultOfLevelOneQuestionList.viewProductCount.map(
              (item) => item.title
            ),
            ...resultOfLevelOneQuestionList.viewCollectionCount.map(
              (item) => item.title
            ),
            ...resultOfLevelOneQuestionList.viewPagesCount.map(
              (item) => item.title
            ),
          ]);
          setTopKeywords(
            getTopNKeywords(5, resultOfLevelOneQuestionList.searchDataCount)
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
            apiStatus: true,
            apiData: {
              categories: Object.keys(deviceCount),
              seriesData: [
                {
                  name: "Series 1",
                  data: Object.values(deviceCount),
                  color: "#b1399e",
                },
              ],
              xtitle: "Device",
              ytitle: "Order Count",
            },
          });
          /* DEVICE WISE ORDER COUNT END */

          /* COUNTRY WISE ORDER COUNT START */
          const countryCount = response.data.country_wise_order;
          setOrderCountCountryWise({
            apiStatus: true,
            apiData: {
              categories: Object.keys(countryCount),
              seriesData: [
                {
                  name: "Series 1",
                  data: Object.values(countryCount),
                  color: "#b1399e",
                },
              ],
              xtitle: "Country",
              ytitle: "Order Count",
            },
          });
          /* COUNTRY WISE ORDER COUNT END */

          /* PRODUCT WISE ORDER COUNT START */
          const top_7ProductsList = response.data.top_7_products_list;
          setProductSoldUnSoldCount({
            apiStatus: true,
            apiData: {
              labels: [
                "Most Purchased Products",
                "Un-sold Products",
                "Top Selling Products",
              ],
              pieSeries: [
                response.data.most_purchase_product_count,
                response.data.unsold_product_count,
                top_7ProductsList.length,
              ],
            },
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
          console.log(["customer", response.data]);

          /* COUNTRY WISE CUSTOMER COUNT START */
          const countryCount = response.data.countries;
          setCustomerCountCountryWise({
            apiStatus: true,
            apiData: {
              categories: Object.keys(countryCount),
              seriesData: [
                {
                  name: "Series 1",
                  data: Object.values(countryCount),
                  color: "#b1399e",
                },
              ],
              xtitle: "Country",
              ytitle: "Customer Count",
            },
          });
          /* COUNTRY WITH CUSTOMER COUNT END */

          /* CUSTOMER WITH ORDER COUNT START */
          const customerWithOrder = response.data.customer_with_order;
          const customerWithoutOrder = response.data.customer_without_order;
          const repeatedCustomer = response.data.customer.repeated_customer;
          const nonRepeatedCustomer =
            response.data.customer.non_repeated_customer;
          const customerTopOrders = response.data.customer.customer_top_orders;
          setCustomerTopOrderList({
            apiStatus: true,
            apiData: customerTopOrders.slice(0, 5),
          });

          setCustomerCount({
            apiStatus: true,
            apiData: {
              labels: [
                "Customer with order",
                "Customer without order",
                "Repeated customer",
                "Non repeated customer",
                "Customer top orders",
              ],
              pieSeries: [
                customerWithOrder,
                customerWithoutOrder,
                repeatedCustomer,
                nonRepeatedCustomer,
                customerTopOrders.length,
              ],
            },
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
          apiStatus: true,
          apiData: {
            categories: orderSalesData,
            seriesData: [
              {
                name: "Order Count",
                data: orderValues,
                color: "#b1399e",
              },
            ],
            xtitle: "Sales Graph",
            ytitle: "Amount ($)",
          },
        });
        setOrderSaleValue(orderValues);
      }
    };

    fetchOrderSalesChartCount();
  }, [activeButton]);

  const renderTable = (data) => (
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-2 text-left dark:bg-meta-4">
          <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
            Product Title
          </th>
          <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
            Open Product
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, key) => (
          <tr key={key}>
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <p className="text-black dark:text-white">
                <a href={item.url} target="_blank">{item.title}</a>
              </p>
            </td>
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <span>
                <a href={item.url} target="_blank">
                  <i
                    className="fa fa-lg fa-external-link-square ml-1"
                    aria-hidden="true"
                  />
                </a>
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderCustomerTopOrderTable = (data) => (
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-2 text-left dark:bg-meta-4">
          <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
            Customer Name
          </th>
          <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
            Order Count
          </th>
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
      startDate = new Date(`${year}-${month.toString().padStart(2, "0")}-01`);
      endDate = new Date(year, month, 0);
      endDate.setHours(23, 59, 59, 999);
    } else if (filterType === "day") {
      startDate = endDate = today;
    }

    const formattedStartDate = startDate.toISOString().split("T")[0];
    const formattedEndDate = endDate.toISOString().split("T")[0];

    return `start_date=${formattedStartDate}&end_date=${formattedEndDate}`;
  };

  const formatToIndianCurrency = (number) => {
    const [integerPart, decimalPart] = number.toString().split(".");
    let lastThreeDigits = integerPart.slice(-3);
    const otherDigits = integerPart.slice(0, -3);

    if (otherDigits !== '') {
      lastThreeDigits = ',' + lastThreeDigits;
    }

    const formattedIntegerPart = otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThreeDigits;
    return decimalPart ? formattedIntegerPart + "." + decimalPart : formattedIntegerPart;
  }


  const tabPanelClassName =
    "rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1";
  const countBoxClassName =
    "col-span-12 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark";

  const title =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, aspernatur.";

  return (
    <>
      {loading && <Loader />}
      <main className="main-content todo-app w-full px-[var(--margin-x)] pb-8">
        <PolarAnalytics/>
        <div className="flex items-center mt-16 justify-center">
          <div className="flex items-center">
            <i className="fa fa-bar-chart fa fa-home text-[14px] bg-[#3292a9] text-white p-1 rounded-full h-6 w-6 flex items-center justify-center" aria-hidden="true"></i>
          </div>
          <h2 className="text-title-md2 font-semibold text-black dark:text-white pl-2">Analytics</h2>
        </div>
        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          {/* HARSHIL CREATED CHARTS START */}
          {orderSaleCount && (
            <div
              className={`${countBoxClassName} px-5 pb-5 sm:px-7.5 xl:col-span-12`}
            >
              <div className="toolbar flex space-x-2 pt-4 justify-end">
                <button
                  className={getButtonClasses("day")}
                  onClick={() => handleButtonClick("day")}
                >
                  Day
                </button>
                <button
                  className={getButtonClasses("month")}
                  onClick={() => handleButtonClick("month")}
                >
                  Month
                </button>
                <button
                  className={getButtonClasses("year")}
                  onClick={() => handleButtonClick("year")}
                >
                  Year
                </button>
              </div>

              {/* <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
                {
                  orderSalesData.map((orderSaleTitle, key) => (
                    <div key={key} className={`${countBoxClassName} xl:col-span-4 h-29 align-center flex flex-col justify-center items-center`}>
                      <div className="block">
                        <h2 className="block text-3xl ">{orderSaleTitle}</h2>
                        <span className="block text-center text-1xl  font-extrabold">
                          {orderSaleTitle != "Total Order Count" ? formatToIndianCurrency(orderSaleValue[key]) : orderSaleValue[key]}
                        </span>
                      </div>
                    </div>
                  ))
                }
              </div> */}
              <div>
                <div className="bg-[#3292a9] p-5 rounded-md shadow-md mt-5">
                  <p className="text-xl font-bold text-black mb-2">
                    Sales Graph
                  </p>

                  <p className="text-sm text-black">
                    Sales Graph refers to the total number of sales transactions
                    processed within a specific period. It encompasses all
                    purchases made by customers, reflecting the business's
                    revenue generation from product or service sales.
                  </p>
                </div>
                <ColumnChart chartData={orderSaleCount.apiData} />
              </div>
            </div>
          )
          }
          {
            orderCountDeviceWise.apiStatus && (
              <GraphCard description={graphDescription.SalesCountByDevice} title="Sales Count By Device" colSpanClass="col-span-12 xl:col-span-6">
                <ColumnChart chartData={orderCountDeviceWise.apiData} />
              </GraphCard>)
          }
          {
            orderCountCountryWise.apiStatus && (
              <GraphCard description={graphDescription.SalesCountByCountry} title="Sales Count By Country" colSpanClass="col-span-12 xl:col-span-6">
                <ColumnChart chartData={orderCountCountryWise.apiData} />
              </GraphCard>)
          }
          {
            productSoldUnSoldCount.apiStatus && (
              <GraphCard title="Product Categories" colSpanClass="col-span-12 xl:col-span-6">
                <PieChart chartData={productSoldUnSoldCount.apiData} />
              </GraphCard>)
          }
          {
            productSoldUnSoldCount.apiStatus && (
              <GraphCard title="  Product Categories" colSpanClass="col-span-12 xl:col-span-6">
                <div className="container mx-auto p-4">
                  <Tabs selectedIndex={activeTab} onSelect={(index) => setActiveTab(index)}>
                    <TabList className='flex justify-center'>
                      <Tab style={{ backgroundColor: "#078bf0" }}>Most Purchased Products</Tab>
                      <Tab style={{ backgroundColor: "#04e590" }}>Unsold Products</Tab>
                      <Tab style={{ backgroundColor: "#feb130" }}>Top 7 Products</Tab>
                    </TabList>

                    <TabPanel>
                      <div className={tabPanelClassName}>
                        <div className="max-w-full overflow-x-auto">
                          {renderTable(mostPurchasedProduct)}
                        </div>
                      </div>
                    </TabPanel>

                    <TabPanel>
                      <div className={tabPanelClassName}>
                        <div className="max-w-full overflow-x-auto">
                          {renderTable(unsoldProduct)}
                        </div>
                      </div>
                    </TabPanel>

                    <TabPanel>
                      <div className={tabPanelClassName}>
                        <div className="max-w-full overflow-x-auto">
                          {renderTable(top7Product)}
                        </div>
                      </div>
                    </TabPanel>
                  </Tabs>
                </div>
              </GraphCard>)
          }
          {
            customerCountCountryWise.apiStatus && (
              <GraphCard description={graphDescription.CustomerCountByCountry} title="Customer Count By Country" colSpanClass="col-span-12 xl:col-span-6">
                <ColumnChart chartData={customerCountCountryWise.apiData} />
              </GraphCard>)
          }
          {
            customerTopOrderList.apiStatus && (
              <GraphCard description={graphDescription.CustomerCountByOrders} title="Top Customers by Orders" colSpanClass="col-span-12 xl:col-span-6">
                <div className={tabPanelClassName}>
                  <div className="max-w-full overflow-x-auto">
                    {renderCustomerTopOrderTable(customerTopOrderList.apiData)}
                  </div>
                </div>
              </GraphCard>)
          }
          <GraphCard isTitle={false} title={title} colSpanClass="col-span-12 xl:col-span-12">
            <LineChart
              series={combinedSeries}
              title="Combined Top Views (Products, Categories, Pages)"
              categories={combinedCategories}
            />
          </GraphCard>

          {productData.apiStatus && (
            <GraphCard
              isTitle={false}
              title={title}
              colSpanClass="col-span-12 xl:col-span-4"
            >
              <LineChart
                series={productSeries}
                title="Top Viewed Products"
                categories={productCategories}
              />
            </GraphCard>
          )}

          {categoriesData.apiStatus && (
            <GraphCard isTitle={false} title={title} colSpanClass="col-span-12 xl:col-span-4">
              <LineChart
                series={categoriesSeries}
                title="Top Viewed Categories"
                categories={categoriesCategories}
              />
            </GraphCard>
          )}

          {visitedPagesData.apiStatus && (
            <GraphCard isTitle={false} title={title} colSpanClass="col-span-12 xl:col-span-4">
              <LineChart
                series={visitedPagesSeries}
                title="Top Viewed Pages"
                categories={visitedPagesVisitedPages}
              />
            </GraphCard>
          )}
          {
            customerCount.apiStatus && (
              <GraphCard title="Customer Count By Categories" colSpanClass="col-span-12 xl:col-span-6">
                <PieChart chartData={customerCount.apiData} />
              </GraphCard>)
          }

          {/* HARSHIL CREATED CHARTS END */}

          {
            pagesData.apiStatus && (
              <GraphCard description={graphDescription.DistributionByVisitedPages} title={"Customer Distribution by Page"} colSpanClass="col-span-12 xl:col-span-6">
                <DonutChart
                  chartData={pagesData.apiData}
                  name="Visited Pages"

                  isHorizontal={true}
                  dataLabelStatus={false}
                />
              </GraphCard>)
          }

          {entryPagesData.apiStatus && (
            <GraphCard
              description={graphDescription.DistributionByVisitedEntryExitPages}
              title={"Customer Entry and Exit Pages"}
              colSpanClass="col-span-12 xl:col-span-4"
            >
              <SlopeChart
                chartData={entryPagesData.apiData}
                name="Entry/Exit Pages"
                title="Customer Distribution by Entry/Exit Pages"
                isHorizontal={true}
                dataLabelStatus={false}
              />
            </GraphCard>
          )}

          {countryData.apiStatus && (
            <GraphCard
              description={graphDescription.DistributionByCountry}
              title={"Customer Distribution by Country"}
              colSpanClass="col-span-12 xl:col-span-4"
            >
              <BarChart
                chartData={countryData.apiData}
                name="Country"
                title="Customer Distribution by Country"
                isHorizontal={false}
                dataLabelStatus={true}
                colors={["#00C49F", "#FFBB28"]}
              />
            </GraphCard>
          )}

          {/* =============================Sencond Graph ========================== */}

          {browserData.apiStatus && (
            <GraphCard
              description={graphDescription.DistributionByIP}
              title={"Customer Distribution by IP Address"}
              colSpanClass="col-span-12 xl:col-span-4"
            >
              <BarChart
                chartData={browserData.apiData}
                name="IP Address"
                title="Customer Distribution by IP Address"
                isHorizontal={true}
                dataLabelStatus={false}
              />
            </GraphCard>
          )}



          <GraphCard isTitle={false} title={title} colSpanClass="col-span-12 xl:col-span-4">
            <StepLineChart data={topKeywords} title="Top Keywords by Search Count" />
          </GraphCard>

          <GraphCard
            isTitle={false}
            title={title}
            colSpanClass="col-span-12 xl:col-span-4"
          >
            <BarChartCustomer
              chartData={oneTimeVisit}
              name="One-Time Visits"
              title={`One-Time Visits for Weeks ${weekNumber}`}
              isHorizontal={false}
              dataLabelStatus={true}
              barColors={["#FFBB28"]}
            />
          </GraphCard>

          <GraphCard
            isTitle={false}
            title={title}
            colSpanClass="col-span-12 xl:col-span-4"
          >
            <BarChartCustomer
              chartData={multiTimeVisit}
              name="Multi-Time Visits"
              title={`Multi-Time Visits for Weeks ${weekNumber}`}
              isHorizontal={false}
              dataLabelStatus={true}

            />
          </GraphCard>
        </div>
      </main>
    </>
  );
};

export default PeopleAnalytics;
