import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import {Country, State } from 'country-state-city';

import { RootState } from 'src/store';
import { useApi } from 'src/api/api-context';

import BaseButton from 'src/components/_base/base-button';
import PInput from 'src/components/p-input';
import PDropdown from 'src/components/p-dropdown';

import './styles.scss';

interface DropdownItem {
    id: string;
    value: string;
  }
const Signup: React.FC = () => {
    const api = useApi();

    const isMobile = useSelector((state: RootState) => state.isMobile.value);


    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showPassword] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [selectedCountry, setSelectedCountry] = useState<DropdownItem | null>(null);
    const [selectedCity, setSelectedCity] = useState<DropdownItem | null>(null);

    const [countries, setCountries] = useState<DropdownItem[]>([]);
    const [cities, setCities] = useState<DropdownItem[]>([]);

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
        const errors = getFormErrors();

        if (errors.length) {
            alert(errors.join('\n'));
            return;
        }
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
    }
    function getFormErrors() {
        const errors = [];
        if (!username) errors.push('Username is required');
        if (!email) errors.push('Email is required');
        if (!firstName) errors.push('First Name is required');
        
        if (!lastName) errors.push('Last Name is required');
        
        if (!password || !confirmPassword ) errors.push('Password is required');
        if (password !== confirmPassword) errors.push('Passwords do not match');

        if (!selectedCountry) errors.push('Country is required');
        
        if (!selectedCity) errors.push('City is required');
        
        return errors;
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
                />
                 <PInput
                    label='Email'
                    value={email}
                    onChange={setEmail}
                    placeholder="Email"
                    type='email'
                />
                 <PInput
                    label='First Name'
                    value={firstName}
                    onChange={setFirstName}
                    placeholder="First Name"
                />
                 <PInput
                    label='Last Name'
                    value={lastName}
                    onChange={setLastName}
                    placeholder="Last Name"
                />
                <div className='form__password'>
                    <PInput
                        label='Password'
                        value={password}
                        onChange={setPassword}
                        placeholder="Enter Password"
                        type={showPassword ? 'text' : 'password'}
                        hasHideIcon={true}
                    />
                     <PInput
                        label='Confirm Password'
                        value={confirmPassword}
                        onChange={setConfirmPassword}
                        placeholder="Confirm Password"
                        type={showPassword ? 'text' : 'password'}
                        hasHideIcon={true}
                    />

                </div>
                <div className='form__location'>
                <PDropdown
                    items={countries}
                    onSelect={handleCountrySelect}
                    placeholder="Select Country"
                    label="Country"
                    selectedValue={selectedCountry?.id}

                />
                <PDropdown
                    items={cities}
                    onSelect={handleCitySelect}
                    placeholder="Select City"
                    label="City"
                    selectedValue={selectedCity?.id}
                    disabled={!selectedCountry} // Disable the dropdown if no country is selected
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
