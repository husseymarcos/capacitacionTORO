import React from 'react';
import { Paper, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import '../styles/FeatureCard.css';

const FeatureCard: React.FC<{
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    buttonColor: 'primary' | 'secondary';
}> = ({ title, description, buttonText, buttonLink, buttonColor }) => {
    return (
        <Paper className="feature-card" elevation={3}>
            <Typography className="feature-card-title" variant="h6" gutterBottom>
                {title}
            </Typography>
            <Typography className="feature-card-description" paragraph>
                {description}
            </Typography>
            <Button className="feature-card-button" variant="contained" color={buttonColor} component={Link} to={buttonLink}>
                {buttonText}
            </Button>
        </Paper>
    );
};

export default FeatureCard;
