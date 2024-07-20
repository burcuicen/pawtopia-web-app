import React, { useState, useEffect } from 'react'
import './styles.scss'
import BaseIcon from 'src/components/_base/base-icon'

interface PInputProps {
  value: string
  textarea?: boolean
  onChange: (value: string) => void
  placeholder?: string
  label?: string
  hasHideIcon?: boolean
  type?: string
  required?: boolean
  validateForm?: boolean
  customError?: string
}

const PInput: React.FC<PInputProps> = ({
  value,
  onChange,
  placeholder,
  label,
  hasHideIcon,
  type = 'text',
  required,
  validateForm,
  customError,
  textarea = false
}) => {
  const [inputValue, setInputValue] = useState(value)
  const [inputType, setInputType] = useState(type)
  const [error, setError] = useState('')

  useEffect(() => {
    setInputValue(value)
  }, [value])

  useEffect(() => {
    if (validateForm) validateInput()
  }, [validateForm])

  useEffect(() => {
    if (customError) setError(customError)
  }, [customError])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(e.target.value)
    onChange(e.target.value)
  }

  const validateInput = (currentValue = inputValue) => {
    if (required && !currentValue) setError('This field is required')
    else setError('')
  }

  const togglePasswordVisibility = () => {
    setInputType(inputType === 'password' ? 'text' : 'password')
  }

  return (
    <div className="p-input">
      {label && <label>{label}</label>}
      <div className="p-input__field">
        {textarea ? (
          <textarea
            placeholder={placeholder}
            value={inputValue}
            onChange={handleChange}
            className={`p-input__input p-input__textarea ${error ? 'error' : ''}`}
            required={required}
          />
        ) : (
          <input
            type={inputType}
            placeholder={placeholder}
            value={inputValue}
            onChange={handleChange}
            className={`p-input__input ${error ? 'error' : ''}`}
            required={required}
          />
        )}
        {hasHideIcon && type === 'password' && (
          <div className="p-input__icon">
            <BaseIcon icon={inputType === 'password' ? 'mdi:eye-off-outline' : 'mdi:eye-outline'} width={24} onClick={togglePasswordVisibility} />
          </div>
        )}
      </div>
      {error && <div className="p-input__error">{error}</div>}
    </div>
  )
}

export default PInput
