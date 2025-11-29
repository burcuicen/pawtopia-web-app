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
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState('')

  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const filteredItems = items.filter(item =>
    item.value.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const validateInput = React.useCallback((currentValue = selectedItem) => {
    if (required && !currentValue) setError('This field is required')
    else setError('')
  }, [required, selectedItem])

  useEffect(() => {
    if (validateForm) validateInput()
  }, [validateForm, validateInput])

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isOpen])
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
    setSearchTerm('')
  }

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen)
      if (isOpen) {
        setSearchTerm('')
      }
    }
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
      <div className={`p-dropdown__selected ${disabled ? 'disabled' : ''} ${isOpen ? 'open' : ''}`} onClick={toggleDropdown}>
        <span className={selectedItem ? '' : 'placeholder'}>{selectedItem ? selectedItem.value : placeholder || 'Select...'}</span>
        <BaseIcon icon={isOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'} />
      </div>

      {isOpen && !disabled && (
        <div className="p-dropdown__items">
          <div className="p-dropdown__search">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="p-dropdown__list">
            {filteredItems.map(item => (
              <div className="p-dropdown__item" key={item.id} onClick={() => handleSelect(item)}>
                {item.value}
              </div>
            ))}
            {filteredItems.length === 0 && <div className="p-dropdown__item p-dropdown__item--empty">No results found</div>}
          </div>
        </div>
      )}
      {error && <div className="p-dropdown__error">{error}</div>}
    </div>
  )
}

export default PDropdown
