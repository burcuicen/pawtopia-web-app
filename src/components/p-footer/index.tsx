import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'src/store';

import './styles.scss';

const PFooter: React.FC = () => {
    const isMobile = useSelector((state: RootState) => state.isMobile.value);

    return (
        <footer className="p-footer">
            {`Footer - Is Mobile: ${isMobile}`}
        </footer>
    );
};

export default PFooter;
