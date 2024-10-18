import React, { useEffect, useState } from 'react';
import Apexcharts from '../apexChart/ApexChart';

const ColumnMultiSeriesChart = ({ chartTitle, salesData, dateRange, isToday }) => {
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
            },
            yaxis: {
                title: {
                    text: 'Sales',
                },
            },
            fill: {
                opacity: 1,
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return  val ;
                    },
                },
            },
            colors: ['#008FFB', '#00E396'], // Blue, Green for total & average sales
        },
    });

    useEffect(() => {
        if (salesData && dateRange && Object.keys(salesData).length > 0) {

            const months = Object.keys(salesData).map(month =>
                month.charAt(0).toUpperCase() + month.slice(1)
            );

            let salesValues = [];
            let averageValues = [];
            // console.log(salesData,"salesData")
            // If it's for today's data (single object)
            if (isToday) {
                salesValues = [parseFloat(salesData.sales_count)];
                averageValues = [parseFloat(salesData.sales_average)];
            } else {
                // For weekly data (multiple dates)
                salesValues = Object.values(salesData).map(data => parseFloat(data.sales_count));
                averageValues = Object.values(salesData).map(data => parseFloat(data.sales_average));
            }

            setChartState(prevState => ({
                ...prevState,
                series: [
                    { name: 'Total Sales', data: salesValues },
                    { name: 'Average Sales', data: averageValues },
                ],
                options: {
                    ...prevState.options,
                    xaxis: {
                       // categories: months, // Pass dates as categories
                        categories: isToday == true ? dateRange : months
                    },
                },
            }));
        }
    }, [salesData, dateRange, isToday]);

    return (
        <div>
            <h2>{chartTitle}</h2>
            <Apexcharts options={chartState.options} series={chartState.series} type="bar" height={350} />
        </div>
    );
};

export default ColumnMultiSeriesChart;



