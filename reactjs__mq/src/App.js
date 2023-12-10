import './App.css';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
import ProductDetail from './components/Product_detail';

import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Login from './pages/Login';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Router>
                {/* <Navbar /> */}
                <Routes>
                    <Route path='/login' element={<Login/>}/>
                    <Route path="/" element={<Home/>} />
                    <Route path="/shop" element={<Shop/>} />
                    <Route path="/about" element={<About/>} />
                    <Route path="/contact" element={<Contact/>} />
                    <Route path="/cart" element={<Cart/>} />

                    <Route
                        path="/product-detail/:index"
                        element={<ProductDetail />}
                    />
                </Routes>
                {/* <Footer /> */}
            </Router>
        </div>
    );
}

export default App;