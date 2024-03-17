import React from 'react';
import { useLocation } from 'react-router-dom';
import Nav from '../nav/NavigationBar';
import { makeStyles } from '@mui/styles';
import { Typography, Button, Grid } from '@mui/material';

const useStyles = makeStyles({
    root: {
        padding: '16px', // You can adjust the spacing as needed
    },
    productImage: {
        maxWidth: '100%',
        maxHeight: '400px',
        marginBottom: '16px', // You can adjust the spacing as needed
    },
    descriptionContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
});

const ProductView = () => {
    const location = useLocation();
    const product = location.state.product;
    const classes = useStyles();
    console.log(product.name);
    // Render your product view using the product data
    return (
        <>
            <Nav />
            <div className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <img
                            src={product.images[0].file}
                            alt="Product"
                            className={classes.productImage}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.descriptionContainer}>
                        <Typography variant="h4" gutterBottom>
                            {product.name}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            {product.description}
                        </Typography>
                        <Typography variant="h6">Price: ${product.price}</Typography>
                        <Button variant="contained" color="primary">
                            Add to Cart
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

export default ProductView;
