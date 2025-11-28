import React from 'react'
import BaseIcon from 'src/components/_base/base-icon'

const Features: React.FC = () => {
  const features = [
    {
      icon: 'mdi:heart-outline',
      title: 'Find Your Match',
      description: 'Advanced matching system to find the perfect pet companion for your lifestyle and preferences.'
    },
    {
      icon: 'mdi:shield-check-outline',
      title: 'Verified Listings',
      description: 'All pet listings are verified and monitored to ensure safe and trustworthy adoptions.'
    },
    {
      icon: 'mdi:chat-processing-outline',
      title: 'Direct Communication',
      description: 'Connect directly with pet owners and shelters through our secure messaging system.'
    },
    {
      icon: 'mdi:file-document-outline',
      title: 'Easy Process',
      description: 'Simple and straightforward adoption process with guided steps and helpful resources.'
    },
    {
      icon: 'mdi:account-heart-outline',
      title: 'Support Community',
      description: 'Join a community of pet lovers, get advice, and share your adoption journey.'
    },
    {
      icon: 'mdi:paw',
      title: 'Multiple Species',
      description: 'Find cats, dogs, and other wonderful animals all looking for their forever homes.'
    }
  ]

  return (
    <section className="font-sans py-20 px-5 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-secondary-light/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-light/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="w-full max-w-[1200px] mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-dark-80 mb-4">
            Why Choose <span className="text-primary">Pawtopia?</span>
          </h2>
          <p className="text-lg text-dark-60 max-w-2xl mx-auto">
            We're more than just an adoption platform. We're a community dedicated to animal welfare.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-accent-bg rounded-full flex justify-center items-center mb-6 text-primary text-2xl shadow-sm group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-300">
                <BaseIcon icon={feature.icon} />
              </div>
              <h3 className="text-xl font-bold text-dark-80 mb-3 group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-dark-60 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
