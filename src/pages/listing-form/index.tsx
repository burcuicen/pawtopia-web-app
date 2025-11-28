import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApi } from 'src/api/api-context'
import { showToast } from 'src/utils/toast'

interface ListingFormData {
  title: string
  details: {
    animalType: string
    name: string
    breed: string
    age: string
    gender: string
    description: string
    photos: string[]
    location: {
      country: string
      city: string
    }
    healthDetails: {
      isVaccinated: boolean
      isNeutered: boolean
      isDewormed: boolean
      isHouseTrained: boolean
      hasSpecialNeeds: boolean
    }
    fromWhere: string
  }
  contactDetails: {
    email: string
    phone: string
  }
}

const ListingForm: React.FC = () => {
  const navigate = useNavigate()
  const api = useApi()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<ListingFormData>({
    title: '',
    details: {
      animalType: 'cat',
      name: '',
      breed: '',
      age: 'adult',
      gender: 'male',
      description: '',
      photos: [],
      location: {
        country: '',
        city: '',
      },
      healthDetails: {
        isVaccinated: false,
        isNeutered: false,
        isDewormed: false,
        isHouseTrained: false,
        hasSpecialNeeds: false,
      },
      fromWhere: 'owner',
    },
    contactDetails: {
      email: '',
      phone: '',
    },
  })

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const { err } = await api.listing.create(formData)
      if (!err) {
        showToast.success('Listing created successfully! Waiting for admin approval.')
        navigate('/my-listings')
      } else {
        showToast.error('Failed to create listing. Please try again.')
      }
    } catch (error) {
      showToast.error('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const updateField = (path: string, value: any) => {
    setFormData((prev) => {
      const keys = path.split('.')
      const newData = { ...prev }
      let current: any = newData

      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] }
        current = current[keys[i]]
      }

      current[keys[keys.length - 1]] = value
      return newData
    })
  }

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5))
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

  return (
    <div className="font-sans min-h-screen bg-gradient-to-b from-accent-bg to-white py-12 px-5">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-dark-80 mb-4">
            Create a <span className="text-primary">Listing</span>
          </h1>
          <p className="text-lg text-dark-60">Help a pet find their forever home</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between mb-4">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                  s <= step ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                }`}
              >
                {s}
              </div>
            ))}
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Steps */}
        <div className="bg-white rounded-3xl p-8 shadow-xl">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-dark-80 mb-6">Basic Information</h2>
              
              <div>
                <label className="block text-sm font-semibold text-dark-80 mb-2">Pet Name *</label>
                <input
                  type="text"
                  value={formData.details.name}
                  onChange={(e) => updateField('details.name', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-dark-10 rounded-xl focus:border-primary focus:outline-none"
                  placeholder="e.g., Fluffy"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-dark-80 mb-2">Animal Type *</label>
                <select
                  value={formData.details.animalType}
                  onChange={(e) => updateField('details.animalType', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-dark-10 rounded-xl focus:border-primary focus:outline-none"
                >
                  <option value="cat">Cat</option>
                  <option value="dog">Dog</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-dark-80 mb-2">Breed *</label>
                <input
                  type="text"
                  value={formData.details.breed}
                  onChange={(e) => updateField('details.breed', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-dark-10 rounded-xl focus:border-primary focus:outline-none"
                  placeholder="e.g., Persian, Golden Retriever"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-dark-80 mb-2">Age *</label>
                  <select
                    value={formData.details.age}
                    onChange={(e) => updateField('details.age', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-dark-10 rounded-xl focus:border-primary focus:outline-none"
                  >
                    <option value="baby">Puppy/Kitten</option>
                    <option value="adult">Adult</option>
                    <option value="senior">Senior</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-dark-80 mb-2">Gender *</label>
                  <select
                    value={formData.details.gender}
                    onChange={(e) => updateField('details.gender', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-dark-10 rounded-xl focus:border-primary focus:outline-none"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Description & Location */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-dark-80 mb-6">Description & Location</h2>
              
              <div>
                <label className="block text-sm font-semibold text-dark-80 mb-2">Listing Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-dark-10 rounded-xl focus:border-primary focus:outline-none"
                  placeholder="e.g., Adorable Persian Cat Looking for Home"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-dark-80 mb-2">Description *</label>
                <textarea
                  value={formData.details.description}
                  onChange={(e) => updateField('details.description', e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-dark-10 rounded-xl focus:border-primary focus:outline-none"
                  placeholder="Tell us about this pet's personality, habits, and why they need a new home..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-dark-80 mb-2">Country *</label>
                  <input
                    type="text"
                    value={formData.details.location.country}
                    onChange={(e) => updateField('details.location.country', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-dark-10 rounded-xl focus:border-primary focus:outline-none"
                    placeholder="e.g., Turkey"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-dark-80 mb-2">City *</label>
                  <input
                    type="text"
                    value={formData.details.location.city}
                    onChange={(e) => updateField('details.location.city', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-dark-10 rounded-xl focus:border-primary focus:outline-none"
                    placeholder="e.g., Istanbul"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-dark-80 mb-2">From Where *</label>
                <select
                  value={formData.details.fromWhere}
                  onChange={(e) => updateField('details.fromWhere', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-dark-10 rounded-xl focus:border-primary focus:outline-none"
                >
                  <option value="owner">Owner</option>
                  <option value="shelter">Animal Shelter</option>
                  <option value="foster">Foster Home</option>
                  <option value="stray">Rescued Stray</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 3: Health Details */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-dark-80 mb-6">Health Information</h2>
              
              <div className="space-y-4">
                {[
                  { key: 'isVaccinated', label: 'Vaccinated', icon: '💉' },
                  { key: 'isNeutered', label: 'Neutered/Spayed', icon: '✂️' },
                  { key: 'isDewormed', label: 'Dewormed', icon: '💊' },
                  { key: 'isHouseTrained', label: 'House Trained', icon: '🏠' },
                  { key: 'hasSpecialNeeds', label: 'Has Special Needs', icon: '⚠️' },
                ].map((item) => (
                  <label key={item.key} className="flex items-center gap-4 p-4 border-2 border-dark-10 rounded-xl cursor-pointer hover:border-primary transition-colors">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="flex-1 font-semibold text-dark-80">{item.label}</span>
                    <input
                      type="checkbox"
                      checked={formData.details.healthDetails[item.key as keyof typeof formData.details.healthDetails]}
                      onChange={(e) => updateField(`details.healthDetails.${item.key}`, e.target.checked)}
                      className="w-6 h-6 text-primary focus:ring-primary"
                    />
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Contact Info */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-dark-80 mb-6">Contact Information</h2>
              
              <div>
                <label className="block text-sm font-semibold text-dark-80 mb-2">Email *</label>
                <input
                  type="email"
                  value={formData.contactDetails.email}
                  onChange={(e) => updateField('contactDetails.email', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-dark-10 rounded-xl focus:border-primary focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-dark-80 mb-2">Phone *</label>
                <input
                  type="tel"
                  value={formData.contactDetails.phone}
                  onChange={(e) => updateField('contactDetails.phone', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-dark-10 rounded-xl focus:border-primary focus:outline-none"
                  placeholder="+90 555 123 4567"
                />
              </div>
            </div>
          )}

          {/* Step 5: Review */}
          {step === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-dark-80 mb-6">Review Your Listing</h2>
              
              <div className="space-y-4 text-sm">
                <div className="p-4 bg-accent-bg rounded-xl">
                  <div className="font-bold text-dark-80 mb-2">Pet Information</div>
                  <div className="text-dark-60">
                    <strong>{formData.details.name}</strong> - {formData.details.breed} ({formData.details.animalType})
                  </div>
                </div>

                <div className="p-4 bg-accent-bg rounded-xl">
                  <div className="font-bold text-dark-80 mb-2">Location</div>
                  <div className="text-dark-60">
                    {formData.details.location.city}, {formData.details.location.country}
                  </div>
                </div>

                <div className="p-4 bg-accent-bg rounded-xl">
                  <div className="font-bold text-dark-80 mb-2">Contact</div>
                  <div className="text-dark-60">
                    {formData.contactDetails.email} | {formData.contactDetails.phone}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
                <div className="flex gap-2">
                  <span>ℹ️</span>
                  <div className="text-sm text-yellow-800">
                    Your listing will be reviewed by our team before being published. You'll be notified once it's approved.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-dark-10">
            <button
              onClick={prevStep}
              disabled={step === 1}
              className="px-6 py-3 bg-gray-200 text-dark-80 rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
            >
              ← Previous
            </button>

            {step < 5 ? (
              <button
                onClick={nextStep}
                className="px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-colors"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-8 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Submitting...' : 'Submit Listing'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListingForm
