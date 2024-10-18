import React, { useEffect, useState } from 'react';
import Apexcharts from '../apexChart/ApexChart';

const LineChartDashedData = ({ chartTitle, orderData, dateRange, isToday, xAxisTitle }) => {
    const [chartState, setChartState] = useState({
        series: [], // Series data will be populated dynamically
        options: {
            chart: {
                type: 'line', // Changed to 'line'
                height: 350,
                zoom: {
                    enabled: false,
                },
                animations: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },
            stroke: {
                width: [5, 7, 5],
                curve: 'straight',
                dashArray: [0, 8, 5]
            },
            xaxis: {
                categories: [], // Dates/categories will be passed dynamically
                title:{
                    text: xAxisTitle
                }
            },
            yaxis: {
                title: {
                    text: 'Orders',
                },
            },
            labels: [], // Labels will be passed dynamically
            
        },
    });

    useEffect(() => {
        if (orderData && Object.keys(orderData).length > 0) {
            // Generate the data for the chart based on orderData
            const categories = isToday ? dateRange : Object.keys(orderData);
            const totalOrderValues = Object.values(orderData).map(data => parseFloat(data.total_order_count) || null);
            const averageOrderValues = Object.values(orderData).map(data => parseFloat(data.average_order_count) || null);

            setChartState(prevState => ({
                ...prevState,
                series: [
                    { name: 'Total Order', data: totalOrderValues },
                    { name: 'Average Order', data: averageOrderValues },
                ],
                options: {
                    ...prevState.options,
                    xaxis: {
                        categories, // Pass the dates
                    },
                },
                labels: categories, // Use categories as labels
            }));
        }
    }, [orderData, dateRange, isToday]);

    return (
        <div>
            <h2>{chartTitle}</h2>
            <Apexcharts options={chartState.options} series={chartState.series} type="line" height={350} />
        </div>
    );
};

export default LineChartDashedData;
