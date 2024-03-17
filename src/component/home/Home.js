import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import Nav from '../nav/NavigationBar';
import axios from 'axios';
import Grid from '@mui/material/Unstable_Grid2'
import Loading from '../helper/Loading';
import Error from '../helper/Error';
import ProductCard from '../productCard/ProductCard';
function Home() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:8000/api/webview/product_list/', { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        setProducts(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching data');
        setLoading(false);
      });
  }, [token]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (

    <>
      <Nav />
      <br></br>
      <div>
        <ProductCard products={products} />
      </div>
    </>
  );
}

export default Home;
