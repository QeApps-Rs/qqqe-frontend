/* eslint-disable react/prop-types */
import Checkbox from "../../components/higherOrderComponent/Checkboxes/Checkbox";
import DropDown from "../../components/higherOrderComponent/Dropdown/Dropdown";
import Radio from "../../components/higherOrderComponent/Radios/Radio";
import {
  deviceOptions,
  timingOptions,
  visitorsDropdown,
} from "./masterFormConfig";

const TargetingAndBehaviorControlComponent = ({
  targetingAndBehaviour,
  setTargetingAndBehaviour,
}) => {
  const handleTargetingAndBehaviourState = (key, value) => {
    const keys = key.split(".");
    setTargetingAndBehaviour((prevState) => {
      let newState = { ...prevState };

      let temp = newState;

      for (let i = 0; i < keys.length - 1; i++) {
        temp = temp[keys[i]];
      }

      temp[keys[keys.length - 1]] = value;
      return newState;
    });
  };

  return (
    <>
      <div className="col-span-12 xl:col-span-12">
        <div className="p-4 border-t">
          <div className=" bg-white">
            <div className="mb-4 border-b border-black border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark rounded-lg">
              <div className="mb-8 p-3">
                <div className="mb-4 border-b border-black pb-5">
                  <label className="mb-2.5 block text-lg font-semibold">
                    Timing
                  </label>
                  <Radio
                    jsonData={timingOptions}
                    onChange={(value) =>
                      handleTargetingAndBehaviourState(
                        "display.timing.type",
                        value
                      )
                    }
                    defaultValue={targetingAndBehaviour?.display?.timing?.type}
                  />
                  {targetingAndBehaviour?.display?.timing?.type ==
                    "on_rules" && (
                    <div className="mb-4 mt-3">
                      <div className="text-sm font-semibold">
                        Select the rules
                      </div>
                      <div className="mb-4.5 mt-3">
                        <Checkbox
                          key={1}
                          label="When visitor is exiting the page"
                          checked={
                            targetingAndBehaviour?.display?.timing?.settings
                              ?.existing_page?.is_selected
                          }
                          onChange={() =>
                            handleTargetingAndBehaviourState(
                              "display.timing.settings.existing_page.is_selected",
                              !targetingAndBehaviour?.display?.timing?.settings
                                ?.existing_page?.is_selected
                            )
                          }
                        />
                      </div>
                      <div className="mb-4.5">
                        <Checkbox
                          key={2}
                          label="After time delay"
                          checked={
                            targetingAndBehaviour?.display?.timing?.settings
                              ?.after_delay_time?.is_selected
                          }
                          onChange={() =>
                            handleTargetingAndBehaviourState(
                              "display.timing.settings.after_delay_time.is_selected",
                              !targetingAndBehaviour?.display?.timing?.settings
                                ?.after_delay_time?.is_selected
                            )
                          }
                        />
                        {targetingAndBehaviour?.display?.timing?.settings
                          ?.after_delay_time.is_selected && (
                          <div className="ml-9">
                            <div>Show again after</div>
                            <input
                              type="number"
                              value={
                                targetingAndBehaviour?.display?.timing?.settings
                                  ?.after_delay_time?.value
                                  ? targetingAndBehaviour?.display?.timing
                                      ?.settings?.after_delay_time?.value
                                  : 0
                              }
                              onChange={(e) =>
                                handleTargetingAndBehaviourState(
                                  "display.timing.settings.after_delay_time.value",
                                  e.target.value
                                )
                              }
                              className="mt-2 w-25 border border-gray-300 rounded p-1 text-center"
                              placeholder="seconds"
                            />
                          </div>
                        )}
                      </div>
                      <div className="mb-4.5">
                        <Checkbox
                          key={3}
                          label="After visitor has scrolled a certain amount"
                          checked={
                            targetingAndBehaviour?.display?.timing?.settings
                              ?.after_scroll_distance?.is_selected
                          }
                          onChange={() =>
                            handleTargetingAndBehaviourState(
                              "display.timing.settings.after_scroll_distance.is_selected",
                              !targetingAndBehaviour?.display?.timing?.settings
                                ?.after_scroll_distance?.is_selected
                            )
                          }
                        />
                        {targetingAndBehaviour?.display?.timing?.settings
                          ?.after_scroll_distance.is_selected && (
                          <div className="ml-9">
                            <div>Scroll distance</div>
                            <input
                              type="number"
                              value={
                                targetingAndBehaviour?.display?.timing?.settings
                                  ?.after_scroll_distance?.value
                              }
                              onChange={(e) =>
                                handleTargetingAndBehaviourState(
                                  "display.timing.settings.after_scroll_distance.value",
                                  e.target.value
                                )
                              }
                              className="mt-2 w-25 border border-gray-300 rounded p-1 text-center"
                              placeholder="%"
                            />
                          </div>
                        )}
                      </div>
                      <div className="mb-4.5">
                        <Checkbox
                          key={4}
                          label="After visitor sees a certain number of pages"
                          checked={
                            targetingAndBehaviour?.display?.timing?.settings
                              ?.after_pages_visit?.is_selected
                          }
                          onChange={() =>
                            handleTargetingAndBehaviourState(
                              "display.timing.settings.after_pages_visit.is_selected",
                              !targetingAndBehaviour?.display?.timing?.settings
                                ?.after_pages_visit?.is_selected
                            )
                          }
                        />
                        {targetingAndBehaviour?.display?.timing?.settings
                          ?.after_pages_visit.is_selected && (
                          <div className="ml-9">
                            <div>After</div>
                            <input
                              type="number"
                              value={
                                targetingAndBehaviour?.display?.timing?.settings
                                  ?.after_pages_visit?.value
                              }
                              onChange={(e) =>
                                handleTargetingAndBehaviourState(
                                  "display.timing.settings.after_pages_visit.value",
                                  e.target.value
                                )
                              }
                              className="mt-2 w-25 border border-gray-300 rounded p-1 text-center"
                              placeholder="pages"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mb-4 border-b border-black">
                  <h3 className="text-lg font-semibold">Frequency</h3>
                  <div className="flex items-center mt-3">
                    <div className="text-black">
                      After a visitor closes this form, show again after{" "}
                    </div>
                  </div>
                  <input
                    type="number"
                    value={
                      targetingAndBehaviour?.display?.frequency?.after_show_days
                    }
                    onChange={(e) =>
                      handleTargetingAndBehaviourState(
                        "display.frequency.after_show_days",
                        e.target.value
                      )
                    }
                    className="mt-2 w-25 border border-gray-300 rounded p-1 text-center"
                    placeholder="5 days"
                  />
                  <span className="ml-2">days</span>
                  <div className="mb-4.5 mt-6">
                    <Checkbox
                      key={"abc"}
                      label="Don’t show again if form was submitted or if go to URL button was clicked"
                      checked={
                        targetingAndBehaviour?.display?.frequency?.validation
                      }
                      onChange={() =>
                        handleTargetingAndBehaviourState(
                          "display.frequency.validation",
                          !targetingAndBehaviour?.display?.frequency?.validation
                        )
                      }
                    />
                  </div>
                </div>

                <div className="mb-4 border-b border-black pb-5">
                  <label className="mb-2.5 block text-lg font-semibold">
                    Devices
                  </label>
                  <Radio
                    jsonData={deviceOptions}
                    onChange={(value) =>
                      handleTargetingAndBehaviourState(
                        "display.devices.display_on",
                        value
                      )
                    }
                    defaultValue={
                      targetingAndBehaviour?.display?.devices?.display_on
                    }
                  />
                </div>
                <div className="mb-4 border-b border-black">
                  <div className="text-lg font-semibold">
                    Click outside form to close
                  </div>
                  <span className="text-sm font-medium">
                    Select all that apply.
                  </span>
                  <div className="mb-4.5 mt-6">
                    <Checkbox
                      key={2}
                      label="On desktop"
                      checked={
                        targetingAndBehaviour?.display?.devices
                          ?.click_outside_close?.on_desktop
                      }
                      onChange={() =>
                        handleTargetingAndBehaviourState(
                          "display.devices.click_outside_close.on_desktop",
                          !targetingAndBehaviour?.display?.devices
                            ?.click_outside_close?.on_desktop
                        )
                      }
                    />
                  </div>
                  <div className="mb-4.5">
                    <Checkbox
                      key={3}
                      label="On mobile"
                      checked={
                        targetingAndBehaviour?.display?.devices
                          ?.click_outside_close?.on_mobile
                      }
                      onChange={() =>
                        handleTargetingAndBehaviourState(
                          "display.devices.click_outside_close.on_mobile",
                          !targetingAndBehaviour?.display?.devices
                            ?.click_outside_close?.on_mobile
                        )
                      }
                    />
                  </div>
                </div>

                <div className="mb-4 border-b border-black">
                  <label className="mb-2.5 block text-lg ">
                    <div className="mb-6">
                      <DropDown
                        jsonData={{
                          ...visitorsDropdown,
                          onChange: (value) =>
                            handleTargetingAndBehaviourState(
                              "targeting.visitors",
                              value
                            ),
                          defaultValue:
                            targetingAndBehaviour?.targeting?.visitors,
                        }}
                      />
                    </div>
                  </label>
                </div>

                {/* BEFORE CODE REMOVED, NEED TO TALK WITH RISHABH */}
                {/* <div className="mb-4 border-b border-black">
                  <h3 className="text-lg font-semibold">URLS</h3>
                  <div className="mb-4.5 mt-6">
                    <Checkbox
                      key={2}
                      label="Only show on certain URLs"
                      checked={showUrl}
                      onChange={() => setURL(!showUrl)}
                    />
                  </div>
                  <div className="mb-4.5">
                    <Checkbox
                      key={3}
                      label="Don’t show on certain URLs"
                      checked={notShowUrl}
                      onChange={() => setNotShow(!notShowUrl)}
                    />
                  </div>
                </div> */}

                <div className="mb-4 border-b border-black">
                  <h3 className="text-lg font-semibold">Location</h3>
                  <div className="flex items-center mt-3">
                    <div className="text-black font-medium">
                      Based on visitors IP address
                    </div>
                  </div>
                  <div className="mb-4.5 mt-6">
                    <Checkbox
                      key={2}
                      label="Show to visitors in certain locations"
                      checked={
                        targetingAndBehaviour?.targeting?.locations
                          ?.show_visitors_certain_locations?.is_selected
                      }
                      onChange={() =>
                        handleTargetingAndBehaviourState(
                          "targeting.locations.show_visitors_certain_locations.is_selected",
                          !targetingAndBehaviour?.targeting?.locations
                            ?.show_visitors_certain_locations?.is_selected
                        )
                      }
                    />
                    {targetingAndBehaviour?.targeting?.locations
                      ?.show_visitors_certain_locations?.is_selected && (
                      <input
                        type="text"
                        placeholder="Please enter locations, separated by commas"
                        className="w-full p-2 border rounded-md focus:outline-none mt-2"
                        value={
                          targetingAndBehaviour?.targeting?.locations
                            ?.show_visitors_certain_locations?.location
                        }
                        onChange={(e) =>
                          handleTargetingAndBehaviourState(
                            "targeting.locations.show_visitors_certain_locations.location",
                            e.target.value
                          )
                        }
                      />
                    )}
                  </div>
                  <div className="mb-4.5">
                    <Checkbox
                      key={3}
                      label="Don’t show to visitors in certain locations"
                      checked={
                        targetingAndBehaviour?.targeting?.locations
                          ?.not_show_visitors_certain_locations?.is_selected
                      }
                      onChange={() =>
                        handleTargetingAndBehaviourState(
                          "targeting.locations.not_show_visitors_certain_locations.is_selected",
                          !targetingAndBehaviour?.targeting?.locations
                            ?.not_show_visitors_certain_locations?.is_selected
                        )
                      }
                    />
                    {targetingAndBehaviour?.targeting?.locations
                      ?.not_show_visitors_certain_locations?.is_selected && (
                      <input
                        type="text"
                        placeholder="Please enter locations, separated by commas"
                        className="w-full p-2 border rounded-md focus:outline-none mt-2"
                        value={
                          targetingAndBehaviour?.targeting?.locations
                            ?.not_show_visitors_certain_locations?.location
                        }
                        onChange={(e) =>
                          handleTargetingAndBehaviourState(
                            "targeting.locations.not_show_visitors_certain_locations.location",
                            e.target.value
                          )
                        }
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default TargetingAndBehaviorControlComponent;
