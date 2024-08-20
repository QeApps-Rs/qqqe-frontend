import React from 'react';
import ReactApexChart, { Props } from 'react-apexcharts'; // Import Props from react-apexcharts


const Apexcharts = ({ customProp, ...restProps }) => {
  // Ensure customProp is not passed to ReactApexChart to avoid invalid prop errors
  return <ReactApexChart {...restProps} />;
};

export default Apexcharts;
