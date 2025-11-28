import React from 'react'

interface PetInfoProps {
  pet: {
    title: string
    details: {
      name: string
      animalType: string
      breed: string
      age: string
      gender: string
      description: string
      fromWhere: string
    }
  }
}

const PetInfo: React.FC<PetInfoProps> = ({ pet }) => {
  const getAgeLabel = (age: string) => {
    const labels: Record<string, string> = {
      baby: 'Puppy/Kitten',
      adult: 'Adult',
      senior: 'Senior',
    }
    return labels[age] || age
  }

  const getFromWhereLabel = (fromWhere: string) => {
    const labels: Record<string, string> = {
      shelter: 'Animal Shelter',
      foster: 'Foster Home',
      owner: 'Owner',
      stray: 'Rescued Stray',
      other: 'Other',
    }
    return labels[fromWhere] || fromWhere
  }

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl">
      <h1 className="text-4xl font-bold text-dark-80 mb-2">{pet.details.name}</h1>
      <p className="text-xl text-primary-60 font-semibold mb-6">{pet.details.breed}</p>

      {/* Quick Info Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-accent-bg rounded-2xl p-4 text-center">
          <div className="text-2xl mb-2">🐾</div>
          <div className="text-sm text-dark-60">Type</div>
          <div className="font-bold text-dark-80 capitalize">{pet.details.animalType}</div>
        </div>
        <div className="bg-accent-bg rounded-2xl p-4 text-center">
          <div className="text-2xl mb-2">🎂</div>
          <div className="text-sm text-dark-60">Age</div>
          <div className="font-bold text-dark-80">{getAgeLabel(pet.details.age)}</div>
        </div>
        <div className="bg-accent-bg rounded-2xl p-4 text-center">
          <div className="text-2xl mb-2">{pet.details.gender === 'male' ? '♂️' : '♀️'}</div>
          <div className="text-sm text-dark-60">Gender</div>
          <div className="font-bold text-dark-80 capitalize">{pet.details.gender}</div>
        </div>
        <div className="bg-accent-bg rounded-2xl p-4 text-center">
          <div className="text-2xl mb-2">🏠</div>
          <div className="text-sm text-dark-60">From</div>
          <div className="font-bold text-dark-80 text-xs">{getFromWhereLabel(pet.details.fromWhere)}</div>
        </div>
      </div>

      {/* Description */}
      <div>
        <h2 className="text-2xl font-bold text-dark-80 mb-4">About {pet.details.name}</h2>
        <p className="text-dark-60 leading-relaxed whitespace-pre-line">
          {pet.details.description || `Meet ${pet.details.name}, a lovely ${pet.details.breed} looking for a forever home!`}
        </p>
      </div>
    </div>
  )
}

export default PetInfo
