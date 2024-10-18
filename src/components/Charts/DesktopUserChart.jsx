import React, { useState, useEffect } from 'react';
import Apexcharts from '../apexChart/ApexChart';

const DesktopUsersChart = ({ orderData }) => {
    const [timeRange, setTimeRange] = useState('monthly'); // Default to 'today'
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
                categories: [],
                title: { text: '' }, // Initialize x-axis title
            },
            yaxis: {
                title: { text: 'Total Users' },
            },
            fill: { opacity: 1 },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val + " users";
                    },
                },
            },
            colors: ['#FF4560', '#00E396', '#775DD0', '#008FFB', '#3056D3'], // Colors for Firefox, Chrome, and Edge
        },
    });

    // Function to fetch static data from the passed prop
    const fetchStaticData = () => {
        let data;
        // Select the correct static data based on timeRange
        if (timeRange === 'today') {
            data = orderData.today;
            updateXAxisTitle('Today');
        } else if (timeRange === 'weekly') {
            data = orderData.weekly;
            updateXAxisTitle('Week');
        } else if (timeRange === 'monthly') {
            data = orderData.monthly;
            updateXAxisTitle('Month');
        } else if (timeRange === 'yearly') {
            data = orderData.yearly;
            updateXAxisTitle('Year');
        }

        // Update the chart with static data
        updateChartData(data);
    };

    // Function to update the x-axis title
    const updateXAxisTitle = (title) => {
        setChartState((prevState) => ({
            ...prevState,
            options: {
                ...prevState.options,
                xaxis: {
                    ...prevState.options.xaxis,
                    title: { text: title },
                },
            },
        }));
    };

    // Function to update the chart data based on received data
    const updateChartData = (data) => {
        const categories = data.dates;
        const firefoxData = data.firefox || [];
        const chromeData = data.chrome || [];
        const edgeData = data.edge || [];

        // Prepare series with default Firefox and Chrome data
        let series = [
            { name: 'Firefox Users', data: firefoxData },
            { name: 'Chrome Users', data: chromeData },
        ];

        // Check for any additional devices beyond Firefox and Chrome
        Object.keys(data).forEach((key) => {
            if (key !== 'firefox' && key !== 'chrome' && key !== 'dates') {
                series.push({
                    name: `${key.charAt(0).toUpperCase() + key.slice(1)} Users`,
                    data: data[key],
                });
            }
        });

        // Update chart state
        setChartState((prevState) => ({
            ...prevState,
            series: series,
            options: {
                ...prevState.options,
                xaxis: { ...prevState.options.xaxis, categories: categories },
            },
        }));
    };

    // Call fetchStaticData whenever timeRange changes
    useEffect(() => {
        fetchStaticData();
    }, [timeRange]);

    return (
        <div>
            {/* Time Range Dropdown */}
            <select onChange={(e) => setTimeRange(e.target.value)} value={timeRange}>
                <option value="today">Today</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
            </select>

            {/* Chart */}
            <Apexcharts options={chartState.options} series={chartState.series} type="bar" height={350} />
        </div>
    );
};

export default DesktopUsersChart;
