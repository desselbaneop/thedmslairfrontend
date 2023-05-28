// SessionContext.js
import React, { createContext, useState, useEffect } from 'react';

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the access token exists in session storage
        const accessToken = sessionStorage.getItem('accessToken');
        if (accessToken) {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <SessionContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </SessionContext.Provider>
    );
};