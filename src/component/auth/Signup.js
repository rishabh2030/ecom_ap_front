import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import axios from 'axios';


const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null)
  const navigate = useNavigate();


  const handleSignup = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/user/register/', { name, email, dob, password });
      if (response.status === 200) {
        localStorage.setItem('token', response.data.access_token);
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
    <>
      <Box sx={{ marginTop: 8, textAlign: 'center' }}>
        {error && (
          <Box sx={{ marginTop: 2 }}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}
        <Typography variant="h4">Signup</Typography>
      </Box>
      <Box sx={{ marginTop: 4 }}>
        <TextField
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          type="date"
          fullWidth
          value={dob}
          onChange={(e) => setDob(e.target.value)}
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
      <Box sx={{ marginTop: 2 }}>
        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </Box>
      <Box sx={{ marginTop: 4 }}>
        <Button variant="contained" color="primary" fullWidth onClick={handleSignup}>
          Signup
        </Button>
      </Box>
    </>
  );
};

export default Signup;
