import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { getUserTodos } from '../../services/api'; 

interface Todo {
    id: number;
    title: string;
    description: string;
}

export default function Todos() {
    const [todos, setTodos] = React.useState<Todo[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        const fetchTodos = async () => {
            try {
                const token = localStorage.getItem('jwtToken');
                if (!token) {
                    throw new Error('User not authenticated');
                }

                //
                const userId = 1; // Replace with the actual user ID or retrieve it dynamically
                //
                
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
