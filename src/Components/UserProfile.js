import React, { useEffect, useState } from 'react';
import { useAtom } from "jotai";
import { userState } from "../State/user";
import { getAccessToken } from "../Utils/tokenStorage";
import { api } from "../API/api";
import UserCampaigns from "./UserCampaigns";
import UserCharacters from "./UserCharacters";
import { useNavigate, useParams } from "react-router-dom";
import { getFetchedUser, getFetchingId, setFetchedUser } from "../Utils/localStorage";

function UserProfile() {
    const { id } = useParams();
    const [user, setUser] = useAtom(userState);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
            const response = await api.user.getUserInfo(getFetchingId());
            if (response.ok) {
                const data = await response.json();
                setUser(data);
                setFetchedUser(JSON.stringify(data));
                console.info('User data fetched successfully.');
            } else {
                console.error('Failed to fetch user data:', response.status);
            }
        } catch (error) {
            console.error('Error while fetching user data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const storedUser = getFetchedUser();
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser.id === id) {
                setUser(parsedUser);
                setLoading(false);
                return;
            }
        }
        fetchUser();
    }, [id, setUser]);

    const handleDashboard = () => {
        navigate('/dashboard');
    };

    if (!getAccessToken()) {
        return <div>Please log in to view the user profile.</div>;
    }

    if (loading) {
        return <div>Loading user profile...</div>;
    }

    if (!user || !user.id) {
        return <div>Failed to fetch user profile.</div>;
    }

    return (
        <div>
            <h2>User Profile</h2>
            <p>
                <strong>ID:</strong> {user.id}
            </p>
            <p>
                <strong>Username:</strong> {user.username}
            </p>
            <p>
                <strong>Email:</strong> {user.email}
            </p>
            <p>
                <strong>Roles:</strong>
                {user.roles ? (
                    <ul>
                        {user.roles.map(role => (
                            <li key={role.id}>{role.name}</li>
                        ))}
                    </ul>
                ) : (
                    <span>No roles assigned</span>
                )}
            </p>
            <p>
                <strong>Email Verified:</strong> {user.isEmailVerified ? "Yes" : "No"}
            </p>
            <UserCampaigns />
            <UserCharacters />
            <div>
                <button onClick={handleDashboard}>Jump to the dashboard</button>
            </div>
        </div>
    );
}

export default UserProfile;
