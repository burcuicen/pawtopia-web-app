import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { useNavigate } from 'react-router-dom';


import BaseButton from 'src/components/_base/base-button';
import BaseIcon from 'src/components/_base/base-icon';
import PUserMenu from './components/p-user-menu/index';
import './styles.scss';

const PHeader: React.FC = () => {
    const isMobile = useSelector((state: RootState) => state.isMobile.value);
    
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();


    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const renderNavLinks = () => (
        <>
            <a href="/" className='p-header__dropdown-item'>Home</a>
            <a href="/blog" className='p-header__dropdown-item'>Blog</a>
            <a href="/about" className='p-header__dropdown-item'>About</a>
            <a href="/contact" className='p-header__dropdown-item'>Contact</a>
        </>
    );

    const renderActions = () => (
        <>
            <BaseButton title='Login' type='default' onClick={() => navigate('/login')} rounded={true} />
            <BaseButton title='Join' type='outline'  onClick={() => navigate('/login')} rounded={true} />
        </>
    );

    const renderMobileIcon = () => (
        <BaseIcon 
            icon={dropdownOpen ? 'material-symbols:close' : 'material-symbols:menu'} 
            width={36} 
            onClick={toggleDropdown} 
        />
    );

    const renderDropdown = () => (
        <div className='p-header__dropdown'>
            <div className='p-header__dropdown-items'>{renderNavLinks()}</div>
            <div className='p-header__dropdown-actions'>{renderActions()}</div>
        </div>
    );

    return (
       <header className="p-header">
            <div className='p-header__container'>
                <a href="/" className='p-header__title'>
                    <img src={require('../../assets/logo.png')} alt="Pawtopia" className='p-header__logo' />
                </a>
                {!isMobile && <div className='p-header__nav'>{renderNavLinks()}</div>}
            </div>
            {!isMobile && !isLoggedIn && <div className='p-header__actions'>{renderActions()}</div>}
            {isLoggedIn && <PUserMenu />}
            {isMobile && !isLoggedIn && renderMobileIcon()}
            {isMobile && dropdownOpen && !isLoggedIn && renderDropdown()}
        </header>
    );
};

export default PHeader;
