import { useEffect, useState } from "react";
import BookSlotModal from "../BookSlot";
import StartAppOverviewPage from "../StartAppOverview";
import FormSubmitHandler from "../FormSubmitHandler";
import toast from "react-hot-toast";
import Loader from "../../common/Loader";

const AppDashboardPage = () => {
  const categories = [
    {
      title: "People",
      url: "/people-dashboard",
    },
    {
      title: "Product",
      url: "/product-dashboard",
    },
    {
      title: "Price",
      url: "/price-dashboard",
    },
    {
      title: "Promotion",
      url: "/promotion-dashboard",
    },
  ];
  const [showIframe, setShowIframe] = useState(true);
  const [priorityCount, setPriorityCount] = useState({});
  const [loading, setLoading] = useState(false);

  const handlePageClick = () => {
    setShowIframe(false);
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  useEffect(() => {
    if (screen.width <= 640) {
      setShowIframe(false); // Hide iframe on small screens
    }

    const getDashboardCount = async () => {
      setLoading(true);
      await FormSubmitHandler({
        method: "get",
        url: "level1/question/list",
      })
        .then((res) => {
          if (res.data) {
            const responseData = res.data;
            const count = responseData.reduce((acc, item) => {
              const category = item?.category?.toLowerCase();
              const priority = item?.priority?.toLowerCase();
              if (!acc[category]) {
                acc[category] = { count: 0 };
              }
              acc[category].count += 1;
              acc[category][priority] = (acc[category][priority] || 0) + 1;
              return acc;
            }, {});
            setPriorityCount(count);
          }
        })
        .catch((err) => {
          toast.error(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    getDashboardCount();
  }, []);

  return (
    <>
      {loading && <Loader />}
      {showIframe ? (
        <BookSlotModal handlePageClick={handlePageClick} />
      ) : (
        <div className="w-full">
          {/* <div className="bg-[url('/src/images/purple-bg.jpg')] bg-no-repeat bg-cover sm:hidden mb-4 rounded-md p-2">
            <img src={qqqeLogo} alt="logo" style={{ height: "70px" }} />
          </div> */}
          <div className="grid grid-cols-12 gap-4">
            {categories.map((category) => (
              <div className="lg:col-span-6 col-span-12" key={category.title}>
                <StartAppOverviewPage
                  title={category.title}
                  url={category.url}
                  priorityCount={priorityCount[category.title.toLowerCase()]}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AppDashboardPage;
