import React from 'react';
import { Typography } from '@mui/material';

const Error = ({ message }) => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <Typography variant="h6" color="error">{message}</Typography>
  </div>
);

export default Error;
