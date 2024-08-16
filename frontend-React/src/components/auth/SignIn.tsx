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
import { useLocation } from 'react-router-dom'; 
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const defaultTheme = createTheme();

export default function SignIn() {
    const location = useLocation();

    React.useEffect(() => {
        const query = new URLSearchParams(location.search);
        if (query.get('registered') === 'true') {
            toast.success('Registration successful! You can now sign in.'); 
        }
    }, [location]);

    return (
      <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box 
                className="container"
              >
                  <Avatar className="avatar">
                      {/* Your avatar icon */}
                  </Avatar>
                  <Typography component="h1" variant="h5">
                      Sign In
                  </Typography>
                  <Box component="form" noValidate className="form">
                      <Grid container spacing={2}>
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
                                autoComplete="current-password"
                              />
                          </Grid>
                      </Grid>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className="submit-button"
                        sx={{ mt: 2 }} 
                      >
                          Sign In
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
