// BaseDropdown.tsx
import React, { useState, useRef, useEffect } from 'react'
import './styles.scss'
import BaseIcon from 'src/components/_base/base-icon'

interface DropdownItem {
  id: string
  value: string
}

interface BaseDropdownProps {
  items: DropdownItem[]
  onSelect: (item: DropdownItem) => void
  placeholder?: string
  label?: string
  disabled?: boolean
  selectedValue?: string
  required?: boolean
  validateForm?: boolean
}

const PDropdown: React.FC<BaseDropdownProps> = ({ items, onSelect, placeholder, label, disabled, selectedValue, required, validateForm }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null)

  const [error, setError] = useState('')

  useEffect(() => {
    if (validateForm) validateInput()
  }, [validateForm])
  const dropdownRef = useRef<HTMLDivElement>(null)
  const validateInput = (currentValue = selectedItem) => {
    if (required && !currentValue) setError('This field is required')
    else setError('')
  }
  useEffect(() => {
    if (selectedValue) {
      const selected = items.find(item => item.id === selectedValue)
      if (selected) {
        setSelectedItem(selected)
      }
    } else {
      setSelectedItem(null)
    }
  }, [selectedValue, items])

  const handleSelect = (item: DropdownItem) => {
    setSelectedItem(item)
    onSelect(item)
    setIsOpen(false)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="p-dropdown" ref={dropdownRef}>
      {label && <div className="p-dropdown__label">{label}</div>}
      <div className={`p-dropdown__selected ${disabled ? 'disabled' : ''}`} onClick={() => !disabled && setIsOpen(!isOpen)}>
        {selectedItem ? selectedItem.value : placeholder || 'Select...'}
        <BaseIcon icon={isOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'} />
      </div>

      {isOpen && !disabled && (
        <div className="p-dropdown__items">
          {items.map(item => (
            <div className="p-dropdown__item" key={item.id} onClick={() => handleSelect(item)}>
              {item.value}
            </div>
          ))}
          {items.length === 0 && <div className="p-dropdown__item">No items to show</div>}
        </div>
      )}
      {error && <div className="p-input__error">{error}</div>}
    </div>
  )
}

export default PDropdown
