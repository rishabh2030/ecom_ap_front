import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import { TextField, Button, Typography, Container, Box } from '@mui/material';


function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      <Container maxWidth="xs">
        <Box sx={{ marginTop: 8, textAlign: 'center' }}>
          <Typography variant="h1">Wowman</Typography>
        </Box>
        {isLogin ? <Login /> : <Signup />}
        <Box sx={{ marginTop: 4 }}>
          <Button variant="contained" color="primary" fullWidth onClick={toggleForm}>
            {isLogin ? 'Switch to Signup' : 'Switch to Login'}
          </Button>
        </Box>
      </Container>

    </div>
  );
}

export default Auth;