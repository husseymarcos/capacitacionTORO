import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import '../styles/Footer.css';

const Footer: React.FC = () => {
    return (
        <Box component="footer" className="footer">
            <Container maxWidth="lg">
                <Typography variant="body2" className="footer-text">
                    © {new Date().getFullYear()} Marcos Hussey. All rights reserved.
                </Typography>
                <Typography variant="body2" className="footer-text">
                    Contact: mhussey@mail.austral.edu.ar
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;
