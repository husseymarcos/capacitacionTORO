// src/pages/Home.tsx
import React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import FeatureCard from '../pages/FeatureCard';
import Footer from '../pages/Footer';

const Home: React.FC = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh'
            }}
        >
            <Container maxWidth="lg">
                <Box py={6}>
                    <Typography variant="h2" gutterBottom align="center">
                        Welcome to Your To-Do List App
                    </Typography>
                    <Typography variant="h5" paragraph align="center">
                        Organize your tasks efficiently and stay on top of your goals with our easy-to-use to-do list app.
                    </Typography>
                    <Box my={6}>
                        <Grid container spacing={4} justifyContent="center">
                            <Grid item xs={12} sm={6} md={4}>
                                <FeatureCard
                                    title="Create and Manage Tasks"
                                    description="Add new tasks, categorize them, and mark them as completed with ease."
                                    buttonText="Get Started"
                                    buttonLink="/sign-up"
                                    buttonColor="primary"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <FeatureCard
                                    title="Stay Organized"
                                    description="Keep track of your tasks with our intuitive interface and reminders."
                                    buttonText="Sign In"
                                    buttonLink="/sign-in"
                                    buttonColor="secondary"
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
            <Footer />
        </Box>
    );
};

export default Home;
