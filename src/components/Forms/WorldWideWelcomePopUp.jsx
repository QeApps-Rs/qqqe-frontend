import { Link } from "react-router-dom";

const WorldWideWelcomePopUp = ({
  socialMediaTitle,
  socialMediaDesc,
  socialMediaBtnText,
  socialMediaBtnLink,
}) => {
  return (
    <div className="relative bg-white rounded-lg p-8 w-full max-w-sm mx-auto shadow-lg">
      <button className="absolute top-4 right-4 text-gray-600 text-lg font-semibold">
        &times;
      </button>

      <div className="text-center mb-4">
        <div className="relative bg-white p-4 rounded-lg shadow-lg">
          <div className="text-lg italic text-gray-900">
            "Excellent customer service and a great product! 5 stars!"
          </div>
         

          {/* Tail for the thought bubble */}
          <div className="absolute bottom-[-15px] left-1/2 transform -translate-x-1/2">
            <div className="w-3 h-3 bg-white rounded-full shadow-sm"></div>
            <div className="w-2 h-2 bg-white rounded-full shadow-sm mt-1"></div>
            <div className="w-1 h-1 bg-white rounded-full shadow-sm mt-1"></div>
          </div>
        </div>
      </div>

      <h2 className="text-center text-gray-900 text-2xl font-bold mb-4">
        Join us and get 10% OFF
      </h2>

      <form className="space-y-4">
        <input
          type="email"
          placeholder="Email address"
          className="w-full p-3 border rounded-lg text-sm focus:outline-none focus:ring focus:border-orange-500"
        />
        <Link to={socialMediaBtnLink || ""}>
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white p-3 mt-3 rounded-lg font-semibold">
            {socialMediaBtnText || "Get 10% OFF"}
          </button>
        </Link>
      </form>
    </div>
  );
};

export default WorldWideWelcomePopUp;
