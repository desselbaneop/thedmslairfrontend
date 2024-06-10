import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { api } from "../API/api";
import { useAtom } from "jotai";
import { userState } from "../State/user";
import {setFetchingId} from "../Utils/localStorage";

const SignInForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const [user, setUser] = useAtom(userState);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            username,
            password,
        };

        try {
            const data = await api.auth.signin(userData);

            // Sign-in successful
            setUser(data);
            setSuccessMessage('Login successful!');
            setErrorMessage('');
            setFetchingId(data.userResponse.id)
            navigate(`/profile/${data.userResponse.id}`);
        } catch (error) {
            // Handle sign-in failure
            setSuccessMessage('');
            setErrorMessage('Invalid username or password. Please try again.');
            console.log('Error during sign-in:', error);
        }
    };

    return (
        <div>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};

export default SignInForm;
