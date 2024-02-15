import React from 'react';
import { Icon } from '@iconify/react';

interface BaseIconProps {
    width?: number;
    height?: number;
    icon: string;
}
const BaseButton: React.FC<BaseIconProps> = ({ width, height, icon }) => {
    return (
        <Icon icon={icon} width={width} height={height} />
    );
}
export default BaseButton;