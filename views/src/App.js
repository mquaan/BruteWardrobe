import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Modal from './components/Modal';
import ProductDetail from './components/Product_detail';
import Admin_Sidebar from './components/Admin_Sidebar.js';

import Login from './pages/Login.js';

import Home from './pages/Customer/Home';
import Shop from './pages/Customer/Shop';
import About from './pages/Customer/About';
import Cart from './pages/Customer/Cart';
import EditProfile from './pages/Customer/EditProfile';
import Checkout from './pages/Customer/Checkout';
import OrderStatus from './pages/Customer/OrderStatus';

import MerchantProducts from './pages/Merchant/Products.js';
import MerchantOrders from './pages/Merchant/Orders.js';
import MerchantProfile from './pages/Merchant/Profile.js';

import Dashboard from './pages/Administrator/Dashboard.js';
import Users from './pages/Administrator/Users.js';
import Products from './pages/Administrator/Products.js';


import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { products } from './helpers/product_list';

function App() {
    const [deliveryInfo, setDeliveryInfo] = useState({
        fullName: '',
        address: '',
        phoneNumber: '',
    });
    
    const [cartItems, setCartItems] = useState([]);
    const addToCart = ({ productIndex, quantity, selectedSize }) => {
        const existingItem = cartItems.find(item => item.productIndex === productIndex && item.selectedSize === selectedSize);

        const product = products[productIndex - 1];
        const price = product.price;

        if (existingItem) {
            const updatedCart = cartItems.map(item =>
                item.productIndex === productIndex && item.selectedSize === selectedSize
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            );
            setCartItems(updatedCart);
        } else {
            setCartItems([...cartItems, { productIndex, quantity, selectedSize, price }]);
        }
    };
    const initialLoggedInState = localStorage.getItem('isLoggedIn') === 'true';
    const [isLoggedIn, setLoggedIn] = useState(initialLoggedInState);
    const handleLogin = () => {
        setLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
    };

    const handleLogout = () => {
        setLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
    };

    useEffect(() => {
        const storedLoggedInState = localStorage.getItem('isLoggedIn') === 'true';
        if (storedLoggedInState !== isLoggedIn) {
            setLoggedIn(storedLoggedInState);
        }
    }, [isLoggedIn]);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen((cur) => !cur);
    const [productModal, setProductModal] = useState(false);
    const handleProductModal = (value) => setProductModal(value);
    return (
        <div className='App'>
            <Router>
                <Routes>
                    <Route path='/login' element={<Login handleLogin={handleLogin} />} />
                    <Route
                        path='/merchant/*'
                        element={
                            <div style={{ display: 'flex' }}>
                                <Sidebar />
                                <div style={{ flex: 1, paddingLeft: '20rem' }}>
                                    <Routes>
                                        <Route path='/' element={<MerchantProducts handleOpen={handleOpen} handleProductModal={handleProductModal} />} />
                                        <Route path='/products' element={<MerchantProducts handleOpen={handleOpen} handleProductModal={handleProductModal} />} />
                                        <Route path='/orders' element={<MerchantOrders />} />
                                        <Route path='/profile' element={<MerchantProfile />} />
                                        <Route path='/logout' element={<Login />} />
                                    </Routes>
                                </div>
                                <Modal open={open} handleOpen={handleOpen} product={productModal} />
                            </div>
                        }
                    />
                    <Route
                        path='*'
                        element={
                            <div>
                                <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
                                <Routes>
                                    <Route path='/' element={<Home />} />
                                    <Route path='/shop' element={<Shop />} />
                                    <Route path='/about' element={<About />} />
                                    <Route path="/cart" element={cartItems.length > 0 ? <Cart cartItems={cartItems} setCartItems={setCartItems} /> :
                                        <section className="cart-header">
                                            <h2>Your cart is empty!</h2>
                                            <h3>Click <Link to="/shop">here</Link> to buy products.</h3>
                                        </section>} />
                                    <Route path='/product-detail/:index' element={<ProductDetail addToCart={addToCart} isLoggedIn={ isLoggedIn }/>} />
                                    <Route path="/checkout" element={<Checkout cartItems={cartItems} setCartItems={setCartItems} deliveryInfo={deliveryInfo} setDeliveryInfo={setDeliveryInfo}/>} />
                                    <Route path="/edit-profile" element={<EditProfile/>} />
                                    <Route path="/order-status" element={<OrderStatus deliveryInfo={deliveryInfo}/>} />
                                </Routes>
                                <Footer />
                            </div>
                        }
                    />
                    <Route
                        path='/admin/*'
                        element={
                            <div>
                                <Admin_Sidebar />
                                <Routes>
                                    <Route path='/' element={<Dashboard />} />
                                    <Route path='/users' element={<Users />} />
                                    <Route path='/products' element={<Products />} />
                                </Routes>
                            </div>
                        }
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
