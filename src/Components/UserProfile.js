import React, { useEffect, useState } from 'react';
import { useSession } from './SessionContext';

function UserProfile() {
    const { session } = useSession();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch user data from the API using the session or access token
        const fetchUser = async () => {
            try {
                const response = await fetch(`/api/users/${session.userId}`);
                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
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

        if (session && session.userId) {
            fetchUser();
        }
    }, [session]);

    if (!session) {
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
                <strong>Email:</strong> {user.email}
            </p>
            <h3>Campaigns</h3>
            {user.campaignsParticipant.length > 0 ? (
                <ul>
                    {user.campaignsParticipant.map(campaign => (
                        <li key={campaign.id}>{campaign.name}</li>
                    ))}
                </ul>
            ) : (
                <p>No campaigns found.</p>
            )}
        </div>
    );
}

export default UserProfile;