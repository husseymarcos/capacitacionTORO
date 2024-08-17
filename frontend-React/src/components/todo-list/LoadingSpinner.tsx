import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingSpinner: React.FC = () => (
  <Container component="main" maxWidth="sm">
    <Box display="flex" justifyContent="center" mt={4}>
      <CircularProgress />
    </Box>
  </Container>
);

export default LoadingSpinner;
