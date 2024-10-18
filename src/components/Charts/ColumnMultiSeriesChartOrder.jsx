import React, { useEffect, useState } from 'react';
import Apexcharts from '../apexChart/ApexChart';

const ColumnMultiSeriesChartOrder = ({ chartTitle, orderData, dateRange, isToday, xAxisTitle }) => {
    const [chartState, setChartState] = useState({
        series: [],
        options: {
            chart: {
                type: 'bar',
                height: 350,
                toolbar: {
                    show: false,
                },
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded',
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent'],
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
            fill: {
                opacity: 1,
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val;
                    },
                },
            },
            colors: ['#00E396','#FEB019'], // Blue, Green for total & average sales
        },
    });

    useEffect(() => {
        if (orderData && Object.keys(orderData).length > 0) {
            const months = Object.keys(orderData).map(month =>
                month.charAt(0).toUpperCase() + month.slice(1)
            );
            let orderValues = [];
            let averageValues = [];

            // If it's for today's data (single object)
            if (isToday) {
                orderValues = [parseFloat(orderData.total_order_count)];
                averageValues = [parseFloat(orderData.average_order_count)];
            } else {
                // For weekly data (multiple dates)
                orderValues = Object.values(orderData).map(data => parseFloat(data.total_order_count));
                averageValues = Object.values(orderData).map(data => parseFloat(data.average_order_count));
            }

            setChartState(prevState => ({
                ...prevState,
                series: [
                    { name: 'Total Order', data: orderValues },
                    { name: 'Average Order', data: averageValues },
                ],
                options: {
                    ...prevState.options,
                    xaxis: {
                        categories: isToday == true ? dateRange : months, // Pass dates as categories
                    },
                },
            }));
        }
    }, [orderData, dateRange, isToday]);

    return (
        <div>
            <h2>{chartTitle}</h2>
            <Apexcharts options={chartState.options} series={chartState.series} type="bar" height={350} />
        </div>
    );
};

export default ColumnMultiSeriesChartOrder;


