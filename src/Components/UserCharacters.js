import React, {useEffect, useState} from 'react';
import {useAtom} from "jotai";
import {userState} from "../State/user";
import {getUserToken} from "../Utils/localStorage";
import {api} from "../API/api";

function UserCharacters() {
    const [user,] = useAtom(userState);
    const [loading, setLoading] = useState(true);
    const [characters, setCharacters] = useState([])

    // Fetch user data from the API using the session or access token
    const fetchUserCampaigns = async () => {
        try {
            const response = await api.user.getCharactersByUserId(user.id);


            if (response.ok) {
                const characters = await response.json();
                setCharacters(characters);
            } else {
                console.error('Failed to fetch user\'s characters:', response.status);
            }
        } catch (error) {
            console.error('Error while fetching user\' characters:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserCampaigns()
    });

    if (!getUserToken()) {
        return <div>Please log in to view the user profile.</div>;
    }
    if (loading) {
        return <div>Loading user's campaigns...</div>;
    }
    if (!user) {
        return <div>Failed to fetch user profile.</div>;
    }

    return (
        <div>
            <h3>Characters</h3>
            {characters.length > 0 ? (
                <ul>
                    {characters.map(campaign => (
                        <li key={campaign.id}>{campaign.name}</li>
                    ))}
                </ul>
            ) : (
                <p>No campaigns found.</p>
            )}
        </div>
    );
}

export default UserCharacters;