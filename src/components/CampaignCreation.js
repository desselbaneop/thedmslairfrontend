import React, { useState } from 'react';
import { api } from '../API/api';
import { v4 as uuidv4 } from "uuid";
import {useSelector} from "react-redux";

function CampaignCreation() {
    const user = useSelector(state => state.user.user);
    const [campaignData, setCampaignData] = useState({
        id: '',
        name: '',
        description: '',
        characters: [],
        campaignUsers: [],
        coverImage: null,
        isPublic: false
    });
    const [coverImage, setCoverImage] = useState(null)

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setCampaignData(prevData => ({
            ...prevData,
            id: uuidv4(),
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = (event) => {
        setCoverImage(event.target.files[0])
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('request', new Blob([JSON.stringify(campaignData)], { type: 'application/json' }));
        formData.append('art', coverImage);

        try {
            const response = await api.campaign.create(formData);
            if (response.ok) {
                // Campaign created successfully
                console.log('Campaign created:', response.data);
                // Reset the form
                setCampaignData({
                    id: '',
                    name: '',
                    description: '',
                    characters: [],
                    campaignUsers: [],
                });
                setCoverImage(null);
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

                <label htmlFor="coverImage">Cover Image:</label>
                <input
                    type="file"
                    id="coverImage"
                    name="coverImage"
                    onChange={handleFileChange}
                />

                <label htmlFor="isPublic">Public:</label>
                <input
                    type="checkbox"
                    id="isPublic"
                    name="isPublic"
                    checked={campaignData.isPublic}
                    onChange={handleChange}
                />

                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default CampaignCreation;