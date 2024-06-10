import React, { useEffect, useState } from 'react';
import { api } from '../API/api';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ChooseCampaignPopup = ({ onClose }) => {
    const user = useSelector(state => state.user.user);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        fetchCampaigns();
    }, []); // Добавлен пустой массив зависимостей

    const fetchCampaigns = async () => {
        try {
            const response = await api.user.getCampaignsByUserId(user.id);
            if (response.ok) {
                const campaigns = await response.json();
                setCampaigns(campaigns);
            } else {
                console.error('Failed to fetch user\'s campaigns:', response.status);
            }
        } catch (error) {
            console.error('Error while fetching user\' campaigns:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCampaignSelection = (campaignId) => {
        console.log(campaignId);
        navigate(`/campaigns/${campaignId}`);
        onClose();
    };

    return (
        <div className="popup-container">
            <div className="popup-content">
                <h2>Choose Campaign</h2>
                {loading ? (
                    <div>Loading campaigns...</div>
                ) : (
                    <>
                        {campaigns.length > 0 ? (
                            <ul>
                                {campaigns.map((campaign) => (
                                    <li key={campaign.campaignId} onClick={() => handleCampaignSelection(campaign.campaignId)}>
                                        {campaign.name}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No campaigns found.</p>
                        )}
                    </>
                )}
            </div>
            <button className="close-button" onClick={onClose}>
                Close
            </button>
        </div>
    );
};

export default ChooseCampaignPopup;
