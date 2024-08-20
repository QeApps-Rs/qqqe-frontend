import React from 'react'
import { Link } from 'react-router-dom';
import { InfoIcon } from '../custIcon/svgIcon'

const ProblemStatements = () => {

    const getBadgeBackgroundClass = (priority) => {
        const priorityBackgroundClasses = {
            Critical: 'bg-red-100 text-red-800',
            Average: 'bg-green-100 text-green-800',
            Minor: 'bg-yellow-100 text-yellow-800',
            default: 'bg-gray-100 text-gray-800', // default case if none of the above
        };

        return priorityBackgroundClasses[priority] || priorityBackgroundClasses.default;
    };
    ;

    return (
        <main className="main-content todo-app w-full px-[var(--margin-x)] pb-8">
            <div className="mb-1 -mt-2 p-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between __web-inspector-hide-shortcut__">
                <h2 className="text-lg text-title-md2 font-semibold text-black dark:text-white">
                    Level 1: App Intelligence (people)
                </h2>
            </div>

            <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
                <div className="flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
                    <div className="card px-4 pt-2 pb-4">
                        <div className='border-b border-slate-150 py-3 dark:border-navy-500 cursor-pointer'>
                            <div className="flex items-center space-x-5 sm:space-x-3">
                                <div className="flex justify-between w-full flex-row space-x-2">
                                    <Link to='/suggestion/list/1'>
                                        <div className='ml-2 border-current pb-0.5 font-medium outline-none transition-colors duration-300 hover:text-primary/70 focus:text-primary/70 dark:text-accent-light dark:hover:text-accent-light/70 dark:focus:text-accent-light/70'>

                                            19% customer are not purchasing product again

                                        </div>
                                    </Link>
                                    <div className="ml-auto flex justify-between items-center">
                                        <div className='text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 bg-red-100 text-red-800'>
                                            Critical
                                        </div>
                                        <div title='19% customer are not purchasing product again' className="">
                                            <InfoIcon />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='border-b border-slate-150 py-3 dark:border-navy-500 cursor-pointer'>
                            <div className="flex items-center space-x-5 sm:space-x-3">
                                {/* <div className="flex items-center space-x-5 sm:space-x-3"> */}
                                    <div className="flex justify-between w-full flex-row space-x-2">
                                        <Link to='/suggestion/list/2'>
                                            <div className='ml-2 border-current pb-0.5 font-medium outline-none transition-colors duration-300 hover:text-primary/70 focus:text-primary/70 dark:text-accent-light dark:hover:text-accent-light/70 dark:focus:text-accent-light/70'>

                                                35% of customer abandoned cart in last year.

                                            </div>
                                        </Link>
                                        <div className="ml-auto flex justify-between items-center">
                                            <div className='text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 bg-red-100 text-red-800'>
                                                Critical
                                            </div>
                                            <div title='35% of customer abandoned cart in last year.' className="">
                                                <InfoIcon />
                                            </div>
                                        </div>
                                    </div>
                                {/* </div> */}
                            </div>
                        </div>
                        <div className='border-b border-slate-150 py-3 dark:border-navy-500 cursor-pointer'>
                            <div className="flex items-center space-x-5 sm:space-x-3 justify-between">
                                {/* <div className="flex items-center space-x-5 sm:space-x-3"> */}
                                    <div className="flex justify-between w-full flex-row space-x-2">
                                        <Link to='/suggestion/list/3'>
                                            <div className='ml-2 border-current pb-0.5 font-medium outline-none transition-colors duration-300 hover:text-primary/70 focus:text-primary/70 dark:text-accent-light dark:hover:text-accent-light/70 dark:focus:text-accent-light/70'>

                                                User takes almost 14 days to order after onboarding

                                            </div>
                                        </Link>
                                        <div className="ml-auto flex justify-between items-center">
                                            <div className='text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 bg-red-100 text-red-800'>
                                                Critical
                                            </div>
                                            <div title='User takes almost 14 days to order after onboarding' className="">
                                                <InfoIcon />
                                            </div>
                                        </div>
                                    </div>
                                {/* </div> */}
                            </div>
                        </div>
                        <div className='border-b border-slate-150 py-3 dark:border-navy-500 cursor-pointer'>
                            <div className="flex items-center space-x-5 sm:space-x-3 justify-between">
                                {/* <div className="flex items-center space-x-5 sm:space-x-3"> */}
                                    <div className="flex justify-between w-full  flex-row space-x-2">
                                        <Link to='/suggestion/list/4'>
                                            <div className='ml-2 border-current pb-0.5 font-medium outline-none transition-colors duration-300 hover:text-primary/70 focus:text-primary/70 dark:text-accent-light dark:hover:text-accent-light/70 dark:focus:text-accent-light/70'>

                                                1055 premium people stopped purchasing the product

                                            </div>
                                        </Link>
                                        <div className="ml-auto flex justify-between items-center">
                                            <div className='text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 bg-green-100 text-green-800'>
                                                Average
                                            </div>
                                            <div title='1055 premium people stopped purchasing the product' className="">
                                                <InfoIcon />
                                            </div>
                                        </div>
                                    </div>
                                {/* </div> */}
                            </div>
                        </div>
                        <div className='border-b border-slate-150 py-3 dark:border-navy-500 cursor-pointer'>
                            <div className="flex items-center space-x-5 sm:space-x-3 justify-between">
                                <div className="flex justify-between w-full flex-row space-x-2">
                                    <Link to='/suggestion/list/5'>
                                        <div className='ml-2 border-current pb-0.5 font-medium outline-none transition-colors duration-300 hover:text-primary/70 focus:text-primary/70 dark:text-accent-light dark:hover:text-accent-light/70 dark:focus:text-accent-light/70'>
                                            Your store churn rate is 9% which is less than the previous month by 2%.
                                        </div>
                                    </Link>
                                    <div className="ml-auto flex justify-between items-center">
                                        <div className='text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 bg-green-100 text-green-800'>
                                            Average
                                        </div>
                                        <div title='Your store churn rate is 9% which is less than the previous month by 2%.' className="">
                                            <InfoIcon />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='border-b border-slate-150 py-3 dark:border-navy-500 cursor-pointer'>
                            <div className="flex items-center space-x-5 sm:space-x-3 justify-between">
                                <div className="flex justify-between w-full flex-row space-x-2">
                                    <Link to='/suggestion/list/6'>
                                        <div className='ml-2 border-current pb-0.5 font-medium outline-none transition-colors duration-300 hover:text-primary/70 focus:text-primary/70 dark:text-accent-light dark:hover:text-accent-light/70 dark:focus:text-accent-light/70'>
                                            50% customer only purchase when the discount is available.
                                        </div>
                                    </Link>
                                    <div className="ml-auto flex justify-between items-center">
                                        <div className='text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 bg-yellow-100 text-yellow-800'>
                                            Minor
                                        </div>
                                        <div title='50% customer only purchase when the discount is available.' className="">
                                            <InfoIcon />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div />
            </div>
        </main>
    )
}

export default ProblemStatements