import React from 'react';

import './styles.scss';

import BaseIcon from 'src/components/_base/base-icon';

const PFooter: React.FC = () => {

    return (
        <footer className="p-footer">
            <div className="p-footer__container">
                <div className='p-footer__head'>
                        <div className='p-footer__nav'>
                            <a href="/">Home</a>
                            <a href="/blog">Blog</a>
                            <a href="/about">About</a>
                            <a href="/contact">Contact</a>
                        </div>
                        <div className='p-footer__social'>
                            <BaseIcon icon='ic:baseline-facebook' width={24} />
                            <BaseIcon icon='mdi:twitter' width={24} />
                            <BaseIcon icon='mdi:instagram' width={24} />
                        </div>
                </div>
                <div className='p-footer__bottom'>
                        <div className='p-footer__copyright'>© 2024 Pawtopia. All rights reserved.</div>

                    <div className='p-footer__logo'>
                            <img src={require('../../assets/logo.png')} alt="Pawtopia" className='p-header__logo' />
                    </div>
                    <div className='p-footer__terms'>
                            <a href='/terms'>Terms of Service</a>
                            <a href='/privacy'>Privacy Policy</a>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default PFooter;
