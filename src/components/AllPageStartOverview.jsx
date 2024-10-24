import { Link } from "react-router-dom";
import peopleImg from "/src/images/people.png";
import SalesLineGraph from "./Campaigns/Graphs/SalesLineGraph";

const AllPageStartOverviewPage = () => {
  const salesLineData = [10, 41, 35, 51, 49, 62, 69, 91, 148];
  const lineCategories = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
  ];
  const lineyAxisTitle = "Sales Amount";
  return (
    <div className="bg-[#000000] rounded-md px-6 py-4 animate-fadeIn">
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5 items-center">
        <div className="col-span-6 border-r-2 border-dashed border-white">
          <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
            <div className="col-span-5 ">
              <img
                src={peopleImg}
                alt="people image"
                className="max-w-full rounded-lg shadow-lg transition-transform transform hover:scale-105"
              />
            </div>
            <div className="col-span-7 ">
              <div className="flex items-center">
                <Link to={"/people-problem"}>
                  <h1 className="flex items-center text-4xl leading-normal font-bold text-white hover:text-blue-400 transition-colors duration-300 transform hover:scale-105">
                    <i className="mr-3 fa fa-home bg-[#4680ff] hover:bg-[#60a5fa] text-white p-1 rounded-full h-6 w-6 flex items-center justify-center text-lg"></i>{" "}
                    People
                  </h1>
                </Link>
                <span className="ml-3 text-sm font-bold py-2 px-4 rounded bg-green-600 text-white">
                  14 Suggestions
                </span>
              </div>

              <p className="text-md font-normal text-white leading-relaxed mt-3">
                Analyze customers data, including demographics,Analyze customers
                data, including demographics,Analyze customers data, including
                demographics,Analyze customers data, including demographics,
              </p>
              <div className="flex mt-6 space-x-3">
                <span className="flex items-center text-sm font-semibold py-2 px-4 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 shadow-sm transition-all duration-300">
                  <i className="fa fa-exclamation-circle mr-2"></i> Critical (2)
                </span>
                <span className="flex items-center text-sm font-semibold py-2 px-4 rounded-lg bg-yellow-100 text-yellow-700 hover:bg-yellow-200 shadow-sm transition-all duration-300">
                  <i className="fa fa-exclamation-triangle mr-2"></i> Minor (2)
                </span>
                <span className="flex items-center text-sm font-semibold py-2 px-4 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 shadow-sm transition-all duration-300">
                  <i className="fa fa-check-circle mr-2"></i> Average (2)
                </span>
              </div>
              <div className="flex items-center mt-6 gap-4">
                <Link to={"/people-problem"} className="block ">
                  <button className="block min-h-[60px] p-4 font-bold bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 transition-colors duration-300 hover:shadow-xl transform hover:scale-105">
                    <i
                      className="mr-2 fa fa-lg fa-external-link-square ml-1"
                      aria-hidden="true"
                    />
                    Get Started
                  </button>
                </Link>
                <button className="block p-4 font-bold bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 transition-colors duration-300 hover:shadow-xl transform hover:scale-105">
                  <i
                    className="fa fa-headphones mr-2 text-xl"
                    aria-hidden="true"
                  ></i>
                  Talk to our Expert{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-6">
          {/* <div className="block border-b-2 border-dashed border-white py-4">
                    <h2 className="text-md font-semibold text-blue-400 cursor-pointer inline-block dark:text-white leading-normal transition-transform transform hover:scale-105">
                      Browse templates {">"}
                    </h2>
                    <span className="block mt-2 text-md text-bodydark1">
                      Browse 300+ pre-built templates for different business
                      goals.
                    </span>
                  </div>
                  <div className="block border-b-2 border-dashed border-white py-4">
                    <h2 className="text-md font-semibold text-blue-400 cursor-pointer inline-block dark:text-white leading-normal transition-transform transform hover:scale-105">
                      Optimize your website {">"}
                    </h2>
                    <span className="block mt-2 text-md text-bodydark1">
                      Run A/B tests, personalize, etc.
                    </span>
                  </div>
                  <div className="block py-4">
                    <h2 className="text-md font-semibold text-blue-400 cursor-pointer inline-block dark:text-white leading-normal transition-transform transform hover:scale-105">
                      Browse tactic library {">"}
                    </h2>
                    <span className="block mt-2 text-md text-bodydark1">
                      Not sure? Get inspired by 50+ tactics.
                    </span>
                  </div> */}
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
