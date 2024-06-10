import {BASE_URL} from "./api";
import {getAccessToken} from "../Utils/tokenStorage";

export const user = {
    getUserInfo: async (userId) => {
        return fetch(`${BASE_URL}/users/${userId}`,{
            method: 'GET',
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${getAccessToken()}`, // Include the JWT token in the header
            },
        })
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