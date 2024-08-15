import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer: React.FC = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: '#f5f5f5',
                padding: '20px 0',
                textAlign: 'center',
                marginTop: 'auto',
                borderTop: '1px solid #e0e0e0'
            }}
        >
            <Container maxWidth="lg">
                <Typography variant="body2" color="textSecondary">
                    © {new Date().getFullYear()} Marcos Hussey. All rights reserved.
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Contact: mhussey@mail.austral.edu.ar
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;
