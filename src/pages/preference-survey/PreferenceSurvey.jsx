import React, { useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import Checkbox from "../../components/higherOrderComponent/Checkboxes/Checkbox";
import { useNavigate } from "react-router-dom";

const PreferenceSurvey = () => {
  const navigate = useNavigate();

  const [checkedItems, setCheckedItems] = useState({
    category: {
      consumer_goods: false,
      technology: false,
      fashion_and_apparel: false,
      health_and_wellness: false,
      food_and_beverages: false,
      travel_and_hospitality: false,
    },
    email_marketing: {
      very_valuable: false,
      moderately_valuable: false,
      not_very_valuable: false,
      not_valuable_at_all: false,
    },
    industry: {
      personal_interest: false,
      growth_potential: false,
      market_demand: false,
      previous_experience: false,
      profitability: false,
    },
    influence_industry: {
      manual_observation_by_staff: false,
      loyalty_program_data: false,
      point_of_sale_system_data: false,
      customer_feedback_forms: false,
    },
  });

  const handleChange = (category, key) => {
    setCheckedItems((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: !prev[category][key],
      },
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Checked Items:", checkedItems);
    navigate('/dashboard');
  };

  return (
    <>
      <Breadcrumb pageName="Preference Survey" breadcrumb={false} />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm  bg-white   dark:bg-boxdark">
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <div className="flex flex-col gap-9 ">
                      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                          <h3 className="font-medium text-black dark:text-white">
                            Which category best describes the market segment you
                            wish target with your products/services?
                          </h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5">
                          {Object.keys(checkedItems.category).map((key) => (
                            <Checkbox
                              key={key}
                              label={key.replace(/_/g, " ")}
                              checked={checkedItems.category[key]}
                              onChange={() => handleChange("category", key)}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full xl:w-1/2">
                    <div className="flex flex-col gap-9 ">
                      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                          <h3 className="font-medium text-black dark:text-white">
                            How valuable do you perceive email marketing
                            campaign for engaging with your audience ?
                          </h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5">
                          {Object.keys(checkedItems.email_marketing).map(
                            (key) => (
                              <Checkbox
                                key={key}
                                label={key.replace(/_/g, " ")}
                                checked={checkedItems.email_marketing[key]}
                                onChange={() =>
                                  handleChange("email_marketing", key)
                                }
                              />
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <div className="flex flex-col gap-9">
                      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                          <h3 className="font-medium text-black dark:text-white">
                            What factors influence your preference for the
                            selected industry?
                          </h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5">
                          {Object.keys(checkedItems.industry).map((key) => (
                            <Checkbox
                              key={key}
                              label={key.replace(/_/g, " ")}
                              checked={checkedItems.industry[key]}
                              onChange={() => handleChange("industry", key)}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full xl:w-1/2">
                    <div className="flex flex-col gap-9">
                      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                          <h3 className="font-medium text-black dark:text-white">
                          What factors influence your preference for the selected industry?
                          </h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5">
                          {Object.keys(checkedItems.influence_industry).map(
                            (key) => (
                              <Checkbox
                                key={key}
                                label={key.replace(/_/g, " ")}
                                checked={checkedItems.influence_industry[key]}
                                onChange={() =>
                                  handleChange("influence_industry", key)
                                }
                              />
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="flex justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PreferenceSurvey;
