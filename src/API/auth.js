import axiosInstance from "./axiosInterface";
import {clearSession, getRefreshToken, setAccessToken, setRefreshToken} from "../Utils/tokenStorage";
import {setAuthorizedUser} from "../Utils/localStorage";

export const auth = {
    signup: async (data) => {
        try {
            const response = await axiosInstance.post('/auth/signup', data);

            if (response.status === 200) {
                // Registration successful
                console.log('Registration successful!');
            } else {
                console.log(response.status)
                // Registration failed
                console.error('Registration failed. Please try again.')
            }

            return response;
        } catch (error) {
            console.error('Error during API call:', error);
            throw error;
        }
    },
    signin: async (data) => {
        try {
            const response = await axiosInstance.post('/auth/signin', data);

            if (response.status !== 200) {
                throw new Error('Login failed');
            }

            const responseData = response.data;
            console.log('Received response data:', responseData);

            setAccessToken(responseData.token);
            setRefreshToken(responseData.refreshToken);
            setAuthorizedUser(JSON.stringify(responseData.userResponse))
            return responseData;
        } catch (error) {
            console.error('Error during API call:', error);
            throw error;
        }
    },
    logout: () => {
        return axiosInstance.post('/auth/logout').then(response => {
            if (response.status !== 200) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            clearSession();

            console.log('Logout successful:', response.data);
        }).catch(error => {
            console.error('Error during logout:', error);
        });
    },
    refreshToken: async () => {
        const refreshToken = getRefreshToken();
        const response = await axiosInstance.post('/auth/refresh-token', { refreshToken });

        if (response.status !== 200) {
            clearSession();
            throw new Error('Failed to refresh token');
        }

        const data = response.data;
        setAccessToken(data.accessToken);
        return data;
    }
    /*refreshToken: async () => {
        const refreshToken = getRefreshToken();
        const response = await fetch(`${BASE_URL}/auth/refresh-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken }),
        });

        if (!response.ok) {
            clearTokens();
            throw new Error('Failed to refresh token');
        }

        const data = await response.json();
        setAccessToken(data.accessToken);
        return data;
    }*/
}

export let refreshTokenResponse = {
    refreshToken: '',
    accessToken: '',
    tokenType: 'Bearer'
}