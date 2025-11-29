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
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    animalType: 'all',
    age: 'all',
    gender: 'all',
  })
  
  // Pagination state
  const [page, setPage] = useState(1)
  const [limit] = useState(9)
  const [totalCount, setTotalCount] = useState(0)

  const api = useApi()

  const loadPets = React.useCallback(async () => {
    try {
      setLoading(true)
      
      // Construct filter object
      const filter: any = {
        isApproved: true,
        'details.photos.0': { $exists: true, $ne: '' } // Ensure photos exist
      }

      if (filters.animalType !== 'all') filter['details.animalType'] = filters.animalType
      if (filters.age !== 'all') filter['details.age'] = filters.age
      if (filters.gender !== 'all') filter['details.gender'] = filters.gender

      const skip = (page - 1) * limit

      const { err, res } = await api.listing.getAll({
        skip,
        limit,
        filter: JSON.stringify(filter),
        text: searchQuery
      })

      if (!err && res?.data) {
        setPets(res.data.items || [])
        setTotalCount(res.data.metaData?.totalCount || 0)
      }
    } catch (error) {
      console.error('Failed to load pets:', error)
    } finally {
      setLoading(false)
    }
  }, [api.listing, page, limit, filters, searchQuery])

  useEffect(() => {
    loadPets()
  }, [loadPets])

  // Reset page when filters change
  useEffect(() => {
    setPage(1)
  }, [filters, searchQuery])

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
          <main className="flex-1" style={{ flexDirection: 'column' }}>
            {/* Results Count */}
            <div className="mb-6 flex justify-between items-center">
              <p className="text-dark-60">
                <span className="font-bold text-dark-80">{totalCount}</span> pets found
              </p>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : pets.length > 0 ? (
              <>
                {/* Pet Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {pets.map((pet) => (
                    <PetCard key={pet._id} pet={pet} />
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalCount > 0 && (
                  <div className="flex justify-center items-center mt-12 gap-4">
                    <button
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className={`px-6 py-2 rounded-full font-medium transition-colors ${
                        page === 1 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : 'bg-white border border-gray-200 text-dark-80 hover:bg-gray-50 hover:border-primary hover:text-primary'
                      }`}
                    >
                      Previous
                    </button>
                    
                    <span className="text-dark-60 font-medium">
                      Page {page} of {Math.ceil(totalCount / limit)}
                    </span>

                    <button
                      onClick={() => setPage(p => p + 1)}
                      disabled={page * limit >= totalCount}
                      className={`px-6 py-2 rounded-full font-medium transition-colors ${
                        page * limit >= totalCount
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : 'bg-white border border-gray-200 text-dark-80 hover:bg-gray-50 hover:border-primary hover:text-primary'
                      }`}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
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
