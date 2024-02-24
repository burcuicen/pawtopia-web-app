import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {Country, State } from 'country-state-city';

import { RootState } from 'src/store';

import BaseButton from 'src/components/_base/base-button';
import PInput from 'src/components/p-input';
import PDropdown from 'src/components/p-dropdown';

import './styles.scss';

interface DropdownItem {
    id: string;
    value: string;
  }
const Signup: React.FC = () => {
    const isMobile = useSelector((state: RootState) => state.isMobile.value);
    const navigate = useNavigate();


    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const [showPassword] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [selectedCountry, setSelectedCountry] = useState<DropdownItem | null>(null);
    const [selectedCity, setSelectedCity] = useState<DropdownItem | null>(null);

    const [countries, setCountries] = useState<DropdownItem[]>([]);
    const [cities, setCities] = useState<DropdownItem[]>([]);

    const [validateForm, setValidateForm] = useState(false);

    useEffect(() => {
        const countryItems = Country.getAllCountries().map((country): DropdownItem => ({
            id: country.isoCode,
            value: `${country.flag}  ${country.name}`
        }));
        setCountries(countryItems);
    }, [])
    

    const handleCountrySelect = (item: DropdownItem) => {
        const country = Country.getCountryByCode(item.id)
        setSelectedCountry(item);
    
        setCities([]);
        setSelectedCity(null);
    
        if (country) {
            const cityItems = State.getStatesOfCountry
            (country.isoCode).map((city): DropdownItem => ({
                id:city.name,
                value: `${city.name}(${city.isoCode})`
            }));
            setCities(cityItems);
        }
    }
    const handleCitySelect = (item: DropdownItem) => {
        const city = cities.find(c => c.id === item.id);
        setSelectedCity(city as DropdownItem);
    }
    function setRegisterInfo() {
        setPasswordError('');
        setConfirmPasswordError('');

        let isValid = true;

        if (!password) {
            setPasswordError('Password is required');
            isValid = false;
        } else if (password !== confirmPassword) {
            setPasswordError('Passwords do not match');
            setConfirmPasswordError('Passwords do not match');
            isValid = false;
        }

        setValidateForm(true);

        if (!isValid) return

        const body = {
            username,
            email,
            firstName,
            lastName,
            password,
            userType: 'other',
            country: selectedCountry?.id as string,
            city: selectedCity?.id as string
        }
        localStorage.setItem('registerInfo', JSON.stringify(body));
        navigate('/onboarding');
    }

    return (
        <div className='page page__login'>

            {
                !isMobile && (
                    <div className='page__login-asset'>
                        <img src={require('../../assets/signup-asset.svg').default} alt="Pawtopia" />
                    </div>
                )
            }
          
            <div className='form form__login'>
                <div className='form__login-title'>
                    Join Pawtopia
                </div>
                <div className='form__login-subtitle'>
                    Join the Pawtopia family and start your journey to finding your purrfect feline friend!
                </div>
                <PInput
                    label='Username'
                    value={username}
                    onChange={setUsername}
                    placeholder="Username"
                    required={true}
                    validateForm={validateForm}
                />
                 <PInput
                    label='Email'
                    value={email}
                    onChange={setEmail}
                    placeholder="Email"
                    type='email'
                    required={true}
                    validateForm={validateForm}
                />
                 <PInput
                    label='First Name'
                    value={firstName}
                    onChange={setFirstName}
                    placeholder="First Name"
                    required={true}
                    validateForm={validateForm}
                />
                 <PInput
                    label='Last Name'
                    value={lastName}
                    onChange={setLastName}
                    placeholder="Last Name"
                    required={true}
                    validateForm={validateForm}
                />
                <div className='form__password'>
                    <PInput
                        label='Password'
                        value={password}
                        onChange={setPassword}
                        placeholder="Enter Password"
                        type={showPassword ? 'text' : 'password'}
                        hasHideIcon={true}
                        customError={passwordError}
                    />
                     <PInput
                        label='Confirm Password'
                        value={confirmPassword}
                        onChange={setConfirmPassword}
                        placeholder="Confirm Password"
                        type={showPassword ? 'text' : 'password'}
                        hasHideIcon={true}
                        customError={confirmPasswordError}
                    />

                </div>
                <div className='form__location'>
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
                <div className='form__actions'>
                    <BaseButton title='Register' type='default' onClick={setRegisterInfo} />
                </div>
            </div>
        </div>
    );
};

export default Signup;
