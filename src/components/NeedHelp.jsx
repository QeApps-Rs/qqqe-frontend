import React, { useState } from "react";

const NeedHelpPage = () => {
  const [sliderTypeHandle, setSliderTypeHandle] = useState("product_slider");

  const steps = {
    product_slider: [
      "From the app dashboard, copy the shortcode of the Product Detailed Slider.",
      "Go to your Shopify admin page.",
      "Click on Online Store in the left-hand menu.",
      "Select Themes from the submenu.",
      "Click the Customize button.",
      "Click on Add Section, then select Custom Liquid.",
      "In the Custom Liquid section, paste the shortcode of the Product Detailed Slider.",
      "Click the Save button to save your changes.",
    ],
    card_slider: [
      "From the app dashboard, copy the shortcode of the Card Slider for product.",
      "Go to your Shopify admin page.",
      // Add remaining steps similarly
    ],
    // Add other slider types as needed
  };
  return (
    <>
      <h3 className="text-xl font-bold text-gray-800 mt-16 mb-4">Need Help?</h3>
      <div className="flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg">
        <h4 className="text-xl text-primary mb-4 text-center">Need Support? Click Below Links</h4>
        <ul className="space-y-4">
          <li>
            <a
              className="flex items-center justify-center btn btn-outline-success py-2 rounded-md"
              href="javascript:void(0)"
            >
              <i className="fa fa-whatsapp mr-2"></i> WhatsApp
            </a>
          </li>
          <li>
            <a
              className="flex items-center justify-center btn btn-outline-primary py-2 rounded-md"
              href="https://calendly.com/qeapps-support/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa fa-calendar-check-o mr-2"></i> Calendly
            </a>
          </li>
          <li>
            <a
              className="flex items-center justify-center btn btn-outline-warning py-2 rounded-md"
              href="javascript:void(Tawk_API.toggle())"
            >
              <i className="fa fa-commenting mr-2"></i> Tawk
            </a>
          </li>
          <li>
            <a
              className="flex items-center justify-center btn btn-outline-info py-2 rounded-md"
              href="https://www.calrik.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa fa-phone mr-2"></i> Calrik
            </a>
          </li>
        </ul>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Onboarding Call Card */}
      <div className="p-6 bg-gray-50 rounded-lg shadow-lg h-full flex flex-col justify-between text-center">
        <h5 className="text-xl font-bold text-gray-800 mb-3">Book an Onboarding Call</h5>
        <p className="text-gray-600 mb-4">
          Send us a message via chat, and we’ll get back to you shortly.
        </p>
        <a
          href="https://calendly.com/qeapps-support/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary text-white bg-blue-600 hover:bg-blue-700 w-full py-2 font-semibold rounded-full shadow-md flex items-center justify-center"
        >
          <i className="fa fa-calendar-check-o mr-2"></i>
          Book Call
        </a>
      </div>

      {/* HelpDesk Card */}
      <div className="p-6 bg-gray-50 rounded-lg shadow-lg h-full flex flex-col justify-between text-center">
        <h5 className="text-xl font-bold text-gray-800 mb-3">Visit Our HelpDesk</h5>
        <p className="text-gray-600 mb-4">
          Explore our HelpDesk for answers to all your questions.
        </p>
        <button
          disabled
          className="btn-outline text-gray-500 border border-gray-300 hover:border-gray-400 w-full py-2 font-semibold rounded-full shadow-md flex items-center justify-center"
        >
          <i className="fa fa-life-ring mr-2"></i>
          HelpDesk
        </button>
      </div>
    </div>
    </div>
    </>
  );
};

export default NeedHelpPage;
