import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {SessionContext} from "./SessionContext";

function LogoutButton() {
    const navigateFunction = useNavigate();
    const { setSession } = useContext(SessionContext);

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
            });

            if (response.ok) {
                setSession(null); // Clear the session in the context
                navigateFunction('/login'); // Redirect to the login page
            } else {
                // Handle logout failure
                // Show an error message or perform any necessary actions
            }
        } catch (error) {
            // Handle network or other errors
        }
    };

    return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;