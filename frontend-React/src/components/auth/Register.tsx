import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { registerUser } from "../../services/api";

const defaultTheme = createTheme();

export default function Register() {
    const [error, setError] = React.useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

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

        if (!userData.name || !isNaN(Number(userData.name))) {
            setError('Please insert a valid first name.');
            setIsSubmitting(false);
            return;
        }

        if (!userData.lastName || !isNaN(Number(userData.lastName))) {
            setError('Please insert a valid last name.');
            setIsSubmitting(false);
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(userData.email)) {
            setError('Please enter a valid email address.');
            setIsSubmitting(false);
            return;
        }

        try {
            await registerUser(userData);
            alert('User registered successfully!');
        } catch (error: any) {
            const hasErrorMessage = error.response && error.response.data
            if (hasErrorMessage) {
                const message = error.response.data.message || 'An unknown error occurred';
                setError(message);
            } else {
                console.error(error);
                setError('Failed to create user.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
      <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
              >
                  <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                      <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                      Sign Up
                  </Typography>
                  <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                        sx={{ mt: 3, mb: 2 }}
                        disabled={isSubmitting}
                      >
                          Sign Up
                      </Button>
                      {error && <Typography color="error">{error}</Typography>}
                      <Grid container justifyContent="flex-end">
                          <Grid item>
                              <Link href="#" variant="body2">
                                  Already have an account? Sign in
                              </Link>
                          </Grid>
                      </Grid>
                  </Box>
              </Box>
          </Container>
      </ThemeProvider>
    );
}
