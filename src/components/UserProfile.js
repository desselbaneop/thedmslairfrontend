import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from "../API/api";
import { getAccessToken } from "../Utils/tokenStorage";
import { getFetchedUser, setFetchedUser } from "../Utils/localStorage";
import { setUser } from '../slices/userSlice';
import UserCampaigns from "./UserCampaigns";
import UserCharacters from "./UserCharacters";

function UserProfile() {
    const { id } = useParams();
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
            const response = await api.user.getUserInfo(id);

            if (response) {
                setFetchedUser(JSON.stringify(response));
                console.info('User data fetched successfully.');
                dispatch(setUser(response));
            } else {
                console.error('Failed to fetch user data.');
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
                setLoading(false);
                return;
            }
        }
        fetchUser();
    }, [id, dispatch]);

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
