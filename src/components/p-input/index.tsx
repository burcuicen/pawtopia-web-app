import React, { useState, useEffect } from 'react';
import './styles.scss';
import BaseIcon from 'src/components/_base/base-icon';

interface PInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    label?: string;
    hasHideIcon?: boolean;
    error?: string;
    type?: string;
}

const PInput: React.FC<PInputProps> = ({ value, onChange, placeholder, label, hasHideIcon, error, type = 'text' }) => {
    const [inputValue, setInputValue] = useState(value);
    const [inputType, setInputType] = useState(type);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        onChange(e.target.value);
    };

    const togglePasswordVisibility = () => {
        setInputType(inputType === 'password' ? 'text' : 'password');
    };

    return (
        <div className='p-input'>
            {label && <label>{label}</label>}
            <div className='p-input__field'>
                <input 
                    type={inputType}
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={handleChange}
                    className='p-input__input'
                />
                {hasHideIcon && type === 'password' && (
                    <div className='p-input__icon'>
                        <BaseIcon icon={inputType === 'password' ? 'mdi:eye-off-outline' : 'mdi:eye-outline'} width={24} onClick={togglePasswordVisibility} />
                    </div>
                )}
            </div>
            {error && <div className='p-input__error'>{error}</div>}
        </div>
    );
};

export default PInput;
