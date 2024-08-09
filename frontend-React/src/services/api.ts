import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api',
});

export const registerUser = async (data: any) => {
    return api.post('/users/create', data);
};
