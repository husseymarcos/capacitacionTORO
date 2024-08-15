import React from 'react';
import { Paper, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

interface FeatureCardProps {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    buttonColor: 'primary' | 'secondary';
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, buttonText, buttonLink, buttonColor }) => {
    return (
        <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', borderRadius: '8px' }}>
            <Typography variant="h6" gutterBottom>
                {title}
            </Typography>
            <Typography paragraph>
                {description}
            </Typography>
            <Button variant="contained" color={buttonColor} component={Link} to={buttonLink}>
                {buttonText}
            </Button>
        </Paper>
    );
};

export default FeatureCard;
