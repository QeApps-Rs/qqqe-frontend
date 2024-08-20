import Link from 'next/link';
import React from 'react';

import { MintenanceIcon } from '@/components/custIcon/svgIcon';

import Button from '../button/button';

const CommingSoon = () => {
  return (
    <div className="w-full h-4/6 flex flex-col items-center justify-between">
      <div className="xl:w-1/2 flex-1 flex flex-col items-center justify-center text-center px-4 lg:px-0">
        <MintenanceIcon />
        <p className="text-4xl font-bold text-gray-700 capitalize tracking-wide mt-8">
          Page under development!
        </p>
        {/* <p className="text-xl text-gray-700 uppercase mt-4">We'll be back soon</p> */}
      </div>
      <div className="container py-10 px-10 mx-0 min-w-full flex flex-col items-center">
        <Link href="/home">
          <Button
            isSubmit={false}
            buttonText="Homepage"
            className="bg-purple-900 text-white hover:bg-blue-400 font-bold py-2 px-4 mt-3 rounded"
          />
        </Link>
      </div>
    </div>
  );
};

export default CommingSoon;
