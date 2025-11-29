import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useApi } from 'src/api/api-context'
import { showToast } from 'src/utils/toast'
import PInput from 'src/components/p-input'
import PDropdown from 'src/components/p-dropdown'
import PhotoUpload from 'src/components/photo-upload'
import BaseButton from 'src/components/_base/base-button'
import { Country, State } from 'country-state-city'

interface DropdownItem {
  id: string
  value: string
}

const EditListing: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const api = useApi()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [countries, setCountries] = useState<DropdownItem[]>([])
  const [cities, setCities] = useState<DropdownItem[]>([])
  const [selectedCountry, setSelectedCountry] = useState<DropdownItem | null>(null)
  const [selectedCity, setSelectedCity] = useState<DropdownItem | null>(null)
  const [formData, setFormData] = useState<any>({
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

  useEffect(() => {
    loadCountries()
    if (id) {
      loadListing(id)
    }
  }, [id])

  const loadCountries = () => {
    const countryItems = Country.getAllCountries().map((country): DropdownItem => ({
      id: country.isoCode,
      value: `${country.flag}  ${country.name}`
    }))
    setCountries(countryItems)
  }

  const handleCountrySelect = (item: DropdownItem) => {
    const country = Country.getCountryByCode(item.id)
    setSelectedCountry(item)
    updateField('details.location.country', country?.name || '')

    setCities([])
    setSelectedCity(null)
    updateField('details.location.city', '')

    if (country) {
      const cityItems = State.getStatesOfCountry(country.isoCode).map((city): DropdownItem => ({
        id: city.name,
        value: `${city.name} (${city.isoCode})`
      }))
      setCities(cityItems)
    }
  }

  const handleCitySelect = (item: DropdownItem) => {
    setSelectedCity(item)
    updateField('details.location.city', item.id)
  }

  const loadListing = async (listingId: string) => {
    try {
      setLoading(true)
      const { err, res } = await api.listing.getById(listingId)
      if (!err && res?.data) {
        setFormData(res.data)
        
        // Set selected country and city for dropdowns
        if (res.data.details.location.country) {
          const country = Country.getAllCountries().find(c => c.name === res.data.details.location.country)
          if (country) {
            setSelectedCountry({
              id: country.isoCode,
              value: `${country.flag}  ${country.name}`
            })
            
            // Load cities for selected country
            const cityItems = State.getStatesOfCountry(country.isoCode).map((city): DropdownItem => ({
              id: city.name,
              value: `${city.name} (${city.isoCode})`
            }))
            setCities(cityItems)
            
            // Set selected city
            if (res.data.details.location.city) {
              const city = cityItems.find(c => c.id === res.data.details.location.city)
              if (city) setSelectedCity(city)
            }
          }
        }
      } else {
        showToast.error('Failed to load listing')
        navigate('/my-listings')
      }
    } catch (error) {
      showToast.error('An error occurred')
      navigate('/my-listings')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!id) return

    try {
      setSaving(true)
      const { err } = await api.listing.update(id, formData)
      if (!err) {
        showToast.success('Listing updated successfully!')
        navigate('/my-listings')
      } else {
        showToast.error('Failed to update listing')
      }
    } catch (error) {
      showToast.error('An error occurred')
    } finally {
      setSaving(false)
    }
  }

  const updateField = (path: string, value: any) => {
    setFormData((prev: any) => {
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FD]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mx-auto mb-4"></div>
          <p className="text-dark-60 text-lg">Loading listing...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-gradient-to-b from-accent-bg to-white py-12 px-5">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-dark-80 mb-2">
            Edit <span className="text-primary">Listing</span>
          </h1>
          <p className="text-dark-60">Update your pet listing details</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          {/* Photos */}
          <div className="mb-8">
            <PhotoUpload
              photos={formData.details.photos || []}
              onChange={(photos) => updateField('details.photos', photos)}
              maxPhotos={5}
            />
          </div>

          {/* Basic Info */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-dark-80 mb-6">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <PInput
                  label="Listing Title"
                  value={formData.title}
                  onChange={(val) => updateField('title', val)}
                  placeholder="e.g., Adorable Golden Retriever Looking for Home"
                  required
                />
              </div>

              <PInput
                label="Pet Name"
                value={formData.details.name}
                onChange={(val) => updateField('details.name', val)}
                placeholder="e.g., Fluffy"
                required
              />

              <PInput
                label="Breed"
                value={formData.details.breed}
                onChange={(val) => updateField('details.breed', val)}
                placeholder="e.g., Golden Retriever"
                required
              />

              <div>
                <label className="block text-sm font-semibold text-dark-80 mb-2">Animal Type</label>
                <select
                  value={formData.details.animalType}
                  onChange={(e) => updateField('details.animalType', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:outline-none"
                >
                  <option value="cat">Cat</option>
                  <option value="dog">Dog</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-dark-80 mb-2">Age</label>
                <select
                  value={formData.details.age}
                  onChange={(e) => updateField('details.age', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:outline-none"
                >
                  <option value="baby">Baby</option>
                  <option value="adult">Adult</option>
                  <option value="senior">Senior</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-dark-80 mb-2">Gender</label>
                <select
                  value={formData.details.gender}
                  onChange={(e) => updateField('details.gender', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:outline-none"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-dark-80 mb-2">From</label>
                <select
                  value={formData.details.fromWhere}
                  onChange={(e) => updateField('details.fromWhere', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:outline-none"
                >
                  <option value="owner">Owner</option>
                  <option value="shelter">Shelter</option>
                  <option value="rescue">Rescue</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-dark-80 mb-2">Description</label>
                <textarea
                  value={formData.details.description}
                  onChange={(e) => updateField('details.description', e.target.value)}
                  placeholder="Describe the pet's personality, habits, and any special needs..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-dark-80 mb-6">Location</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PDropdown
                label="Country *"
                placeholder="Select a country"
                items={countries}
                selectedValue={selectedCountry?.id}
                onSelect={handleCountrySelect}
              />

              <PDropdown
                label="City *"
                placeholder="Select a city"
                items={cities}
                selectedValue={selectedCity?.id}
                onSelect={handleCitySelect}
                disabled={!selectedCountry}
              />
            </div>
          </div>

          {/* Health Details */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-dark-80 mb-6">Health Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { key: 'isVaccinated', label: 'Vaccinated' },
                { key: 'isNeutered', label: 'Neutered/Spayed' },
                { key: 'isDewormed', label: 'Dewormed' },
                { key: 'isHouseTrained', label: 'House Trained' },
                { key: 'hasSpecialNeeds', label: 'Has Special Needs' },
              ].map((item) => (
                <label key={item.key} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.details.healthDetails[item.key]}
                    onChange={(e) => updateField(`details.healthDetails.${item.key}`, e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-dark-80 font-medium">{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-dark-80 mb-6">Contact Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PInput
                label="Email"
                value={formData.contactDetails.email}
                onChange={(val) => updateField('contactDetails.email', val)}
                placeholder="your@email.com"
                type="email"
                required
              />
              <PInput
                label="Phone"
                value={formData.contactDetails.phone}
                onChange={(val) => updateField('contactDetails.phone', val)}
                placeholder="+90 555 123 4567"
                type="tel"
                required
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 justify-end pt-6 border-t border-gray-200">
            <BaseButton
              title="Cancel"
              type="outline"
              onClick={() => navigate('/my-listings')}
              disabled={saving}
            />
            <BaseButton
              title={saving ? 'Saving...' : 'Save Changes'}
              type="default"
              onClick={handleSave}
              disabled={saving}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditListing
