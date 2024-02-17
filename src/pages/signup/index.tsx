import React, { useEffect, useState } from 'react';

import './styles.scss';

import BaseButton from 'src/components/_base/base-button';

import PInput from 'src/components/p-input';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import PDropdown from 'src/components/p-dropdown';

import { ICountry, ICity, Country, State } from 'country-state-city';

// Define the interface for dropdown items
interface DropdownItem {
    id: string;
    value: string;
  }
const Signup: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showPassword] = useState(false);

    
    const isMobile = useSelector((state: RootState) => state.isMobile.value);

    const [selectedCountry, setSelectedCountry] = useState<DropdownItem | null>(null);
    const [selectedCity, setSelectedCity] = useState<DropdownItem | null>(null);

    const [countries, setCountries] = useState<DropdownItem[]>([]);
    const [cities, setCities] = useState<DropdownItem[]>([]);

    useEffect(() => {
        const countryItems = Country.getAllCountries().map((country): DropdownItem => ({
            id: country.isoCode,
            value: country.name
        }));
        setCountries(countryItems);
    }, []);
    

    const handleCountrySelect = (item: DropdownItem) => {
        const country = Country.getCountryByCode(item.id);
        setSelectedCountry(item);
    
        setCities([]);
        //if the country is selected set selected city to null
        setSelectedCity(null);

    
        if (country) {
            const cityItems = State.getStatesOfCountry
            (country.isoCode).map((city): DropdownItem => ({
                id: city.name,
                value: city.name
            }));
            setCities(cityItems);
        }
    };
    

    const handleCitySelect = (item: DropdownItem) => {
        const city = cities.find(c => c.id === item.id);
        setSelectedCity(city as DropdownItem);
    };

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
                    <BaseButton title='Register' type='default' />
                </div>
            </div>
        </div>
    );
};

export default Signup;
