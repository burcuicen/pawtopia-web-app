import React from 'react'
import { Link } from 'react-router-dom'

const About: React.FC = () => {
  const stats = [
    { number: '1000+', label: 'Pets Adopted', icon: '🏠' },
    { number: '500+', label: 'Active Listings', icon: '📝' },
    { number: '2000+', label: 'Happy Families', icon: '❤️' },
    { number: '50+', label: 'Partner Shelters', icon: '🤝' }
  ]

  const team = [
    {
      role: 'PawSeeker',
      title: 'Looking for Love',
      description: 'Find your perfect companion from our verified listings',
      icon: '🔍',
      color: 'from-blue-400 to-blue-600'
    },
    {
      role: 'PawGuardian',
      title: 'Helping Pets',
      description: 'List pets in need and connect them with loving families',
      icon: '🛡️',
      color: 'from-green-400 to-green-600'
    },
    {
      role: 'PawAdmin',
      title: 'Ensuring Safety',
      description: 'Moderating listings to maintain trust and quality',
      icon: '✅',
      color: 'from-purple-400 to-purple-600'
    }
  ]

  return (
    <div className="font-sans w-full bg-gradient-to-b from-accent-bg to-white py-12 px-5">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <span className="text-6xl">🐾</span>
          </div>
          <h1 className="text-6xl font-bold text-dark-80 mb-6">
            About <span className="text-primary">Pawtopia</span>
          </h1>
          <p className="text-2xl text-dark-60 max-w-3xl mx-auto leading-relaxed">
            Where paws and hearts meet. We're on a mission to ensure every street cat 
            finds a safe and loving home.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-sm text-dark-60 font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission Section */}
        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-12 mb-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">❤️</div>
              <h2 className="text-4xl font-bold text-dark-80 mb-6">Our Mission</h2>
            </div>
            <p className="text-lg text-dark-60 leading-relaxed text-center mb-6">
              Pawtopia is a web platform designed to ensure that street cats find safe and loving homes. 
              We prioritize animal love and welfare, aiming to improve the living conditions of street cats 
              and help them find permanent, healthy homes.
            </p>
            <p className="text-lg text-dark-60 leading-relaxed text-center">
              Our platform not only facilitates the animal adoption process but also provides awareness 
              and education on pet care and welfare. We believe every animal deserves a second chance 
              at happiness.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-dark-80 mb-12 text-center">How Pawtopia Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2">
              <div className="text-6xl mb-4 text-center">🔍</div>
              <h3 className="text-2xl font-bold text-dark-80 mb-4 text-center">Browse & Search</h3>
              <p className="text-dark-60 text-center leading-relaxed">
                Explore our collection of adorable pets. Use advanced filters to find your perfect match 
                based on location, age, breed, and health status.
              </p>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2">
              <div className="text-6xl mb-4 text-center">💬</div>
              <h3 className="text-2xl font-bold text-dark-80 mb-4 text-center">Connect & Chat</h3>
              <p className="text-dark-60 text-center leading-relaxed">
                Reach out to PawGuardians directly through our messaging system. Ask questions, 
                schedule visits, and learn more about your future companion.
              </p>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2">
              <div className="text-6xl mb-4 text-center">🏠</div>
              <h3 className="text-2xl font-bold text-dark-80 mb-4 text-center">Adopt & Love</h3>
              <p className="text-dark-60 text-center leading-relaxed">
                Complete the adoption process and welcome your new furry friend home. 
                Access our resources for post-adoption care and support.
              </p>
            </div>
          </div>
        </div>

        {/* Community Roles */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-dark-80 mb-12 text-center">Our Community</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div 
                key={index}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
              >
                <div className={`bg-gradient-to-br ${member.color} p-8 text-center`}>
                  <div className="text-6xl mb-4">{member.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">{member.role}</h3>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-dark-80 mb-3">{member.title}</h4>
                  <p className="text-dark-60 leading-relaxed">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-white rounded-3xl p-12 shadow-xl mb-20">
          <h2 className="text-4xl font-bold text-dark-80 mb-12 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4 p-6 rounded-2xl hover:bg-accent-bg transition-colors">
              <div className="text-4xl flex-shrink-0">🐾</div>
              <div>
                <h3 className="text-xl font-bold text-dark-80 mb-2">Animal Welfare First</h3>
                <p className="text-dark-60 leading-relaxed">
                  Every decision we make prioritizes the well-being, safety, and happiness of animals. 
                  Their needs always come first.
                </p>
              </div>
            </div>
            <div className="flex gap-4 p-6 rounded-2xl hover:bg-accent-bg transition-colors">
              <div className="text-4xl flex-shrink-0">🤝</div>
              <div>
                <h3 className="text-xl font-bold text-dark-80 mb-2">Community Driven</h3>
                <p className="text-dark-60 leading-relaxed">
                  We're building a passionate community of animal lovers working together 
                  to make a real difference in pets' lives.
                </p>
              </div>
            </div>
            <div className="flex gap-4 p-6 rounded-2xl hover:bg-accent-bg transition-colors">
              <div className="text-4xl flex-shrink-0">✨</div>
              <div>
                <h3 className="text-xl font-bold text-dark-80 mb-2">Transparency & Trust</h3>
                <p className="text-dark-60 leading-relaxed">
                  All listings are verified and monitored by our PawAdmins to ensure 
                  safe, trustworthy, and ethical adoptions.
                </p>
              </div>
            </div>
            <div className="flex gap-4 p-6 rounded-2xl hover:bg-accent-bg transition-colors">
              <div className="text-4xl flex-shrink-0">📚</div>
              <div>
                <h3 className="text-xl font-bold text-dark-80 mb-2">Education & Support</h3>
                <p className="text-dark-60 leading-relaxed">
                  We provide resources, guides, and ongoing support to help families 
                  become the best pet parents they can be.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Street Cats */}
        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl p-12 mb-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-6xl mb-6">🐱</div>
            <h2 className="text-4xl font-bold text-dark-80 mb-6">Why Street Cats?</h2>
            <p className="text-lg text-dark-60 leading-relaxed mb-6">
              Street cats face numerous challenges - hunger, disease, harsh weather, and danger. 
              Many are abandoned pets or born on the streets, deserving of love and care just like any other animal.
            </p>
            <p className="text-lg text-dark-60 leading-relaxed">
              By focusing on street cats, Pawtopia helps reduce the stray population, improves animal welfare, 
              and gives these beautiful creatures a chance at the life they deserve. <strong>Every adoption saves a life.</strong>
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join our community of animal lovers and help a pet find their forever home today. 
            Every action counts, every adoption matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/pets"
              className="px-10 py-4 bg-white text-primary rounded-full font-bold text-lg hover:bg-secondary hover:scale-105 transition-all shadow-lg"
            >
              Browse Pets 🔍
            </Link>
            <Link
              to="/create-listing"
              className="px-10 py-4 bg-secondary text-primary-dark rounded-full font-bold text-lg hover:bg-secondary-light hover:scale-105 transition-all shadow-lg"
            >
              List a Pet 📝
            </Link>
            <Link
              to="/signup"
              className="px-10 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-primary hover:scale-105 transition-all"
            >
              Join Us 🚀
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
