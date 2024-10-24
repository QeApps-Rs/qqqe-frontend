import { Link } from "react-router-dom";
import peopleImg from "/src/images/people.png"; // This is unused; consider removing if not needed
import SalesLineGraph from "./Campaigns/Graphs/SalesLineGraph";

const StartAppOverviewPage = ({ title, url }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg px-6 py-4 animate-fadeIn">
      <div className="flex items-center justify-between">
        <Link to={url}>
          <h1 className="flex items-center text-4xl leading-normal font-bold text-black hover:text-blue-700 transition-colors duration-300 transform hover:scale-105">
            <i className="mr-3 fa fa-home bg-blue-600 hover:bg-blue-500 text-white p-1 rounded-full h-8 w-8 flex items-center justify-center text-lg"></i>{" "}
            {title}
          </h1>
        </Link>
        <span className="ml-3 text-sm font-bold py-2 px-4 rounded-full bg-green-700 text-white">
          14 Suggestions
        </span>
      </div>

      <p className="text-md font-medium text-black leading-relaxed mt-3">
        Analyze customer data, including demographics. We provide insights on
        various aspects to help you understand your audience better.
      </p>

      <div className="flex mt-6 space-x-3">
        <span className="flex items-center text-sm font-semibold py-2 px-4 rounded-lg bg-red-200 text-red-800 hover:bg-red-300 shadow transition-all duration-300">
          <i className="fa fa-exclamation-circle mr-2"></i> Critical (2)
        </span>
        <span className="flex items-center text-sm font-semibold py-2 px-4 rounded-lg bg-yellow-200 text-yellow-800 hover:bg-yellow-300 shadow transition-all duration-300">
          <i className="fa fa-exclamation-triangle mr-2"></i> Minor (2)
        </span>
        <span className="flex items-center text-sm font-semibold py-2 px-4 rounded-lg bg-green-200 text-green-800 hover:bg-green-300 shadow transition-all duration-300">
          <i className="fa fa-check-circle mr-2"></i> Average (2)
        </span>
      </div>

      <div className="flex items-center mt-6 gap-4">
        <Link to={url} className="block">
          <button className="block font-bold h-[40px] px-4 bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 transition-colors duration-300 hover:shadow-xl transform hover:scale-105">
            <i
              className="mr-2 fa fa-lg fa-external-link-square"
              aria-hidden="true"
            />
            Get Started
          </button>
        </Link>
        <button className="block h-[40px] px-4 font-bold bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 transition-colors duration-300 hover:shadow-xl transform hover:scale-105">
          <i className="fa fa-headphones mr-2 text-xl" aria-hidden="true"></i>
          Talk to our Expert{" "}
        </button>
      </div>
    </div>
  );
};

export default StartAppOverviewPage;
