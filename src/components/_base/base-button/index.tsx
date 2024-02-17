import React from 'react';
import './styles.scss';

interface BaseButtonProps {
    title: string;
    type: 'default' | 'outline'
    size?: 'small' | 'medium' | 'large';
    onClick?: () => void;
}
const BaseButton: React.FC<BaseButtonProps> = ({ title, type, size, onClick }) => {
    return (
        <button className={`base-button base-button--${type} base-button--${size}`} onClick={onClick}>{title}</button>
    );
}
export default BaseButton;