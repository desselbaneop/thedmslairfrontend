import React, { useContext } from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import { SessionContext } from './SessionContext';

const PrivateRoute = () => {
    const { isLoggedIn } = useContext(SessionContext);

    return (isLoggedIn ? <Outlet /> : <Navigate to="/login" />);
};

export default PrivateRoute;
