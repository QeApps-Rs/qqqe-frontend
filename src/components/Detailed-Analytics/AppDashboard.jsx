import StartAppOverviewPage from "../StartAppOverview";
import qqqeLogo from "/src/images/favicon.png";
const AppDashboardPage = () => {
  return (
    <div className="w-full mb-20">
      <div className="bg-[url('/src/images/purple-bg.jpg')] bg-no-repeat bg-cover md:hidden mb-4 rounded-md p-2">
        <img src={qqqeLogo} alt="logo" style={{ height: "70px" }} />
      </div>
      <div className="grid grid-cols-12 gap-8 ">
        <div className="lg:col-span-6 col-span-12">
          <StartAppOverviewPage title="People" url="/dashboard" />
        </div>
        <div className="lg:col-span-6 col-span-12">
          <StartAppOverviewPage title="Product" url="/product-dashboard" />
        </div>
        <div className="lg:col-span-6 col-span-12">
          <StartAppOverviewPage title="Prices(Sales)" url="/price-dashboard" />
        </div>
        <div className="lg:col-span-6 col-span-12">
          <StartAppOverviewPage title="Promotion" url="/promotion-dashboard" />
        </div>
      </div>
    </div>
  );
};

export default AppDashboardPage;
