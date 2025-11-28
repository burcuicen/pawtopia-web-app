import React from 'react'
import './styles.scss'

interface BaseButtonProps {
  title: string
  type: 'default' | 'outline'
  size?: 'small' | 'medium' | 'large'
  rounded?: boolean
  onClick?: () => void
  disabled?: boolean
}
const BaseButton: React.FC<BaseButtonProps> = ({ title, type, size, onClick, rounded, disabled }) => {
  return (
    <button 
      className={`base-button base-button--${type} base-button--${size} base-button--${rounded ? 'rounded' : ''}`} 
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  )
}
export default BaseButton
