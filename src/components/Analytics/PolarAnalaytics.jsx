import React from "react";
const PolarAnalaytics = () => {
    const guarantees = [
        { id: 1, text: 'Map the Customer Journey- Understand each touchpoint from discovery to post-purchase' },
        { id: 2, text: 'Identify Conversion Opportunities- Find areas where users drop off and optimize them' },
        { id: 3, text: 'Enhance User Experience- Improve navigation, design, and overall ease of shopping' },
        { id: 4, text: 'Boost Retention Strategies- Use loyalty programs, follow-up emails, and exclusive offers to keep customers engaged' },
        { id: 5, text: 'Track and Analyze Data- Use analytics to monitor customer behavior and improve strategies' },
        // Add more objects here if needed
    ];

    return (
        <div className="rounded-2xl bg-[#161349]" >
            <div className="block p-6">
                <div className="grid grid-cols-12 gap-4 md:gap-6  2xl:gap-7.5">
                    <div className="col-span-12  xl:col-span-6">
                        <h1 className="block text-3xl font-bold text-white mb-4">Welcome To QQQE</h1>
                        <p className="block text-2xl font-medium mb-3 text-[#aca7ff]" >Our Goal: To Improve Store Conversion and Retention Rates</p>
                        <div className="d-block">
                            <span className="block text-xl font-normal mb-4 text-[#cecbff]" >Let's get you started.</span>
                            {guarantees.map((guarantee) => (
                                <div className="flex items-center mb-2" key={guarantee.id}>
                                    <i
                                        className="fa fa-check-circle mr-3 text-[#cecbff]"
                                        aria-hidden="true"
                                    ></i>
                                    <span className="text-white text-lg font-medium">{guarantee.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-span-12  xl:col-span-6">
                        <div className="block w-full h-full p-6 bg-white border border-gray-2 rounded-lg shadow">
                            <h5 className="mb-2 text-2xl font-bold ">Only 3 Steps for success</h5>
                            <div className="w-full mt-4  p-3 bg-white border border-gray-200 rounded-lg shadow-md">
                                <div className="d-block ml-2">
                                    <h2 className="text-lg font-bold text-gray-900 mb-1">Book your setup call</h2>
                                    <p className="text-gray-700">
                                        Try QQQE Activate for 30 days-get value or your money back.
                                    </p>
                                    <button type="button" class="w-full h-12 mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 text-lg">Book your spot now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default PolarAnalaytics;