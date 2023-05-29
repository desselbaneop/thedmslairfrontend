import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {api} from "../API/api";
import {useAtom} from "jotai";
import {userState} from "../State/user";
import {setUserToken} from "../Utils/localStorage";

const SignInForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const [, setUser] = useAtom(userState)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            username,
            password
        };

        try {
            const response = await api.auth.signin(userData);

            if (response.ok) {

                // Sign-in successful
                const data = await response.json();
                console.log(data)
                setUser(data)
                setUserToken(data.accessToken)
                setSuccessMessage('Login successful!'); // Set success message
                setErrorMessage(''); // Clear error message
                navigate('/profile');
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