import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProductView from '../productView/ProductView';
import { Card, CardMedia, CardContent, Typography, Button, Grid, CardActionArea } from '@mui/material';


const ProductCard = ({ products }) => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    const handleShowProductView = (product) => {
        navigate('/products', { state: { product: product } });
    };

    const handleAddToCart = async (product) => {
        setCart([...cart, product]);
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

    return (
        <Grid container spacing={2}>
            {products.map(product => (
                <Grid item key={product.id} xs={12} sm={6} md={3}>
                    <Card>

                        <CardMedia
                            component="img"
                            height="200"
                            image={product.images[0].file}
                            alt={product.name}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {product.name.length > 25 ? `${product.name.substring(0, 25)}...` : product.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {product.description.length > 25 ? `${product.description.substring(0, 25)}...` : product.description}
                            </Typography>
                            <Typography variant="body2" color="text.primary">
                                Price: {product.price}
                            </Typography>
                            <Button onClick={() => handleAddToCart(product)} variant="contained" color="primary">
                                Add to Cart
                            </Button>
                            <Button size="small" onClick={() => handleShowProductView(product)}>
                                View Product
                            </Button>

                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductCard;
