import {BASE_URL} from "./api";
import {getAccessToken} from "../Utils/tokenStorage";
import axiosInstance from "./axiosInterface";

export const user = {
    getUserInfo: async (userId) => {
        try {
            const response = await axiosInstance.get(`/users/${userId}`);

            if (response.status !== 200) {
                throw new Error('Fetching user\'s data failed');
            }else {
                return response.data;

            }
        } catch (error) {
            console.error('Error during API call:', error);
            throw error;
        }
    },
    getCampaignsByUserId: async (userId) => {
        return fetch(`${BASE_URL}/users/${userId}/campaigns`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
            }
        })
    },
    getCharactersByUserId: async (userId) => {
        return fetch(`${BASE_URL}/users/${userId}/characters`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
            }
        })
    },
}