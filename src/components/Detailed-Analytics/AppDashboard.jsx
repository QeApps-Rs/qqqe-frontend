import { useEffect, useState } from "react";
import BookSlotModal from "../BookSlot";
import StartAppOverviewPage from "../StartAppOverview";
import qqqeLogo from "/src/images/favicon.png";
const AppDashboardPage = () => {
  const [showIframe, setShowIframe] = useState(true);
  const handlePageClick = () => {
    setShowIframe(false); 
    window.scrollTo(0, 0); // Scroll to the top of the page

  };
  useEffect(() => {
    if (screen.width <= 640) {
      setShowIframe(false); // Hide iframe on small screens
    }
  }, []);
  return (
    <>
      {showIframe ? (
        <BookSlotModal handlePageClick={handlePageClick} />
      ) : (
        <div className="w-full mb-20">
          <div className="bg-[url('/src/images/purple-bg.jpg')] bg-no-repeat bg-cover sm:hidden mb-4 rounded-md p-2">
            <img src={qqqeLogo} alt="logo" style={{ height: "70px" }} />
          </div>
          <div className="grid grid-cols-12 gap-4 ">
            <div className="lg:col-span-6 col-span-12">
              <StartAppOverviewPage title="People" url="/people-dashboard" />
            </div>
            <div className="lg:col-span-6 col-span-12">
              <StartAppOverviewPage title="Product" url="/product-dashboard" />
            </div>
            <div className="lg:col-span-6 col-span-12">
              <StartAppOverviewPage title="Price" url="/price-dashboard" />
            </div>
            <div className="lg:col-span-6 col-span-12">
              <StartAppOverviewPage
                title="Promotion"
                url="/promotion-dashboard"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppDashboardPage;
