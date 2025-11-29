import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApi } from 'src/api/api-context'
import { showToast } from 'src/utils/toast'
import PInput from 'src/components/p-input'
import PDropdown from 'src/components/p-dropdown'
import BaseButton from 'src/components/_base/base-button'
import BaseIcon from 'src/components/_base/base-icon'
import { Country, City } from 'country-state-city'

import { useDispatch } from 'react-redux'
import { setAuthState } from 'src/store/reducers/authSlice'

const Profile: React.FC = () => {
  const navigate = useNavigate()
  const api = useApi()
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // User data
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [userType, setUserType] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [surveyResults, setSurveyResults] = useState<any>(null)
  const [profilePicture, setProfilePicture] = useState('')
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  // Dropdown options
  const [countries, setCountries] = useState<{ key: string; label: string }[]>([])
  const [cities, setCities] = useState<{ key: string; label: string }[]>([])

  useEffect(() => {
    loadProfile()
    loadCountries()
  }, [])

  useEffect(() => {
    if (country) {
      loadCities(country)
    }
  }, [country])

  const loadProfile = async () => {
    try {
      setIsLoading(true)
      const { err, res } = await api.auth.getProfile()
      if (!err && res?.data) {
        const user = res.data
        setFirstName(user.firstName || '')
        setLastName(user.lastName || '')
        setEmail(user.email || '')
        setUsername(user.username || '')
        setUserType(user.userType || '')
        setCountry(user.country || '')
        setCity(user.city || '')
        setSurveyResults(user.surveyResults || null)
        setProfilePicture(user.profilePicture || '')
      }
    } catch (error) {
      console.error('Failed to load profile:', error)
      showToast.error('Failed to load profile')
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        // Resize image before setting state
        const img = new Image()
        img.src = reader.result as string
        img.onload = () => {
          const canvas = document.createElement('canvas')
          const MAX_WIDTH = 500
          const MAX_HEIGHT = 500
          let width = img.width
          let height = img.height

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width
              width = MAX_WIDTH
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height
              height = MAX_HEIGHT
            }
          }

          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext('2d')
          ctx?.drawImage(img, 0, 0, width, height)
          const dataUrl = canvas.toDataURL('image/jpeg', 0.7)
          setProfilePicture(dataUrl)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const loadCountries = () => {
    const countryList = Country.getAllCountries().map((country) => ({
      key: country.name,
      label: `${country.flag} ${country.name}`
    }))
    setCountries(countryList)
  }

  const loadCities = (countryName: string) => {
    const selectedCountry = Country.getAllCountries().find((c) => c.name === countryName)
    if (selectedCountry) {
      const cityList = City.getCitiesOfCountry(selectedCountry.isoCode)?.map((city) => ({
        key: city.name,
        label: city.name
      })) || []
      setCities(cityList)
    }
  }

  const handleSave = async () => {
    try {
      setIsSaving(true)
      const { err, res } = await api.auth.updateProfile({
        firstName,
        lastName,
        email,
        country,
        city,
        profilePicture
      })

      if (!err && res?.data) {
        showToast.success('Profile updated successfully!')
        setIsEditing(false)
        
        // Update Redux store to reflect changes in Header immediately
        dispatch(setAuthState({
          isLoggedIn: true,
          userInfo: res.data
        }))
        
        loadProfile()
      } else {
        showToast.error('Failed to update profile')
      }
    } catch (error) {
      showToast.error('An error occurred')
    } finally {
      setIsSaving(false)
    }
  }

  const getUserTypeLabel = (type: string) => {
    const types: { [key: string]: { label: string; icon: string } } = {
      'paw-seeker': { label: 'PawSeeker', icon: '🔍' },
      'paw-guardian': { label: 'PawGuardian', icon: '🛡️' },
      'paw-admin': { label: 'PawAdmin', icon: '👑' },
      'other': { label: 'Explorer', icon: '🌟' }
    }
    return types[type] || types['other']
  }

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center bg-[#F8F9FD]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mx-auto mb-4"></div>
          <p className="text-dark-60 text-lg">Loading your profile...</p>
        </div>
      </div>
    )
  }

  const userTypeInfo = getUserTypeLabel(userType)

  const PreferenceItem = ({ icon, label, value }: { icon: string; label: string; value: string }) => (
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-[#EBE3F5] flex items-center justify-center text-primary text-2xl flex-shrink-0">
        <BaseIcon icon={icon} width={24} />
      </div>
      <div>
        <p className="text-sm text-dark-60 font-medium mb-0.5">{label}</p>
        <p className="text-dark-80 font-semibold capitalize">{value}</p>
      </div>
    </div>
  )

  return (
    <div className="w-full bg-[#F8F9FD]">
      {/* Header Banner */}
      <div className="h-[280px] bg-gradient-to-r from-[#EBE3F5] to-[#D4C4E8] relative overflow-hidden">
        <div className="w-full h-full flex items-center px-10">
          <div className="z-10">
            <h1 className="text-4xl font-bold text-dark-80 mb-2">My Profile</h1>
            <p className="text-dark-60 text-lg">Manage your account settings</p>
          </div>
        </div>
        {/* Decorative Image */}
        <img 
          src={require('../../assets/hero-img.png')} 
          alt="Pets" 
          className="absolute right-0 bottom-0 h-[120%] object-contain opacity-90 translate-y-10 translate-x-10"
        />
      </div>

      <div className="w-full px-10 -mt-20 relative z-20 pb-20">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Sidebar */}
          <div className="lg:w-[300px] flex-shrink-0">
            <div className="flex flex-col items-center text-center">
              {/* Avatar */}
              <div 
                className="relative w-48 h-48 mb-6 group cursor-pointer"
                onClick={() => isEditing && fileInputRef.current?.click()}
              >
                <div className="w-full h-full rounded-full bg-[#6B5B95] overflow-hidden border-[6px] border-white shadow-xl flex items-center justify-center">
                  {profilePicture ? (
                    <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-6xl text-white">{userTypeInfo.icon}</span>
                  )}
                </div>
                {/* Upload Overlay */}
                {isEditing && (
                  <div className="absolute inset-0 rounded-full bg-black/40 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 border-[6px] border-transparent">
                    <BaseIcon icon="material-symbols:photo-camera" width={32} />
                    <span className="text-sm font-medium mt-2">Upload Photo</span>
                  </div>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>

              {isEditing && profilePicture && (
                <button 
                  onClick={() => setProfilePicture('')}
                  className="text-red-500 text-sm font-semibold mb-4 hover:underline"
                >
                  Remove Photo
                </button>
              )}

              <h2 className="text-2xl font-bold text-dark-80 mb-1">
                {firstName} {lastName}
              </h2>
              <p className="text-dark-60 font-medium mb-2">@{username}</p>
              <div className="inline-block px-3 py-1 bg-[#EBE3F5] rounded-full text-primary text-sm font-semibold mb-8">
                {userTypeInfo.label}
                {userType === 'paw-seeker' && ' (Looking for a pet)'}
              </div>

              <button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                disabled={isSaving}
                className="w-full py-3.5 rounded-xl bg-[#4A3B69] text-white font-bold hover:bg-[#3D315B] transition-all shadow-lg hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {isSaving ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <BaseIcon icon={isEditing ? "material-symbols:save" : "material-symbols:edit"} width={20} />
                    {isEditing ? 'Save Changes' : 'Edit Profile'}
                  </>
                )}
              </button>
              
              {isEditing && (
                <button
                  onClick={() => {
                    setIsEditing(false)
                    loadProfile()
                  }}
                  className="w-full mt-3 py-3.5 rounded-xl bg-white text-dark-60 font-bold hover:bg-gray-50 transition-all border border-gray-200"
                >
                  Cancel
                </button>
              )}

              {/* Navigation Buttons */}
              <div className="w-full mt-6 space-y-4">
                <button
                  onClick={() => navigate('/my-listings')}
                  className="w-full py-3.5 rounded-xl bg-[#62b6cb] text-white font-bold hover:bg-[#5fa8d3] transition-all shadow-lg hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <BaseIcon icon="mdi:format-list-bulleted" width={20} />
                  My Listings
                </button>
                
                <button
                  onClick={() => navigate('/create-listing')}
                  className="w-full py-3.5 rounded-xl bg-[#34c759] text-white font-bold hover:bg-[#2fb34d] transition-all shadow-lg hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <BaseIcon icon="material-symbols:add-circle-outline" width={20} />
                  Create Listing
                </button>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1 pt-4">
            {/* Personal Information */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-dark-80 mb-6">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <PInput
                  label="First Name"
                  value={firstName}
                  onChange={setFirstName}
                  placeholder="Enter your first name"
                  disabled={!isEditing}
                  required
                />
                <PInput
                  label="Last Name"
                  value={lastName}
                  onChange={setLastName}
                  placeholder="Enter your last name"
                  disabled={!isEditing}
                  required
                />
                <PInput
                  label="Email"
                  value={email}
                  onChange={setEmail}
                  placeholder="your@email.com"
                  type="email"
                  disabled={!isEditing}
                  required
                />
                <PInput
                  label="Username"
                  value={username}
                  onChange={() => {}}
                  placeholder="Username"
                  disabled={true}
                  required
                />
                <PDropdown
                  label="Country"
                  selectedValue={country}
                  onSelect={(item) => setCountry(item.id)}
                  items={countries.map(c => ({ id: c.key, value: c.label }))}
                  placeholder="Select your country"
                  disabled={!isEditing}
                  required
                />
                <PDropdown
                  label="City"
                  selectedValue={city}
                  onSelect={(item) => setCity(item.id)}
                  items={cities.map(c => ({ id: c.key, value: c.label }))}
                  placeholder="Select your city"
                  disabled={!isEditing || !country}
                  required
                />
              </div>
            </div>

            {/* Preferences Card */}
            {surveyResults && (
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-dark-80 mb-8">Your Preferences</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  {surveyResults.purpose && (
                    <PreferenceItem 
                      icon="material-symbols:search" 
                      label="Purpose" 
                      value={surveyResults.purpose.replace(/-/g, ' ')} 
                    />
                  )}
                  {surveyResults.ageRange && (
                    <PreferenceItem 
                      icon="material-symbols:calendar-month" 
                      label="Age Range" 
                      value={surveyResults.ageRange} 
                    />
                  )}
                  {surveyResults.healthStatus && (
                    <PreferenceItem 
                      icon="material-symbols:monitor-heart" 
                      label="Health Status" 
                      value={surveyResults.healthStatus.replace(/-/g, ' ')} 
                    />
                  )}
                  {surveyResults.animalPreference && (
                    <PreferenceItem 
                      icon="material-symbols:pets" 
                      label="Animal Preference" 
                      value={surveyResults.animalPreference} 
                    />
                  )}
                  {surveyResults.genderPreference && (
                    <PreferenceItem 
                      icon="material-symbols:female" 
                      label="Gender Preference" 
                      value={surveyResults.genderPreference} 
                    />
                  )}
                  {surveyResults.animalCareHistory && (
                    <PreferenceItem 
                      icon="material-symbols:history" 
                      label="Has Pet Experience" 
                      value={surveyResults.animalCareHistory === 'true' ? 'Yes' : 'No'} 
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
