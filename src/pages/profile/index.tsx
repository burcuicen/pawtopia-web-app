import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Country, State } from 'country-state-city'

import { useApi } from 'src/api/api-context'
import { showToast } from 'src/utils/toast'
import type { IUser, ISurveyResult } from 'src/api/interfaces/user'

import BaseButton from 'src/components/_base/base-button'
import PInput from 'src/components/p-input'
import PDropdown from 'src/components/p-dropdown'

interface DropdownItem {
  id: string
  value: string
}

const Profile: React.FC = () => {
  const api = useApi()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [userType, setUserType] = useState('')

  const [selectedCountry, setSelectedCountry] = useState<DropdownItem | null>(null)
  const [selectedCity, setSelectedCity] = useState<DropdownItem | null>(null)

  const [countries, setCountries] = useState<DropdownItem[]>([])
  const [cities, setCities] = useState<DropdownItem[]>([])

  const [surveyResults, setSurveyResults] = useState<ISurveyResult>({})

  useEffect(() => {
    const countryItems = Country.getAllCountries().map(
      (country): DropdownItem => ({
        id: country.isoCode,
        value: `${country.flag}  ${country.name}`
      })
    )
    setCountries(countryItems)
  }, [])

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    setIsLoading(true)
    try {
      const { err, res } = await api.auth.getProfile()

      if (err) {
        showToast.error('Failed to load profile')
        navigate('/login')
        return
      }

      const user = res?.data as IUser
      setFirstName(user.firstName || '')
      setLastName(user.lastName || '')
      setEmail(user.email || '')
      setUsername(user.username || '')
      setUserType(user.userType || '')
      setSurveyResults(user.surveyResults || {})

      // Set country
      if (user.country) {
        const country = Country.getCountryByCode(user.country)
        if (country) {
          setSelectedCountry({
            id: country.isoCode,
            value: `${country.flag}  ${country.name}`
          })

          // Load cities for this country
          const cityItems = State.getStatesOfCountry(country.isoCode).map(
            (city): DropdownItem => ({
              id: city.name,
              value: `${city.name}(${city.isoCode})`
            })
          )
          setCities(cityItems)

          // Set city
          if (user.city) {
            const cityItem = cityItems.find(c => c.id === user.city)
            if (cityItem) {
              setSelectedCity(cityItem)
            }
          }
        }
      }
    } catch (error) {
      showToast.error('An error occurred while loading profile')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCountrySelect = (item: DropdownItem) => {
    const country = Country.getCountryByCode(item.id)
    setSelectedCountry(item)

    setCities([])
    setSelectedCity(null)

    if (country) {
      const cityItems = State.getStatesOfCountry(country.isoCode).map(
        (city): DropdownItem => ({
          id: city.name,
          value: `${city.name}(${city.isoCode})`
        })
      )
      setCities(cityItems)
    }
  }

  const handleCitySelect = (item: DropdownItem) => {
    const city = cities.find(c => c.id === item.id)
    setSelectedCity(city as DropdownItem)
  }

  const handleSave = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      showToast.error('First name and last name are required')
      return
    }

    if (!email.trim()) {
      showToast.error('Email is required')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      showToast.error('Please enter a valid email address')
      return
    }

    if (!selectedCountry || !selectedCity) {
      showToast.error('Please select country and city')
      return
    }

    setIsSaving(true)

    try {
      const updateData = {
        firstName,
        lastName,
        email,
        country: selectedCountry.id,
        city: selectedCity.id,
        surveyResults
      }

      const { err } = await api.auth.updateProfile(updateData)

      if (err) {
        const errorMessage = (err as any).response?.data?.message || 'Failed to update profile'
        showToast.error(errorMessage)
        return
      }

      showToast.success('Profile updated successfully!')
      setIsEditing(false)
      await loadProfile()
    } catch (error: any) {
      showToast.error(error.message || 'An unexpected error occurred')
    } finally {
      setIsSaving(false)
    }
  }

  const getUserTypeLabel = (type: string) => {
    switch (type) {
      case 'paw-seeker':
        return 'PawSeeker (Looking for a pet)'
      case 'paw-guardian':
        return 'PawGuardian (Listing pets)'
      case 'paw-admin':
        return 'PawAdmin (Administrator)'
      default:
        return 'Explorer'
    }
  }

  if (isLoading) {
    return (
      <div className="font-sans min-h-screen bg-gradient-to-b from-accent-bg to-white py-12 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-6xl mb-6">🐾</div>
            <p className="text-lg text-dark-60">Loading your profile...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="font-sans min-h-screen bg-gradient-to-b from-accent-bg to-white py-12 px-5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-dark-80 mb-4">
            My <span className="text-primary">Profile</span>
          </h1>
          <p className="text-lg text-dark-60">Manage your account settings</p>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <div className="text-6xl">👤</div>
              <div>
                <h2 className="text-2xl font-bold text-dark-80">{firstName} {lastName}</h2>
                <p className="text-dark-60">@{username}</p>
                <p className="text-sm text-primary font-semibold mt-1">{getUserTypeLabel(userType)}</p>
              </div>
            </div>
            {!isEditing && (
              <BaseButton
                title="Edit Profile"
                type="default"
                onClick={() => setIsEditing(true)}
              />
            )}
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PInput
                label="First Name"
                value={firstName}
                onChange={setFirstName}
                placeholder="First Name"
                disabled={!isEditing}
                required={true}
              />
              <PInput
                label="Last Name"
                value={lastName}
                onChange={setLastName}
                placeholder="Last Name"
                disabled={!isEditing}
                required={true}
              />
            </div>

            <PInput
              label="Email"
              value={email}
              onChange={setEmail}
              placeholder="Email"
              type="email"
              disabled={!isEditing}
              required={true}
            />

            <PInput
              label="Username"
              value={username}
              onChange={() => {}}
              placeholder="Username"
              disabled={true}
              required={true}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PDropdown
                items={countries}
                onSelect={handleCountrySelect}
                placeholder="Select Country"
                label="Country"
                selectedValue={selectedCountry?.id}
                disabled={!isEditing}
                required={true}
              />
              <PDropdown
                items={cities}
                onSelect={handleCitySelect}
                placeholder="Select City"
                label="City"
                selectedValue={selectedCity?.id}
                disabled={!isEditing || !selectedCountry}
                required={true}
              />
            </div>

            {surveyResults && Object.keys(surveyResults).length > 0 && (
              <div className="mt-8 p-6 bg-accent-bg rounded-2xl">
                <h3 className="text-xl font-bold text-dark-80 mb-4">Your Preferences</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-dark-60">
                  {surveyResults.purpose && (
                    <div>
                      <span className="font-semibold">Purpose:</span> {surveyResults.purpose}
                    </div>
                  )}
                  {surveyResults.animalPreference && (
                    <div>
                      <span className="font-semibold">Animal Preference:</span> {surveyResults.animalPreference}
                    </div>
                  )}
                  {surveyResults.ageRange && (
                    <div>
                      <span className="font-semibold">Age Range:</span> {surveyResults.ageRange}
                    </div>
                  )}
                  {surveyResults.genderPreference && (
                    <div>
                      <span className="font-semibold">Gender Preference:</span> {surveyResults.genderPreference}
                    </div>
                  )}
                  {surveyResults.healthStatus && (
                    <div>
                      <span className="font-semibold">Health Status:</span> {surveyResults.healthStatus}
                    </div>
                  )}
                  {surveyResults.animalCareHistory !== undefined && (
                    <div>
                      <span className="font-semibold">Has Pet Experience:</span> {surveyResults.animalCareHistory ? 'Yes' : 'No'}
                    </div>
                  )}
                </div>
              </div>
            )}

            {isEditing && (
              <div className="flex gap-4 mt-8">
                <BaseButton
                  title={isSaving ? 'Saving...' : 'Save Changes'}
                  type="default"
                  onClick={handleSave}
                  disabled={isSaving}
                />
                <BaseButton
                  title="Cancel"
                  type="outline"
                  onClick={() => {
                    setIsEditing(false)
                    loadProfile()
                  }}
                  disabled={isSaving}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
