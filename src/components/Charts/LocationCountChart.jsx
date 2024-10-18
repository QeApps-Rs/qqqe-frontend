import React, { useState, useEffect } from 'react';
import Apexcharts from '../apexChart/ApexChart';

const LocationCountChart = ({ locationData }) => {
    const [timeRange, setTimeRange] = useState('monthly'); // Default to 'today'
    const [chartState, setChartState] = useState({
        series: [],
        options: {
            chart: {
                type: 'bar', // Set chart type to bar
                height: 350,
                toolbar: { show: false },
                zoom: { enabled: false },
            },
            plotOptions: {
                bar: {
                    horizontal: false, // Ensure bars are vertical
                    columnWidth: '55%', // Width of the columns
                    endingShape: 'rounded', // Rounded ends for bars
                },
            },
            dataLabels: { enabled: false }, // Disable data labels
            stroke: { show: true, width: 2, colors: ['transparent'] }, // Add stroke to bars
            xaxis: {
                categories: [], // Dates will be populated dynamically
                title: { text: '' }, // Initialize x-axis title
            },
            yaxis: {
                title: { text: 'Count' }, // General title for y-axis
            },
            fill: { opacity: 1 }, // Opacity of the bars
            tooltip: {
                y: {
                    formatter: function (val) {
                        return `${val} counts`; // Tooltip formatting
                    },
                },
            },
            colors: ['#36A2EB', '#FF6384'], // Color palette for bars
        },
    });
    const [loading, setLoading] = useState(true); // Loading state

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
        setLoading(true); // Set loading to true at the start
        const data = locationData[timeRange]; // Access data for the current time range
        const dates = Object.keys(data); // Get dates from the selected time range

        // Separate customer and guest counts for each date
        const customerData = dates.map(date => data[date].customers);
        const guestData = dates.map(date => data[date].guests);

        // Update the chart state with processed data
        setChartState((prevState) => ({
            ...prevState,
            series: [
                { name: 'Customers', data: customerData },
                { name: 'Guests', data: guestData }
            ], // Two series: one for customers, one for guests
            options: {
                ...prevState.options,
                xaxis: {
                    ...prevState.options.xaxis,
                    categories: dates, // Use dates as x-axis categories
                },
            },
        }));

        // Update x-axis title based on the time range
        if (timeRange === 'today') {
            updateXAxisTitle('Today');
        } else if (timeRange === 'weekly') {
            updateXAxisTitle('Week');
        } else if (timeRange === 'monthly') {
            updateXAxisTitle('Month');
        } else if (timeRange === 'yearly') {
            updateXAxisTitle('Year');
        }

        setLoading(false); // Set loading to false after processing
    };

    useEffect(() => {
        processData(); // Process data when component mounts or timeRange changes
    }, [timeRange, locationData]);

    return (
        <div>
            {/* Dropdown to select time range */}
            <select onChange={(e) => setTimeRange(e.target.value)} value={timeRange}>
                <option value="today">Today</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
            </select>

            {loading ? (
                <div>Loading...</div> // Display loading message
            ) : (
                <Apexcharts
                    options={chartState.options}
                    series={chartState.series}
                    type="bar" // Ensure the type is bar
                    height={350} // Chart height
                />
            )}
        </div>
    );
};

export default LocationCountChart;
