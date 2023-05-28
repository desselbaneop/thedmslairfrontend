import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { SessionContext } from './SessionContext';
import LogoutButton from './LogoutButton';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isLoggedIn } = useContext(SessionContext);

    return (
        <Route
            {...rest}
            render={(props) =>
                isLoggedIn ? (
                    <>
                        <Component {...props} />
                        <LogoutButton />
                    </>
                ) : (
                    <Navigate to="/login" />
                )
            }
        />
    );
};

export default PrivateRoute;
