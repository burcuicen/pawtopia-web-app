import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { PAW_SEEKER_STEPS, PAW_GUARD_STEPS, OTHER_STEPS } from "./constants";

import PStepper from "src/components/p-stepper";
import SurveyCard from "./components/survey-card";

import "./styles.scss";

interface RegisterInfo {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  userType: string;
}

const SurveyPage: React.FC = () => {
  const navigate = useNavigate();

  const [steps, setSteps] = useState(PAW_SEEKER_STEPS);
  const totalSteps = steps.length;
  const [activeStep, setActiveStep] = useState(1);

  const [firstName, setFirstName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const registerInfo = JSON.parse(
      localStorage.getItem("registerInfo") as string
    ) as RegisterInfo;
    if (registerInfo?.firstName) setFirstName(registerInfo.firstName);
    else navigate("/signup");
  }, []);

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  const handlePrevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleNextStep = () => {
    if (activeStep < totalSteps) {
      setActiveStep(activeStep + 1);
    }
  };

  const [surveyData, setSurveyData] = useState({
    purpose: "",
    animalPreference: "",
    ageRange: 0,
    genderPreference: "",
    healthStatus: "",
    animalCareHistory: "",
    reason: "",
  });

  const setSelectionData = (field: string, data: string) => {
    setSurveyData({ ...surveyData, [field]: data });
  };

  useEffect(() => {
    switch (surveyData.purpose) {
      case "looking-pet":
        setSteps(PAW_SEEKER_STEPS);
        break;
      case "looking-guardian":
        setSteps(PAW_GUARD_STEPS);
        break;
      case "other":
        setSteps(OTHER_STEPS);
        break;
      default:
        break;
    }
  }, [surveyData.purpose]);

  const handleSurveySubmit = async () => {
    setIsLoading(true);
    console.log("Survey Data:", surveyData);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSuccess(true);
    } catch (error) {
      console.error("Error submitting survey:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page page__survey">
      {isLoading ? (
        <div className="loading-screen">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      ) : isSuccess ? (
        <div className="success-screen">
          <h2>Thank You for Your Paw-ticipation!</h2>
          <p>
            Hang tight while we fetch the purr-fect companions for you! You're
            just a whisker away from meeting your ideal paw friend.
          </p>
          <img
            src={require("../../assets/person-with-cat.svg").default}
            alt="Pawtopia"
          />
        </div>
      ) : (
        <div className="page__survey-heading">
          <PStepper
            steps={totalSteps}
            activeStep={activeStep}
            onStepChange={handleStepChange}
          />

          <div className="page__survey-title">Hello, {firstName}</div>
          <div className="page__survey-subtitle">
            Welcome to the Pawtopia family! Where paws and hearts meet. Let's
            get to know you a bit better!
          </div>
          <div className="page__survey-card">
            <SurveyCard
              cardData={steps[activeStep - 1]}
              setData={setSelectionData}
              selectedAnswers={surveyData}
              onPrev={handlePrevStep}
              onNext={
                activeStep === totalSteps ? handleSurveySubmit : handleNextStep
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SurveyPage;
