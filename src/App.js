// src/App.js
import './App.css';
import React, {useEffect} from 'react';
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import AuthPage from "./components/AuthPage";
import LogoutButton from "./components/LogoutButton";
import UserProfile from "./components/UserProfile";
import HomePage from "./components/HomePage";
import {useSelector} from 'react-redux';
import DashBoard from "./components/Dashboard";
import CharacterCreation from "./components/CharacterCreation";
import CampaignCreation from "./components/CampaignCreation";
import CampaignPage from "./components/CampaignPage";
import useInitializeUser from "./hooks/useInitializeUser";

function App() {
    useInitializeUser();

    const user = useSelector(state => state.user.user);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (user && location.pathname === '/login') {
            navigate(`/profile/${user.id}`);
        } else if (!user && location.pathname !== '/login') {
            navigate('/login')
        }
    }, [user, navigate, location]);

    return (
            <div className="App">
                <h1 className="main-header">Fantasy App</h1>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<AuthPage />} />
                        <Route path="/profile/:id" element={<UserProfile />} />
                        <Route path="/dashboard" element={<DashBoard />} />
                        <Route path="/character-creation" element={<CharacterCreation />} />
                        <Route path="/campaign-creation" element={<CampaignCreation />} />
                        <Route path="/campaigns/:id" element={<CampaignPage />} />
                    </Routes>
                    <LogoutButton />
            </div>
    );
}

export default App;
