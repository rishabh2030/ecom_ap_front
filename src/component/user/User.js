import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../nav/NavigationBar';
import Loading from '../helper/Loading';
import Error from '../helper/Error';
import './user.css'
import OrderHistory from './OrderHistroy';


function User() {
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/order/order_list/', { headers: { Authorization: `Bearer ${token}` } });
                setOrderData(response.data);
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
        <div>
            <Nav />
            <br></br>
            <div id='user_div'>
                <h2>Orders History</h2>
                {orderData && <OrderHistory products={orderData} />}
            </div>


            {/* <Sidebar /> */}
        </div>
    );
}

export default User;
