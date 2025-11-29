import React, { useEffect, useState } from 'react'
import { useApi } from 'src/api/api-context'
import { showToast } from 'src/utils/toast'
import BaseButton from 'src/components/_base/base-button'

const AdminDashboard: React.FC = () => {
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
        const pending = res.data.filter((l: any) => !l.isApproved)
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

  const openModal = (listing: any) => {
    setSelectedListing(listing)
    setShowModal(true)
  }

  return (
    <div className="font-sans w-full bg-gradient-to-b from-accent-bg to-white py-12 px-5">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-dark-80 mb-4">
            Admin <span className="text-primary">Dashboard</span>
          </h1>
          <p className="text-lg text-dark-60">Manage platform listings and users</p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-dark-80 mb-6">
            Pending Approvals ({pendingListings.length})
          </h2>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : pendingListings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingListings.map((listing) => (
                <div key={listing._id} className="border-2 border-dark-10 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Photo */}
                  {listing.details.photos && listing.details.photos.length > 0 ? (
                    <img 
                      src={listing.details.photos[0]} 
                      alt={listing.details.name}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400">
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
                        className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors text-sm"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-dark-60">
              <div className="text-4xl mb-4">✅</div>
              <p>No pending listings to review</p>
            </div>
          )}
        </div>
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

export default AdminDashboard
