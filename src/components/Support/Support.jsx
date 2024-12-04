import callImage from "../../images/call.gif";
import chatImage from "../../images/chat.gif";
import NeedHelpIcon from "../../images/call-center.gif";

const Support = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
      {/* Onboarding Call */}
      <div className="bg-custom_gradient text-center p-5 rounded-xl">
        <img
          src={callImage}
          className="inline-block w-20 h-20"
          alt="Onboarding Call"
        />
        <h3 className="text-[18px] my-4 mb-2 text-white font-semibold">
          Book an onboarding call
        </h3>
        <p className="text-[14px] font-medium leading-5 mb-5 text-white">
          Send us a message by chat and we will get back to you shortly.
        </p>
        <a
          href="https://calendly.com/qeapps-support/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white text-black hover:text-white px-4 py-2 rounded-md font-normal hover:font-bold text-md hover:bg-green-600 hover:scale-105 transition-all duration-200"
        >
          Book Call
        </a>
      </div>

      {/* HelpDesk */}
      <div className="bg-custom_gradient text-center p-5 rounded-xl">
        <img
          src={chatImage}
          className="inline-block w-20 h-20"
          alt="HelpDesk"
        />
        <h3 className="text-[18px] my-4 mb-2 text-white font-semibold">
          Visit our HelpDesk
        </h3>
        <p className="text-[14px] font-medium leading-5 mb-5 text-white">
          Please check out HelpDesk where you can get all answers to your
          questions.
        </p>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white text-black hover:text-white px-4 py-2 rounded-md font-normal hover:font-bold text-md hover:bg-green-600 hover:scale-105 transition-all duration-200"
        >
          HelpDesk
        </a>
      </div>

      {/* Support Links */}
      <div className="bg-custom_gradient text-center p-5 rounded-xl md:col-span-2 lg:col-span-1 ">
        <img
          src={NeedHelpIcon}
          className="inline-block w-20 h-20"
          alt="Need Help"
        />
        <h3 className="text-[18px] my-4 mb-2 text-white font-semibold">
          Need Support?
        </h3>
        <p className="text-[14px] font-medium leading-5 mb-5 text-white">
          Please check out the support links below for assistance.
        </p>
        <div className="flex justify-center space-x-6">
          <a
            href="https://web.whatsapp.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-green-500 transition-transform transform hover:scale-110"
          >
            <i className="fa fa-whatsapp text-3xl"></i>
          </a>
          <a
            href="https://calendly.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-500 transition-transform transform hover:scale-110"
          >
            <i className="fa fa-calendar text-3xl"></i>
          </a>
          <a
            href="https://www.tawk.to/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-teal-500 transition-transform transform hover:scale-110"
          >
            <i className="fa fa-comment text-3xl"></i>
          </a>
          <a
            href="https://www.calrik.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-yellow-500 transition-transform transform hover:scale-110"
          >
            <i className="fa fa-phone text-3xl"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Support;
