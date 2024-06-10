import {BASE_URL} from "./api";
import axiosInstance from "./axiosInterface";
import {setAccessToken, setRefreshToken, clearTokens, getRefreshToken} from "../Utils/tokenStorage";
import {setAuthorizedUser} from "../Utils/localStorage";

export const auth = {
    signup: (data) => {
        return axiosInstance.post('/auth/signup', data);
    },
       /* return fetch(`${BASE_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    },*/
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
    /*signin: async (data) => {
        try {
            const response = await fetch(`${BASE_URL}/auth/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            console.log('API response:', response);

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.error('Error during API call:', error);
            throw error;
        }
    },*/
    logout: () => {
        return axiosInstance.post('/auth/logout').then(response => {
            if (response.status !== 200) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            clearTokens();
            console.log('Logout successful:', response.data);
        }).catch(error => {
            console.error('Error during logout:', error);
        });
    },
    /*logout: () => {
        return fetch(`${BASE_URL}/auth/logout`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Logout successful:', data);
                clearTokens()

                // Дополнительные действия при успешном логауте
            })
            .catch(error => {
                console.error('Error during logout:', error);
            });
    },*/
    refreshToken: async () => {
        const refreshToken = getRefreshToken();
        const response = await axiosInstance.post('/auth/refresh-token', { refreshToken });

        if (response.status !== 200) {
            clearTokens();
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