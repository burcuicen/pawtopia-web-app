import React from 'react';
import './styles.scss';

interface BaseButtonProps {
    title: string;
    type: 'default' | 'outline'
    size?: 'small' | 'medium' | 'large';
    rounded?: boolean;
    onClick?: () => void;
}
const BaseButton: React.FC<BaseButtonProps> = ({ title, type, size, onClick, rounded }) => {
    return (
        <button className={`base-button base-button--${type} base-button--${size} base-button--${rounded ? 'rounded' : ''}`} onClick={onClick}>{title}</button>
    );
}
export default BaseButton;