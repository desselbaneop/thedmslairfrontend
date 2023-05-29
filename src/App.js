import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AuthPage from "./Components/AuthPage";
import LogoutButton from "./Components/LogoutButton";
import UserProfile from "./Components/UserProfile";
import {useAtom} from "jotai";
import {userState} from "./State/user";

function App() {
    const [user,] = useAtom(userState)

    return (
        <div className="App">
            <h1>Fantasy App</h1>
            <Router>
                {/* Render your components and routes here */}
                <Routes>
                    <Route path="/login" element={<AuthPage/>}/>
                    {user && <Route path="/profile" element={<UserProfile/>}/>}
                </Routes>
                {user && <LogoutButton/>}
            </Router>
        </div>
    );
}

export default App;
