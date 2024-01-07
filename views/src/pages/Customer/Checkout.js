import React, { useState, useEffect } from 'react';
import '../../styles/Customer/Checkout.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Checkout({ token }) {
	const navigate = useNavigate();

	const [deliveryInfo, setDeliveryInfo] = useState({
		fullName: '',
		address: '',
		phoneNumber: '',
		paymentMethod: '',
	});

	const decodeToken = decodeURIComponent(
		atob(token.split('.')[1].replace('-', '+').replace('_', '/'))
			.split('')
			.map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
			.join('')
	);
	const userId = JSON.parse(decodeToken).user.userId;

	const [cart, setCart] = useState([]);

	useEffect(() => {
		axios
			.post('http://localhost:4000/customer/getcart', { userId })
			.then((response) => {
				if (response.data.success) {
					console.log(response.data.cart);
					setCart(response.data.cart);
				}
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	}, []);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setDeliveryInfo((deliveryInfo) => ({ ...deliveryInfo, [name]: value }));
	};

	const handlePlaceOrder = async () => {
		if (deliveryInfo.fullName && deliveryInfo.address && deliveryInfo.phoneNumber && document.querySelector('input[name="paymentMethod"]:checked')) {
			// alert('Order placed successfully!');
			navigate('/order-status');

			try {
				const response = await axios.post('http://localhost:4000/customer/payment', {
					userId,
					cart: cart.map((item) => ({
						productId: item.productId,
						quantity: item.quantity,
						size: item.size,
					})),
					deliveryInfo,
				});
				if (response.data.success) {
					window.location.href = response.data.payUrl;
				}
			} catch (error) {
				console.error('Error:', error);
			}
		} else {
			alert('Please fill in all required information.');
		}
	};

	const calculateTotalPrice = () => {
		return cart.reduce((total, item) => total + item.price * item.quantity, 0);
	};

	return (
		<div className='checkout-container'>
			<section id='delivery-info'>
				<h2>Delivery Information</h2>
				<form>
					<div className='form-group'>
						<label htmlFor='fullName'>Full Name:</label>
						<input type='text' id='fullName' name='fullName' value={deliveryInfo.fullName} onChange={handleInputChange} required />
					</div>
					<div className='form-group'>
						<label htmlFor='address'>Address:</label>
						<textarea id='address' name='address' value={deliveryInfo.address} onChange={handleInputChange} required></textarea>
					</div>
					<div className='form-group'>
						<label htmlFor='phoneNumber'>Phone Number:</label>
						<input type='text' id='phoneNumber' name='phoneNumber' value={deliveryInfo.phoneNumber} onChange={handleInputChange} required />
					</div>
				</form>
			</section>

			<section id='order-summary'>
				<h2>Order Summary</h2>
				<table>
					<thead>
						<tr>
							<th>Product</th>
							<th>Image</th>
							<th>Quantity</th>
							<th>Price</th>
						</tr>
					</thead>
					<tbody>
						{cart.map((item) => (
							<tr>
								<td>{item.name}</td>
								<td>
									<img src={item.imgURLs[0]} alt={`Product ${item.productID}`} />
								</td>
								<td>{item.quantity}</td>
								<td>{Intl.NumberFormat('en-DE').format(item.price * item.quantity)} VND</td>
							</tr>
						))}
					</tbody>
				</table>
				<div className='total-price'>
					<strong>Total:</strong> {Intl.NumberFormat('en-DE').format(calculateTotalPrice())} VND
				</div>
			</section>

			<section id='payment-method'>
				<h2>Payment Method</h2>
				<div className='payment-options'>
					<label htmlFor='paymentMethod'>Cash on Delivery</label>
					<input type='radio' name='paymentMethod' value='cash' onChange={handleInputChange} required />
					<label htmlFor='paymentMethod'>Banking</label>
					<input type='radio' name='paymentMethod' value='banking' onChange={handleInputChange} required />
				</div>
			</section>
			<button className='place-order-btn' onClick={handlePlaceOrder}>
				Place Order
			</button>
		</div>
	);
}

export default Checkout;
