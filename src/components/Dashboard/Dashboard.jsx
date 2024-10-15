import React, { useEffect, useState } from "react";
import DashboardCard from "./DashboardCard";
import FormSubmitHandler from "../FormSubmitHandler";
import NeedHelpPage from "../NeedHelp";
const chart = {
    series: [
        {
            name: "Product One",
            data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 45],
        },
        {
            name: "Product Two",
            data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 51],
        },
    ],
    xaxis: {
        type: "category",
        categories: [
            "Sep",
            "Oct",
            "Nov",
            "Dec",
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
        ],
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    yaxis: {
        title: {
            style: {
                fontSize: "0px",
            },
        },
        min: 0,
        max: 100,
    },
};

const Dashboard = () => {
    const [userData, setUserData] = useState(null);

    const [priorityCount, setPriorityCount] = useState({});
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const resultOfLevelOneQuestionList = await FormSubmitHandler({
                    method: "get",
                    url: "level1/question/list",
                });
                // console.log(
                //   "resultOfLevelOneQuestionList",
                //   resultOfLevelOneQuestionList
                // );
                if (resultOfLevelOneQuestionList.data) {
                    setUserData(resultOfLevelOneQuestionList.data);
                    const responseData = resultOfLevelOneQuestionList.data;
                    const count = responseData.reduce((acc, item) => {
                        acc[item.priority] = (acc[item.priority] || 0) + 1;
                        return acc;
                    }, {});

                    setPriorityCount(count);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <React.Fragment>
            <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
                <DashboardCard
                    cardTitle="People"
                    cardProcess={false}
                    color="bg-cyan-200"
                    cardTextDesc="2 out of 11 suggestions has been implemented"
                    cardUrl="people-problem"
                    chart={chart}
                    priorityCount={priorityCount}
                />
                {/* <DashboardCard
          cardTitle="Product"
          color="bg-amber-200"
          cardProcess = {false}
          cardTextDesc="1 out of 11 suggestions has been implemented"
          chart={chart}
        />
          chart={chart}
        />
        <DashboardCard
          cardTitle="Promotion"
          color="bg-green-300"
          cardProcess = {false}
          cardTextDesc="2 out of 8 suggestions has been implemented"
          chart={chart}
        /> */}
            </div>
    <NeedHelpPage/>

        </React.Fragment>
    );
};

export default Dashboard;
