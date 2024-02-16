import React, { useState } from 'react';
import './styles.scss';
import BaseButton from 'src/components/_base/base-button';

import PInput from 'src/components/p-input';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword] = useState(false);

    return (
        <div className='page page__login'>

            <div className='page__login-asset'>
                <img src={require('../../assets/login-asset.svg').default} alt="Pawtopia" />
            </div>
            <div className='form form__login'>
                <PInput
                    label='Username'
                    value={username}
                    onChange={setUsername}
                    placeholder="Username"
                />
                <PInput
                    label='Password'
                    value={password}
                    onChange={setPassword}
                    placeholder="Enter Password"
                    type={showPassword ? 'text' : 'password'}
                    hasHideIcon={true}
                />
                <div className='form__actions'>
                    <BaseButton title='Login' type='default' />
                    <BaseButton title='Register' type='outline' />
                </div>
            </div>
        </div>
    );
};

export default Login;
