import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useApi } from 'src/api/api-context'
import { setAuthState } from 'src/store/reducers/authSlice'
import { showToast } from 'src/utils/toast'

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
  const api = useApi()
  const dispatch = useDispatch()
  const { userInfo, isLoggedIn } = useSelector((state: any) => state.auth)
  const [isFavorite, setIsFavorite] = React.useState(false)

  React.useEffect(() => {
    if (userInfo?.favorites) {
      setIsFavorite(userInfo.favorites.includes(pet._id))
    }
  }, [userInfo, pet._id])

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isLoggedIn) {
      showToast.error('Please login to add favorites')
      return
    }

    // Optimistic update
    const previousState = isFavorite
    setIsFavorite(!previousState)

    try {
      const { err, res } = await api.auth.toggleFavorite(pet._id)
      if (!err && res?.data) {
        dispatch(setAuthState({ isLoggedIn: true, userInfo: res.data }))
        // Toast removed as requested
      } else {
        // Revert on error
        setIsFavorite(previousState)
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error)
      setIsFavorite(previousState)
    }
  }

  return (
    <div
      onClick={() => navigate(`/pets/${pet._id}`)}
      className="group bg-white rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={pet.details.photos[0]}
          alt={pet.details.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Favorite Button */}
        <button
          onClick={handleToggleFavorite}
          className="absolute top-4 left-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors z-10"
        >
          <span className={`text-xl ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}>
            {isFavorite ? '❤️' : '🤍'}
          </span>
        </button>

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
