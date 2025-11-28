import React from 'react'

interface FiltersProps {
  filters: {
    animalType: string
    age: string
    gender: string
  }
  onFilterChange: (filterType: string, value: string) => void
}

const Filters: React.FC<FiltersProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg sticky top-6">
      <h3 className="text-xl font-bold text-dark-80 mb-6">Filters</h3>

      {/* Animal Type */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-dark-80 mb-3">Animal Type</label>
        <div className="space-y-2">
          {['all', 'cat', 'dog', 'other'].map((type) => (
            <label key={type} className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="animalType"
                value={type}
                checked={filters.animalType === type}
                onChange={(e) => onFilterChange('animalType', e.target.value)}
                className="w-4 h-4 text-primary focus:ring-primary focus:ring-2"
              />
              <span className="ml-3 text-dark-60 group-hover:text-dark-80 capitalize">
                {type === 'all' ? 'All Animals' : type}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Age */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-dark-80 mb-3">Age</label>
        <div className="space-y-2">
          {[
            { value: 'all', label: 'All Ages' },
            { value: 'baby', label: 'Puppy/Kitten' },
            { value: 'adult', label: 'Adult' },
            { value: 'senior', label: 'Senior' },
          ].map((age) => (
            <label key={age.value} className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="age"
                value={age.value}
                checked={filters.age === age.value}
                onChange={(e) => onFilterChange('age', e.target.value)}
                className="w-4 h-4 text-primary focus:ring-primary focus:ring-2"
              />
              <span className="ml-3 text-dark-60 group-hover:text-dark-80">{age.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Gender */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-dark-80 mb-3">Gender</label>
        <div className="space-y-2">
          {[
            { value: 'all', label: 'All' },
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
          ].map((gender) => (
            <label key={gender.value} className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="gender"
                value={gender.value}
                checked={filters.gender === gender.value}
                onChange={(e) => onFilterChange('gender', e.target.value)}
                className="w-4 h-4 text-primary focus:ring-primary focus:ring-2"
              />
              <span className="ml-3 text-dark-60 group-hover:text-dark-80 capitalize">
                {gender.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters Button */}
      <button
        onClick={() => {
          onFilterChange('animalType', 'all')
          onFilterChange('age', 'all')
          onFilterChange('gender', 'all')
        }}
        className="w-full px-4 py-3 bg-accent-bg text-primary rounded-full font-semibold hover:bg-primary hover:text-white transition-all duration-300"
      >
        Clear All Filters
      </button>
    </div>
  )
}

export default Filters
