import React from 'react'
import { Link } from 'react-router-dom'

const About: React.FC = () => {
  return (
    <div className="font-sans min-h-screen bg-gradient-to-b from-accent-bg to-white py-12 px-5">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-dark-80 mb-4">
            About <span className="text-primary">Pawtopia</span>
          </h1>
          <p className="text-xl text-dark-60">
            Connecting loving pets with caring families
          </p>
        </div>

        {/* Mission */}
        <div className="bg-white rounded-3xl p-12 shadow-xl mb-12">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">❤️</div>
            <h2 className="text-3xl font-bold text-dark-80 mb-4">Our Mission</h2>
          </div>
          <p className="text-lg text-dark-60 leading-relaxed text-center max-w-2xl mx-auto">
            Pawtopia is dedicated to helping street animals and pets in need find their forever homes. 
            We believe every animal deserves love, care, and a safe place to call home. Our platform 
            connects compassionate adopters with pets waiting for a second chance at happiness.
          </p>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-3xl p-12 shadow-xl mb-12">
          <h2 className="text-3xl font-bold text-dark-80 mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-dark-80 mb-2">Browse</h3>
              <p className="text-dark-60">
                Explore our collection of adorable pets looking for homes
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">💬</div>
              <h3 className="text-xl font-bold text-dark-80 mb-2">Connect</h3>
              <p className="text-dark-60">
                Reach out to pet owners and shelters directly
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🏠</div>
              <h3 className="text-xl font-bold text-dark-80 mb-2">Adopt</h3>
              <p className="text-dark-60">
                Welcome your new furry friend to their forever home
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="bg-white rounded-3xl p-12 shadow-xl mb-12">
          <h2 className="text-3xl font-bold text-dark-80 mb-8 text-center">Our Values</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="text-3xl">🐾</div>
              <div>
                <h3 className="text-xl font-bold text-dark-80 mb-2">Animal Welfare First</h3>
                <p className="text-dark-60">
                  Every decision we make prioritizes the well-being and happiness of animals.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">🤝</div>
              <div>
                <h3 className="text-xl font-bold text-dark-80 mb-2">Community Driven</h3>
                <p className="text-dark-60">
                  We're building a community of animal lovers working together for a common cause.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">✨</div>
              <div>
                <h3 className="text-xl font-bold text-dark-80 mb-2">Transparency</h3>
                <p className="text-dark-60">
                  All listings are verified and monitored to ensure safe, trustworthy adoptions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-12 text-center text-white shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join our community and help a pet find their forever home today.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/pets"
              className="px-8 py-4 bg-white text-primary rounded-full font-bold hover:bg-secondary transition-all"
            >
              Browse Pets
            </Link>
            <Link
              to="/signup"
              className="px-8 py-4 bg-secondary text-primary-dark rounded-full font-bold hover:bg-secondary-light transition-all"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
