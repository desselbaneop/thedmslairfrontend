import {BASE_URL} from "./api";
import {getUserToken} from "../Utils/localStorage";

export const campaign = {
    create: (data) => {
        console.log(data)
        return fetch(`${BASE_URL}/campaign`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${getUserToken()}`, // Include the JWT token in the header
                'Content-Type': 'application/json', // Set the content type to JSON
            },
            body: JSON.stringify(data),
        })
    },
}