/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import Checkbox from "../../components/higherOrderComponent/Checkboxes/Checkbox";
import { useNavigate } from "react-router-dom";
import FormSubmitHandler from "../../components/FormSubmitHandler";
import toast from "react-hot-toast";
import Loader from "../../common/Loader/index.jsx";

const PreferenceSurvey = ({ isTitleDisplay = true }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentStep, setCurrentStep] = useState(0); // Track current question

  const listPreferenceList = async () => {
    setLoading(false);
    await FormSubmitHandler({
      method: "get",
      url: "preference/list",
    })
      .then((res) => {
        toast.success(res.message);
        const data = res.data;
        setCheckedItems(data);

        let tmp = [];
        data.map((que) => {
          que.answers.map((ans) => {
            if (ans.is_checked) {
              tmp.push({
                preference_question_id: que.id,
                preference_answer_id: ans.id,
              });
            }
          });
        });
        setAnswers(tmp);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const storePreference = async () => {
    if (answers.length > 0) {
      setLoading(true);
      await FormSubmitHandler({
        method: "post",
        url: "preference/store",
        data: answers,
      })
        .then((res) => {
          toast.success(res.message);
          localStorage.setItem("setup-preference", true);
          navigate("/analytics");
        })
        .catch((err) => {
          toast.error(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      toast.error("You need to select at least one preference.");
    }
  };

  const handleChange = (qid, aid) => {
    if (!isChecked(qid, aid)) {
      setAnswers([
        ...answers,
        {
          preference_question_id: qid,
          preference_answer_id: aid,
        },
      ]);
    } else {
      const updatedAnswers = answers.filter(
        (answer) =>
          !(
            answer.preference_question_id === qid &&
            answer.preference_answer_id === aid
          )
      );
      setAnswers(updatedAnswers);
    }
  };

  const isChecked = (qid, aid) => {
    return answers.some(
      (answer) =>
        answer.preference_question_id === qid &&
        answer.preference_answer_id === aid
    );
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (currentStep < checkedItems.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    storePreference();
  };

  useEffect(() => {
    listPreferenceList();
  }, []);

  return (
    <>
      {loading && <Loader />}

      {isTitleDisplay && (
        <Breadcrumb pageName="Preference Survey" breadcrumb={false} />
      )}

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        {checkedItems && checkedItems.length > 0 && (
          <div className="flex flex-col gap-9">
            <div className="rounded-sm bg-white dark:bg-boxdark">
              <form onSubmit={handleSubmit}>
                <div className="p-6.5">
                  {/* Render only the current question */}
                  <div className="flex flex-col h-full">
                    <div className="flex flex-col h-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                          {checkedItems[currentStep].question}
                        </h3>
                      </div>
                      <div className="flex flex-col gap-5.5 p-6.5 flex-1">
                        {checkedItems[currentStep].answers.map((answer) => (
                          <Checkbox
                            key={answer.id}
                            id={answer.id}
                            label={answer.answer.replace(/_/g, " ")}
                            checked={isChecked(
                              checkedItems[currentStep].id,
                              answer.id
                            )}
                            onChange={() =>
                              handleChange(
                                checkedItems[currentStep].id,
                                answer.id
                              )
                            }
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Next and Previous Buttons */}
                  <div className="flex justify-between mt-6">
                    <button
                      type="button"
                      className={`bg-blue-500 text-white px-4 py-2 rounded ${
                        currentStep === 0 ? "opacity-50" : ""
                      }`}
                      onClick={handlePrevious}
                      disabled={currentStep === 0}
                    >
                      Previous
                    </button>

                    {currentStep === checkedItems.length - 1 ? (
                      <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded"
                      >
                        Submit
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={handleNext}
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PreferenceSurvey;
