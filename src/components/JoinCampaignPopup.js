import React, {useState} from 'react';
import {api} from "../API/api";
import {useSelector} from "react-redux";

const JoinCampaignPopup = ({ onClose }) => {
    const user = useSelector(state => state.user.user);
    const [campaignId, setCampaignId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await api.campaign.join(campaignId, user.id);

            if (response.ok) {
                console.log('Success! You\'ve joined the campaign')
            } else {
                console.error('Failed to fetch user\'s campaigns:', response.status);
            }
        } catch (error) {
            console.error('Error while fetching user\' campaigns:', error);
        }

        // Add your logic to join the campaign with the provided campaignId
        console.log(`Joining campaign with ID: ${campaignId}`);
        // Close the pop-up
        onClose();
    };

    return (
        <div className="popup-container">
            <div className="popup-content">
                <h2>Join Campaign</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Campaign ID:
                        <input
                            type="text"
                            value={campaignId}
                            onChange={(e) => setCampaignId(e.target.value)}
                        />
                    </label>
                    <button type="submit">Join</button>
                </form>
                <button className="close-button" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default JoinCampaignPopup;
