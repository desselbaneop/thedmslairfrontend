import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import JoinCampaignPopup from "./JoinCampaignPopup";
import {useAtom} from "jotai";
import {userState} from "../State/user";
import ChooseCampaignPopup from "./ChooseCampaignPopup";

const HomePage = () => {
    const navigate = useNavigate();
    const [joinCampaignPopup, setJoinCampaignPopup] = useState(false);
    const [chooseCampaignPopup, setChooseCampaignPopup] = useState(false);

    const handleNavigateToCampaignCreation = () => {
        navigate('/campaign-creation')
    };

    const handleNavigateToCharacterCreation = () => {
        navigate('/character-creation')
    };

    const handleJoinCampaign = () => {
        setJoinCampaignPopup(true);
    };

    const handleChooseCampaign = () => {
        setChooseCampaignPopup(true);
    };

    const handleCloseJoinCampaignPopup = () => {
        setJoinCampaignPopup(false);
    };

    const handleCloseChooseCampaignPopup = () => {
        setChooseCampaignPopup(false);
    };

    return (
        <div className="home">
            <div className="home-content">
                <h1 className="home-title">Welcome to the Dungeon Master's Lair!</h1>
                <div className="home-functional-button">
                    <button onClick={handleNavigateToCampaignCreation}>Create a campaign</button>
                </div>
                <div className="home-functional-button">
                    <button onClick={handleNavigateToCharacterCreation}>Create a character</button>
                </div>
                <div className="home-functional-button">
                    <button onClick={handleJoinCampaign}>Join Campaign</button>
                </div>
                <div className="home-functional-button">
                    <button onClick={handleChooseCampaign}>Choose Campaign</button>
                </div>
                <p className="home-description">Please join us in the DMS Lair and discover the world of Lorem Ipsum!</p>
            </div>


            {joinCampaignPopup && (
                <div className="popup-container">
                    <span onClick={handleCloseJoinCampaignPopup}>Close</span>
                    <JoinCampaignPopup onClose={handleCloseJoinCampaignPopup}/>
                </div>
            )}
            {chooseCampaignPopup && (
                <div className="popup-container">
                    <span onClick={handleCloseChooseCampaignPopup}>Close</span>
                    <ChooseCampaignPopup onClose={handleCloseChooseCampaignPopup} />
                </div>
            )}
        </div>
    );
};

export default HomePage;