import axios from 'axios';


export const axiosQueryInstance = axios.create({
    baseURL: 'https://fakestoreapi.com',
});

export const axiosInstance = axios.create({
    baseURL: 'https://api.escuelajs.co/api/v1',
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});