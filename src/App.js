import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from "./Components/AuthPage";
import LogoutButton from "./Components/LogoutButton";
import PrivateRoute from "./Components/PrivateRoute";
import UserProfile from "./Components/UserProfile";
import {SessionProvider, useSession} from "./Components/SessionContext";

function App() {
    return (
        <div className="App">
            <h1>Fantasy App</h1>
            <Router>
                <SessionProvider>
                    {/* Render your components and routes here */}
                    <Routes>
                        <Route path="/login" element={<AuthPage/>} />
                        <Route path="/profile" element={<PrivateRoute/>}>
                            <Route path="/profile" element={<UserProfile />} />
                        </Route>
                    </Routes>
                    <LogoutButtonContainer />
                </SessionProvider>
            </Router>
        </div>
    );
}

function LogoutButtonContainer() {
    const { session } = useSession();

    return session ? <LogoutButton /> : null;
}

export default App;
