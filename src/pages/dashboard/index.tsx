import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useApi } from 'src/api/api-context'

const Dashboard: React.FC = () => {
  const api = useApi()
  const [stats, setStats] = useState({
    myListings: 0,
    pendingListings: 0,
    approvedListings: 0,
  })
  const [recentListings, setRecentListings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const { err, res } = await api.listing.getUsersListings()
      if (!err && res?.data) {
        const listings = res.data
        setRecentListings(listings.slice(0, 3))
        setStats({
          myListings: listings.length,
          pendingListings: listings.filter((l: any) => !l.isApproved).length,
          approvedListings: listings.filter((l: any) => l.isApproved).length,
        })
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="font-sans min-h-screen bg-gradient-to-b from-accent-bg to-white py-12 px-5">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-dark-80 mb-4">
            Welcome to Your <span className="text-primary">Dashboard</span>
          </h1>
          <p className="text-lg text-dark-60">Manage your listings and track your impact</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <div className="text-4xl mb-4">📋</div>
            <div className="text-3xl font-bold text-dark-80 mb-2">{stats.myListings}</div>
            <div className="text-dark-60">Total Listings</div>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <div className="text-4xl mb-4">⏳</div>
            <div className="text-3xl font-bold text-yellow-600 mb-2">{stats.pendingListings}</div>
            <div className="text-dark-60">Pending Approval</div>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <div className="text-4xl mb-4">✅</div>
            <div className="text-3xl font-bold text-green-600 mb-2">{stats.approvedListings}</div>
            <div className="text-dark-60">Approved</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-3xl p-8 shadow-xl mb-12">
          <h2 className="text-2xl font-bold text-dark-80 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/listing/create"
              className="p-6 bg-primary text-white rounded-2xl font-semibold hover:bg-primary-dark transition-all text-center"
            >
              ➕ Create New Listing
            </Link>
            <Link
              to="/my-listings"
              className="p-6 bg-secondary text-primary-dark rounded-2xl font-semibold hover:bg-secondary-dark transition-all text-center"
            >
              📋 View My Listings
            </Link>
            <Link
              to="/pets"
              className="p-6 bg-accent-bg text-primary rounded-2xl font-semibold hover:bg-primary hover:text-white transition-all text-center"
            >
              🔍 Browse Pets
            </Link>
          </div>
        </div>

        {/* Recent Listings */}
        <div className="bg-white rounded-3xl p-8 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-dark-80">Recent Listings</h2>
            <Link to="/my-listings" className="text-primary hover:text-primary-dark font-semibold">
              View All →
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : recentListings.length > 0 ? (
            <div className="space-y-4">
              {recentListings.map((listing) => (
                <div key={listing._id} className="flex items-center gap-4 p-4 border-2 border-dark-10 rounded-2xl hover:border-primary transition-colors">
                  <div className="flex-1">
                    <div className="font-bold text-dark-80">{listing.details.name}</div>
                    <div className="text-sm text-dark-60">{listing.details.breed}</div>
                  </div>
                  <div className={`px-4 py-2 rounded-full text-sm font-semibold ${listing.isApproved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {listing.isApproved ? 'Approved' : 'Pending'}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-dark-60">
              <div className="text-4xl mb-4">📝</div>
              <p>No listings yet. Create your first listing!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
