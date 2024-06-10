import React, { useState } from 'react';
import RegistrationForm from './RegistrationForm';
import SignInForm from './SignInForm';

const AuthPage = () => {
    const [showRegistrationForm, setShowRegistrationForm] = useState(true);

    const handleToggleForm = () => {
        setShowRegistrationForm(!showRegistrationForm);
    };

    return (
        <div>
            {showRegistrationForm ? (
                <div>
                    <h1>Registration</h1>
                    <RegistrationForm />
                    <p>
                        Already have an account?{' '}
                        <button onClick={handleToggleForm}>Sign In</button>
                    </p>
                </div>
            ) : (
                <div>
                    <h1>Sign In</h1>
                    <SignInForm />
                    <p>
                        Don't have an account?{' '}
                        <button onClick={handleToggleForm}>Register</button>
                    </p>
                </div>
            )}
        </div>
    );
};

export default AuthPage;
