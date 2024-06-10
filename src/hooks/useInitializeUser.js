// src/hooks/useInitializeUser.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../slices/userSlice';
import {getAuthorizedUser} from "../Utils/localStorage";

const useInitializeUser = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const user = getAuthorizedUser();
        if (user) {
            dispatch(setUser(user));
        }
    }, [dispatch]);
};

export default useInitializeUser;
