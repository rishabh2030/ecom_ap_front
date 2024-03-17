import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State to handle error message
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/user/login/', { email, password });
      if (response.status === 200) {
        localStorage.setItem('token', response.data.result.access_token);
        navigate('/home');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.detail);
        setTimeout(() => {
          setError(null);
        }, 2000);
      } else {
        console.error('Login failed', error);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      {error && (
        <Box sx={{ marginTop: 2 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}
      <Box sx={{ marginTop: 8, textAlign: 'center' }}>
        <Typography variant="h4">Login</Typography>
      </Box>
      <Box sx={{ marginTop: 2 }}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Box>
      <Box sx={{ marginTop: 2 }}>
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Box>
      <Box sx={{ marginTop: 4 }}>
        <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
