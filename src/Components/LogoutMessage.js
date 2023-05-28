import React from 'react';

function LogoutMessage({ message }) {
    return (
        <div className="logout-message">
            <p>{message}</p>
        </div>
    );
}

export default LogoutMessage;