import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './component/auth/Auth';
import Home from './component/home/Home';
import CartView from './component/cartView/CartView';
import User from './component/user/User';
import ProductView from './component/productView/ProductView';
import PlaceOrder from './component/order/PlaceOrder';
import SearchPage from './component/search_page/SearchPage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/CartView" element={<CartView />} />
          <Route path="/user" element={<User />} />
          <Route path="/products" element={<ProductView />} />
          <Route path="/place_order" element={<PlaceOrder />} />
          <Route path="/search" element={<SearchPage/>} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
