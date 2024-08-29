import React from 'react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import GeneralInfo from '../components/settings/GeneralInfo';
import Account from '../components/settings/Account';
import 'react-tabs/style/react-tabs.css';

const SettingsPage = () => {
  
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl mb-4">Settings</h1>
        <Tabs>
          <TabList>
            <Tab>General Information</Tab>
            {/* <Tab>Billing</Tab> */}
            <Tab>Account</Tab>
          </TabList>

          <TabPanel>
            <GeneralInfo/>
          </TabPanel>

          {/* <TabPanel>
              Billing info page
          </TabPanel> */}

          <TabPanel>
            <Account/>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default SettingsPage;
