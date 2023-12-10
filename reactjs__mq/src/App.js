import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import ProductDetail from './components/Product_detail';

import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Signup from './pages/Signup';
import Login from './pages/Login';
import MerchantProducts from './pages/Merchant/Products';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
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
                                        <Route path='/' element={<MerchantProducts />} />
                                        <Route path='/products' element={<MerchantProducts />} />
                                        <Route path='/orders' element={<Cart />} />
                                        <Route path='/profile' element={<About />} />
                                        <Route path='/logout' element={<Login />} />
                                    </Routes>
                                </div>
                            </div>
                        }
                    />
                    <Route
                        path='*'
                        element={
                            <div>
                                <Navbar />
                                <Routes>
                                    <Route path='/login' element={<Login />} />
                                    <Route path='/signup' element={<Signup />} />
                                    <Route path='/' element={<Home />} />
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
