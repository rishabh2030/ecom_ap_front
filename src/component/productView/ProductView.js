import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Nav from '../nav/NavigationBar';
import { makeStyles } from '@mui/styles';
import { Typography, Button, Grid, Box } from '@mui/material';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import ProductReview from '../ProductReview/ProductReview';

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
    const [value, setValue] = React.useState(0);
    const [textInput, setTextInput] = useState('');
    console.log("product.ratings.length", product.ratings.length);



    const handleAddToCart = async (product) => {
        console.log("product.addToCart", product.name)
        try {
            const data = {
                product_id: product.id,
                quantity: 1,
            };
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:8000/api/webview/add_cart/', data, { headers: { Authorization: `Bearer ${token}` } });
            if (response.status === 200) {
                console.log("Added to cart");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const HandleReview = async (product) => {
        console.log('Rating Value:', value);
        console.log('Text Input:', textInput);
        try {
            const data = {
                product_id: product.id,
                rating: value,
                review: textInput,
            };
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:8000/api/webview/add_review/', data, { headers: { Authorization: `Bearer ${token}` } });
            if (response.status === 200) {
                console.log('Added')
            }
        } catch (error) {
            console.error(error);
        }
        setValue(0);
        setTextInput('');
    }

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
                        <Typography variant="h6">Price: ₹{product.price}</Typography>
                        <Button variant="contained" color="primary" onClick={() => handleAddToCart(product)}>
                            Add to Cart
                        </Button>
                        <Stack spacing={2} style={{ paddingTop: '20px' }}>
                            <Rating name="half-rating" precision={0.5} value={value} onChange={(event, newValue) => {
                                setValue(newValue);
                            }} />
                            <form noValidate autoComplete="off">
                                <FormControl sx={{ width: '25ch' }}>
                                    <OutlinedInput
                                        placeholder="Please enter text"
                                        value={textInput}
                                        onChange={(event) => setTextInput(event.target.value)}
                                    />
                                </FormControl>
                            </form>
                            <Button variant="contained" onClick={() => HandleReview(product)}>Submit</Button>
                        </Stack>
                    </Grid>
                </Grid>
                {product.ratings.map((review, index) => (
                    <ProductReview key={index} review={review} />
                ))}


            </div>
        </>
    );
};

export default ProductView;
