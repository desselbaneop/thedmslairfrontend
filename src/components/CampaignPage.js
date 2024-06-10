import React, { useEffect, useState } from 'react';
import { api } from '../API/api';
import { useParams } from 'react-router-dom';
import '../css/CampaignPage.css';

const CampaignPage = () => {
    const { campaign_id } = useParams();
    const [characters, setCharacters] = useState([]);
    const [isPopupOpen, setPopupOpen] = useState(false);

    const handleOpenPopup = () => {
        setPopupOpen(true);
    };

    const handleClosePopup = () => {
        setPopupOpen(false);
    };

    const fetchCampaignsCharacters = async () => {
        try {
            const response = await api.campaign.getCharactersByCampaignId(campaign_id);

            if (response) {
                const characters = await response.json();
                console.log(characters)
                // setCharacters(characters);
            } else {
                console.error('Failed to fetch characters:', response.status);
            }
        } catch (error) {
            console.error('Error while fetching characters:', error);
        }
    };

    useEffect(() => {
        if (campaign_id) {
            fetchCampaignsCharacters();
        }
    }, [ campaign_id ]);

    return (
        <div className="campaign-page">
            <div className="character-list">
                {characters.length > 0 ? (
                    characters.map((character) => (
                        <div key={character.id} className="character-card">
                            <img src={character.imgURL} alt={character.name} />
                            <div className="character-details">
                                <h3>{character.name}</h3>
                                <p>{character.description}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    [...Array(4)].map((_, index) => (
                        <div className="character-card placeholder" key={index}>
                            <span>Placeholder</span>
                        </div>
                    ))
                )}
            </div>
            <div className="paper-sheet"></div>
            {isPopupOpen && (
                <div className="popup-container">
                    <div className="popup-content">
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
