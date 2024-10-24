import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';

const AverageTimeSpentWholeSite = ({ data, xAxisTitle, color }) => {
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
            xaxis: { categories: [], title: { text: xAxisTitle } },
            yaxis: {
                title: { text: 'Time Count' },
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val;
                    },
                },
            },
            colors: color || ['#008FFB', '#FF4560'], // Colors for day and night lines
        },
    });

    const [selectedRange, setSelectedRange] = useState('today'); // Default to 'today'

    // Process the data based on the selected range
    const processSalesData = () => {
        let dates = [];
        let dayData = [];
        let nightData = [];

        const rangeData = data[selectedRange];

        // Process based on selected time range (today, weekly, monthly, yearly)
        Object.entries(rangeData).forEach(([key, value]) => {
            dates.push(key); // X-axis labels (dates)
            const dayIndex = value.timezone.indexOf('day');
            const nightIndex = value.timezone.indexOf('night');
            dayData.push(value.time_count[dayIndex] || 0);
            nightData.push(value.time_count[nightIndex] || 0);
        });

        // Update the chart state with the processed data
        setChartState((prevState) => ({
            ...prevState,
            series: [
                { name: 'Day', data: dayData },
                { name: 'Night', data: nightData },
            ],
            options: {
                ...prevState.options,
                xaxis: { categories: dates }, // Dates on the x-axis
            },
        }));
    };

    useEffect(() => {
        processSalesData();
    }, [selectedRange]);

    return (
        <div>
            <select
                value={selectedRange}
                onChange={(e) => setSelectedRange(e.target.value)}
            >
                <option value="today">Today</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
            </select>

            <ApexCharts
                options={chartState.options}
                series={chartState.series}
                type="line"
                height={350}
            />
        </div>
    );
};

export default AverageTimeSpentWholeSite;
