import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserTodos, createTodo, updateTodo, deleteTodo, getUserDetails } from '../../services/api';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload, Todo, User } from '../../services/types';
import TodoForm from './TodoForm';
import { useNavigate } from 'react-router-dom';
import '../styles/Todos.css';

export default function Todos() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem('jwtToken');
                if (!token) {
                    throw new Error('User not authenticated');
                }

                const decoded: JwtPayload = jwtDecode(token);
                const userId = decoded.userId;

                const userDetails = await getUserDetails(userId, token);
                setUser(userDetails);

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

        fetchUserDetails();
    }, []);

    const handleCreateTodo = async (todo: Todo) => {
        try {
            const token = localStorage.getItem('jwtToken');
            if (!token) {
                throw new Error('User not authenticated');
            }

            const createdTodo = await createTodo(todo, token);
            setTodos([...todos, createdTodo]);
            toast.success('Todo created successfully!');
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('An unexpected error occurred');
            }
        }
    };

    const handleEditTodo = async (todo: Todo) => {
        try {
            const token = localStorage.getItem('jwtToken');
            if (!token) {
                throw new Error('User not authenticated');
            }

            await updateTodo(todo.id, todo, token);
            setTodos(todos.map(t => t.id === todo.id ? todo : t));
            setEditingTodo(null);
            toast.success('Todo updated successfully!');
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('An unexpected error occurred');
            }
        }
    };

    const handleDeleteTodo = async (todoId: number) => {
        try {
            const token = localStorage.getItem('jwtToken');
            if (!token) {
                throw new Error('User not authenticated');
            }

            await deleteTodo(todoId, token);
            setTodos(todos.filter(todo => todo.id !== todoId));
            toast.success('Todo deleted successfully!');
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('An unexpected error occurred');
            }
        }
    };

    const handleToggleForm = () => {
        setIsFormVisible(!isFormVisible);
        if (isFormVisible) {
            setEditingTodo(null);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        toast.success('Successfully logged out!');
        navigate('/sign-in?logout=true');
    };

    if (loading) {
        return (
          <Container component="main" className="container">
              <Box display="flex" justifyContent="center" mt={4}>
                  <CircularProgress />
              </Box>
          </Container>
        );
    }

    if (error) {
        return (
          <Container component="main" className="container">
              <Typography variant="h6" color="error" align="center" mt={4}>
                  {error}
              </Typography>
          </Container>
        );
    }

    return (
      <Container component="main" className="container">
          <Box>
              <Typography component="h2" className="header">
                  Hello, {user?.name || 'User'}
              </Typography>

              <Box className="buttonGroup">
                  <IconButton className="addButton" onClick={handleToggleForm}>
                      <AddIcon />
                  </IconButton>
                  <IconButton className="logoutButton" onClick={handleLogout}>
                      <LogoutIcon />
                  </IconButton>
              </Box>

              {isFormVisible && (
                <TodoForm
                  onCreate={handleCreateTodo}
                  onEdit={handleEditTodo}
                  editingTodo={editingTodo}
                  userId={user?.id || 0}
                  onClose={() => setIsFormVisible(false)} // Pass onClose prop
                />
              )}

              {todos.length === 0 ? (
                <Box className="emptyListMessage">
                    <Typography variant="body1">
                        Your todo list is empty. Click the "+" button to create a new todo.
                    </Typography>
                </Box>
              ) : (
                <List className="todoList">
                    {todos.map((todo) => (
                      <ListItem key={todo.id} className="todoItem" divider>
                          <ListItemText
                            primary={todo.title}
                            secondary={`${todo.description} - Completed: ${todo.completed ? 'Yes' : 'No'}`}
                            className="todoItemText"
                          />
                          <IconButton className="deleteButton" onClick={() => handleDeleteTodo(todo.id)}>
                              <DeleteIcon />
                          </IconButton>
                          <IconButton className="editButton" onClick={() => {
                              setEditingTodo(todo);
                              handleToggleForm();
                          }}>
                              <EditIcon />
                          </IconButton>
                      </ListItem>
                    ))}
                </List>
              )}
          </Box>

          <ToastContainer position="top-center" />
      </Container>
    );
}