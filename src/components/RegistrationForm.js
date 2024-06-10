import React, { useState } from 'react';
import {api} from "../API/api";

const RegistrationForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(['user'])
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            username,
            email,
            password,
            role,
        };

        console.log('Sending user data:', userData); // Логирование отправляемых данных

        try {
            const response = await api.auth.signup(userData);

            if (response && response.status === 200) {
                // Registration successful
                setSuccessMessage('Registration successful!'); // Set success message
                setErrorMessage(''); // Clear error message
            } else {
                // Registration failed
                setSuccessMessage(''); // Clear success message
                setErrorMessage('Registration failed. Please try again.'); // Set error message
            }
        } catch (error) {
            // Network error
            setSuccessMessage(''); // Clear success message
            setErrorMessage('An error occurred. Please check your network connection.'); // Set error message
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
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegistrationForm;
