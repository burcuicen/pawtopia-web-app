import React from 'react';
import './styles.scss';

interface BaseButtonProps {
    title: string;
    type: 'default' | 'outline'
    size?: 'small' | 'medium' | 'large';
}
const BaseButton: React.FC<BaseButtonProps> = ({ title, type, size }) => {
    return (
        <button className={`base-button base-button--${type} base-button--${size}`}>{title}</button>
    );
}
export default BaseButton;