import ChartOne from "../Charts/ChartOne";
import { Link } from "react-router-dom";

const DashboardCard = ({
  cardTitle,
  color,
  cardTextDesc,
  cardProcess,
  cardUrl,
  chart,
  priorityCount,
}) => {
  const totalSuggestionCount =
    priorityCount?.Critical + priorityCount?.Average + priorityCount?.Minor;
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
      <div className="badge space-x-2 rounded-full float-right -mt-5">
        <div className="flex flex-row p-1">
          <div className="badge h-5 w-5 rounded-full flex items-center justify-center bg-red-500 text-white">
            <span>{priorityCount?.Critical ?? 0}</span>
          </div>
          <div className="badge h-5 w-5 rounded-full flex items-center justify-center bg-warning text-white">
            <span>{priorityCount?.Average ?? 0}</span>
          </div>
          <div className="badge h-5 w-5 rounded-full flex items-center justify-center bg-success text-white">
            <span>{priorityCount?.Minor ?? 0}</span>
          </div>
        </div>
      </div>
      <div className={`${color} ${cardProcess ? "h-56" : "h-30"}`}>
        <div className="mt-3 flex h-8 items-center justify-between px-4 sm:px-5">
          <h2 className="text-base font-medium text-slate-700 dark:text-navy-100">
            <Link
              to={"/" + cardUrl}
              className="border-current pb-0.5 font-medium outline-none transition-colors duration-300 hover:text-primary/70 focus:text-primary/70 dark:text-accent-light dark:hover:text-accent-light/70 dark:focus:text-accent-light/70"
            >
              {cardTitle}
              <i
                className="fa fa-lg fa-external-link-square ml-1"
                aria-hidden="true"
              />
            </Link>
          </h2>
          <div className="text-black font-bold space-x-2 text-slate-800">
            {totalSuggestionCount ?? 0} Suggestions
          </div>
        </div>
        <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5">
          Analyze customers data, including demographics, purchasing patterns
        </p>
        {cardProcess && (
          <p className="h-20 w-8/12 mx-32 border-gray-500 bg-white mt-5 text-black font-bold flex  items-center justify-between px-4 sm:px-5 text-center border border-gray-300 rounded-md">
            {cardTextDesc}
          </p>
        )}
      </div>
      <ChartOne chart={chart} />
    </div>
  );
};

export default DashboardCard;
