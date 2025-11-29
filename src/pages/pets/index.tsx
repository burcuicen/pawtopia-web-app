import React, { useEffect, useState } from 'react'
import { useApi } from 'src/api/api-context'
import PetCard from './components/pet-card'
import Filters from './components/filters'
import SearchBar from './components/search-bar'

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
  isApproved: boolean
}

const PetsBrowse: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([])
  const [filteredPets, setFilteredPets] = useState<Pet[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    animalType: 'all',
    age: 'all',
    gender: 'all',
  })
  const api = useApi()

  const loadPets = React.useCallback(async () => {
    try {
      setLoading(true)
      const { err, res } = await api.listing.getAll()
      if (!err && res?.data) {
        // The API returns { items: [], metaData: {} }, so we need to access .items
        const items = res.data.items || []
        // Filter only approved listings AND listings with photos
        const approvedPets = items.filter((pet: Pet) => 
          pet.isApproved && 
          pet.details?.photos && 
          pet.details.photos.length > 0 &&
          pet.details.photos[0] !== ''
        )
        setPets(approvedPets)
      }
    } catch (error) {
      console.error('Failed to load pets:', error)
    } finally {
      setLoading(false)
    }
  }, [api.listing])

  useEffect(() => {
    loadPets()
  }, [loadPets])

  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...pets]

      // Search filter
      if (searchQuery) {
        filtered = filtered.filter(
          (pet) =>
            pet.details.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pet.details.breed.toLowerCase().includes(searchQuery.toLowerCase())
        )
      }

      // Animal type filter
      if (filters.animalType !== 'all') {
        filtered = filtered.filter((pet) => pet.details.animalType === filters.animalType)
      }

      // Age filter
      if (filters.age !== 'all') {
        filtered = filtered.filter((pet) => pet.details.age === filters.age)
      }

      // Gender filter
      if (filters.gender !== 'all') {
        filtered = filtered.filter((pet) => pet.details.gender === filters.gender)
      }

      setFilteredPets(filtered)
    }

    applyFilters()
  }, [pets, searchQuery, filters])

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }))
  }

  return (
    <div className="font-sans w-full bg-gradient-to-b from-accent-bg to-white py-12 px-5">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-dark-80 mb-4">
            Find Your <span className="text-primary">Perfect Companion</span>
          </h1>
          <p className="text-lg text-dark-60 max-w-2xl mx-auto">
            Browse through our collection of adorable pets waiting for their forever homes.
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <Filters filters={filters} onFilterChange={handleFilterChange} />
          </aside>

          {/* Main Content */}
          <main className="flex-1"  style={{flexDirection: 'column' }}>
            {/* Results Count */}
            <div className="mb-6 flex justify-between items-center">
              <p className="text-dark-60">
                <span className="font-bold text-dark-80">{filteredPets.length}</span> pets found
              </p>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : filteredPets.length > 0 ? (
              /* Pet Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredPets.map((pet) => (
                  <PetCard key={pet._id} pet={pet} />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-3xl p-16 text-center shadow-sm">
                <div className="text-6xl mb-6">🔍</div>
                <p className="text-dark-60 mb-6">
                  Try adjusting your filters or search query to find more pets.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setFilters({ animalType: 'all', age: 'all', gender: 'all' })
                  }}
                  className="px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default PetsBrowse
