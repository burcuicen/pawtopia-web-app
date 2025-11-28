import React from 'react'
import { Link } from 'react-router-dom'
import BaseIcon from 'src/components/_base/base-icon'

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: 'mdi:account-plus-outline',
      title: 'Create Account',
      description: 'Sign up in seconds and tell us about your preferences and lifestyle.'
    },
    {
      icon: 'mdi:magnify',
      title: 'Browse & Search',
      description: 'Explore thousands of pets or use our smart filters to find your perfect match.'
    },
    {
      icon: 'mdi:heart-circle-outline',
      title: 'Connect & Meet',
      description: 'Message owners directly, schedule visits, and fall in love with your new friend.'
    },
    {
      icon: 'mdi:home-heart',
      title: 'Adopt & Celebrate',
      description: 'Complete the adoption process and welcome your furry friend to their forever home!'
    }
  ]

  return (
    <section className="font-sans py-24 px-5 bg-gradient-to-br from-primary to-primary-dark text-white relative overflow-hidden">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      
      <div className="w-full max-w-[1200px] mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">How It Works</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Adopting a pet has never been easier. Follow these simple steps to find your new best friend.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-white rounded-full flex justify-center items-center text-primary text-4xl shadow-lg mb-8 relative z-10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary text-primary-dark rounded-full flex justify-center items-center text-sm font-bold shadow-md border-2 border-primary">
                  {index + 1}
                </div>
                <BaseIcon icon={step.icon} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-white/80 leading-relaxed max-w-xs">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <Link 
            to="/signup" 
            className="inline-block px-12 py-5 bg-white text-primary rounded-full font-bold text-xl shadow-xl hover:bg-secondary hover:text-primary-dark hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
          >
            Start Your Journey
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
