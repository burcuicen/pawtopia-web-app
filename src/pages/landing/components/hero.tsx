import React from 'react'
import { Link } from 'react-router-dom'

const Hero: React.FC = () => {
  return (
    <section className="font-sans relative flex justify-center items-center w-full min-h-[70vh] px-5 py-16 bg-gradient-to-br from-accent-bg to-white overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-light/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Content */}
        <div className="flex flex-col gap-6 text-center md:text-left">
          <div className="flex flex-col leading-tight">
            <span className="text-4xl md:text-5xl lg:text-6xl font-light text-dark-80">
              Find your new
            </span>
            <span className="text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-dark via-primary to-primary-light">
              Best Friend
            </span>
          </div>
          
          <p className="text-lg md:text-xl text-dark-60 max-w-lg mx-auto md:mx-0 leading-relaxed">
            Pawtopia connects you with loving pets waiting for a forever home. 
            Discover the joy of adoption and make a difference today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-4">
            <Link 
              to="/signup" 
              className="px-8 py-4 bg-primary text-white rounded-full font-bold text-lg shadow-lg hover:bg-primary-dark hover:-translate-y-1 hover:shadow-xl transition-all duration-300 text-center"
            >
              Get Started
            </Link>
            <Link 
              to="/about" 
              className="px-8 py-4 bg-white text-primary border-2 border-primary/20 rounded-full font-bold text-lg shadow-md hover:bg-accent-bg hover:-translate-y-1 hover:shadow-lg transition-all duration-300 text-center"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="relative flex justify-center items-center">
          <div className="absolute w-full h-full bg-gradient-to-tr from-secondary/20 to-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <img 
            src={require('../../../assets/hero-img.png')} 
            alt="Happy Dog" 
            className="relative z-10 max-w-full h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-500" 
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
