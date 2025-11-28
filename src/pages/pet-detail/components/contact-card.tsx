import React from 'react'
import { showToast } from 'src/utils/toast'

interface ContactCardProps {
  contactDetails: {
    email: string
    phone: string
  }
  createdBy: {
    name: string
  }
  location: {
    city: string
    country: string
  }
}

const ContactCard: React.FC<ContactCardProps> = ({ contactDetails, createdBy, location }) => {
  const handleContact = (type: 'email' | 'phone') => {
    if (type === 'email') {
      window.location.href = `mailto:${contactDetails.email}`
    } else {
      showToast.info(`Phone: ${contactDetails.phone}`)
    }
  }

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl sticky top-6">
      <h2 className="text-2xl font-bold text-dark-80 mb-6">Contact Owner</h2>

      {/* Owner Info */}
      <div className="mb-6 pb-6 border-b border-dark-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {createdBy.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-bold text-dark-80">{createdBy.name}</div>
            <div className="text-sm text-dark-60">Pet Guardian</div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-dark-60">
          <span>📍</span>
          <span>
            {location.city}, {location.country}
          </span>
        </div>
      </div>

      {/* Contact Buttons */}
      <div className="space-y-3">
        <button
          onClick={() => handleContact('email')}
          className="w-full px-6 py-4 bg-primary text-white rounded-full font-bold hover:bg-primary-dark hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
        >
          <span>📧</span>
          <span>Send Email</span>
        </button>
        <button
          onClick={() => handleContact('phone')}
          className="w-full px-6 py-4 bg-secondary text-primary-dark rounded-full font-bold hover:bg-secondary-dark hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
        >
          <span>📞</span>
          <span>Call Owner</span>
        </button>
      </div>

      {/* Contact Info */}
      <div className="mt-6 pt-6 border-t border-dark-10 space-y-3">
        <div className="text-sm">
          <div className="text-dark-40 mb-1">Email</div>
          <div className="text-dark-80 font-medium break-all">{contactDetails.email}</div>
        </div>
        <div className="text-sm">
          <div className="text-dark-40 mb-1">Phone</div>
          <div className="text-dark-80 font-medium">{contactDetails.phone}</div>
        </div>
      </div>

      {/* Safety Notice */}
      <div className="mt-6 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-2xl">
        <div className="flex gap-2">
          <span className="text-xl">⚠️</span>
          <div className="text-xs text-yellow-800">
            <div className="font-bold mb-1">Safety Tips</div>
            <ul className="list-disc list-inside space-y-1">
              <li>Meet in a public place</li>
              <li>Bring a friend</li>
              <li>Never send money upfront</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactCard
