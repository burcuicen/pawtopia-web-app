import React from 'react'
import { useNavigate } from 'react-router-dom'

interface Pet {
  _id: string
  title: string
  details: {
    name: string
    animalType: string
    breed: string
    age: string
    gender: string
    photos: string[]
    location: {
      city: string
      country: string
    }
  }
}

interface PetCardProps {
  pet: Pet
}

const PetCard: React.FC<PetCardProps> = ({ pet }) => {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/pets/${pet._id}`)}
      className="group bg-white rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={pet.details.photos[0]}
          alt={pet.details.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Badges */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <span className="bg-white/95 px-3 py-1 rounded-full text-xs font-bold text-primary uppercase shadow-md">
            {pet.details.animalType}
          </span>
          <span className="bg-white/95 px-3 py-1 rounded-full text-xs font-bold text-dark-60 capitalize shadow-md">
            {pet.details.gender}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-dark-80 mb-2 group-hover:text-primary transition-colors">
          {pet.details.name}
        </h3>
        <p className="text-primary-60 font-medium mb-4">{pet.details.breed}</p>

        <div className="flex justify-between items-center pt-4 border-t border-dark-10 text-sm text-dark-60">
          <div className="flex items-center gap-1">
            <span>🎂</span>
            <span className="capitalize">{pet.details.age}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>📍</span>
            <span>{pet.details.location.city}, {pet.details.location.country}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PetCard
