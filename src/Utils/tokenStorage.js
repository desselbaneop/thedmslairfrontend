// src/Utils/tokenStorage.js
import {clearAuthorizedUser, clearFetchedUser, clearFetchingUser} from "./localStorage";

export const getAccessToken = () => {
    return localStorage.getItem('accessToken');
};

export const getRefreshToken = () => {
    return localStorage.getItem('refreshToken');
};

export const setAccessToken = (token) => {
    localStorage.setItem('accessToken', token);
};

export const setRefreshToken = (token) => {
    localStorage.setItem('refreshToken', token);
};

export const clearSession = () => {
    console.log('Clearing tokens');
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    clearFetchingUser();
    clearFetchedUser();
    clearAuthorizedUser();
};
