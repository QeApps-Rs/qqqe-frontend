/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import Checkbox from "../../components/higherOrderComponent/Checkboxes/Checkbox";
import { useNavigate } from "react-router-dom";
import FormSubmitHandler from "../../components/FormSubmitHandler";
import toast from "react-hot-toast";
import Loader from "../../common/Loader/index.jsx";
import welcomeImg from "../../images/welcome.png";

const PreferenceSurvey = ({
  isTitleDisplay = true,
  theme = {
    backgroundColor: "bg-blue-700",
    textColor: "text-white",
    buttonColor: "bg-green-700",
    buttonTextColor: "text-white",
  },
}) => {
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
        <Breadcrumb pageName={"Preference Survey"} breadcrumb={false} />
      )}
      <div className="p-10 h-full">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 ">
          <div className="col-span-1 inline-flex justify-end">
            <img src={welcomeImg} alt="welcome-img" className="w-80 h-70" />
          </div>

          <div className="col-span-3 ">
            {currentStep === 0 && (
              <div className={`mb-8 ${theme.textColor} font-bold text-2xl`}>
                Great, iet's get started!
              </div>
            )}
            {checkedItems && checkedItems.length > 0 && (
              <form onSubmit={handleSubmit} className="relative">
                {/* Render only the current question */}

                <h3 className={`text-3xl ${theme.textColor} font-bold`}>
                  {checkedItems[currentStep].question}
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mt-15">
                  {checkedItems[currentStep].answers.map((answer) => (
                    <div
                      className="col-span-2 bg-white p-7 rounded-lg"
                      key={answer.id}
                    >
                      <Checkbox
                        key={answer.id}
                        id={answer.id}
                        label={answer.answer.replace(/_/g, " ")}
                        checked={isChecked(
                          checkedItems[currentStep].id,
                          answer.id
                        )}
                        onChange={() =>
                          handleChange(checkedItems[currentStep].id, answer.id)
                        }
                      />
                    </div>
                  ))}
                </div>

                {/* Next and Previous Buttons */}
                <div className="flex justify-between mt-6 lg:fixed bottom-8 left-18  right-18">
                  <button
                    type="button"
                    className={`${
                      currentStep === 0 ? "opacity-50" : theme.buttonColor
                    } ${theme.buttonTextColor} px-4 py-2 rounded`}
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                  >
                    Previous
                  </button>

                  {currentStep === checkedItems.length - 1 ? (
                    <button
                      type="submit"
                      className={`${theme.buttonColor} ${theme.buttonTextColor} px-4 py-2 rounded font-semibold`}
                    >
                      Submit
                    </button>
                  ) : (
                    <button
                      type="button"
                      className={`${theme.backgroundColor} ${theme.buttonTextColor} px-4 py-2 rounded font-semibold`}
                      onClick={handleNext}
                    >
                      Next
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PreferenceSurvey;
