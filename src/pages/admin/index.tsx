import React, { useEffect, useState } from 'react'
import { useApi } from 'src/api/api-context'
import { showToast } from 'src/utils/toast'

const AdminDashboard: React.FC = () => {
  const api = useApi()
  const [pendingListings, setPendingListings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

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
      } else {
        showToast.error('Failed to approve listing')
      }
    } catch (error) {
      showToast.error('An error occurred')
    }
  }

  return (
    <div className="font-sans min-h-screen bg-gradient-to-b from-accent-bg to-white py-12 px-5">
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
            <div className="space-y-4">
              {pendingListings.map((listing) => (
                <div key={listing._id} className="flex items-center gap-4 p-4 border-2 border-dark-10 rounded-2xl">
                  <div className="flex-1">
                    <div className="font-bold text-dark-80">{listing.details.name}</div>
                    <div className="text-sm text-dark-60">
                      {listing.details.breed} - {listing.details.location.city}
                    </div>
                  </div>
                  <button
                    onClick={() => handleApprove(listing._id)}
                    className="px-6 py-2 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transition-colors"
                  >
                    Approve
                  </button>
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
    </div>
  )
}

export default AdminDashboard
