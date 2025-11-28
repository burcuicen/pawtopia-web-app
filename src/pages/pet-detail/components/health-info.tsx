import React from 'react'

interface HealthInfoProps {
  healthDetails: {
    isVaccinated: boolean
    isNeutered: boolean
    isDewormed: boolean
    isHouseTrained: boolean
    hasSpecialNeeds: boolean
  }
}

const HealthInfo: React.FC<HealthInfoProps> = ({ healthDetails }) => {
  const healthItems = [
    { key: 'isVaccinated', label: 'Vaccinated', icon: '💉' },
    { key: 'isNeutered', label: 'Neutered/Spayed', icon: '✂️' },
    { key: 'isDewormed', label: 'Dewormed', icon: '💊' },
    { key: 'isHouseTrained', label: 'House Trained', icon: '🏠' },
    { key: 'hasSpecialNeeds', label: 'Special Needs', icon: '⚠️', inverse: true },
  ]

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl">
      <h2 className="text-2xl font-bold text-dark-80 mb-6">Health Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {healthItems.map((item) => {
          const value = healthDetails[item.key as keyof typeof healthDetails]
          const isPositive = item.inverse ? !value : value

          return (
            <div
              key={item.key}
              className={`flex items-center gap-4 p-4 rounded-2xl ${
                isPositive ? 'bg-green-50 border-2 border-green-200' : 'bg-gray-50 border-2 border-gray-200'
              }`}
            >
              <div className="text-3xl">{item.icon}</div>
              <div className="flex-1">
                <div className="font-semibold text-dark-80">{item.label}</div>
                <div className={`text-sm ${isPositive ? 'text-green-600' : 'text-gray-500'}`}>
                  {isPositive ? 'Yes' : 'No'}
                </div>
              </div>
              <div className="text-2xl">{isPositive ? '✓' : '✗'}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default HealthInfo
