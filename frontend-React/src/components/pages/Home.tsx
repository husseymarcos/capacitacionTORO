import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <Container>
            <Typography variant="h2" gutterBottom>
                Welcome to Our App
            </Typography>
            <Typography variant="h5" paragraph>
                This is the home page where you can find information about our app.
            </Typography>
            <Button variant="contained" color="primary" component={Link} to="/sign-up">
                Sign Up
            </Button>
            <Button variant="contained" color="secondary" component={Link} to="/sign-in">
                Sign In
            </Button>
        </Container>
    );
};

export default Home;
