import React, { useEffect, useState, useRef } from 'react'
import 'src/pages/survey/styles.scss'

export type AgeCategory = 'baby' | 'adult' | 'senior'

interface AgeRangeSliderProps {
  onChange: (value: AgeCategory) => void
  initialValue?: number | AgeCategory
}

export const AgeRangeSlider: React.FC<AgeRangeSliderProps> = ({ onChange, initialValue = 'adult' }) => {
  const [value, setValue] = useState(typeof initialValue === 'number' ? initialValue : getInitialNumericValue(initialValue))
  const sliderRef = useRef<HTMLInputElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    updateSliderProgress()
  }, [value])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value)
    setValue(newValue)
    onChange(getAgeCategory(newValue))
  }

  const updateSliderProgress = () => {
    if (sliderRef.current && progressRef.current) {
      const percentage = (value / 100) * 100
      progressRef.current.style.width = `${percentage}%`
    }
  }

  const getAgeCategory = (value: number): AgeCategory => {
    if (value <= 33) return 'baby'
    if (value <= 66) return 'adult'
    return 'senior'
  }

  const getAgeLabel = (value: number): string => {
    const category = getAgeCategory(value)
    return category.charAt(0).toUpperCase() + category.slice(1)
  }

  return (
    <div className="age-range-slider">
      <input ref={sliderRef} type="range" min="0" max="100" value={value} onChange={handleChange} className="slider" />
      <div ref={progressRef} className="slider-progress"></div>
      <div className="slider-label">{getAgeLabel(value)}</div>
    </div>
  )
}

export function getInitialNumericValue(category: AgeCategory): number {
  switch (category) {
    case 'baby':
      return 16
    case 'adult':
      return 50
    case 'senior':
      return 83
    default:
      return 50
  }
}

export default AgeRangeSlider
