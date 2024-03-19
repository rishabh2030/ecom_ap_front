import React, { useState } from 'react';
import Nav from '../nav/NavigationBar';
import { useLocation } from 'react-router-dom';
import ProductCard from '../productCard/ProductCard';
import { makeStyles } from '@mui/styles';
import { TextField, Button, Typography, Container, Box } from '@mui/material';

const SearchPage = () => {
    const location = useLocation();
    const product = location.state.product;
    console.log("product", product);

    // Check if product is zero or undefined
    if (!product || product.length === 0) {
        return (
            <>
                <Nav />
                <br />
                <Typography variant="h3" gutterBottom style={{ textAlign: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    Sorry we don't have it right now!
                </Typography>
            </>
        );
    }

    return (
        <>
            <Nav />
            <br />
            <div>
                <ProductCard products={product} />
            </div>
        </>
    );
}

export default SearchPage;
