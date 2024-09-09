import React from 'react';

const GraphCard = ({ title, colSpanClass, children }) => {
    return (
        <div className={`${colSpanClass} rounded-sm border border-stroke bg-white px-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5`}>
            <div className="bg-green-300 h-16">
                <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
                    {title}
                </p>
            </div>
            {children}
        </div>
    );
};

export default GraphCard;