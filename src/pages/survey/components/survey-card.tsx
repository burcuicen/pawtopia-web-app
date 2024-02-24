import React from 'react';
import PRadioButton from 'src/components/p-radio-button';
import BaseIcon from 'src/components/_base/base-icon';
import 'src/pages/survey/styles.scss';

interface SurveyCardProps {
    key: number;
    questionField: 'purpose' | 'animalPreference' | 'ageRange' | 'genderPreference' | 'healthStatus' | 'animalCareHistory';
    type: 'paw-seeker' | 'paw-guard' | 'other';
    description: string;
    question: string;
    options?: {key: string, label: string}[];
    customOptions?: {
        gender: {key: string, label: string}[];
        healthStatus: {key: string, label: string}[];
    };
    answerType: 'text'| 'radio'| 'custom' | 'dropdown';
}

interface SurveyPageProps {
    cardData: SurveyCardProps;
    setData?: (data: string) => void;
    selectedAnswer?: string; // Add this prop to hold the selected answer
    onPrev: () => void;
    onNext: () => void;
}

const SurveyPage: React.FC<SurveyPageProps> = ({ cardData, setData, selectedAnswer,onPrev, onNext }) => {
    function setSelectionData(data: string) {
        if (setData) setData(data);
    }
    const renderRadioQuestion = () => {
        return <div className='survey-card__container'>
                    <div className='survey-card__navigation' onClick={onPrev}>
                        <div className='survey-card__navigation-item'>
                            <BaseIcon icon='material-symbols:chevron-left' width={24} />
                        </div>
                    </div>
                    <div className='survey-card__content'>
                        <div className="survey-card__question">{cardData.question}</div>
                        <div className="survey-card__options">
                            <PRadioButton options={cardData.options as Array<{ key: string, label: string }>} onSelectionChange={(data) => setSelectionData(data)} selectedOption={selectedAnswer}/>
                        </div>
                    </div>
                    <div className='survey-card__navigation' onClick={onNext}>
                        <div className='survey-card__navigation-item'>
                            <BaseIcon icon='material-symbols:chevron-right' width={24} />
                        </div>
                    </div>
               </div>     
    }
    return (
        <div className="survey-card">
            {cardData.answerType === 'radio' && renderRadioQuestion()}
           
        </div>
    );
};

export default SurveyPage;
