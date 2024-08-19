import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <Container component="main" maxWidth="sm">
    <Typography variant="h6" color="error" align="center" mt={4}>
      {message}
    </Typography>
  </Container>
);

export default ErrorMessage;
