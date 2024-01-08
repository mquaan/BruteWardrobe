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
import OrderList from './pages/Customer/OrderList';
import OrderHistory from './pages/Customer/OrderHistory';

import MerchantProducts from './pages/Merchant/Products.js';
import MerchantOrders from './pages/Merchant/Orders.js';
import MerchantProfile from './pages/Merchant/Profile.js';

import Dashboard from './pages/Administrator/Dashboard.js';
import Users from './pages/Administrator/Users.js';
import Products from './pages/Administrator/Products.js';

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { products } from './helpers/product_list';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';

function ProtectedComponent({ children, token, role }) {
	const location = useLocation();
	const [component, setComponent] = useState(null);

	useEffect(() => {
		axios
			.get('http://localhost:4000/auth', {
				headers: {
					Authorization: 'Bearer ' + token,
				},
			})
			.then((response) => {
				if (response.data.role) {
					if (response.data.role === role) {
						setComponent(children);
					} else if (response.data.role === 'customer') {
						setComponent(<Navigate to='/' state={{ from: location }} />);
					} else if (response.data.role === 'merchant') {
						setComponent(<Navigate to='/merchant' state={{ from: location }} />);
					} else if (response.data.role === 'admin') {
						setComponent(<Navigate to='/admin' state={{ from: location }} />);
					}
				} else {
					setComponent(<Navigate to='/login' state={{ from: location }} />);
				}
			})
			.catch((error) => {
				console.error('Error:', error);
				setComponent(<Navigate to='/login' state={{ from: location }} />);
			});
	}, [children, token, role, location]);

	return component;
}

function App() {

	const [cartItems, setCartItems] = useState([]);
	const addToCart = ({ productID, quantity, selectedSize }) => {
		const existingItem = cartItems.find((item) => item.productID === productID && item.selectedSize === selectedSize);

		const product = products[productID - 1];
		const price = product.price;

		if (existingItem) {
			const updatedCart = cartItems.map((item) =>
				item.productID === productID && item.selectedSize === selectedSize ? { ...item, quantity: item.quantity + quantity } : item
			);
			setCartItems(updatedCart);
		} else {
			setCartItems([...cartItems, { productID, quantity, selectedSize, price }]);
		}
	};

	const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')));

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen((cur) => !cur);

	const [openOrder, setOpenOrder] = useState(false);
	const handleOpenOrder = () => setOpenOrder((cur) => !cur);

	const [productModal, setProductModal] = useState(false);
	const handleProductModal = (value) => setProductModal(value);

	return (
		<div className='App'>
			<Router>
				<Routes>
					<Route path='/login' element={<Login token={token} setToken={setToken} />} />
					<Route
						path='/merchant/*'
						element={
							<ProtectedComponent token={token} role={'merchant'}>
								<div style={{ display: 'flex' }}>
									<Sidebar setToken={setToken} />
									<div style={{ flex: 1, paddingLeft: '20rem' }}>
										<Routes>
											<Route path='/' element={<MerchantProducts open={open} handleOpen={handleOpen} handleProductModal={handleProductModal} />} />
											<Route path='/products' element={<MerchantProducts handleOpen={handleOpen} handleProductModal={handleProductModal} />} />
											<Route path='/orders' element={<MerchantOrders open={openOrder} handleOpen={handleOpenOrder} token={token} />} />
											<Route path='/profile' element={<MerchantProfile token={token} />} />
											<Route path='/logout' element={<Login />} />
										</Routes>
									</div>
									<Modal open={open} setOpen={setOpen} handleOpen={handleOpen} product={productModal} token={token} />
								</div>
							</ProtectedComponent>
						}
					/>
					<Route
						path='/admin/*'
						element={
							<ProtectedComponent token={token} role={'admin'}>
								<div>
									<Admin_Sidebar setToken={setToken} />
									<Routes>
										<Route path='/' element={<Dashboard />} />
										<Route path='/users' element={<Users />} />
										<Route path='/products' element={<Products />} />
									</Routes>
								</div>
							</ProtectedComponent>
						}
					/>
					<Route
						path='*'
						element={
							<div>
								<Navbar token={token} setToken={setToken} cartItems={cartItems} />
								<Routes>
									<Route path='/' element={<Home />} />
									<Route path='/shop' element={<Shop />} />
									<Route path='/about' element={<About />} />
									<Route
										path='/cart'
										element={
											<Cart cartItems={cartItems} setCartItems={setCartItems} token={token} />
										}
									/>
									<Route path='/product-detail/:productId' element={<ProductDetail addToCart={addToCart} token={token} />} />
									<Route
										path='/checkout'
										element={
											<Checkout
												token={token}
											/>
										}
									/>
									<Route path='/edit-profile' element={<EditProfile token={token} />} />
									<Route
										path='/order-status/:orderIndex'
										element={
											<OrderStatus
												token={token}
											/>
										}
									/>
									<Route path='/order-list' element={<OrderList token={token}/>} />
									<Route path='/order-history' element={<OrderHistory token={token}/>} />
								</Routes>
								<Footer />
							</div>
						}
					/>
				</Routes>
			</Router>
			<Toaster position='bottom-right' reverseOrder={false} />
		</div>
	);
}

export default App;
