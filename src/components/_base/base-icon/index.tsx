import React from 'react';
import { Icon } from '@iconify/react';

interface BaseIconProps {
    width?: number;
    height?: number;
    icon: string;
    onClick?: () => void;
}
const BaseButton: React.FC<BaseIconProps> = ({ width, height, icon, onClick }) => {
    return (
        <Icon icon={icon} width={width} height={height} onClick={onClick} />
    );
}
export default BaseButton;