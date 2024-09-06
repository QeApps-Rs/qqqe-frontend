import React, { useEffect, useState } from "react";
import BarChart from "../Charts/BarChart";

import FormSubmitHandler from "../FormSubmitHandler";
import DonutChart from "../Charts/DonutChart";
import SlopeChart from "../Charts/SlopeChart";
import LineChart from "../Charts/LineChart";
import StepLineChart from "../Charts/StepLineChart";
import BarChartCustomer from "../Charts/BarChartCustomer";
import { getWeekData } from "./GetDataVisitCustomer";

const testData = {
  "United States": 63,
  Ireland: 1,
  Malta: 248,
  "The Netherlands": 6,
  India: 60,
  "United Kingdom": 2,
  Canada: 3,
  France: 2,
  "United States1": 631,
  Ireland1: 11,
  Malta1: 2481,
  "The Netherlands1": 61,
  India1: 601,
  "United Kingdom1": 21,
  Canada1: 31,
  France1: 21,
};

const PeopleAnalytics = ({ id, content }) => {
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

  //TOP 5 products, categories, pages

  const data = {
    categories: [
      { title: "Snowboards", views: 400 },
      { title: "Gift Cards", views: 100 },
      { title: "cloths", views: 300 },
      { title: "Jewelry", views: 500 },
      { title: "Shoes", views: 90 },
    ],
    pages: [
      { title: "Home ", views: 500 },
      { title: "Product ", views: 300 },
      { title: "Contact ", views: 200 },
      { title: "About ", views: 100 },
      { title: "Collection ", views: 200 },
    ],
  };

  const pageSeries = [
    {
      name: "Pages",
      data: data.pages.map((item) => item.views),
    },
  ];

  // const combinedSeries = [
  //   {
  //     name: "Products",
  //     data: data.products.map((item) => item.views),
  //   },
  //   {
  //     name: "Categories",
  //     data: data.categories.map((item) => item.views),
  //   },
  //   {
  //     name: "Pages",
  //     data: data.pages.map((item) => item.views),
  //   },
  // ];

  const categoryCategories = data.categories.map((item) => item.title);
  const pageCategories = data.pages.map((item) => item.title);

  // const combinedCategories = [
  //   ...data.products.map((item) => item.title),
  //   ...data.categories.map((item) => item.title),
  //   ...data.pages.map((item) => item.title),
  // ];

  // Top N number cat Added
  const cartData = [
    { productTitle: "product1", quantity: 2 },
    { productTitle: "product2", quantity: 5 },
    { productTitle: "product1", quantity: 1 },
    { productTitle: "product3", quantity: 7 },
    { productTitle: "product4", quantity: 3 },
    { productTitle: "product2", quantity: 2 },
    { productTitle: "product3", quantity: 7 },
    { productTitle: "product5", quantity: 2 },
    { productTitle: "product6", quantity: 1 },
    { productTitle: "product7", quantity: 9 },
    { productTitle: "product8", quantity: 2 },
    { productTitle: "product4", quantity: 7 },
    { productTitle: "product2", quantity: 1 },
    { productTitle: "product8", quantity: 2 },
    { productTitle: "product9", quantity: 10 },
  ];

  const aggregateData = cartData.reduce((acc, { productTitle, quantity }) => {
    acc[productTitle] = (acc[productTitle] || 0) + quantity;
    return acc;
  }, {});

  const sortedProducts = Object.entries(aggregateData)
    .map(([productTitle, quantity]) => ({ productTitle, quantity }))
    .sort((a, b) => b.quantity - a.quantity);

  const getTopNProducts = (n) => sortedProducts.slice(0, n);

  const topProducts = getTopNProducts(5);

  const series = [
    {
      name: "Top Products",
      data: topProducts.map((product) => product.quantity),
    },
  ];

  const categories = topProducts.map((product) => product.productTitle);

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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
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
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
  console.log("product Data +++++++++++++ ", productData);
  return (
    <main className="main-content todo-app w-full px-[var(--margin-x)] pb-8">
      <div className="mb-1 -mt-2 p-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between __web-inspector-hide-shortcut__"></div>
      <p className="mb-4 ml-2 font-medium">This is Content</p>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
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
        <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
          <div className="bg-green-300 h-16">
            <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae,
              aspernatur.
              {/* <span className="bg-blue-100 text-blue-800 text-xs  font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                Customized
              </span> */}
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
        </div>
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
  );
};

export default PeopleAnalytics;
