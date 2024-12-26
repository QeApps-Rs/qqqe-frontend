/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.min.css";
import { Link, useLocation } from "react-router-dom";
import Loader from "../common/Loader";
import FormSubmitHandler from "../components/FormSubmitHandler";
import { BackIcon } from "../components/custIcon/svgIcon";
import AllPageStartOverviewPage from "../components/AllPageStartOverview";
import toast from "react-hot-toast";
import Support from "../components/Support/Support";

const PromotionPage = () => {
  const location = useLocation();
  const { priorityCount } = location.state || {};
  const [promotionPriorityCount, setPromotionPriorityCount] =
    useState(priorityCount);

  const category = {
    title: "Promotion",
    url: "/problem-statement?category=promotion",
  };

  const [loading, setLoading] = useState(false);

  // Fetch all data
  useEffect(() => {
    const getDashboardCount = async () => {
      setLoading(true);
      await FormSubmitHandler({
        method: "get",
        url: "level1/question/list?category=promotion",
      })
        .then((res) => {
          if (res?.data) {
            const responseData = res?.data;
            const promotionCount = responseData?.reduce((acc, item) => {
              const priority = item?.priority?.toLowerCase();
              acc["count"] = (acc["count"] || 0) + 1;
              acc[priority] = (acc[priority] || 0) + 1;
              return acc;
            }, {});
            setPromotionPriorityCount(promotionCount);
          }
        })
        .catch((err) => {
          toast.error(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    if (promotionPriorityCount == undefined) {
      getDashboardCount();
    }
  }, []);

  return (
    <>
      {loading && <Loader />}

      <main className="main-content todo-app w-full px-[var(--margin-x)] pb-8">
        <ScrollAnimation
          animateIn="animate__fadeInUp"
          animateOut="animate__fadeOut"
          duration={1}
          delay={300}
          offset={100}
          animateOnce={true}
        >
          <div className="w-full sm:hidden flex justify-end mb-2">
            <Link to={"/app-dashboard"}>
              <button
                type="button"
                className="w-auto flex items-center gap-x-1 cursor-pointer bg-white border border-gray-300 pt-1.5 pb-1.5 pl-2.5 pr-2.5 text-[15px] rounded-md hover:bg-black hover:text-white transition-colors duration-300"
              >
                <BackIcon /> Back
              </button>
            </Link>
          </div>
          <AllPageStartOverviewPage
            category={category}
            priorityCount={promotionPriorityCount}
          />
        </ScrollAnimation>
      </main>
      <Support />
    </>
  );
};

export default PromotionPage;
