import React, { useState } from 'react';

const SignInForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            username,
            password
        };

        try {
            const response = await fetch('http://127.0.0.1:8080/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                // Sign-in successful
                const data = await response.json();
                sessionStorage.setItem('accessToken', data.accessToken);
                setSuccessMessage('Login successful!'); // Set success message
                setErrorMessage(''); // Clear error message
                // Redirect to the desired page or handle the success accordingly
            } else {
                // Sign-in failed
                setSuccessMessage(''); // Set success message
                setErrorMessage('Invalid username or password. Please try again.'); // Set error message
            }
        } catch (error) {
            // Network error
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