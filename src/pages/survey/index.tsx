import React, {  useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PAW_SEEKER_STEPS, PAW_GUARD_STEPS, OTHER_STEPS } from './constants';

import PStepper from 'src/components/p-stepper';
import SurveyCard from './components/survey-card';

import './styles.scss';

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

    const [firstName, setFirstName] = useState('');

    useEffect(() => {
        const registerInfo = JSON.parse(localStorage.getItem('registerInfo') as string) as RegisterInfo;
        if (registerInfo?.firstName) setFirstName(registerInfo.firstName);
        else navigate('/signup');
    }, []);
    

    const handleStepChange = (step:number) => {
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
        purpose: '',
        animalPreference: '',
        ageRange: '',
        genderPreference: '',
        healthStatus: '',
        animalCareHistory: '',
        reason: '',
    });
     const setSelectionData = (data: string) => {
        setSurveyData({ ...surveyData, [steps[activeStep - 1].questionField]: data });
    }
    useEffect(() => {
        switch(surveyData.purpose) {
            case 'looking-pet':
                setSteps(PAW_SEEKER_STEPS);
                break;
            case 'looking-guardian':
                setSteps(PAW_GUARD_STEPS);
                break;
            case 'other':
                setSteps(OTHER_STEPS);
                break;
            default:
                break;
        }
    }, [surveyData.purpose]);

    return (
        <div className="page page__survey">
            <div className='page__survey-heading'>
                <PStepper
                    steps={totalSteps}
                    activeStep={activeStep}
                    onStepChange={handleStepChange}
                />
                 <div className="page__survey-title">
                    Hello, {firstName}
                </div>
                <div className="page__survey-subtitle">
                    Welcome to the Pawtopia family! Where paws and hearts meet. Let's get to know you a bit better!
                </div>
                <div className="page__survey-card">
                    <SurveyCard cardData={steps[activeStep - 1]} setData={setSelectionData} selectedAnswer={surveyData[steps[activeStep - 1].questionField]}  onPrev={handlePrevStep} onNext={handleNextStep} />
                </div>
            </div>
        </div>
    );
};

export default SurveyPage;
