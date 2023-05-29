import React from 'react';
import {useNavigate} from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();

    const handleNavigateToLogin = () => {
        navigate('/login')
    };

    const handleNavigateToCampaignCreation = () => {
        navigate('/campaign-creation')
    };

    const handleNavigateToCharacterCreation = () => {
        navigate('/character-creation')
    };

    /*    const handleNavigateToJoinCampaign = () => {
            navigate('/campaign-creation')
        };*/


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
                    {/*<button onClick={handleNavigateToCampaignCreation}>Join an existing campaign</button>*/}
                </div>
                <p className="home-description">Please join us in the DMS Lair and discover the world of Lorem Ipsum!</p>
                <div className="home-button">
                    <button onClick={handleNavigateToLogin}>Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;