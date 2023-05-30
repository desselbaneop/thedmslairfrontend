import React, { useState } from 'react';
import { api } from '../API/api';
import {useAtom} from "jotai/index";
import {userState} from "../State/user";

function CampaignCreation() {
    const [user,] = useAtom(userState);
    const [campaignData, setCampaignData] = useState({
        name: '',
        description: '',
        ownerId: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCampaignData(prevData => ({
            ...prevData,
            ownerId: user.id,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await api.campaign.create(campaignData);
            if (response.ok) {
                // Campaign created successfully
                console.log('Campaign created:', response.data);
                // Reset the form
                setCampaignData({
                    name: '',
                    description: ''
                });
            } else {
                // Handle error response
                console.error('Failed to create campaign:', response.status);
            }
        } catch (error) {
            // Handle network or other errors
            console.error('Error while creating campaign:', error);
        }
    };

    return (
        <div>
            <h3>Create Campaign</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={campaignData.name}
                    onChange={handleChange}
                />

                <label htmlFor="description">Description:</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={campaignData.description}
                    onChange={handleChange}
                />

                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default CampaignCreation;