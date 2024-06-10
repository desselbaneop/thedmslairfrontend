import React, {useEffect, useState} from 'react';
import CampaignCharacter from './CampaignCharacter';
import {api} from "../API/api";
import {useParams} from "react-router-dom";

const CampaignPage = () => {
    const campaign_id = 152
    // Replace with actual campaign and character data
    const campaign = {
        characters: [
            {
                id: 1,
                name: 'Character 1',
                description: 'Description 1',
                imgURL: '../IMG/[removal.ai]_tmp-6475367e96905.png',
            },
            // Add more characters if available
        ],
    };

    const [characters, setCharacters] = useState([])

    // State for controlling the pop-up visibility
    const [isPopupOpen, setPopupOpen] = useState(false);

    // Handler for opening the pop-up
    const handleOpenPopup = () => {
        setPopupOpen(true);
    };

    // Handler for closing the pop-up
    const handleClosePopup = () => {
        setPopupOpen(false);
    };

    const fetchCampaignsCharacters = async () => {
        try {
            const response = await api.campaign.getCharactersByCampaignId(campaign_id);

            if (response.ok) {
                const characters = await response.json();
                setCharacters(characters);
            } else {
                console.error('Failed to fetch user\'s characters:', response.status);
            }
        } catch (error) {
            console.error('Error while fetching user\'s characters:', error);
        }
    };

    useEffect(
        fetchCampaignsCharacters()
    );

    // Render the Campaign page with the character list and pop-up
    return (
        <div>
            <h1>Campaign Page</h1>
            <div className="character-list">
                {characters.length > 0 ? (
                    characters.map((character) => (
                        <CampaignCharacter key={character.id} character={character} />
                    ))
                ) : (
                    <>
                        {[...Array(4)].map((_, index) => (
                            <div
                                className="campaign-character-placeholder"
                                key={index}
                                onClick={handleOpenPopup}
                            >
                                <span>Placeholder</span>
                            </div>
                        ))}
                    </>
                )}
            </div>
            {isPopupOpen && (
                <div className="popup-container">
                    <div className="popup-content">
                        {/* Add your content for creating/selecting characters */}
                        <h2>Character Pop-up</h2>
                        <p>Here you can create or select a character.</p>
                        <button onClick={handleClosePopup}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CampaignPage;
