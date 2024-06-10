// src/Components/LogoutButton.js
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import LogoutMessage from "./LogoutMessage";
import {useDispatch, useSelector} from 'react-redux';
import {clearUser} from '../slices/userSlice';
import {api} from "../API/api";
import {clearSession} from "../Utils/tokenStorage";

function LogoutButton() {
    const [showMessage, setShowMessage] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);

    const handleLogout = async () => {
        try {
            const response = await api.auth.logout();
            if (response.ok) {
                setShowMessage(true);
            } else {
                console.log('Logout failed');
            }
        } catch (error) {
            console.log('Error during logout:', error);
        }
        navigate('/');
        dispatch(clearUser());
        clearSession();
    };

    if (!user) {
        return null;
    }

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
            {showMessage && <LogoutMessage message="You have been logged out." />}
        </div>
    );
}

export default LogoutButton;
