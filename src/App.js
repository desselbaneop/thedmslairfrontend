import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AuthPage from "./Components/AuthPage";
import LogoutButton from "./Components/LogoutButton";
import UserProfile from "./Components/UserProfile";
import HomePage from "./Components/HomePage"
import {useAtom} from "jotai";
import {userState} from "./State/user";
import DashBoard from "./Components/DashBoard";
import CharacterCreation from "./Components/CharacterCreation";
import CampaignCreation from "./Components/CampaignCreation";
import CampaignPage from "./Components/CampaignPage";

function App() {
    const [user,] = useAtom(userState)

    return (
        <div className="App">
            {/*{user && <Navbar/>}*/}
            <h1 className="main-header">Fantasy App</h1>
            <Router>
                {/* Render your components and routes here */}
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/login" element={<AuthPage/>}/>
                    {user && (
                        <>
                            <Route exact path="/profile/:id" element={<UserProfile userId={user.id}/>}/>
                            <Route path="/dashboard" element={<DashBoard/>}/>
                            <Route path="/character-creation" element={<CharacterCreation/>}/>
                            <Route path="/campaign-creation" element={<CampaignCreation/>}/>
                            <Route path="/campaigns/:id" element={<CampaignPage />}/>
                            {/*<Route path="/campaign-creation" element={<CampaignCreation/>}/>*/}
                        </>
                    )}
                </Routes>
                {user && <LogoutButton/>}
            </Router>
        </div>
    );
}

export default App;
