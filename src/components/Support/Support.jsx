import React from "react";

const Support = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 w-full max-w-[1130px] mx-auto">
      <div className="bg-[linear-gradient(320deg,rgba(22,39,167,0.206)0%,rgba(22,39,167,0.550)50%,rgba(5,35,98,0.780)95%)] text-center p-5 rounded-xl ">
        <img src="/src/images/call.gif" className="inline-block w-20 h-20" />
        <h3 className="text-[18px] my-4 mb-[10px] text-whiter font-semibold">
          Book an onboarding call
        </h3>
        <p className="text-[14px] font-medium leading-[20px] mb-5 text-white">
          send us a message by chat and we will get back <br /> to you shorthly.
        </p>
        <a
          href="https://calendly.com/qeapps-support/"
          target="_blank"
          className="inline-block bg-[#ffffff] text-black hover:text-white px-4 py-2 rounded-md font-normal hover:font-bold text-md hover:bg-green-600 hover:scale-105 transition-all duration-200"
        >
          Book Call
        </a>
      </div>
      <div className="bg-[linear-gradient(320deg,rgba(22,39,167,0.206)0%,rgba(22,39,167,0.550)50%,rgba(5,35,98,0.780)95%)] text-center p-5  rounded-xl">
        <img src="/src/images/chat.gif " className="inline-block w-20 h-20" />
        <h3 className="text-[18px] my-4 mb-[10px] text-whiter font-semibold">
          Visit our HelpDesk
        </h3>
        <p className="text-[14px] font-medium leading-[20px] mb-5 text-white">
          Please check out HelpDesk where you can get all <br /> answers of your
          question.
        </p>
        <a
          href="#"
          target="_blank"
          className="inline-block bg-[#ffffff] text-black hover:text-white px-4 py-2 rounded-md font-normal hover:font-bold text-md hover:bg-green-600 hover:scale-105 transition-all duration-200"
        >
          HelpDesk
        </a>
      </div>
    </div>
  );
};

export default Support;
