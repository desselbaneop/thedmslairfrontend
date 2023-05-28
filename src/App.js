import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from "./Components/AuthPage";
import LogoutButton from "./Components/LogoutButton";
import { SessionProvider } from "./Components/SessionContext";
import PrivateRoute from "./Components/PrivateRoute";
// import HomePage from "./Components/HomePage";
// import DashboardPage from "./Components/DashboardPage";

function App() {
    return (
        <div className="App">
            <LogoutButton />
            <h1>Fantasy App</h1>
            <Router>
                <SessionProvider>
                    {/* Render your components and routes here */}
                    <Routes>
                        <Route exact path="/login" component={AuthPage} />
                        {/*<PrivateRoute exact path="/" component={HomePage} />*/}
                        {/*<PrivateRoute exact path="/dashboard" component={DashboardPage} />*/}
                         {/*Add more routes as needed */}
                    </Routes>
                </SessionProvider>
            </Router>
        </div>
    );
}

export default App;
