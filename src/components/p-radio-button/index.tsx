import React, { useEffect, useState } from 'react'
import './styles.scss'

type PRadioButtonProps = {
  options: Array<{ key: string; label: string }>
  onSelectionChange: (selectedKey: string) => void
  selectedOption?: string
  layout?: 'horizontal' | 'vertical'
}

const PRadioButton: React.FC<PRadioButtonProps> = ({ options, onSelectionChange, selectedOption, layout = 'horizontal' }) => {
  const [selected, setSelected] = useState('')

  useEffect(() => {
    if (selectedOption) {
      setSelected(selectedOption)
    }
  }, [selectedOption])

  const handleChange = (key: string) => {
    setSelected(key)
    onSelectionChange(key)
  }
  const generateRandomId = () => {
    return Math.random().toString(36).substring(7)
  }
  return (
    <div className={`p-radio-group p-radio-group--${layout}`}>
      {options.map(option => (
        <div key={option.key} className="p-radio-group__option">
          <input
            type="radio"
            id={option.key}
            name={generateRandomId()} // use the name prop
            value={option.key}
            checked={selected === option.key}
            onChange={() => handleChange(option.key)}
            className="p-radio-group__input"
          />
          <label
            htmlFor={option.key}
            className={selected === option.key ? 'p-radio-group__label p-radio-group__label--selected' : 'p-radio-group__label'}
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  )
}

export default PRadioButton
