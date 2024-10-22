import { Link } from "react-router-dom";

const WorldWideWelcomePopUp = ({
  worldWideWelcomeTitle,
  worldWideWelcomeShippingText,
  worldWideWelcomeReview,
  worldWideWelcomeBtnText,
  worldWideWelcomeBtnLink,
  worldWideWelcomeReviewerName,
  worldWideWelcomeReviewerPosition,
}) => {
  return (
    <div className="relative bg-white rounded-lg p-8 w-full max-w-sm mx-auto shadow-lg">
      <button className="absolute top-4 right-4 text-gray-600 text-lg font-semibold">
        &times;
      </button>

      <div className="text-center mb-8">
        <div className="relative bg-white p-4 rounded-lg shadow-lg">
          <div className="text-lg italic text-gray-900">
            "{worldWideWelcomeReview || "Excellent customer service and a great product! 5 stars!"}"
            
          </div>

          <div>
            <div
              className="w-8 h-[23px] absolute bottom-[-23px] left-3 m-0"
              style={{
                background:
                  "url(https://apps.qeapps.com/ecom_apps_n/production/qqqe-frontend/src/images/arrow_qts.png) left top no-repeat",
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="text-center mb-8">
        <div className="font-bold mt-2 text-gray-900">{worldWideWelcomeReviewerName || ""}</div>
        <div className="text-sm text-gray-600">{worldWideWelcomeReviewerPosition || ""}</div>
      </div>

      <h3 className="text-center text-gray-900 text-1xl font-bold mb-4">
       {worldWideWelcomeShippingText || ""}
      </h3>
      <h2 className="text-center text-gray-900 text-2xl font-bold mb-4">
       {worldWideWelcomeTitle || ""}
      </h2>

      <form className="space-y-4">
        <input
          type="email"
          placeholder="Email address"
          className="w-full p-3 border rounded-lg text-sm focus:outline-none focus:ring focus:border-orange-500"
        />
        <Link to={worldWideWelcomeBtnLink || ""}>
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white p-3 mt-3 rounded-lg font-semibold">
            {worldWideWelcomeBtnText || "Get 10% OFF"}
          </button>
        </Link>
      </form>
    </div>
  );
};

export default WorldWideWelcomePopUp;
