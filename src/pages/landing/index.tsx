import React from 'react'

import './styles.scss'

import Hero from './components/hero'
import FeaturedPets from './components/featured-pets'
import Features from './components/features'
import HowItWorks from './components/how-it-works'
import Newsletter from './components/newsletter'

const Landing: React.FC = () => {
  return (
    <div className="landing">
      <Hero />
      <FeaturedPets />
      <Features />
      <HowItWorks />
      <Newsletter />
    </div>
  )
}

export default Landing
