import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApi } from 'src/api/api-context'
import { showToast } from 'src/utils/toast'

const MyListings: React.FC = () => {
  const navigate = useNavigate()
  const api = useApi()
  const [listings, setListings] = useState<any[]>([])
  const [filter, setFilter] = useState<'all' | 'approved' | 'pending'>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadListings()
  }, [])

  const loadListings = async () => {
    try {
      const { err, res } = await api.listing.getUsersListings()
      if (!err && res?.data) {
        // Backend returns { items: [], metaData: {} }
        const listingsData = res.data.items || []
        setListings(listingsData)
      }
    } catch (error) {
      console.error('Failed to load listings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return

    try {
      const { err } = await api.listing.delete(id)
      if (!err) {
        showToast.success('Listing deleted successfully')
        setListings((prev) => prev.filter((l) => l._id !== id))
      } else {
        showToast.error('Failed to delete listing')
      }
    } catch (error) {
      showToast.error('An error occurred')
    }
  }

  const filteredListings = listings.filter((listing) => {
    if (filter === 'all') return true
    if (filter === 'approved') return listing.isApproved
    if (filter === 'pending') return !listing.isApproved
    return true
  })

  return (
    <div className="font-sans w-full bg-gradient-to-b from-accent-bg to-white py-12 px-5">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-dark-80 mb-4">
            My <span className="text-primary">Listings</span>
          </h1>
          <p className="text-lg text-dark-60">Manage all your pet listings</p>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-8">
          {[
            { value: 'all', label: 'All' },
            { value: 'approved', label: 'Approved' },
            { value: 'pending', label: 'Pending' },
          ].map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value as any)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                filter === f.value
                  ? 'bg-primary text-white'
                  : 'bg-white text-dark-80 hover:bg-accent-bg'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Listings Grid */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <div key={listing._id} className="bg-white rounded-3xl overflow-hidden shadow-xl">
                <div className="relative h-48 bg-dark-10">
                  <img
                    src={listing.details.photos?.[0] || 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400'}
                    alt={listing.details.name}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${listing.isApproved ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'}`}>
                    {listing.isApproved ? 'Approved' : 'Pending'}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-dark-80 mb-2">{listing.details.name}</h3>
                  <p className="text-dark-60 mb-4">{listing.details.breed}</p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/edit-listing/${listing._id}`)}
                      className="flex-1 px-4 py-2 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(listing._id)}
                      className="flex-1 px-4 py-2 bg-red-500 text-white rounded-full font-semibold hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-16 text-center shadow-sm">
            <div className="text-6xl mb-6">📝</div>
            <h3 className="text-2xl font-bold text-dark-80 mb-3">No Listings Found</h3>
            <p className="text-dark-60 mb-6">Create your first listing to get started!</p>
            <button
              onClick={() => navigate('/listing-form')}
              className="px-8 py-4 bg-primary text-white rounded-full font-bold hover:bg-primary-dark transition-colors"
            >
              Create Listing
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyListings
