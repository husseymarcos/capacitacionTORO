import React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import FeatureCard from './FeatureCard';
import Footer from './Footer';
import '../styles/Home.css'; 

const Home: React.FC = () => {
    return (
        <Box className="home-container">
            <Container maxWidth="lg">
                <Box py={6}>
                    <Typography variant="h2" className="home-title" gutterBottom>
                        Welcome to Your Daily To-Do List
                    </Typography>
                    <Box className="feature-card-grid">
                        <Grid container spacing={4} className="feature-card-item">
                            <Grid item xs={12} sm={6} md={4}>
                                <FeatureCard
                                    title="Create and Manage Tasks"
                                    description="Add new tasks and mark them as completed with ease."
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
