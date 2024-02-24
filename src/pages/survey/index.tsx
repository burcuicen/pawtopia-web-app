import React, {  useState } from 'react';
import PStepper from 'src/components/p-stepper';

const SurveyPage: React.FC = () => {
    const totalSteps = 5;
  const [activeStep, setActiveStep] = useState(1);

  const handleStepChange = (step:number) => {
    setActiveStep(step);
  };

    return (
        <div className="page page__survey">
             <PStepper
        steps={totalSteps}
        activeStep={activeStep}
        onStepChange={handleStepChange}
      />
        </div>
    );
};

export default SurveyPage;
