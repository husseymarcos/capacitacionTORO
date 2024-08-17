export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  userId: number
}

export interface JwtPayload {
  userId: number;
}

export interface CreateTodoDto {
  title: string;
  description?: string;
  completed: boolean;
}

export interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
}