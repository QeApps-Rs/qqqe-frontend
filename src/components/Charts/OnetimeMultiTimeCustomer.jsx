import React, { useState, useEffect } from 'react';
import Apexcharts from '../apexChart/ApexChart';

const OneTimeMultiTimeCustomer = ({ customerData }) => {
    const [timeRange, setTimeRange] = useState('monthly'); // Default to 'weekly'
    const [chartState, setChartState] = useState({
        series: [],
        options: {
            chart: {
                type: 'bar',
                height: 350,
                toolbar: { show: false },
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded',
                },
            },
            dataLabels: { enabled: false },
            stroke: { show: true, width: 2, colors: ['transparent'] },
            xaxis: {
                categories: [], // Categories will be populated dynamically
                title: { text: '' }, // Initialize with an empty x-axis title
            },
            yaxis: {
                title: { text: 'Customers' },
            },
            fill: { opacity: 1 },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val + " customers";
                    },
                },
            },
            colors: ['#775DD0', '#FF4560'], // Colors for One-Time and Multiple-Time
        },
    });

    // Function to update the x-axis title
    const updateXAxisTitle = (title) => {
        setChartState((prevState) => ({
            ...prevState,
            options: {
                ...prevState.options,
                xaxis: {
                    ...prevState.options.xaxis,
                    title: { text: title }, // Update the x-axis title
                },
            },
        }));
    };

    // Function to process data based on selected time range
    const processData = () => {
        let data;

        // Select the correct static data based on timeRange and update x-axis title
        if (timeRange === 'today') {
            data = customerData.today;
            updateXAxisTitle('Today');
        } else if (timeRange === 'weekly') {
            data = customerData.weekly;
            updateXAxisTitle('Week');
        } else if (timeRange === 'monthly') {
            data = customerData.monthly;
            updateXAxisTitle('Month');
        } else if (timeRange === 'yearly') {
            data = customerData.yearly;
            updateXAxisTitle('Year');
        }

        const dates = Object.keys(data); // Get dates from the selected time range

        const oneTimeData = [];
        const multipleTimeData = [];

        // Collect oneTime and multipleTime data for each date
        dates.forEach(date => {
            const dailyData = data[date];
            oneTimeData.push(dailyData.oneTime || 0); // Push oneTime data
            multipleTimeData.push(dailyData.multipleTime || 0); // Push multipleTime data
        });

        // Update the chart state with processed data
        setChartState((prevState) => ({
            ...prevState,
            series: [
                { name: 'One-Time', data: oneTimeData },
                { name: 'Multiple-Time', data: multipleTimeData },
            ],
            options: {
                ...prevState.options,
                xaxis: { 
                    ...prevState.options.xaxis, 
                    categories: dates, // Dates as the x-axis categories 
                },
            },
        }));
    };

    useEffect(() => {
        processData(); // Process data when component mounts or timeRange changes
    }, [timeRange, customerData]);

    return (
        <div>
            {/* Dropdown to select time range */}
            <select onChange={(e) => setTimeRange(e.target.value)} value={timeRange}>
                <option value="today">Today</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
            </select>

            <Apexcharts options={chartState.options} series={chartState.series} type="bar" height={350} />
        </div>
    );
};

export default OneTimeMultiTimeCustomer;



