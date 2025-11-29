import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useApi } from 'src/api/api-context'
import ImageGallery from './components/image-gallery'
import PetInfo from './components/pet-info'
import HealthInfo from './components/health-info'
import ContactCard from './components/contact-card'

interface IPetDetail {
  _id: string
  title: string
  createdBy: {
    firstName: string
    lastName: string
    userId: string
  }
  details: {
    name: string
    animalType: string
    breed: string
    age: string
    gender: string
    description: string
    photos: string[]
    location: {
      city: string
      country: string
    }
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
}

const PetDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const api = useApi()
  const [pet, setPet] = useState<IPetDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPetDetail = async (petId: string) => {
      try {
        setLoading(true)
        const { err, res } = await api.listing.getById(petId)
        if (!err && res?.data) {
          setPet(res.data)
        } else {
          navigate('/pets')
        }
      } catch (error) {
        console.error('Failed to load pet details:', error)
        navigate('/pets')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      loadPetDetail(id)
    }
  }, [id, api.listing, navigate])

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center bg-gradient-to-b from-accent-bg to-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!pet) {
    return null
  }

  return (
    <div className="font-sans w-full bg-gradient-to-b from-accent-bg to-white py-12 px-5">
      <div className="max-w-[1200px] mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-dark-60">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/pets" className="hover:text-primary transition-colors">
            Pets
          </Link>
          <span>/</span>
          <span className="text-dark-80 font-semibold">{pet.details.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <ImageGallery photos={pet.details.photos} name={pet.details.name} animalType={pet.details.animalType} />

            {/* Pet Info */}
            <PetInfo pet={pet} />

            {/* Health Info */}
            <HealthInfo healthDetails={pet.details.healthDetails} />
          </div>

          {/* Right Column - Contact Card */}
          <div className="lg:col-span-1">
            <ContactCard
              contactDetails={pet.contactDetails}
              createdBy={pet.createdBy}
              location={pet.details.location}
            />
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/pets')}
            className="px-8 py-4 bg-white text-primary border-2 border-primary rounded-full font-bold hover:bg-primary hover:text-white transition-all duration-300"
          >
            ← Back to Browse
          </button>
        </div>
      </div>
    </div>
  )
}

export default PetDetail
