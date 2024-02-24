import React, {  useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PStepper from 'src/components/p-stepper';
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

    const totalSteps = 5;
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
            </div>
        </div>
    );
};

export default SurveyPage;
