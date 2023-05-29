import {BASE_URL} from "./api";
import {getUserToken} from "../Utils/localStorage";

export const auth = {
    signup: (data) => {
        return fetch(`${BASE_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    },
    signin: (data) => {
        return fetch(`${BASE_URL}/auth/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    },
    logout: () => {
        return fetch(`${BASE_URL}/auth/logout`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${getUserToken()}`, // Include the JWT token in the header
            }
        });
    }
}