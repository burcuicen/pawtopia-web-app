import React from 'react'
import { Link } from 'react-router-dom'

const NotFound: React.FC = () => {
  return (
    <div className="font-sans w-full bg-gradient-to-b from-accent-bg to-white flex items-center justify-center px-5">
      <div className="text-center">
        <div className="text-9xl font-bold text-primary mb-4">404</div>
        <h1 className="text-4xl font-bold text-dark-80 mb-4">Page Not Found</h1>
        <p className="text-xl text-dark-60 mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <div className="text-6xl mb-8">🐾</div>
        <Link
          to="/"
          className="inline-block px-8 py-4 bg-primary text-white rounded-full font-bold hover:bg-primary-dark hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
