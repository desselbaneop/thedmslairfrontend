import React, { useState } from 'react';
import '../css/CampaignCharacter.css';

const CampaignCharacter = ({ character }) => {
    const [isPopupOpen, setPopupOpen] = useState(false);

    const handleOpenPopup = () => {
        setPopupOpen(true);
    };

    const handleClosePopup = () => {
        setPopupOpen(false);
    };

    return (
        <div className="campaign-character">
            <img
                className="character-image"
                // src={character.imgURL}
                src="../IMG/[removal.ai]_tmp-6475367e96905.png"
                alt={character.name}
                onClick={handleOpenPopup}
            />
            {isPopupOpen && (
                <div className="popup-container">
                    <div className="popup-content">
                        <h2>{character.name}</h2>
                        <p>{character.description}</p>
                        <p>Backstory: {character.backstory}</p>
                        <button onClick={handleClosePopup}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CampaignCharacter;
