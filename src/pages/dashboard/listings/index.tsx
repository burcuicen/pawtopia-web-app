import React, { useEffect, useState } from 'react'
import { useApi } from 'src/api/api-context'
import { showToast } from 'src/utils/toast'
import BaseButton from 'src/components/_base/base-button'

const DashboardListings: React.FC = () => {
  const api = useApi()
  const [pendingListings, setPendingListings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedListing, setSelectedListing] = useState<any | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    loadPendingListings()
  }, [])

  const loadPendingListings = async () => {
    try {
      const { err, res } = await api.listing.getAll()
      if (!err && res?.data) {
        // The API returns { items: [], metaData: {} }, so we need to access .items
        const items = res.data.items || []
        const pending = items.filter((l: any) => !l.isApproved)
        setPendingListings(pending)
      }
    } catch (error) {
      console.error('Failed to load pending listings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (id: string) => {
    try {
      const { err } = await api.listing.approve(id)
      if (!err) {
        showToast.success('Listing approved successfully')
        setPendingListings((prev) => prev.filter((l) => l._id !== id))
        setShowModal(false)
      } else {
        showToast.error('Failed to approve listing')
      }
    } catch (error) {
      showToast.error('An error occurred')
    }
  }

  const handleReject = async (id: string) => {
    try {
      const { err } = await api.listing.reject(id)
      if (!err) {
        showToast.success('Listing rejected successfully')
        setPendingListings((prev) => prev.filter((l) => l._id !== id))
        setShowModal(false)
      } else {
        showToast.error('Failed to reject listing')
      }
    } catch (error) {
      showToast.error('An error occurred')
    }
  }

  const handleSeed = async () => {
    try {
      setLoading(true)
      const { err } = await api.listing.seed()
      if (!err) {
        showToast.success('Database seeded successfully')
        loadPendingListings()
      } else {
        showToast.error('Failed to seed database')
      }
    } catch (error) {
      showToast.error('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const openModal = (listing: any) => {
    setSelectedListing(listing)
    setShowModal(true)
  }

  return (
    <div className="w-full">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-dark-80 mb-2">Listings Management</h1>
          <p className="text-dark-60">Review and manage listing approvals</p>
        </div>
        <BaseButton
          title="Seed Database"
          type="default"
          onClick={handleSeed}
        />
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-dark-80 mb-6">
          Pending Approvals ({pendingListings.length})
        </h2>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : pendingListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingListings.map((listing) => (
              <div key={listing._id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow bg-white">
                {/* Photo */}
                {listing.details.photos && listing.details.photos.length > 0 ? (
                  <img 
                    src={listing.details.photos[0]} 
                    alt={listing.details.name}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">
                    No Photo
                  </div>
                )}
                
                {/* Content */}
                <div className="p-4">
                  <div className="font-bold text-lg text-dark-80 mb-1">{listing.details.name}</div>
                  <div className="text-sm text-dark-60 mb-2">
                    {listing.details.breed} • {listing.details.animalType}
                  </div>
                  <div className="text-sm text-dark-40 mb-4">
                    📍 {listing.details.location.city}, {listing.details.location.country}
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => openModal(listing)}
                      className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors text-sm"
                    >
                      Review
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-dark-60 bg-gray-50 rounded-xl">
            <div className="text-4xl mb-4">✅</div>
            <p>No pending listings to review</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {showModal && selectedListing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold text-dark-80">{selectedListing.title}</h2>
                <button onClick={() => setShowModal(false)} className="text-dark-40 hover:text-dark-80 text-2xl">×</button>
              </div>

              {/* Photos */}
              {selectedListing.details.photos && selectedListing.details.photos.length > 0 && (
                <div className="mb-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedListing.details.photos.map((photo: string, idx: number) => (
                    <img key={idx} src={photo} alt={`Photo ${idx + 1}`} className="w-full h-48 object-cover rounded-xl" />
                  ))}
                </div>
              )}

              {/* Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-bold text-dark-80 mb-3">Pet Information</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Name:</strong> {selectedListing.details.name}</div>
                    <div><strong>Type:</strong> {selectedListing.details.animalType}</div>
                    <div><strong>Breed:</strong> {selectedListing.details.breed}</div>
                    <div><strong>Age:</strong> {selectedListing.details.age}</div>
                    <div><strong>Gender:</strong> {selectedListing.details.gender}</div>
                    <div><strong>From:</strong> {selectedListing.details.fromWhere}</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-dark-80 mb-3">Health Details</h3>
                  <div className="space-y-2 text-sm">
                    <div>{selectedListing.details.healthDetails.isVaccinated ? '✅' : '❌'} Vaccinated</div>
                    <div>{selectedListing.details.healthDetails.isNeutered ? '✅' : '❌'} Neutered/Spayed</div>
                    <div>{selectedListing.details.healthDetails.isDewormed ? '✅' : '❌'} Dewormed</div>
                    <div>{selectedListing.details.healthDetails.isHouseTrained ? '✅' : '❌'} House Trained</div>
                    <div>{selectedListing.details.healthDetails.hasSpecialNeeds ? '✅' : '❌'} Has Special Needs</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-dark-80 mb-3">Location</h3>
                  <div className="text-sm">
                    {selectedListing.details.location.city}, {selectedListing.details.location.country}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-dark-80 mb-3">Contact</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Email:</strong> {selectedListing.contactDetails.email}</div>
                    <div><strong>Phone:</strong> {selectedListing.contactDetails.phone}</div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-dark-80 mb-3">Description</h3>
                <p className="text-sm text-dark-60">{selectedListing.details.description}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-4 justify-end pt-6 border-t border-gray-200">
                <BaseButton
                  title="Reject"
                  type="outline"
                  onClick={() => handleReject(selectedListing._id)}
                />
                <BaseButton
                  title="Approve"
                  type="default"
                  onClick={() => handleApprove(selectedListing._id)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardListings
