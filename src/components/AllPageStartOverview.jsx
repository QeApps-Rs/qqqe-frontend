import { Link } from "react-router-dom";
import SalesLineGraph from "./Campaigns/Graphs/SalesLineGraph";

const AllPageStartOverviewPage = () => {
  const salesLineData = [10, 41, 35, 51, 49, 62, 69, 91, 148];
  const lineCategories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];
  const lineyAxisTitle = "Sales Amount";

  return (
    <div className="bg-[#000000] rounded-md px-4 md:px-6 py-4 animate-fadeIn max-w-full">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5 items-center">
        <div className="md:col-span-8 col-span-12 border-r-0 md:border-r-2 border-dashed border-white">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
            {/* <div className="sm:col-span-3 md:col-span-2 flex justify-center sm:justify-start">
              <img
                src={peopleImg}
                alt="people image"
                className="rounded-lg shadow-lg transition-transform transform hover:scale-105 sm:w-auto"
              />
            </div> */}
            <div className="sm:col-span-12 md:col-span-12">
              <div className="flex flex-wrap items-center gap-2">
                <Link to={"/people-problem"}>
                  <h1 className="flex items-center text-3xl sm:text-4xl font-bold text-white hover:text-blue-400 transition-colors duration-300 transform hover:scale-105">
                    <i className="mr-2 fa fa-home bg-[#4680ff] hover:bg-[#60a5fa] text-white p-1 rounded-full h-6 w-6 flex items-center justify-center text-lg"></i>
                    People
                  </h1>
                </Link>
                <span className="text-xs sm:text-sm font-bold py-3 sm:py-2 px-3 sm:px-4 rounded bg-green-600 text-white">
                  14 Suggestions
                </span>
              </div>

              <p className="text-sm sm:text-xl font-normal text-white leading-relaxed mt-3">
                Analyze customers data, including demographics,Analyze customers data, including demographics,Analyze customers data, including demographics,Analyze customers data, including demographics,
              </p>

              <div className="flex flex-wrap mt-4 sm:mt-6 gap-2">
                <span className="flex items-center text-xs sm:text-sm font-semibold py-3 sm:py-2 px-3 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 shadow-sm transition-all duration-300">
                  <i className="fa fa-exclamation-circle mr-2"></i> Critical (2)
                </span>
                <span className="flex items-center text-xs sm:text-sm font-semibold py-3 sm:py-2 px-3 rounded-lg bg-yellow-100 text-yellow-700 hover:bg-yellow-200 shadow-sm transition-all duration-300">
                  <i className="fa fa-exclamation-triangle mr-2"></i> Minor (2)
                </span>
                <span className="flex items-center text-xs sm:text-sm font-semibold py-3 sm:py-2 px-3 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 shadow-sm transition-all duration-300">
                  <i className="fa fa-check-circle mr-2"></i> Average (2)
                </span>
              </div>

              <div className="flex flex-wrap items-center mt-4 sm:mt-6 gap-2 sm:gap-4">
                <Link to={"/people-problem"} className=" w-full sm:w-auto">
                  <button className="sm:block hidden w-full sm:w-auto min-h-[50px] sm:min-h-[60px] px-3 sm:px-4 py-2 sm:py-4 font-bold bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 transition-colors duration-300 hover:shadow-xl transform hover:scale-105">
                    <i className="mr-2 fa fa-lg fa-external-link-square ml-1" aria-hidden="true" />
                    Get Started
                  </button>
                </Link>
                <button className="block w-full sm:w-auto px-3 min-h-[50px] sm:min-h-[60px] sm:px-4 py-2 sm:py-4 font-bold bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 transition-colors duration-300 hover:shadow-xl transform hover:scale-105">
                  <i className="fa fa-headphones mr-2 text-xl" aria-hidden="true"></i>
                  Talk to our Expert
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-4 col-span-12 mt-6 md:mt-0">
          <SalesLineGraph
            salesLineData={salesLineData}
            lineCategories={lineCategories}
            lineyAxisTitle={lineyAxisTitle}
          />
        </div>
      </div>
    </div>
  );
};

export default AllPageStartOverviewPage;
