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
import { useLocation, useNavigate } from 'react-router-dom'; 
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { signIn } from '../../services/api';


const defaultTheme = createTheme();

export default function SignIn() {
    const location = useLocation();
    const navigate = useNavigate(); 

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        const query = new URLSearchParams(location.search);
        if (query.get('registered') === 'true') {
            toast.success('Registration successful! You can now sign in.'); 
        }
    }, [location]);

    const handleBack = () => {
        navigate(-1);  
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await signIn({ email, password });
            toast.success('Sign in successful!');
            navigate('/home'); // Adjust the path as needed
        } catch (error) {
            toast.error('Sign in failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
      <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box className="container">
                  <Avatar className="avatar">
                      {/* Your avatar icon */}
                  </Avatar>
                  <Typography component="h1" variant="h5">
                      Sign In
                  </Typography>
                  <Box component="form" noValidate className="form" onSubmit={handleSubmit}>
                      <Grid container spacing={2}>
                          <Grid item xs={12}>
                              <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                          </Grid>
                      </Grid>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className="submit-button"
                        sx={{ mt: 2 }} 
                        disabled={loading}  
                      >
                          {loading ? 'Signing In...' : 'Sign In'}
                      </Button>
                      <Button
                        type="button"
                        fullWidth
                        variant="outlined"
                        className="back-button"
                        sx={{ mt: 2, mb: 2 }} 
                        onClick={handleBack}
                      >
                          Back
                      </Button>
                      <Grid container justifyContent="center" className="register-link" sx={{ mt: 2 }} >
                          <Grid item>
                              <Link href="/sign-up" variant="body2">
                                  Don't have an account? Register
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
