import React from 'react';
import './styles.scss';

const PHeader: React.FC = () => {
    return (
        <header className="p-header">
            <div className='p-header__container'>
                <img src={require('../../assets/logo.png')} alt="Pawtopia" className='p-header__logo' />
                <div className='p-header__nav'>
                        <a href="/">Home</a>
                        <a href="/blog">Blog</a>
                        <a href="/about">About</a>
                        <a href="/contact">Contact</a>
                </div>
            </div>
        </header>
    );
};

export default PHeader;