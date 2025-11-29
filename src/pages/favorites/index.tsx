import React, { useEffect, useState } from 'react'
import { useApi } from 'src/api/api-context'
import PetCard from '../pets/components/pet-card'
import { Link } from 'react-router-dom'

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const api = useApi()

  const loadFavorites = React.useCallback(async () => {
    try {
      setLoading(true)
      const { err, res } = await api.auth.getFavorites()
      if (!err && res?.data) {
        setFavorites(res.data)
      }
    } catch (error) {
      console.error('Failed to load favorites:', error)
    } finally {
      setLoading(false)
    }
  }, [api.auth])

  useEffect(() => {
    loadFavorites()
  }, [loadFavorites])

  return (
    <div className="font-sans w-full bg-gradient-to-b from-accent-bg to-white py-12 px-5 min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-dark-80 mb-4">
            Your <span className="text-primary">Favorites</span>
          </h1>
          <p className="text-lg text-dark-60 max-w-2xl mx-auto">
            Here are the pets you've fallen in love with.
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : favorites.length > 0 ? (
          /* Pet Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {favorites.map((pet) => (
              <PetCard key={pet._id} pet={pet} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-3xl p-16 text-center shadow-sm max-w-2xl mx-auto">
            <div className="text-6xl mb-6">❤️</div>
            <h3 className="text-2xl font-bold text-dark-80 mb-3">No Favorites Yet</h3>
            <p className="text-dark-60 mb-8">
              Start browsing and heart the pets you love to save them here.
            </p>
            <Link
              to="/pets"
              className="inline-block px-8 py-4 bg-primary text-white rounded-full font-bold shadow-lg hover:bg-primary-dark hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              Browse Pets
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Favorites
