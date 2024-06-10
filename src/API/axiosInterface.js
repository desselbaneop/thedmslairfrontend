// src/API/axiosInstance.js
import axios from 'axios';
import { setupInterceptors } from './interceptors';
import { BASE_URL } from "./api";

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8081/api',
    withCredentials: true
});

setupInterceptors(axiosInstance);

export default axiosInstance;