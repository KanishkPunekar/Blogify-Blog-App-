import axios from "axios"
import { getToken } from "../auth";

export const BASE_URL='http://localhost:8080';

export const myAxios = axios.create({
    baseURL:BASE_URL
})

export const privateAxios = axios.create({
    baseURL: BASE_URL,
});

privateAxios.interceptors.request.use(config => {
    const token = getToken();
    console.log("Token in interceptor:", token); // Check if token is retrieved
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    console.log("Request config:", config); // Log the entire config for inspection
    return config;
}, error => Promise.reject(error));
