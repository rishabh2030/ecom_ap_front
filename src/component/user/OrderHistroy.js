import React from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const OrderHistory = ({ products }) => {
    products.forEach(element => {
        console.log(element.id)
    })
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Product Name</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>City</TableCell>
                        <TableCell>Adress</TableCell>
                        <TableCell>Payment Method</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.product}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>{item.orginal_price}</TableCell>
                            <TableCell>{item.address.city}</TableCell>
                            <TableCell>{item.address.address_line1}</TableCell>
                            <TableCell>{item.payment_method}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default OrderHistory; // Don't forget to export the component
