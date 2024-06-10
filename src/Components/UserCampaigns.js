import React, {useEffect, useState} from 'react';
import {useAtom} from "jotai";
import {userState} from "../State/user";
import {getAccessToken} from "../Utils/tokenStorage";
import {api} from "../API/api";

function UserCampaigns() {
    const [user,] = useAtom(userState);
    const [loading, setLoading] = useState(true);
    const [campaigns, setCampaigns] = useState([])

    // Fetch user data from the API using the session or access token
    const fetchUserCampaigns = async () => {
        try {
            const response = await api.user.getCampaignsByUserId(user.id);

            if (response.ok) {
                const campaigns = await response.json();
                setCampaigns(campaigns);
            } else {
                console.error('Failed to fetch user\'s campaigns:', response.status);
            }
        } catch (error) {
            console.error('Error while fetching user\'s campaigns:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserCampaigns()
    });

    if (!getAccessToken()) {
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
            <h3>Campaigns</h3>
            {campaigns.length > 0 ? (
                <ul>
                    {campaigns.map(campaign => (
                        <li key={campaign.id} > {campaign.name}</li>
                    ))}
                </ul>
            ) : (
                <p>No campaigns found.</p>
            )}
        </div>
    );
}

export default UserCampaigns;