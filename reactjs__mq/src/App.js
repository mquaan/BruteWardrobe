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
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

function App() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen((cur) => !cur);
    const [productModal, setProductModal] = useState(false);
    const handleProductModal = (value) => setProductModal(value);
    return (
        <div className='App'>
            <Router>
                <Routes>
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
                    <Route path='/login' element={<Login />} />
                    <Route
                        path='*'
                        element={
                            <div>
                                <Navbar />
                                <Routes>
                                    <Route path='' element={<Home />} />
                                    <Route path='/shop' element={<Shop />} />
                                    <Route path='/about' element={<About />} />
                                    <Route path='/contact' element={<Contact />} />
                                    <Route path='/cart' element={<Cart />} />
                                    <Route path='/product-detail/:index' element={<ProductDetail />} />
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
