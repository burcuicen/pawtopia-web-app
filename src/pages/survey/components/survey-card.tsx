import React, { useState, useEffect } from 'react';
import PRadioButton from 'src/components/p-radio-button';
import BaseIcon from 'src/components/_base/base-icon';
import AgeRangeSlider from './range-slider';
import 'src/pages/survey/styles.scss';

interface SurveyCardProps {
    key: number;
    questionField: 'purpose' | 'animalPreference' | 'ageRange' | 'genderPreference' | 'healthStatus' | 'animalCareHistory';
    type: 'paw-seeker' | 'paw-guard' | 'other';
    description: string;
    question: string;
    options?: { key: string, label: string }[];
    customOptions?: {
        gender: { key: string, label: string }[];
        healthStatus: { key: string, label: string }[];
    };
    answerType: 'text' | 'radio' | 'custom' | 'dropdown';
}

interface SurveyPageProps {
    cardData: SurveyCardProps;
    setData?: (field: string, data: string) => void;
    selectedAnswers?: {
        ageRange?: number;
        genderPreference?: string;
        healthStatus?: string;
    };
    onPrev: () => void;
    onNext: () => void;
}

const SurveyCard: React.FC<SurveyPageProps> = ({ cardData, setData, selectedAnswers, onPrev, onNext }) => {
    const [ageRange, setAgeRange] = useState(selectedAnswers?.ageRange || 0);
    const [genderPreference, setGenderPreference] = useState(selectedAnswers?.genderPreference || '');
    const [healthStatus, setHealthStatus] = useState(selectedAnswers?.healthStatus || '');

    useEffect(() => {
        if (selectedAnswers?.ageRange) setAgeRange(selectedAnswers.ageRange);
        if (selectedAnswers?.genderPreference) setGenderPreference(selectedAnswers.genderPreference);
        if (selectedAnswers?.healthStatus) setHealthStatus(selectedAnswers.healthStatus);
    }, [selectedAnswers]);

    function setSelectionData(field: string, data: string) {
        if (setData) setData(field, data);
    }

    const renderRadioQuestion = () => (
        <div className='survey-card__container'>
            <div className='survey-card__navigation' onClick={onPrev}>
                <div className='survey-card__navigation-item'>
                    <BaseIcon icon='material-symbols:chevron-left' width={24} />
                </div>
            </div>
            <div className='survey-card__content'>
                <div className="survey-card__question">{cardData.question}</div>
                <div className="survey-card__options">
                    <PRadioButton
                        options={cardData.options as Array<{ key: string, label: string }>}
                        onSelectionChange={(data) => setSelectionData(cardData.questionField, data)}
                        selectedOption={selectedAnswers?.[cardData.questionField as keyof typeof selectedAnswers] as string}
                    />
                </div>
            </div>
            <div className='survey-card__navigation' onClick={onNext}>
                <div className='survey-card__navigation-item'>
                    <BaseIcon icon='material-symbols:chevron-right' width={24} />
                </div>
            </div>
        </div>
    );

    const renderCustomQuestion = () => (
        <div className='survey-card__container'>
            <div className='survey-card__navigation' onClick={onPrev}>
                <div className='survey-card__navigation-item'>
                    <BaseIcon icon='material-symbols:chevron-left' width={24} />
                </div>
            </div>
            <div className='survey-card__content'>
                <div className="survey-card__question">{cardData.question}</div>
                <div className="survey-card__custom-options">
                    <div className="survey-card__option survey-card__option-range">
                        <div className="survey-card__option-label">Age Range</div>
                        <AgeRangeSlider
                            onChange={(value) => {
                                setAgeRange(value);
                                setSelectionData('ageRange', value.toString());
                            }}
                            initialValue={ageRange}
                        />
                    </div>
                    <div className="survey-card__option" key="genderPreference">
                        <div className="survey-card__option-label">Gender</div>
                        <PRadioButton
                            options={cardData.customOptions?.gender || []}
                            onSelectionChange={(data) => {
                                setGenderPreference(data);
                                setSelectionData('genderPreference', data);
                            }}
                            selectedOption={genderPreference}
                            layout='vertical'
                        />
                    </div>
                    <div className="survey-card__option" key="healthStatus" >
                        <div className="survey-card__option-label">Health Status</div>
                        <PRadioButton
                            options={cardData.customOptions?.healthStatus || []}
                            onSelectionChange={(data) => {
                                setHealthStatus(data);
                                setSelectionData('healthStatus', data);
                            }}
                            selectedOption={healthStatus}
                            layout='vertical'
                        />
                    </div>
                </div>
            </div>
            <div className='survey-card__navigation' onClick={onNext}>
                <div className='survey-card__navigation-item'>
                    <BaseIcon icon='material-symbols:chevron-right' width={24} />
                </div>
            </div>
        </div>
    );

    return (
        <div className="survey-card">
            {cardData.answerType === 'radio' && renderRadioQuestion()}
            {cardData.answerType === 'custom' && renderCustomQuestion()}
        </div>
    );
};

export default SurveyCard;
