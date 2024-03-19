import React from 'react';
import { Typography, Box, Rating, Avatar, Grid } from '@mui/material';

const ProductReview = ({ review }) => {
    const { user_name, rating, review: comment, createdAt } = review;

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm>
                <Typography variant="subtitle1" gutterBottom>
                    {user_name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {new Date(createdAt).toDateString()}
                </Typography>
                <Rating name="read-only" value={rating} precision={0.5} readOnly />
                <Typography variant="body1" gutterBottom>
                    {comment}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default ProductReview;
