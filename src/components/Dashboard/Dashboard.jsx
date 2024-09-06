import React, { useEffect, useState } from "react";
import DashboardCard from "./DashboardCard";
import FormSubmitHandler from "../FormSubmitHandler";
import ColumnChart from "../Charts/ColumnChart";
import PieChart from "../Charts/PieChart";
import LineChart from "../Charts/LineChart";
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
const chart = {
    series: [
        {
            name: "Product One",
            data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 45],
        },
        {
            name: "Product Two",
            data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 51],
        },
    ],
    xaxis: {
        type: "category",
        categories: [
            "Sep",
            "Oct",
            "Nov",
            "Dec",
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
        ],
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    yaxis: {
        title: {
            style: {
                fontSize: "0px",
            },
        },
        min: 0,
        max: 100,
    },
};

const lineChart = {
    lineSeries: [
        {
            name: 'Series 1',
            data: [0, 5, 60, 15, 8, 2, 30],
            color: "#b1399e",
        },
    ],
    xaxis: {
        type: "category",
        categories: ['2023-01', '2023-04', '2023-07', '2023-10', '2024-01', '2024-04', '2024-07'],
        title: {
            text: 'Quarter',
        },
        axisBorder: { show: false },  // Hides extra borders
        axisTicks: { show: false },   // Hides extra ticks
    },
    yaxis: {
        title: {
            text: 'Customer',
        },
        max: 300
    },
}


const Dashboard = () => {
    const [userData, setUserData] = useState(null);

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
    const orderSalesData = ["Order count", "Order sales", "Order average"];
    const [orderSaleValue, setOrderSaleValue] = useState([0, 0, 0]);

    const [priorityCount, setPriorityCount] = useState({});
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const resultOfLevelOneQuestionList = await FormSubmitHandler({
                    method: "get",
                    url: "level1/question/list",
                });
                // console.log(
                //   "resultOfLevelOneQuestionList",
                //   resultOfLevelOneQuestionList
                // );
                if (resultOfLevelOneQuestionList.data) {
                    setUserData(resultOfLevelOneQuestionList.data);
                    const responseData = resultOfLevelOneQuestionList.data;
                    const count = responseData.reduce((acc, item) => {
                        acc[item.priority] = (acc[item.priority] || 0) + 1;
                        return acc;
                    }, {});

                    setPriorityCount(count);
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

        const fetchOrderSalesChartCount = async () => {
            const response = await FormSubmitHandler({
                method: "get",
                url: "order/sales/count?start_date=2024-07-07&end_date=2024-07-23",
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
                        xtitle: "Order sales report",
                        ytitle: "Number",
                    }
                });
                setOrderSaleValue(orderValues);
            }
        }

        fetchUserData();
        fetchOrderCountDeviceCountryWise();
        fetchCustomerChartCount();
        fetchOrderSalesChartCount();
    }, []);

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

    return (
        <React.Fragment>
            <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
                <DashboardCard
                    cardTitle="People"
                    cardProcess={false}
                    color="bg-cyan-200"
                    cardTextDesc="2 out of 11 suggestions has been implemented"
                    cardUrl="people-problem"
                    chart={chart}
                    priorityCount={priorityCount}
                />
                {/* <DashboardCard
          cardTitle="Product"
          color="bg-amber-200"
          cardProcess = {false}
          cardTextDesc="1 out of 11 suggestions has been implemented"
          chart={chart}
        />
          chart={chart}
        />
        <DashboardCard
          cardTitle="Promotion"
          color="bg-green-300"
          cardProcess = {false}
          cardTextDesc="2 out of 8 suggestions has been implemented"
          chart={chart}
        /> */}
            </div>

            <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
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
                                    Product chart
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
                                    Product categories
                                </p>
                            </div>
                            <div className="container mx-auto p-4">
                                <Tabs selectedIndex={activeTab} onSelect={(index) => setActiveTab(index)}>
                                    <TabList>
                                        <Tab style={{ backgroundColor: "#078bf0" }}>Most Purchased Products</Tab>
                                        <Tab style={{ backgroundColor: "#04e590" }}>Un-sold Products</Tab>
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
                                    Customer chart
                                </p>
                            </div>
                            <PieChart chartData={customerCount.data} />
                        </div>
                    )
                }
                <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
                    <div className="bg-green-300 h-16">
                        <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
                            Customer chart
                        </p>
                    </div>
                    <LineChart lineChart={lineChart} />
                </div>
                {
                    orderSaleCount && (
                        <>
                            <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-12">
                                <div className="bg-green-300 h-16">
                                    <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
                                        Order sales
                                    </p>
                                </div>

                                <ColumnChart chartData={orderSaleCount.data} />
                            </div>
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
                        </>
                    )
                }


            </div>
        </React.Fragment>
    );
};

export default Dashboard;
