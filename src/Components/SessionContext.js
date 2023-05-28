import React, { createContext, useState, useEffect, useContext } from 'react';

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
    const [session, setSession] = useState(null);

    useEffect(() => {
        // Check if the access token exists in session storage
        const accessToken = sessionStorage.getItem('accessToken');
        if (accessToken) {
            setSession(accessToken);
        }
    }, []);

    return (
        <SessionContext.Provider value={{ session, setSession }}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSession = () => useContext(SessionContext);