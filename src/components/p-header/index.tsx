import React from 'react';

import { useSelector } from 'react-redux';

import { RootState } from '../../store/index';

import './styles.scss';

import BaseButton from '../_base/base-button';
import BaseIcon from '../_base/base-icon';

const PHeader: React.FC = () => {
    const isMobile = useSelector((state: RootState) => state.isMobile.value);

    return (
        <header className="p-header">
            <div className='p-header__container'>
                  <a href="/" className='p-header__title'>
                  <img src={require('../../assets/logo.png')} alt="Pawtopia" className='p-header__logo' />
                  </a>
                  {!isMobile && (
                    <div className='p-header__nav'>
                        <a href="/">Home</a>
                        <a href="/blog">Blog</a>
                        <a href="/about">About</a>
                        <a href="/contact">Contact</a>
                    </div>
                )}
            </div>
            {!isMobile &&(<div className='p-header__actions'>
                <BaseButton title='Login' type='default' />
                <BaseButton title='Join' type='outline' />
            </div>)}
            {isMobile &&(<BaseIcon icon='material-symbols:menu' width={50} />)}
        </header>
    );
};

export default PHeader;