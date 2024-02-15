import React, { createContext } from 'react';
import { PawtopiaAPI } from './index';  // Update the import path as needed

const ApiContext = createContext<PawtopiaAPI | null>(null);

export const ApiProvider: React.FC<any> = ({ children }) => {
    const api = PawtopiaAPI.getInstance();

    return (
        <ApiContext.Provider value={api}>
            {children}
        </ApiContext.Provider>
    );
};

export const useApi = () => {
    const context = React.useContext(ApiContext);
    if (!context) {
        throw new Error('useApi must be used within an ApiProvider');
    }
    return context;
};
