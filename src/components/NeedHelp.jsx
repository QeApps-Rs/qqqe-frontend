import React from "react";
import needHelpImg from "../images/need-help.png";

const NeedHelpPage = () => {
  return (
    <>
      <h3 className="text-xl font-bold text-gray-800 mt-16 mb-4">Need Help?</h3>
      <div className="grid grid-cols-1 gap-4 mb-16 xl:grid-cols-3">
        {[...Array(3)].map((_, index) => (
          <div className="flex items-center" key={index}>
            <img
              src={needHelpImg}
              alt="product"
              className="w-40 min-h-20 mr-4"
            />
            <div className="block">
              <div className="block">
                <h2 className="text-lg font-bold text-graydark">
                  Website Personalization Course
                </h2>
                <p className="block text-sm text-customGray">
                  Learn how to increase conversion rates with a proven website
                  personalization strategy
                </p>
              </div>
              <a href="#" className="inline-block text-blue-600">
                Watch course{" "}
                <i className="fa fa-angle-right" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default NeedHelpPage;
