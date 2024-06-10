import {BASE_URL} from "./api";
import {getAccessToken} from "../Utils/tokenStorage";
import axiosInstance from "./axiosInterface";

export const campaign = {
    create: (data) => {
        console.log(data)
        return axiosInstance.post('/campaign', data)
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
    getCharactersByCampaignId: async (campaignId) => {
        try {
            const response = await axiosInstance.get(`/campaign/${campaignId}`);

            if (response.status !== 200) {
                throw new Error('Fetching campaign\'s info failed');
            }

            return response.data;
        }catch (error) {
            console.error('Error during API call:', error);
            throw error;
        }
    }
}