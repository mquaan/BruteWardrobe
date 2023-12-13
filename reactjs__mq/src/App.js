import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Modal from './components/Modal';
import ProductDetail from './components/Product_detail';

import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Login from './pages/Login';
import MerchantProducts from './pages/Merchant/Products';
<<<<<<< HEAD
import React, { useState } from 'react'; 
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { products } from './helpers/product_list';

function App() {
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
=======
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
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

>>>>>>> f0ef4c6fde41b03151bc729bcc2d28ba3e0bb2e6
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen((cur) => !cur);
    const [productModal, setProductModal] = useState(false);
    const handleProductModal = (value) => setProductModal(value);
    return (
        <div className='App'>
            <Router>
                <Routes>
                    <Route path='/login' element={<Login handleLogin={handleLogin}/>} />
                    <Route
                        path='/merchant/*'
                        element={
                            <div style={{ display: 'flex' }}>
                                <Sidebar />
                                <div style={{ flex: 1, paddingLeft: '20rem' }}>
                                    <Routes>
                                        <Route path='/' element={<MerchantProducts handleOpen={handleOpen} handleProductModal={handleProductModal} />} />
                                        <Route path='/products' element={<MerchantProducts handleOpen={handleOpen} handleProductModal={handleProductModal} />} />
                                        <Route path='/orders' element={<Cart />} />
                                        <Route path='/profile' element={<About />} />
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
                                <Navbar isLoggedIn={ isLoggedIn } handleLogout={ handleLogout }/>
                                <Routes>
                                    <Route path='/' element={<Home />} />
                                    <Route path='/shop' element={<Shop />} />
                                    <Route path='/about' element={<About />} />
                                    <Route path='/contact' element={<Contact />} />
                                    <Route path="/cart" element={cartItems.length > 0 ? <Cart cartItems={cartItems} setCartItems={setCartItems}/> : 
                                        <p> Your cart is empty.{" "}
                                            Click <Link to="/shop">here</Link> to buy products.
                                        </p>} />
                                    <Route path='/product-detail/:index' element={<ProductDetail addToCart={addToCart}/>}  />
                                </Routes>
                                <Footer />
                            </div>
                        }
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
