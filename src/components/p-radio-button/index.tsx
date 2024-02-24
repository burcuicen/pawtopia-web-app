import React, { useEffect, useState } from 'react';
import './styles.scss';

type PRadioButtonProps = {
    options: Array<{ key: string, label: string }>;
    onSelectionChange: (selectedKey: string) => void;
    selectedOption?: string;
};

const PRadioButton: React.FC<PRadioButtonProps> = ({ options, onSelectionChange, selectedOption }) => {
    const [selected, setSelected] = useState('');

    // Update the selected state when the selectedOption prop changes
    useEffect(() => {
        if (selectedOption) {
            setSelected(selectedOption);
        }
    }, [selectedOption]);

    const handleChange = (key: string) => {
        setSelected(key);
        onSelectionChange(key);
    };

    return (
        <div className="p-radio-group">
            {options.map(option => (
                <div key={option.key} className="p-radio-group__option">
                    <input
                        type="radio"
                        id={option.key}
                        name="custom-radio"
                        value={option.key}
                        checked={selected === option.key}
                        onChange={() => handleChange(option.key)}
                        className="p-radio-group__input"
                    />
                    <label htmlFor={option.key} className={selected === option.key ? "p-radio-group__label p-radio-group__label--selected" : "p-radio-group__label"}>{option.label}</label>
                </div>
            ))}
        </div>
    );
};

export default PRadioButton;
