// src/API/interceptors.js
import axios from 'axios';
import { getRefreshToken, getAccessToken, clearTokens } from "../Utils/tokenStorage";

export const setupInterceptors = (axiosInstance) => {
    axiosInstance.interceptors.request.use(
        (config) => {
            const token = getAccessToken();
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            const originalRequest = error.config;
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    await getRefreshToken();
                    axios.defaults.headers.common['Authorization'] = `Bearer ${getAccessToken()}`;
                    return axiosInstance(originalRequest);
                } catch (err) {
                    clearTokens();
                    return Promise.reject(err);
                }
            }
            return Promise.reject(error);
        }
    );
};