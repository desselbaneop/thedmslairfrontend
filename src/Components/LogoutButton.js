import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionContext } from "./SessionContext";
import LogoutMessage from "./LogoutMessage";
import {useAtom} from "jotai";
import {userState} from "../State/user";

function LogoutButton() {
    const [showMessage, setShowMessage] = useState(false);
    const navigate = useNavigate();
    const { setSession } = useContext(SessionContext);
    const [, setUser] = useAtom(userState)

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`, // Include the JWT token in the header
                }
            });

            if (response.ok) {
                setUser(null)
                console.log('Logout successful'); // Indicate successful logout in the console
                setSession(null); // Clear the session in the context
                setShowMessage(true); // Show the pop-up message
                navigate('/login'); // Redirect to the login page

                localStorage.removeItem('accessToken')
            } else {
                console.log('Logout failed'); // Indicate logout failure in the console
                // Handle logout failure
                // Show an error message or perform any necessary actions
            }
        } catch (error) {
            console.log('Error during logout:', error); // Log any network or other errors
            // Handle network or other errors
        }
    };

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
            {showMessage && <LogoutMessage message="You have been logged out." />}
        </div>
    );
}

export default LogoutButton;