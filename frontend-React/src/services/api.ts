import axios from 'axios';
import { CreateTodoDto, Todo, User } from './types';


const api = axios.create({
    baseURL: 'http://localhost:3001/api',
});

export const registerUser = async (data: any) => {
    return api.post('/auth/register', data);
};

export const signIn = async (data: any) => {
    return api.post('/auth/signIn', data);
};


export const getUserTodos = async (userId: number, token: string): Promise<Todo[]> => {
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


export const createTodo = async (data: CreateTodoDto, token: string) => {
    const response = await api.post('/todos/create', data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    return response.data;
};

export const updateTodo = async (id: number, data: Partial<CreateTodoDto>, token: string) => {
    const response = await api.put(`/todos/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            id,
        },
    });
    return response.data;
};

export const deleteTodo = async (id: number, token: string) => {
    const response = await api.delete(`/todos/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            id,
        },
    });
    return response.data;
};

export const getUserDetails = async (userId: number, token: string): Promise<User> => {
    const response = await api.get(`/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};
