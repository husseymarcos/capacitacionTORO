import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { registerUser } from "../../services/api";
import ListIcon from '@mui/icons-material/List';
import '../styles/Register.css'; 
import { useNavigate } from 'react-router-dom'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const defaultTheme = createTheme();

export default function Register() {
    const [error, setError] = React.useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const navigate = useNavigate(); 

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const data = new FormData(event.currentTarget);

        const userData = {
            name: data.get('firstName')?.toString() || '',
            lastName: data.get('lastName')?.toString() || '',
            email: data.get('email')?.toString() || '',
            password: data.get('password')?.toString() || '',
        };

        try {
            await registerUser(userData);
            navigate('/sign-in?registered=true'); 
        } catch (error: any) {
            if (error.response && error.response.data) {
                const errorMessage = Array.isArray(error.response.data.errors)
                  ? error.response.data.errors[0]
                  : error.response.data.message || 'An unknown error occurred';

                toast.error(errorMessage);
            } else {
                console.error(error);
                toast.error('Failed to create user.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBack = () => {
        navigate("/");
    };

    return (
      <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box 
                className="container"
              >
                  <Avatar className="avatar">
                      <ListIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                      Register new Account
                  </Typography>
                  <Box component="form" noValidate onSubmit={handleSubmit} className="form">
                      <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                              <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                              />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                              <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                              />
                          </Grid>
                          <Grid item xs={12}>
                              <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                              />
                          </Grid>
                          <Grid item xs={12}>
                              <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                              />
                          </Grid>
                      </Grid>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className="submit-button"
                        disabled={isSubmitting}
                        sx={{ mt: 2 }} 
                      >
                          Sign Up
                      </Button>
                      {error && <Typography className="error-message">{error}</Typography>}
                      <Button
                        onClick={handleBack}
                        variant="outlined"
                        fullWidth
                        sx={{ mt: 2 }} 
                      >
                        Back
                      </Button>
                      <Grid container justifyContent="center" className="signin-link" sx={{ mt: 2 }} >
                          <Grid item>
                              <Link href="/sign-in" variant="body2">
                                  Already have an account? Sign in
                              </Link>
                          </Grid>
                      </Grid>
                  </Box>
              </Box>
              <ToastContainer position="top-center" /> {}
          </Container>
      </ThemeProvider>
    );
}
