import {BASE_URL} from "./api";
import {getUserToken} from "../Utils/localStorage";

export const user = {
    getUserInfo: (data) => {
        return fetch(`${BASE_URL}/users/${data}`,{
            method: 'GET',
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${getUserToken()}`, // Include the JWT token in the header
            },
        })
    },
    getCampaignsByUserId: (data) => {
        return fetch(`${BASE_URL}/users/${data}/campaigns`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${getUserToken()}`, // Include the JWT token in the header
            },
        })
    },
    getCharactersByUserId: (data) => {
        return fetch(`${BASE_URL}/users/${data}/characters`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${getUserToken()}`, // Include the JWT token in the header
            },
        })
    },
}