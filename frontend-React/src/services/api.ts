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


interface CreateTodoDto {
    userId: number;
    title: string;
    description?: string;
    completed: boolean;
    dueDate: Date;
}

export const createTodo = async (data: CreateTodoDto, token: string) => {
    const response = await api.post('/todos/create', data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    return response.data;
};