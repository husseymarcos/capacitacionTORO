import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api',
});

export const registerUser = async (data: any) => {
    return api.post('/auth/register', data);
};

export const signIn = async (data: any) => {
    return api.post('/auth/signIn', data);
};

interface Todo {
    id: number;
    title: string;
    description: string;
}


export const getUserTodos = async (userId: number, token: string): Promise<Todo[]> => {
    console.log('Fetching todos for user:', userId); 
    const response = await api.get('/todos/get', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            userId,
        },
    });
    return response.data;
};