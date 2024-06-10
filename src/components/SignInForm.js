// src/Components/SignInForm.js
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { api } from "../API/api";
import { useDispatch } from 'react-redux';
import { setUser } from '../slices/userSlice';
import { setFetchingId } from "../Utils/localStorage";
import {wait} from "@testing-library/user-event/dist/utils";

const SignInForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            username,
            password,
        };

        try {
            const response = await api.auth.signin(userData);

            // Sign-in successful
            dispatch(setUser(response.userResponse)); // Изменение здесь
            setSuccessMessage('Login successful!');
            setErrorMessage('');
            setFetchingId(response.userResponse.id);
            navigate(`/profile/${response.userResponse.id}`);
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
