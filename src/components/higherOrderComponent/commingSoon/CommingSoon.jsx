
import React from 'react';

import { MintenanceIcon } from '../../custIcon/svgIcon';
import logo from '../../../images/qqqe_maintenance.png'

import Button from '../button/button';
import { Link } from 'react-router-dom';

const CommingSoon = () => {
  return (
    <div className="w-full h-4/6 flex flex-col items-center justify-between min-h-[500px]">
      <div className="xl:w-1/2 flex-1 flex flex-col items-center justify-center text-center px-4 lg:px-0">
        {/* <MintenanceIcon /> */}
        <img src={logo} className=''></img>
        <p className="text-2xl font-bold text-gray-700 capitalize tracking-wide mt-8 mb-4">
          coming soon!
        </p>
        {/* <p className="text-xl text-gray-700 uppercase mt-4">We'll be back soon</p> */}
        <Link to="/dashboard">
          <Button
            isSubmit={false}
            buttonText="Homepage"
            className="bg-black text-fuchsia-50 font-medium py-4 px-4 rounded"
          />
        </Link>
      </div>
      {/* <div className="container py-5 px-10 mx-0 min-w-full flex flex-col items-center">
        
      </div> */}
    </div>
  );
};

export default CommingSoon;
