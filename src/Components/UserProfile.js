import React, {useEffect, useState} from 'react';
import {useAtom} from "jotai";
import {userState} from "../State/user";
import {getUserToken} from "../Utils/localStorage";
import {api} from "../API/api";
import UserCampaigns from "./UserCampaigns";
import UserCharacters from "./UserCharacters";
import {useNavigate} from "react-router-dom";

function UserProfile() {
    const [user,] = useAtom(userState);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch user data from the API using the session or access token
    const fetchUser = async () => {
        try {
            const response = await api.user.getUserInfo(user.id);
            if (response.ok) {
                console.info('User data fetched successfully:', response.status);
            } else {
                // Handle error response
                console.error('Failed to fetch user data:', response.status);
            }
        } catch (error) {
            // Handle network or other errors
            console.error('Error while fetching user data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDashboard = () => {
        navigate('/dashboard')
    };

    useEffect(() => {
        fetchUser()
    });

    if (!getUserToken()) {
        return <div>Please log in to view the user profile.</div>;
    }

    if (loading) {
        return <div>Loading user profile...</div>;
    }

    if (!user) {
        return <div>Failed to fetch user profile.</div>;
    }

    return (
        <div>
            <h2>User Profile</h2>
            <p>
                <strong>Username:</strong> {user.username}
            </p>
            <p>
                <strong>Role:</strong> {user.roles}
            </p>
            <UserCampaigns/>
            <UserCharacters/>
            <div>
                <button onClick={handleDashboard}>Jump to the dashboard</button>
            </div>
        </div>
    );
}

export default UserProfile;