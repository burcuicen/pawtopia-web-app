import React, { useEffect, useState, useRef } from 'react';
import 'src/pages/survey/styles.scss';

interface AgeRangeSliderProps {
  onChange: (value: number) => void;
  initialValue?: number;
}

const AgeRangeSlider: React.FC<AgeRangeSliderProps> = ({ onChange, initialValue = 0 }) => {
  const [value, setValue] = useState(initialValue);
  const sliderRef = useRef<HTMLInputElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    updateSliderProgress();
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    setValue(newValue);
    onChange(newValue);
  };

  const updateSliderProgress = () => {
    if (sliderRef.current && progressRef.current) {
      const percentage = (value / 100) * 100;
      progressRef.current.style.width = `${percentage}%`;
    }
  };

  const getAgeLabel = (value: number) => {
    if (value <= 25) return 'Baby';
    if (value <= 50) return 'Young';
    if (value <= 75) return 'Adult';
    return 'Senior';
  };

  return (
    <div className="age-range-slider">
      <input
        ref={sliderRef}
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={handleChange}
        className="slider"
      />
      <div ref={progressRef} className="slider-progress"></div>
      <div className="slider-label">{getAgeLabel(value)}</div>
    </div>
  );
};

export default AgeRangeSlider;