import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts'; // Assuming you're using ApexCharts for the chart library

const LineMultiSeriesChart = ({ salesData, dateRange, isToday, xAxisTitle,color }) => {
    const [chartState, setChartState] = useState({
        series: [],
        options: {
            chart: {
                type: 'line',
                height: 350,
                toolbar: { show: false },
            },
            stroke: { curve: 'smooth', width: 2 },
            dataLabels: { enabled: false },
            xaxis: { categories: [], title:{text:xAxisTitle} },
            yaxis: {
                title: { text: 'Sales' },
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val;
                    },
                },
            },
            colors: color || ['#008FFB', '#FF4560'], // Colors for different lines
        },
    });

    // Process the sales data to match the chart's expected structure
    const processSalesData = () => {
        const dates = dateRange; // Use the provided date range for x-axis categories
        const salesCountData = [];
        const salesAverageData = [];

        // Iterate through the dateRange and populate data arrays
        dates.forEach((date) => {
            const salesForDate = salesData[date] || { sales_count: 0, sales_average: 0 };
            salesCountData.push(salesForDate.sales_count || 0);
            salesAverageData.push(parseFloat(salesForDate.sales_average || 0));
        });

        // Update the chart state with the processed data
        setChartState((prevState) => ({
            ...prevState,
            series: [
                { name: 'Sales Count', data: salesCountData },
                { name: 'Sales Average', data: salesAverageData },
            ],
            options: {
                ...prevState.options,
                xaxis: { categories: dates }, // Dates on the x-axis
            },
        }));
    };

    useEffect(() => {
        processSalesData();
    }, [salesData, dateRange]);

    return (
        <ApexCharts
            options={chartState.options}
            series={chartState.series}
            type="line"
            height={350}
        />
    );
};

export default LineMultiSeriesChart;
