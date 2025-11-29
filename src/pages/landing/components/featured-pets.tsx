import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useApi } from 'src/api/api-context'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface Pet {
  _id: string
  title: string
  details: {
    animalType: string
    name: string
    description: string
    breed: string
    photos: string[]
    location: {
      country: string
      city: string
    }
    age: string
    gender: string
    healthDetails: {
      isVaccinated: boolean
      isNeutered: boolean
      isDewormed: boolean
      isHouseTrained: boolean
      hasSpecialNeeds: boolean
    }
    fromWhere: string
  }
  contactDetails: {
    email: string
    phone: string
  }
  isApproved: boolean
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
        const items = res.data.items || []
        // Filter: Must be approved AND have at least one photo
        const approvedPets = items.filter((pet: any) => 
          pet.isApproved && 
          pet.details?.photos && 
          pet.details.photos.length > 0 &&
          pet.details.photos[0] !== ''
        )
        setPets(approvedPets.slice(0, 10)) // Show up to 10 featured pets
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
          <div className="px-4">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className="pb-12 !px-4"
            >
              {pets.map((pet) => (
                <SwiperSlide key={pet._id} className="pb-10">
                  <div 
                    className="group bg-white rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full flex flex-col"
                    onClick={() => navigate(`/pets/${pet._id}`)}
                  >
                    <div className="relative h-64 overflow-hidden shrink-0">
                      <img 
                        src={pet.details.photos[0]} 
                        alt={pet.details.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 bg-white/95 px-3 py-1 rounded-full text-xs font-bold text-primary uppercase shadow-sm">
                        {pet.details.gender}
                      </div>
                    </div>
                    <div className="p-6 flex flex-col grow">
                      <h3 className="text-2xl font-bold text-dark-80 mb-2 truncate">{pet.details.name}</h3>
                      <p className="text-primary-60 font-medium mb-4">{pet.details.breed}</p>
                      <div className="mt-auto flex justify-between pt-4 border-t border-dark-10 text-sm text-dark-60">
                        <span className="flex items-center gap-1">
                          🎂 {pet.details.age}
                        </span>
                        <span className="flex items-center gap-1 truncate max-w-[50%]">
                          📍 {pet.details.location.city}, {pet.details.location.country}
                        </span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
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

        <div className="text-center mt-12">
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
