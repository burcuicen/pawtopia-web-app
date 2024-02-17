import React, { useState } from 'react';

import './styles.scss';

import { useApi } from 'src/api/api-context';
import { useNavigate } from 'react-router-dom';
import { checkLoginStatus } from 'src/helpers/auth';


import BaseButton from 'src/components/_base/base-button';

import PInput from 'src/components/p-input';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showPassword] = useState(false);

    const api = useApi();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const isMobile = useSelector((state: RootState) => state.isMobile.value);


    async function login() {
        const {err, res} = await api.auth.login({ username, password });
        if (err) return console.log(err);

        const { token } = res?.data as { token: string };

        localStorage.setItem('token', token);

        await checkLoginStatus(dispatch, api);
        navigate('/');
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
            
                <div className='form__actions'>
                    <BaseButton title='Register' type='default' onClick={login} />
                </div>
            </div>
        </div>
    );
};

export default Login;
