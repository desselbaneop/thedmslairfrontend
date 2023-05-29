import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutMessage from "./LogoutMessage";
import {useAtom} from "jotai";
import {userState} from "../State/user";
import {api} from "../API/api";

function LogoutButton() {
    const [showMessage, setShowMessage] = useState(false);
    const navigate = useNavigate();
    const [, setUser] = useAtom(userState)

    const handleLogout = async () => {
        try {
            const response = await api.auth.logout()

            if (response.ok) {
                setUser(null)
                console.log('Logout successful'); // Indicate successful logout in the console
                setShowMessage(true); // Show the pop-up message
                navigate('/'); // Redirect to the login page
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