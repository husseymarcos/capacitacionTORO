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
    try {
        const response = await axios.get(`/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Error fetching todos');
        } else {
            throw new Error('Error fetching todos');
        }
    }
};

