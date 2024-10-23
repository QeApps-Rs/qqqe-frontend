import React, { useEffect, useState } from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import GeneralInfo from "../components/settings/GeneralInfo";
import Account from "../components/settings/Account";
import FormSubmitHandler from "../components/FormSubmitHandler";
import "react-tabs/style/react-tabs.css";
import PreferenceSurvey from "./preference-survey/PreferenceSurvey";

const SettingsPage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const result = await FormSubmitHandler({
          method: "get",
          url: "user",
        });
        if (result.data) {
          setUserData(result.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl mb-4">Settings</h1>
        <Tabs>
          <TabList>
            <Tab>General Information</Tab>
            <Tab>Account</Tab>
            <Tab>Preference Survey</Tab>
          </TabList>

          <TabPanel>
            <GeneralInfo userData={userData} />
          </TabPanel>
          <TabPanel>
            <Account userData={userData} />
          </TabPanel>
          <TabPanel>
            <PreferenceSurvey isTitleDisplay={false} />
          </TabPanel>
          <TabPanel>
            <PreferenceSurvey
              isTitleDisplay={false}
              theme={{
                backgroundColor: "bg-blue-500", // New background color
                textColor: "text-black", // New text color
                buttonColor: "bg-green-600", // New button color
                buttonTextColor: "text-yellow-200", // New button text color
              }}
            />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default SettingsPage;
