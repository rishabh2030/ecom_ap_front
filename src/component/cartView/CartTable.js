import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TableFooter } from '@mui/material';

const CartTable = ({ cart, total }) => {
    const navigate = useNavigate();
    const HandleActions = async (productId) => {
        try {
            const data = { product_id: productId };
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:8000/api/webview/remove_cart/', data, { headers: { Authorization: `Bearer ${token}` } });
            if (response.status === 200) {
                console.log("remove_cart");
                navigate('/CartView');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const HandlePlaceOrder = () => {
        navigate('/place_order');
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cart.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.product.name}</TableCell>
                            <TableCell>{item.product.quantity}</TableCell>
                            <TableCell>₹{item.product.price}</TableCell>
                            <TableCell>
                                <Button variant="contained" onClick={() => HandleActions(item.product.id)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total: ₹{total}</TableCell>
                        <TableCell>
                            {total !== 0 && <Button variant="contained" onClick={HandlePlaceOrder}>Place Order</Button>}
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
};

export default CartTable;
