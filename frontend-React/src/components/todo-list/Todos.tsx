import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserTodos, createTodo } from '../../services/api';
import { jwtDecode } from "jwt-decode";

interface Todo {
    id: number;
    title: string;
    description: string;
}

interface JwtPayload {
    userId: number;
    email: string;
}

export default function Todos() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [newTodoTitle, setNewTodoTitle] = useState('');
    const [newTodoDescription, setNewTodoDescription] = useState('');

    React.useEffect(() => {
        const fetchTodos = async () => {
            try {
                const token = localStorage.getItem('jwtToken');
                if (!token) {
                    throw new Error('User not authenticated');
                }

                const decoded: JwtPayload = jwtDecode(token);
                const userId = decoded.userId;

                const response = await getUserTodos(userId, token);
                setTodos(response);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                    toast.error(error.message);
                } else {
                    setError('An unexpected error occurred');
                    toast.error('An unexpected error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchTodos();
    }, []);

    const handleCreateTodo = async () => {
        try {
            const token = localStorage.getItem('jwtToken');
            if (!token) {
                throw new Error('User not authenticated');
            }

            const decoded: JwtPayload = jwtDecode(token);
            const userId = decoded.userId;

            const newTodo = {
                userId: userId,
                title: newTodoTitle,
                description: newTodoDescription,
                completed: false,
                dueDate: new Date(),
            };

            const createdTodo = await createTodo(newTodo, token);
            setTodos([...todos, createdTodo]);
            setNewTodoTitle('');
            setNewTodoDescription('');
            toast.success('Todo created successfully!');
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('An unexpected error occurred');
            }
        }
    };


    if (loading) {
        return (
          <Container component="main" maxWidth="sm">
              <Box display="flex" justifyContent="center" mt={4}>
                  <CircularProgress />
              </Box>
          </Container>
        );
    }

    if (error) {
        return (
          <Container component="main" maxWidth="sm">
              <Typography variant="h6" color="error" align="center" mt={4}>
                  {error}
              </Typography>
          </Container>
        );
    }

    return (
      <Container component="main" maxWidth="sm">
          <Typography component="h1" variant="h5" align="center" gutterBottom>
              Your To-Dos
          </Typography>

          <Box mb={4}>
              <TextField
                fullWidth
                label="Title"
                value={newTodoTitle}
                onChange={(e) => setNewTodoTitle(e.target.value)}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Description"
                value={newTodoDescription}
                onChange={(e) => setNewTodoDescription(e.target.value)}
                margin="normal"
              />
              <Button variant="contained" color="primary" onClick={handleCreateTodo}>
                  Add To-Do
              </Button>
          </Box>

          <List>
              {todos.map((todo) => (
                <ListItem key={todo.id} divider>
                    <ListItemText primary={todo.title} secondary={todo.description} />
                </ListItem>
              ))}
          </List>
          <ToastContainer position="top-center" />
      </Container>
    );
}
