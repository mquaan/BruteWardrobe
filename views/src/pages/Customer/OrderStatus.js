import React, { useState, useEffect } from 'react';
import '../../styles/Customer/OrderStatus.css';
import { toast } from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function OrderStatus({ token }) {
	const navigate = useNavigate();
	const [isConfirmationVisible, setConfirmationVisible] = useState(false);
	const { orderIndex } = useParams();
	const decodeToken = decodeURIComponent(
		atob(token.split('.')[1].replace('-', '+').replace('_', '/'))
			.split('')
			.map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
			.join('')
	);
	const userId = JSON.parse(decodeToken).user.userId;

	const [order, setOrder] = useState([]);
	const [deliveryInfo, setDeliveryInfo] = useState({});

	useEffect(() => {
		const orderDeliveryInfo = order.deliverInfo ? order.deliverInfo.split(' - ') : [];
		setDeliveryInfo({ name: orderDeliveryInfo[0], address: orderDeliveryInfo[1], phone: orderDeliveryInfo[2], paymentMethod: order.paymentInfo });
	}, [order.deliverInfo]);

	useEffect(() => {
		axios
			.post('http://localhost:4000/customer/getorder', { userId, orderIndex })
			.then((response) => {
				if (response.data.success) {
					console.log(response.data.order);
					setOrder(response.data.order);
				}
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	}, []);

	const calculateTotalPrice = () => {
		return order.cart ? order.cart.reduce((total, item) => total + item.price * item.quantity, 0) : 0;
	};
	const renderSteps = () => {
		const steps = [
			{ title: 'Processing', icon: 'fa-bars-progress' },
			{ title: 'Confirmed', icon: 'fa-clipboard-check' },
			{ title: 'Shipping', icon: 'fa-truck-fast' },
			{ title: 'Delivered', icon: 'fa-person-circle-check' },
			{ title: 'Completed', icon: 'fa-circle-check' },
		];

		const getStatusIndex = () => {
			switch (order.orderStatus) {
				case 'Processing':
					return 0;
				case 'Confirmed':
					return 1;
				case 'Shipping':
					return 2;
				case 'Delivered':
					return 3;
				case 'Completed':
					return 4;
				default:
					return 0;
			}
		};

		const statusIndex = getStatusIndex();

		return steps.map((step, index) => (
			<div key={index} className={`step ${index <= statusIndex ? 'completed' : ''}`}>
				<div className='step-icon-wrap'>
					<div className='step-icon'>
						<i className={`fa-solid ${step.icon}`}></i>
					</div>
				</div>
				<h4 className='step-title'>{step.title}</h4>
			</div>
		));
	};

	const handleConfirmOrder = async () => {
		// Add logic to update information
		await axios.post('http://localhost:4000/customer/confirm-order', { userId, orderIndex });
		setConfirmationVisible(true);
		navigate('/order-list');
		toast.error("Order confirmed");
	};

	return (
		<div className='track-order-container'>
			<h2>Track Your Order</h2>
			<div className='order-details'>
				<h3>Order Details</h3>
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
						{order &&
							order.cart &&
							order.cart.map((item) => (
								<tr>
									<td>{item.name}</td>
									<td>
										<img src={item.imgURLs[0]} alt={`Product ${item.productId}`} />
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
			</div>

			<div className='delivery-info'>
				<h3>Delivery Information</h3>
				<p>
					<strong>Full name:</strong> {deliveryInfo.name}
				</p>
				<p>
					<strong>Address:</strong> {deliveryInfo.address}
				</p>
				<p>
					<strong>Phone number:</strong> {deliveryInfo.phone}
				</p>
				<p>
					<strong>Payment method:</strong> {deliveryInfo.paymentMethod}
				</p>
			</div>

			<div className='delivery-progress'>
				<h3>Delivery Progress</h3>
				<div className='card-body'>
					<div className='steps d-flex flex-wrap flex-sm-nowrap justify-content-between padding-top-2x padding-bottom-1x'>{renderSteps()}</div>
				</div>
			</div>
			{order.orderStatus && order.orderStatus === 'Completed' && !isConfirmationVisible && (
				<div className='confirm-order-button'>
					<button onClick={handleConfirmOrder}>Confirm Order</button>
				</div>
			)}
		</div>
	);
}

export default OrderStatus;
