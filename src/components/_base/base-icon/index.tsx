import React from 'react';
import { Icon } from '@iconify/react';

interface BaseIconProps {
    width?: number;
    height?: number;
    icon: string;
    className?: string;
    onClick?: () => void;
}
const BaseButton: React.FC<BaseIconProps> = ({ width, height, icon, onClick, className }) => {
    return (
        <Icon icon={icon} width={width} height={height} onClick={onClick} className={className} />
    );
}
export default BaseButton;