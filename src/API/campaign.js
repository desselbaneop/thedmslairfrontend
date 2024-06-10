import {BASE_URL} from "./api";
import {getAccessToken} from "../Utils/tokenStorage";
import axios from "axios";
import axiosInstance from "./axiosInterface";

export const campaign = {
    create: (data) => {
        console.log(data)
        return axiosInstance.post('/campaign', data)
/*        return fetch(`${BASE_URL}/campaign`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${getAccessToken()}`, // Include the JWT token in the header
            },
            body: data,
        })*/
    },
    join: (campaignId) => {
        return fetch(`${BASE_URL}/campaign/joinCampaign/${campaignId}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${getAccessToken()}`, // Include the JWT token in the header
                'Content-Type': 'application/json', // Set the content type to JSON
            },
        })
    },
    getCharactersByCampaignId: (campaignId) => {
        return fetch(`${BASE_URL}/campaign/${campaignId}/characters`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${getAccessToken()}`, // Include the JWT token in the header
                'Content-Type': 'application/json', // Set the content type to JSON
            },
        })
    }
}