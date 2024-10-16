import { useState, useEffect } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import Checkbox from "../../components/higherOrderComponent/Checkboxes/Checkbox";
import { useNavigate } from "react-router-dom";
import FormSubmitHandler from "../../components/FormSubmitHandler";
import toast from "react-hot-toast";
import Loader from "../../common/Loader/index.jsx";
import welcomeImg from "../../images/welcome.png";

const PreferenceSurveyTwo = ({ isTitleDisplay = true }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentStep, setCurrentStep] = useState(0); // Step state for stepper
  const [questionsPerStep] = useState(2); // Number of questions per step

  // Fetch preference list
  const listPreferenceList = async () => {
    setLoading(true);
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
          setAnswers(tmp);
        });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    storePreference();
  };

  useEffect(() => {
    listPreferenceList();
  }, []);

  // Stepper handlers
  const handleNext = (e) => {
    e.preventDefault();
    if (currentStep < Math.ceil(checkedItems.length / questionsPerStep) - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Slice questions for the current step
  const currentQuestions = checkedItems.slice(
    currentStep * questionsPerStep,
    (currentStep + 1) * questionsPerStep
  );

  return (
    <>
      {loading && <Loader />}

      {isTitleDisplay && (
        <Breadcrumb pageName="Preference Survey Multi" breadcrumb={false} />
      )}
      <div className="p-6 h-full">
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-8 ">
          <div className="col-span-1 inline-flex justify-end xl:block hidden">
            <img src={welcomeImg} alt="welcome-img" className="w-80 h-70" />
          </div>
          <div className="col-span-3 ">
            {currentStep === 0 && (
              <div className="mb-8 text-white font-bold text-2xl">
                Great, iet's get started!
              </div>
            )}

            {checkedItems && checkedItems.length > 0 && (
              <form onSubmit={handleSubmit} className="relative">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-18 mb-4.5">
                  {currentQuestions.map((question) => (
                    <div className="col-span-2 " key={question.id}>
                      <h3 className="text-3xl text-white font-bold max-h-25 min-h-25">
                        {question.question}
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-2 gap-12 mt-15 ">
                        {" "}
                        {question.answers.map((answer) => (
                          <div
                            className="col-span-1 bg-white p-7 rounded-lg"
                            key={answer.id}
                          >
                            <Checkbox
                              key={answer.id}
                              id={answer.id}
                              label={answer.answer.replace(/_/g, " ")}
                              checked={isChecked(question.id, answer.id)}
                              onChange={() =>
                                handleChange(question.id, answer.id)
                              }
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-6 lg:fixed bottom-8 left-18  right-18">
                  <button
                    type="button"
                    className="bg-gray-300 px-4 py-2 rounded"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                  >
                    Previous
                  </button>
                  {currentStep ===
                  Math.ceil(checkedItems.length / questionsPerStep) - 1 ? (
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded"
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
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PreferenceSurveyTwo;
