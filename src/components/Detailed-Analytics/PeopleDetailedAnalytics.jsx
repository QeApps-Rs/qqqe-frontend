import { useEffect, useState } from "react";

import LineChart from "../Charts/LineChart";

import Loader from "../../common/Loader";
import RadarChart from "../Charts/RadarChart";
import AreaChart from "../Charts/AreaChart";
import ColumnChart from "../Charts/ColumnChart";
import FormSubmitHandler from "../FormSubmitHandler";


const PeopleDetailedAnalytics = () => {
    const [loading, setLoading] = useState(false);
    let startDate, endDate;
    const today = new Date();
    startDate = new Date(`${today.getFullYear()}-01-01`);
    endDate = new Date(`${today.getFullYear()}-12-31`);
    const formattedStartDate = startDate.toISOString().split("T")[0];
    const formattedEndDate = endDate.toISOString().split("T")[0];
    let params = `start_date=${formattedStartDate}&end_date=${formattedEndDate}`

    const [orderData,setOrderData] = useState({
        todayOrderCount:0,
    })


    const fetchSalesData = async () => {
        try {
            const resultOfSalesData = await FormSubmitHandler({
                method: "get",
                url: `new/order/sales/count?${params}`,
            });
            console.log(
              "resultOfSalesData",
              resultOfSalesData
            );
            if (resultOfSalesData.data) {
               setOrderData({
                ...orderData,
                todayOrderCount:resultOfSalesData.data?.TodaySales?.order_count})
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        fetchSalesData();
    }, [])
    

    const data = [
        { "category": "Engagement", "action": "Mouse Movement", "label": "X: 929, Y: 84", "timestamp": "2024-01-13T11:43:28.090Z", "url": "https://clanartisan.co.uk/products/kiltane-100-cashmere-scarf" },
        { "category": "Engagement", "action": "Mouse Movement", "label": "X: 929, Y: 82", "timestamp": "2024-01-16T11:48:28.106Z", "url": "https://clanartisan.co.uk/products/kiltane-100-cashmere-scarf" },
        { "category": "Engagement", "action": "Mouse Movement", "label": "X: 744, Y: 448", "timestamp": "2024-09-01T11:44:27.970Z", "url": "https://clanartisan.co.uk/products/kiltane-100-cashmere-scarf" },
        { "category": "Engagement", "action": "Mouse Movement", "label": "X: 764, Y: 417", "timestamp": "2024-09-15T11:44:27.976Z", "url": "https://clanartisan.co.uk/products/kiltane-100-cashmere-scarf" },
        { "category": "Engagement", "action": "Mouse Movement", "label": "X: 781, Y: 388", "timestamp": "2024-09-03T11:44:27.990Z", "url": "https://clanartisan.co.uk/products/kiltane-100-cashmere-scarf" },
        { "category": "Engagement", "action": "Mouse Movement", "label": "X: 834, Y: 292", "timestamp": "2024-09-02T11:44:28.007Z", "url": "https://clanartisan.co.uk/products/kiltane-100-cashmere-scarf" },
        { "category": "Engagement", "action": "Mouse Movement", "label": "X: 867, Y: 231", "timestamp": "2024-01-11T11:45:28.023Z", "url": "https://clanartisan.co.uk/products/kiltane-100-cashmere-scarf" },
        { "category": "Engagement", "action": "Mouse Movement", "label": "X: 905, Y: 149", "timestamp": "2024-09-20T11:46:28.040Z", "url": "https://clanartisan.co.uk/products/kiltane-100-cashmere-scarf" },
        { "category": "Engagement", "action": "Mouse Movement", "label": "X: 921, Y: 112", "timestamp": "2024-09-17T11:44:28.057Z", "url": "https://clanartisan.co.uk/products/kiltane-100-cashmere-scarf" },
        { "category": "Engagement", "action": "Mouse Movement", "label": "X: 928, Y: 94", "timestamp": "2024-02-22T11:44:28.073Z", "url": "https://clanartisan.co.uk/products/kiltane-100-cashmere-scarf" },
        { "category": "Engagement", "action": "Mouse Movement", "label": "X: 929, Y: 84", "timestamp": "2024-01-25T11:45:28.090Z", "url": "https://clanartisan.co.uk/products/kiltane-100-cashmere-scarf" },
        { "category": "Engagement", "action": "Mouse Movement", "label": "X: 929, Y: 82", "timestamp": "2024-09-26T11:46:28.106Z", "url": "https://clanartisan.co.uk/products/kiltane-100-cashmere-scarf" },
        { "category": "Engagement", "action": "Mouse Movement", "label": "X: 905, Y: 149", "timestamp": "2024-02-27T11:47:28.040Z", "url": "https://clanartisan.co.uk/products/kiltane-100-cashmere-scarf" },
        { "category": "Engagement", "action": "Mouse Movement", "label": "X: 921, Y: 112", "timestamp": "2024-09-28T11:50:28.057Z", "url": "https://clanartisan.co.uk/products/kiltane-100-cashmere-scarf" },
        { "category": "Engagement", "action": "Mouse Movement", "label": "X: 928, Y: 94", "timestamp": "2024-09-29T11:42:28.073Z", "url": "https://clanartisan.co.uk/products/kiltane-100-cashmere-scarf" },
        { "category": "Engagement", "action": "Mouse Movement", "label": "X: 929, Y: 42", "timestamp": "2024-10-01T11:43:28.090Z", "url": "https://clanartisan.co.uk/products/kiltane-100-cashmere-scarf" },
        { "category": "Engagement", "action": "Mouse Movement", "label": "X: 939, Y: 80", "timestamp": "2024-10-01T11:48:28.106Z", "url": "https://clanartisan.co.uk/products/kiltane-100-cashmere-scarf" },
        { "category": "Engagement", "action": "Mouse Movement", "label": "X: 928, Y: 94", "timestamp": "2024-10-01T11:42:28.073Z", "url": "https://clanartisan.co.uk/products/kiltane-100-cashmere-scarf" },
        { "category": "Engagement", "action": "Mouse Movement", "label": "X: 921, Y: 84", "timestamp": "2024-10-01T11:43:28.090Z", "url": "https://clanartisan.co.uk/products/kiltane-100-cashmere-scarf" },
        { "category": "Engagement", "action": "Mouse Movement", "label": "X: 919, Y: 82", "timestamp": "2024-10-01T11:48:28.106Z", "url": "https://clanartisan.co.uk/products/kiltane-100-cashmere-scarf" },
        { "category": "Engagement", "action": "Mouse Movement", "label": "X: 949, Y: 81", "timestamp": "2024-09-30T01:48:28.106Z", "url": "https://clanartisan.co.uk/products/kiltane-100-cashmere-scarf" },
        { "category": "Engagement", "action": "Mouse Movement", "label": "X: 729, Y: 62", "timestamp": "2024-09-30T05:48:28.106Z", "url": "https://clanartisan.co.uk/products/kiltane-100-cashmere-scarf" },
        { "category": "Engagement", "action": "Mouse Movement", "label": "X: 928, Y: 94", "timestamp": "2022-09-30T11:42:28.073Z", "url": "https://clanartisan.co.uk/products/kiltane-100-cashmere-scarf" },
        { "category": "Engagement", "action": "Mouse Movement", "label": "X: 921, Y: 84", "timestamp": "2023-09-30T11:43:28.090Z", "url": "https://clanartisan.co.uk/products/kiltane-100-cashmere-scarf" },
        { "category": "Engagement", "action": "Mouse Movement", "label": "X: 919, Y: 82", "timestamp": "2021-10-01T11:48:28.106Z", "url": "https://clanartisan.co.uk/products/kiltane-100-cashmere-scarf" },
        { "category": "Engagement", "action": "Mouse Movement", "label": "X: 949, Y: 81", "timestamp": "2020-10-01T01:48:28.106Z", "url": "https://clanartisan.co.uk/products/kiltane-100-cashmere-scarf" },
        { "category": "Engagement", "action": "Mouse Movement", "label": "X: 729, Y: 63", "timestamp": "2022-05-30T05:48:28.106Z", "url": "https://clanartisan.co.uk/products/kiltane-100-cashmere-scarf" },
        { "category": "Engagement", "action": "Mouse Movement", "label": "X: 728, Y: 97", "timestamp": "2022-09-30T11:42:28.073Z", "url": "https://clanartisan.co.uk/products/kiltane-100-cashmere-scarf" },
        { "category": "Engagement", "action": "Mouse Movement", "label": "X: 721, Y: 87", "timestamp": "2023-09-30T11:43:28.090Z", "url": "https://clanartisan.co.uk/products/kiltane-100-cashmere-scarf" },
        { "category": "Engagement", "action": "Mouse Movement", "label": "X: 319, Y: 89", "timestamp": "2021-09-30T11:48:28.106Z", "url": "https://clanartisan.co.uk/products/kiltane-100-cashmere-scarf" },
        { "category": "Engagement", "action": "Mouse Movement", "label": "X: 849, Y: 88", "timestamp": "2020-09-30T01:48:28.106Z", "url": "https://clanartisan.co.uk/products/kiltane-100-cashmere-scarf" },
        { "category": "Engagement", "action": "Mouse Movement", "label": "X: 629, Y: 63", "timestamp": "2022-05-30T05:48:28.106Z", "url": "https://clanartisan.co.uk/products/kiltane-100-cashmere-scarf" }
    ];

    //today visitor
   
    const todayStr = today.toISOString().split('T')[0];

    const filteredData = data.filter(item => item.timestamp.startsWith(todayStr));

    const timestamps = filteredData.map(item => new Date(item.timestamp).toLocaleTimeString());

    const timeCountMap = timestamps.reduce((acc, time) => {
        acc[time] = (acc[time] || 0) + 1;
        return acc;
    }, {});

    const categories = Object.keys(timeCountMap);

    const visitorData = Object.values(timeCountMap);


    const series = [
        {
            name: 'Visitors',
            data: visitorData
        }
    ];


    //weekly visitor
    const getVisitorsForCurrentWeeks = (weekCount) => {
        const visitorsMap = {};
        const allDates = [];
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth(); // Current month (0-11)

        const startOfMonth = new Date(currentYear, currentMonth, 1);
        const endOfMonth = new Date(currentYear, currentMonth + 1, 0);
        const totalDays = endOfMonth.getDate();

        const totalWeeks = Math.ceil(totalDays / 7);

        // Ensure weekCount does not exceed totalWeeks
        weekCount = Math.min(weekCount, totalWeeks);

        for (let weekIndex = 0; weekIndex < weekCount; weekIndex++) {
            const weekStartDay = weekIndex * 7 + 1;
            const weekEndDay = Math.min(weekStartDay + 6, totalDays);

            for (let day = weekStartDay; day <= weekEndDay; day++) {
                const date = new Date(currentYear, currentMonth, day);
                allDates.push(date.toLocaleDateString());

                const dailyData = data.filter(item => {
                    const timestamp = new Date(item.timestamp);
                    return timestamp.toLocaleDateString() === date.toLocaleDateString();
                });

                visitorsMap[date.toLocaleDateString()] = dailyData.length;
            }
        }

        // Handle remaining days if weekCount is 5
        if (weekCount === 5) {
            const remainingStartDay = 29; // Start from the 29th
            for (let day = remainingStartDay; day <= totalDays; day++) {
                const date = new Date(currentYear, currentMonth, day);
                allDates.push(date.toLocaleDateString());

                const dailyData = data.filter(item => {
                    const timestamp = new Date(item.timestamp);
                    return timestamp.toLocaleDateString() === date.toLocaleDateString();
                });

                visitorsMap[date.toLocaleDateString()] = dailyData.length;
            }
        }

        const resultDates = allDates;
        const resultData = resultDates.map(date => visitorsMap[date] || 0);

        return {
            categories: resultDates,
            data: resultData,
        };
    };

    const weekCount = 4; // Number of weeks to show
    const { categories: weekCategories, data: weekData } = getVisitorsForCurrentWeeks(weekCount);

    const weekSeries = [
        {
            name: 'Visitors',
            data: weekData
        }
    ];


    // Calculate total visitors  monthly
    const getVisitorsForCurrentMonths = (monthCount) => {
        const visitorsMap = {};
        const allMonths = [];
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth();

        for (let i = 0; i < monthCount; i++) {
            const monthIndex = i;
            const monthStart = new Date(currentYear, monthIndex, 1);
            const monthEnd = new Date(currentYear, monthIndex + 1, 0);

            // Get all data for the current month
            const monthlyData = data.filter(item => {
                const timestamp = new Date(item.timestamp);
                return timestamp >= monthStart && timestamp <= monthEnd;
            });

            const monthName = monthStart.toLocaleString('default', { month: 'long' });
            allMonths.push(monthName);

            // Count visitors for the month
            visitorsMap[monthName] = (monthlyData.length);
        }

        return {
            categories: allMonths,
            data: Object.values(visitorsMap),
        };
    };

    const monthCount = 8; // Number of months to show
    const { categories: monthCategories, data: monthData } = getVisitorsForCurrentMonths(monthCount);

    const monthSeries = [
        {
            name: 'Visitors',
            data: monthData
        }
    ];


    //year
    const getVisitorsForCurrentYears = (yearCount) => {
        const visitorsMap = {};
        const allYears = [];
        const today = new Date();
        const currentYear = today.getFullYear();

        for (let i = 0; i < yearCount; i++) {
            const year = currentYear - i;
            allYears.push(year);

            const yearlyData = data.filter(item => {
                const timestamp = new Date(item.timestamp);
                return timestamp.getFullYear() === year;
            });
            visitorsMap[year] = yearlyData.length;
        }

        return {
            categories: allYears,
            data: allYears.map(year => visitorsMap[year] || 0),
        };
    };

    const yearCount = 2; // Number of years to show
    const { categories: yearCategories, data: yearData } = getVisitorsForCurrentYears(yearCount);

    const yearSeries = [
        {
            name: 'Visitors',
            data: yearData
        }
    ];

    // const githubData = {
    //     series: yearData, // Here we could also have actual commit data if available
    //   };

    const chartData = {
        categories: yearCategories,
        seriesData: [
            {
                name: 'Visitors',
                data: yearData
            }
        ],
        xtitle: 'Year',
        ytitle: 'Number of Visitors',
    };

    //////////         for sales           ////////////////
    //today
    const dataSales = {
        today: {
            order_count: 3,
            order_sales: "9437072.80",
            order_average: "41030.75",
            currency: "USD",
            end_date: "2024-10-01",
            start_date: "2024-10-01",
        }
    };
    
    // Total sales (today)
    const totalOrderCountToday = dataSales.today.order_count;
    const orderCountDataToday = [orderData.todayOrderCount]; // Array containing today's order count
    
    // Get the current date in YYYY-MM-DD format
    const currentDate = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD
    const hoursToday = [currentDate]; // Category for the X-axis
    
    const seriesSalesToday = [
        {
            name: 'Order Count',
            data: orderCountDataToday
        }
    ];

    // Average sales (today)
    const avgOrderCountToday = parseFloat(dataSales.today.order_average); // Parse the average order amount as a float
    const avgOrderCountDataToday = [avgOrderCountToday]; // Array containing today's average order amount
    
    const avgSeriesSalesToday = [
        {
            name: 'Average Order Sales',
            data: avgOrderCountDataToday
        }
    ];
    

    //Weekly
    const weekOrderData = {
        "currency": "USD",
        "end_date": "2024-10-07",
        "start_date": "2024-10-01",
        "order_count": 8,
        "order_sales": "400",
        "order_average": "50",
        "chart_data": {
            "2024-10-01":
            {
                "order_count": 2,
                "order_sales": "100",
                "order_average": "50",
            }
            ,
            "2024-10-02":
            {
                "order_count": 2,
                "order_sales": "100",
                "order_average": "50",
            }
            ,
            "2024-10-05":
            {
                "order_count": 2,
                "order_sales": "100",
                "order_average": "50",
            }
            ,
            "2024-10-07":
            {
                "order_count": 2,
                "order_sales": "100",
                "order_average": "20",
            }
        }
    };

    // Generate date range function
    const generateDateRange = (startDate, endDate) => {
        const dateArray = [];
        const currentDate = new Date(startDate);
        const end = new Date(endDate);

        while (currentDate <= end) {
            dateArray.push(new Date(currentDate).toISOString().split('T')[0]); // Format as YYYY-MM-DD
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dateArray;
    };

    // Prepare series and categories data for order counts and average sales
    const dateRange = generateDateRange(weekOrderData.start_date, weekOrderData.end_date);

    const orderCountDataWeek = dateRange.map(date =>
        weekOrderData.chart_data[date] ? weekOrderData.chart_data[date].order_count : 0
    );

    const avgSalesDataWeek = dateRange.map(date =>
        weekOrderData.chart_data[date] ? parseFloat(weekOrderData.chart_data[date].order_average) : 0
    );

    const seriesWeek = [
        {
            name: 'Order Count',
            data: orderCountDataWeek
        }
    ];

    const seriesAvgSalesWeek = [
        {
            name: 'Average Sales',
            data: avgSalesDataWeek
        }
    ];


    //monthly
    const monthOrderData = {
        "currency": "USD",
        "end_date": "2024-10-01",
        "start_date": "2024-09-01",
        "order_count": 11,
        "order_sales": "400",
        "order_average": "50",
        "chart_data": {
            "2024-10-01": {
                "order_count": 3,
                "order_sales": "100",
                "order_average": "50",
            },
            "2024-09-13": {
                "order_count": 1,
                "order_sales": "100",
                "order_average": "50",
            },
            "2024-09-07": {
                "order_count": 5,
                "order_sales": "100",
                "order_average": "50",
            },
            "2024-09-22": {
                "order_count": 2,
                "order_sales": "100",
                "order_average": "50",
            }
        }
    };

    // Generate date range function
    const generateDateRangeMonth = (startDate, endDate) => {
        const dateArray = [];
        const currentDate = new Date(startDate);
        const end = new Date(endDate);

        while (currentDate <= end) {
            dateArray.push(new Date(currentDate).toISOString().split('T')[0]); // Format as YYYY-MM-DD
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dateArray;
    };

    // Prepare series and categories data for monthly orders and average sales
    const monthDateRange = generateDateRangeMonth(monthOrderData.start_date, monthOrderData.end_date);

    const monthOrderCountData = monthDateRange.map(date =>
        monthOrderData.chart_data[date] ? monthOrderData.chart_data[date].order_count : 0
    );

    const monthAverageSalesData = monthDateRange.map(date =>
        monthOrderData.chart_data[date] ? parseFloat(monthOrderData.chart_data[date].order_average) : 0
    );

    const monthOrderSeries = [
        {
            name: 'Order Count',
            data: monthOrderCountData
        }
    ];

    const monthAverageSalesSeries = [
        {
            name: 'Average Sales',
            data: monthAverageSalesData
        }
    ];

    //yearly
    // const yearOrderData = {
    //     "currency": "USD",
    //     "end_date": "2024-10-01",
    //     "start_date": "2023-10-01",
    //     "order_count": 28,
    //     "order_sales": "400",
    //     "order_average": "50",
    //     "chart_data": {
    //         "2024-10-01":
    //         {
    //             "order_count": 3,
    //             "order_sales": "100",
    //             "order_average": "30",
    //         }
    //         ,
    //         "2024-09-13":
    //         {
    //             "order_count": 1,
    //             "order_sales": "100",
    //             "order_average": "30",
    //         },
    //         "2024-09-12":
    //         {
    //             "order_count": 1,
    //             "order_sales": "100",
    //             "order_average": "30",
    //         }
    //         ,
    //         "2024-09-11":
    //         {
    //             "order_count": 1,
    //             "order_sales": "100",
    //             "order_average": "40",
    //         },
    //         "2024-08-07":
    //         {
    //             "order_count": 5,
    //             "order_sales": "100",
    //             "order_average": "50",
    //         }
    //         ,
    //         "2024-01-22":
    //         {
    //             "order_count": 2,
    //             "order_sales": "100",
    //             "order_average": "50",
    //         },
    //         "2024-05-15":
    //         {
    //             "order_count": 7,
    //             "order_sales": "100",
    //             "order_average": "60",
    //         },
    //         "2024-05-22":
    //         {
    //             "order_count": 1,
    //             "order_sales": "100",
    //             "order_average": "40",
    //         },
    //         "2023-10-01":
    //         {
    //             "order_count": 3,
    //             "order_sales": "100",
    //             "order_average": "10",
    //         },
    //         "2023-10-02":
    //         {
    //             "order_count": 3,
    //             "order_sales": "100",
    //             "order_average": "20",
    //         }
    //         ,
    //         "2023-09-13":
    //         {
    //             "order_count": 1,
    //             "order_sales": "100",
    //             "order_average": "50",
    //         }
    //         ,
    //         "2023-08-27":
    //         {
    //             "order_count": 5,
    //             "order_sales": "100",
    //             "order_average": "20",
    //         }
    //     }
    // };


    const yearOrderData = {
        "currency": "USD",
        "end_date": "2024-10-01",
        "start_date": "2023-10-01",
        "order_count": 28,
        "order_sales": "400",
        "order_average": "50",
        "chart_data": {
            "january":
            {
                "order_count": 3,
                "order_sales": "100",
                "order_average": "30",
            }
            ,
            "february":
            {
                "order_count": 1,
                "order_sales": "100",
                "order_average": "30",
            },
            "march":
            {
                "order_count": 1,
                "order_sales": "100",
                "order_average": "30",
            }
            ,
            "april":
            {
                "order_count": 1,
                "order_sales": "100",
                "order_average": "40",
            },
            "may":
            {
                "order_count": 5,
                "order_sales": "100",
                "order_average": "50",
            }
            ,
            "june":
            {
                "order_count": 2,
                "order_sales": "100",
                "order_average": "50",
            },
            "july":
            {
                "order_count": 7,
                "order_sales": "100",
                "order_average": "60",
            },
            "august":
            {
                "order_count": 1,
                "order_sales": "100",
                "order_average": "40",
            },
            "september":
            {
                "order_count": 3,
                "order_sales": "100",
                "order_average": "10",
            },
            "october":
            {
                "order_count": 3,
                "order_sales": "100",
                "order_average": "20",
            }
            ,
            "november":
            {
                "order_count": 1,
                "order_sales": "100",
                "order_average": "50",
            }
            ,
            "december":
            {
                "order_count": 5,
                "order_sales": "100",
                "order_average": "20",
            }
        }
    };

    // Generate the chart data for order count and average by month
    const prepareYearlyData = (yearOrderData) => {
        const chartData = yearOrderData.chart_data;
        const orderCountByMonth = {};
        const averageOrderByMonth = {};

        // Loop through the chart data and group order counts and averages by month
        Object.keys(chartData).forEach((month) => {
            const orderCount = chartData[month].order_count;
            const orderAverage = parseFloat(chartData[month].order_average);

            // Accumulate order counts
            if (!orderCountByMonth[month]) {
                orderCountByMonth[month] = 0;
            }
            orderCountByMonth[month] += orderCount;

            // Accumulate averages for calculation
            if (!averageOrderByMonth[month]) {
                averageOrderByMonth[month] = [];
            }
            averageOrderByMonth[month].push(orderAverage);
        });

        // Calculate the final average order for each month
        const finalAverageOrderByMonth = {};
        Object.keys(averageOrderByMonth).forEach((month) => {
            const averages = averageOrderByMonth[month];
            const total = averages.reduce((sum, value) => sum + value, 0);
            const average = total / averages.length;
            finalAverageOrderByMonth[month] = average; // Store average for the month
        });

        // Create arrays for months and their corresponding order count and average order values
        const months = Object.keys(orderCountByMonth).sort((a, b) => new Date(a) - new Date(b));
        const orderCounts = months.map(month => orderCountByMonth[month]);
        const monthlyAverages = months.map(month => finalAverageOrderByMonth[month]);

        return {
            months,
            orderCounts,
            monthlyAverages
        };
    };

    const { months, orderCounts, monthlyAverages } = prepareYearlyData(yearOrderData);

    // Prepare series for order count and average order yearly
    const yearSeriesCount = [
        {
            name: 'Order Count',
            data: orderCounts
        }
    ];

    const yearAverageOrderSeries = [
        {
            name: 'Average Order',
            data: monthlyAverages
        }
    ];

    return (
        <>
            {loading && <Loader />}
            <main className="main-content todo-app w-full px-[var(--margin-x)] pb-8">
                <div className="mb-1 -mt-2 p-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between __web-inspector-hide-shortcut__"></div>
                <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
                    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
                        <div className="bg-green-300 h-16">
                            <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
                                Total Visitors Today
                            </p>
                        </div>

                        {filteredData.length > 0 ? (
                            //  <LineChart
                            //      series={series}
                            //      title="Total Visitors Today"
                            //      categories={categories}
                            //  />

                            <RadarChart
                                series={series}
                                // title="Total Visitors Today"
                                categories={categories}
                            />

                        ) : (
                            <p className="text-center text-red-500">No data available for today</p>
                        )}
                    </div>
                    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
                        <div className="bg-green-300 h-16">
                            <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
                                Total Visitors Weekly
                            </p>
                        </div>

                        {weekData.length > 0 ? (
                            <AreaChart
                                series={weekSeries}
                                // title={`Total Visitors for ${weekCount} Weeks`}
                                categories={weekCategories}
                                yAxisTitle="Number Of Visitor"
                                xAxisTitle="Date Of Week"
                            />
                        ) : (
                            <p className="text-center text-red-500">No data available for the selected weeks</p>
                        )}
                    </div>
                    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
                        <div className="bg-green-300 h-16">
                            <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
                                Total Visitors Monthly
                            </p>
                        </div>

                        {monthData.length > 0 ? (
                            <LineChart
                                series={monthSeries}
                                //  title={`Total Visitors for the Last ${monthCount} Months`}
                                categories={monthCategories}
                                yAxisTitle="Number Of Visitors"
                            />
                        ) : (
                            <p className="text-center text-red-500">No data available for the selected months</p>
                        )}
                    </div>
                    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
                        <div className="bg-green-300 h-16">
                            <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
                                Total Visitors Yearly
                            </p>
                        </div>

                        {yearData.length > 0 ? (
                            // <LineChart
                            //     series={yearSeries}
                            //     title={`Total Visitors for the Last ${yearCount} Years`}
                            //     categories={yearCategories}
                            // />

                            // <GitStyleChart githubData={githubData}/>

                            <ColumnChart chartData={chartData} />
                        ) : (
                            <p className="text-center text-red-500">No data available for the selected years</p>
                        )}
                    </div>
                    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
                        <div className="bg-green-300 h-16">
                            <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
                                Total OrderCount Today
                            </p>
                        </div>

                        {orderCountDataToday.length > 0 ? (
                            <LineChart
                                series={seriesSalesToday}
                                categories={hoursToday} 
                                yAxisTitle="Order Count"
                                xAxisTitle="Date "
                            />                       
                        ) : (
                            <p className="text-center text-red-500">No data available for the today</p>
                        )}
                       
                    </div>
                    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
                        <div className="bg-green-300 h-16">
                            <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
                                Total  OrderCount Weekly
                            </p>
                        </div>
                        {orderCountDataWeek.length > 0 ? (
                            // <LineChart
                            //     series={seriesWeek}
                            //     categories={dateRange}
                            //     yAxisTitle="Order Count"
                            //     xAxisTitle="Date Of Week"
                            // />

                            <AreaChart
                                series={seriesWeek}
                                // title={`Total Visitors for ${weekCount} Weeks`}
                                categories={dateRange}
                                yAxisTitle="Order Count"
                                xAxisTitle="Date Of Week"
                            />
                        ) : (
                            <p className="text-center text-red-500">No data available for the weekly</p>
                        )}
                    </div>
                    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
                        <div className="bg-green-300 h-16">
                            <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
                                Total  OrderCount Monthly
                            </p>
                        </div>
                        {monthOrderCountData.length > 0 ? (<LineChart
                            series={monthOrderSeries}
                            categories={monthDateRange}
                            yAxisTitle="Order Count"
                            xAxisTitle="Date Of Month"
                            
                        />) : (<p className="text-center text-red-500">No data available for the Monthly</p>)}
                    </div>

                    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
                        <div className="bg-green-300 h-16">
                            <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
                                Total  Orderount Yearly
                            </p>
                        </div>
                        {orderCounts.length > 0 ? (<LineChart
                            series={yearSeriesCount}
                            categories={months}
                            yAxisTitle="Order Count"
                            xAxisTitle="Month Of Year"
                            curve="smooth"
                        />) : (<p className="text-center text-red-500">No data available for the Year</p>)}

                    </div>
                    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
                        <div className="bg-green-300 h-16">
                            <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
                                Avrage  Ordercount Today
                            </p>
                        </div>
                        {avgOrderCountDataToday.length > 0 ? (
                            <LineChart
                                series={avgSeriesSalesToday}
                                categories={hoursToday} 
                                yAxisTitle="Order Count"
                                xAxisTitle="Date "
                            />
                        ) : (
                            <p className="text-center text-red-500">No data available for the today</p>
                        )}
                    </div>
                    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
                        <div className="bg-green-300 h-16">
                            <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
                                Avrage  Ordercount Weekly
                            </p>
                        </div>
                        {avgSalesDataWeek.length > 0 ? (
                            // <LineChart
                            //     series={seriesAvgSalesWeek}
                            //     //title="Total Sales Today"
                            //     categories={dateRange} // Dynamically generated timestamps
                            //     yAxisTitle="Order Count"
                            //     xAxisTitle="Date Of Week"
                            // />

                            <AreaChart
                                series={seriesAvgSalesWeek}
                                // title={`Total Visitors for ${weekCount} Weeks`}
                                categories={dateRange}
                                yAxisTitle="Order Count"
                                xAxisTitle="Date Of Week"
                            />
                        ) : (
                            <p className="text-center text-red-500">No data available for the weekly</p>
                        )}

                    </div>
                    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
                        <div className="bg-green-300 h-16">
                            <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
                                Avrage  Ordercount Monthly
                            </p>
                        </div>
                        {monthAverageSalesData.length > 0 ? (
                            <LineChart
                                series={monthAverageSalesSeries}
                                //title="Total Sales Today"
                                categories={monthDateRange} // Dynamically generated timestamps
                                yAxisTitle="Order Count"
                                xAxisTitle="Date Of Month"
                                curve="smooth"
                            />
                        ) : (
                            <p className="text-center text-red-500">No data available for the monthly </p>
                        )}

                    </div>
                    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
                        <div className="bg-green-300 h-16">
                            <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
                                Avarage  Ordercount Yearly
                            </p>
                        </div>
                        {monthlyAverages.length > 0 ? (<LineChart
                            series={yearAverageOrderSeries}
                            // title="Total Order Count Monthly"
                            categories={months}
                            yAxisTitle="Order Count"
                            xAxisTitle="Date Of Year"
                            curve="stepline"
                        />) : (<p className="text-center text-red-500">No data available for the Yearly</p>)}


                    </div>
                </div>
            </main>
        </>
    );
};


export default PeopleDetailedAnalytics;
