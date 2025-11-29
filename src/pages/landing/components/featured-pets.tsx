import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useApi } from 'src/api/api-context'

interface Pet {
  _id: string
  name: string
  age: number
  gender: string
  breed: string
  image?: string
  city: string
  country: string
}

const FeaturedPets: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const api = useApi()

  const loadFeaturedPets = React.useCallback(async () => {
    try {
      const { err, res } = await api.listing.getAll()
      if (!err && res?.data) {
        setPets(res.data.slice(0, 6))
      }
    } catch (error) {
      console.error('Failed to load pets:', error)
    } finally {
      setLoading(false)
    }
  }, [api.listing])

  useEffect(() => {
    loadFeaturedPets()
  }, [loadFeaturedPets])

  const getPlaceholderImage = (index: number) => {
    const catImages = [
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400',
      'https://images.unsplash.com/photo-1573865526739-10c1d3a1b4cc?w=400',
      'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=400',
      'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=400',
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400',
      'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400',
    ]
    return catImages[index % catImages.length]
  }

  return (
    <section className="font-sans py-20 px-5 bg-gradient-to-b from-white to-accent-bg">
      <div className="w-full max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-dark-80 mb-4">
            Meet Your New <span className="text-primary">Best Friend</span>
          </h2>
          <p className="text-lg text-dark-60 max-w-2xl mx-auto">
            Browse our featured pets and find the perfect companion for your lifestyle.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : pets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pets.map((pet, index) => (
              <div 
                key={pet._id} 
                className="group bg-white rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                onClick={() => navigate(`/pets/${pet._id}`)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={pet.image || getPlaceholderImage(index)} 
                    alt={pet.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/95 px-3 py-1 rounded-full text-xs font-bold text-primary uppercase">
                    {pet.gender}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-dark-80 mb-2">{pet.name}</h3>
                  <p className="text-primary-60 font-medium mb-4">{pet.breed}</p>
                  <div className="flex justify-between pt-4 border-t border-dark-10 text-sm text-dark-60">
                    <span>🎂 {pet.age} yrs</span>
                    <span>📍 {pet.city}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100 max-w-2xl mx-auto">
            <div className="text-6xl mb-6 opacity-80">🐾</div>
            <h3 className="text-2xl font-bold text-dark-80 mb-3">Our Little Friends Are Getting Ready!</h3>
            <p className="text-dark-60 mb-8">
              We're preparing some adorable companions for you. Check back soon to meet them!
            </p>
          </div>
        )}

        <div className="text-center mt-16">
          <Link 
            to="/pets" 
            className="inline-block px-10 py-4 bg-primary text-white rounded-full font-bold text-lg shadow-lg hover:bg-primary-dark hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
          >
            Discover All Pets
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedPets
