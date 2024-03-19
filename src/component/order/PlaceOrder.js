import React, { useState } from "react";
import Nav from '../nav/NavigationBar';
import { TextField, Button, Typography, Container, Box, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function PlaceOrder() {
    const [formData, setFormData] = useState({
        address_line1: '',
        address_line2: '',
        city: '',
        state: '',
        postal_code: '',
        phone_number: '',
        payment_type: 'COD',
    });

    const [alertOpen, setAlertOpen] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = async () => {
        // console.log(formData);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:8000/api/order/place_orders/', formData, { headers: { Authorization: `Bearer ${token}` } });
            console.log('Order placed successfully:', response.data);
            setAlertOpen(true);
            setFormData({
                addressLine1: ' ',
                addressLine2: ' ',
                city: ' ',
                state: ' ',
                postalCode: ' ',
                phoneNumber: +' ',
            });
            setTimeout(() => {
                navigate('/home');
            }, 2000);
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };
    return (
        <>
            <Nav />

            <div style={{ padding: '20px' }}>
                <Typography variant="h4">Place Order</Typography>
                {alertOpen && (
                    <Box sx={{ marginTop: 2 }}>
                        <Alert severity="success" onClose={() => setAlertOpen(false)}>
                            Your order is placed. Bill will be sent to your email.
                        </Alert>
                    </Box>
                )}
                <Container component="main" maxWidth="xs">
                    <Box sx={{ marginTop: 2 }}>
                        <TextField
                            label="Address Line 1"
                            type="text"
                            name="address_line1"
                            value={formData.address_line1}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Box>
                    <Box sx={{ marginTop: 3 }}>
                        <TextField
                            label="Address Line 2"
                            type="text"
                            name="address_line2"
                            value={formData.address_line2}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Box>
                    <Box sx={{ marginTop: 3 }}>
                        <TextField
                            label="City"
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Box>
                    <Box sx={{ marginTop: 3 }}>
                        <TextField
                            label="State"
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Box>
                    <Box sx={{ marginTop: 3 }}>
                        <TextField
                            label="Postal Code"
                            type="number"
                            name="postal_code"
                            value={formData.postal_code}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Box>
                    <Box sx={{ marginTop: 3 }}>
                        <TextField
                            label="Phone Number"
                            type="text"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Box>
                    <Box sx={{ marginTop: 3 }}>
                        <TextField
                            label="Payment Method"
                            type=""
                            value="COD"
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}

                        />
                    </Box>
                    <Box sx={{ marginTop: 4 }}>
                        <Button variant="contained" color="primary" fullWidth onClick={handlePlaceOrder} >
                            Place Order
                        </Button>
                    </Box>

                </Container>
            </div>
        </>
    );
}

export default PlaceOrder;