import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CartTable from './CartTable'; // Adjust path if needed
import Nav from '../nav/NavigationBar';
import Loading from '../helper/Loading';
import Error from '../helper/Error';
import './cart.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const CartView = () => {
    const [cartData, setCartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/webview/view_cart/', { headers: { Authorization: `Bearer ${token}` } });
                setCartData(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <Error message={error} />;
    }

    return (
        <>
            <Nav />
            <br></br><div id="cart_div">
                <h2>Cart Items</h2>
                {cartData && <CartTable cart={cartData.cart} total={cartData.total} />}

            </div></>
    );
};

export default CartView;
