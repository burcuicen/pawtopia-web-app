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
  disabled?: boolean
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
  textarea = false,
  disabled = false
}) => {
  const [inputValue, setInputValue] = useState(value)
  const [inputType, setInputType] = useState(type)
  const [error, setError] = useState('')

  const validateInput = React.useCallback((currentValue = inputValue) => {
    if (required && !currentValue) {
      setError('This field is required')
      return false
    }
    
    // Email validation
    if (type === 'email' && currentValue) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(currentValue)) {
        setError('Please enter a valid email address')
        return false
      }
    }
    
    // Phone validation
    if (type === 'tel' && currentValue) {
      const phoneRegex = /^[\d\s\-\+\(\)]{7,}$/
      if (!phoneRegex.test(currentValue)) {
        setError('Please enter a valid phone number (at least 7 digits)')
        return false
      }
    }
    
    setError('')
    return true
  }, [required, inputValue, type])

  useEffect(() => {
    setInputValue(value)
  }, [value])

  useEffect(() => {
    if (validateForm) validateInput()
  }, [validateForm, validateInput])

  useEffect(() => {
    if (customError) setError(customError)
  }, [customError])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let newValue = e.target.value
    
    // For phone type, only allow numbers, spaces, +, -, (, )
    if (type === 'tel') {
      newValue = newValue.replace(/[^\d\s\-\+\(\)]/g, '')
    }
    
    setInputValue(newValue)
    onChange(newValue)
    
    // Real-time validation for email and phone
    if (type === 'email' || type === 'tel') {
      setTimeout(() => validateInput(newValue), 300)
    }
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
            disabled={disabled}
          />
        ) : (
          <input
            type={inputType}
            placeholder={placeholder}
            value={inputValue}
            onChange={handleChange}
            className={`p-input__input ${error ? 'error' : ''}`}
            required={required}
            disabled={disabled}
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
