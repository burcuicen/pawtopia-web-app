import React from 'react';
import BaseIcon from 'src/components/_base/base-icon';

import './styles.scss';

type PStepperProps = {
  steps: number;
  activeStep: number;
  onStepChange: (step: number) => void;
};

const PStepper: React.FC<PStepperProps> = ({ steps, activeStep, onStepChange }) => {
  const stepArray = Array.from({ length: steps }, (_, i) => i + 1);

  return (
    <div className="p-stepper__container">
      {stepArray.map((step, index) => {
        const circleClass = activeStep === step
          ? 'p-stepper__circle--active'
          : activeStep > step
          ? 'p-stepper__circle--done'
          : '';

        return (
          <React.Fragment key={step}>
            <div
              className={`p-stepper__circle ${circleClass}`}
              onClick={() => onStepChange(step)}
            >
              {activeStep > step ? <BaseIcon icon="material-symbols:check" className="p-stepper__checkmark" width={26}/> : ''}
            </div>

            {index < stepArray.length - 1 && <div className="p-stepper__line" />}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default PStepper;
