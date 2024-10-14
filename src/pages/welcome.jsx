import React from "react";
import Logo from "../images/favicon.png";
import { Link } from "react-router-dom";
import Checkbox from "../components/higherOrderComponent/Checkboxes/Checkbox";
import welcomeImg from "../images/welcome.png";
const WelcomePage = () => {
  return (
    <div className="h-screen bg-[url('/src/images/purple-bg.jpg')] bg-no-repeat bg-cover">
        <div className="absolute inset-0 backdrop-brightness-50  opacity-90 z-0">
        <div className="relative z-10  p-4 sm:p-12.5 xl:p-8">
          <Link className="block" to="/">
            <img
              src={Logo}
              alt="Logo"
              className="mt-4"
              width={150}
              height={150}
            />
          </Link>{" "}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mt-20">
            <div className="col-span-1 "></div>
            <div className="col-span-1 inline-flex justify-center">
              <img src={welcomeImg} alt="welcome-img" className="w-80 h-70" />
            </div>
            <div className="col-span-2 flex items-center w-[75%]">
              <div className="block">
                <h1 className="text-4xl font-bold text-white">
                  Welcome to QQQE 🙌
                </h1>
                <p className="text-lg mt-4 mb-2 font-bold text-white">
                  Please tell us a bit about yourself and your business. Your
                  answers will help us better personalize your experience.
                </p>
                <div className="my-4">
                  <label className="mb-2.5 block font-medium text-white text-lg">
                    What’s the name of your business?
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full rounded-lg border border-stroke bg-transparent bg-white py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
                    />
                  </div>
                </div>
                <label className="mb-2.5 block font-medium text-white text-lg">
                  What’s your website URL?
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full rounded-lg border border-stroke bg-transparent bg-white py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
                  />
                </div>
                <div className="my-4 text-white font-medium ">
                  <Checkbox
                    label="I’m setting up Qqqe for a client."
                    checked={false}
                  />
                </div>
                <input
                  type="submit"
                  value="Let's get started"
                  className="w-1/2 block text-center no-underline font-extrabold text-white uppercase rounded-lg  py-4 px-12 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700 
                      bg-[length:200%_auto] shadow-lg shadow-blue-300/20 
                      transition-all duration-500 ease-in-out 
                      hover:bg-[position:right_center]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
