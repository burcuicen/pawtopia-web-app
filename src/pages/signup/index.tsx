import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

import { Country, State } from 'country-state-city'

import { RootState } from 'src/store'
import { showToast } from 'src/utils/toast'

import BaseButton from 'src/components/_base/base-button'
import PInput from 'src/components/p-input'
import PDropdown from 'src/components/p-dropdown'

import './styles.scss'

interface DropdownItem {
  id: string
  value: string
}
const Signup: React.FC = () => {
  const isMobile = useSelector((state: RootState) => state.isMobile.value)
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')

  const [showPassword] = useState(false)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const [selectedCountry, setSelectedCountry] = useState<DropdownItem | null>(null)
  const [selectedCity, setSelectedCity] = useState<DropdownItem | null>(null)

  const [countries, setCountries] = useState<DropdownItem[]>([])
  const [cities, setCities] = useState<DropdownItem[]>([])

  const [validateForm, setValidateForm] = useState(false)
  const [isLoading] = useState(false)

  useEffect(() => {
    const countryItems = Country.getAllCountries().map(
      (country): DropdownItem => ({
        id: country.isoCode,
        value: `${country.flag}  ${country.name}`
      })
    )
    setCountries(countryItems)
  }, [])

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
  function setRegisterInfo() {
    setPasswordError('')
    setConfirmPasswordError('')

    // Validation
    if (!username.trim()) {
      showToast.error('Username is required')
      return
    }

    if (!email.trim()) {
      showToast.error('Email is required')
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      showToast.error('Please enter a valid email address')
      return
    }

    if (!firstName.trim() || !lastName.trim()) {
      showToast.error('First name and last name are required')
      return
    }

    if (!password) {
      setPasswordError('Password is required')
      showToast.error('Password is required')
      return
    }

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters')
      showToast.error('Password must be at least 6 characters')
      return
    }

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match')
      setConfirmPasswordError('Passwords do not match')
      showToast.error('Passwords do not match')
      return
    }

    if (!selectedCountry || !selectedCity) {
      showToast.error('Please select country and city')
      return
    }

    setValidateForm(true)

    const body = {
      username,
      email,
      firstName,
      lastName,
      password,
      userType: 'other',
      country: selectedCountry.id,
      city: selectedCity.id
    }
    
    localStorage.setItem('registerInfo', JSON.stringify(body))
    showToast.success('Registration info saved! Please complete the survey.')
    navigate('/onboarding')
  }

  return (
    <div className="page page__login">
      {!isMobile && (
        <div className="page__login-asset">
          <img src={require('../../assets/signup-asset.svg').default} alt="Pawtopia" />
        </div>
      )}

      <div className="form form__login">
        <div className="form__login-title">Join Pawtopia</div>
        <div className="form__login-subtitle">Join the Pawtopia family and start your journey to finding your purrfect feline friend!</div>
        <PInput label="Username" value={username} onChange={setUsername} placeholder="Username" required={true} validateForm={validateForm} />
        <PInput label="Email" value={email} onChange={setEmail} placeholder="Email" type="email" required={true} validateForm={validateForm} />
        <PInput label="First Name" value={firstName} onChange={setFirstName} placeholder="First Name" required={true} validateForm={validateForm} />
        <PInput label="Last Name" value={lastName} onChange={setLastName} placeholder="Last Name" required={true} validateForm={validateForm} />
        <div className="form__password">
          <PInput
            label="Password"
            value={password}
            onChange={setPassword}
            placeholder="Enter Password"
            type={showPassword ? 'text' : 'password'}
            hasHideIcon={true}
            customError={passwordError}
          />
          <PInput
            label="Confirm Password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="Confirm Password"
            type={showPassword ? 'text' : 'password'}
            hasHideIcon={true}
            customError={confirmPasswordError}
          />
        </div>
        <div className="form__location">
          <PDropdown
            items={countries}
            onSelect={handleCountrySelect}
            placeholder="Select Country"
            label="Country"
            selectedValue={selectedCountry?.id}
            required={true}
            validateForm={validateForm}
          />
          <PDropdown
            items={cities}
            onSelect={handleCitySelect}
            placeholder="Select City"
            label="City"
            selectedValue={selectedCity?.id}
            disabled={!selectedCountry}
            required={true}
            validateForm={validateForm}
          />
        </div>
        <div className="form__actions">
          <BaseButton 
            title={isLoading ? 'Creating Account...' : 'Register'} 
            type="default" 
            onClick={setRegisterInfo}
            disabled={isLoading}
          />
        </div>

        <div className="form__login-link">
          Already have an account?&nbsp;
          <Link to="/login">Login here</Link>
        </div>
      </div>
    </div>
  )
}

export default Signup
