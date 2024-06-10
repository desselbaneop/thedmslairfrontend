import React from 'react';
import {useNavigate} from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();

    const handleNavigateToLogin = () => {
        navigate('/login')
    };

    return (
        <div className="home">
            <div className="home-content">
                <h1 className="home-title">Welcome to the Dungeon Master's Lair!</h1>
                <p className="home-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor feugiat ex id finibus. Phasellus scelerisque lacus ac purus tincidunt, sit amet condimentum leo tincidunt. Sed volutpat, nisl eget interdum pulvinar, ex nisl vulputate turpis, id tempor enim nunc id justo. Sed non turpis eget est convallis condimentum. Mauris eget mauris nec dolor bibendum egestas. Donec congue venenatis congue. Vestibulum ac velit in enim placerat bibendum at in dolor. Nulla et dui non erat posuere ullamcorper sed quis metus.</p>
                <p className="home-description">Nulla facilisi. In nec odio efficitur, ullamcorper leo a, efficitur tortor. Vivamus pulvinar eu mi vitae malesuada. In eget ultricies lorem. Donec lobortis, justo vitae pharetra interdum, nisl neque semper lacus, at dignissim leo neque sit amet dui.</p>
                <p className="home-description">Please join us in the DMS Lair and discover the world of Lorem Ipsum!</p>
                <div className="home-button">
                    <button onClick={handleNavigateToLogin}>Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;