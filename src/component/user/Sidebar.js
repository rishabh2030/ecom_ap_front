import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import OrdersTable from './OrdersTable';
import axios from 'axios'; // Import Axios

const drawerWidth = 240;

function Sidebar() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Fetch orders with Axios
    axios.get('http://localhost:8000/api/order/order_list/', {
      headers: {
        Authorization: `Bearer ${token}` // Replace with your bearer token
      }
    })
    .then(response => {
      setOrders(response.data);
    })
    .catch(error => {
      setError(error.message);
    });
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        sx={{
          width: drawerWidth,
          flexShrink: 0,
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['Orders', 'Address', 'Bills'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1, p: 2 }}>
        {error ? (
          <div>Error: {error}</div>
        ) : (
          <OrdersTable orders={orders} />
        )}
      </Box>
    </Box>
  );
}

export default Sidebar;
