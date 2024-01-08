import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function getUserId(token) {
	const decodeToken = decodeURIComponent(
		atob(token.split('.')[1].replace('-', '+').replace('_', '/'))
			.split('')
			.map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
			.join('')
	);
	return JSON.parse(decodeToken).user.userId;
}

function OrderList({ token }) {
	const [userId, setUserId] = useState('');

	const [orderList, setOrderList] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const ordersPerPage = 2;

	useEffect(() => {
		const fetchData = async () => {
			try {
				let uid = await getUserId(token);
				setUserId(uid);
				await axios.post('http://localhost:4000/customer/getorderlist', { userId: uid }).then((response) => {
					if (response.data.success) {
						console.log(response.data.orderList);
						setOrderList(response.data.orderList);
					}
				});
			} catch (errors) {
				console.error('Error:', errors);
			}
		};
		fetchData();
	}, [userId]);

	const indexOfLastOrder = currentPage * ordersPerPage;
	const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
	const currentOrders = orderList.slice(indexOfFirstOrder, indexOfLastOrder);

	const renderOrders = () => {
		return currentOrders.map((order, orderIndex) => (
			<div key={orderIndex} className='order-box'>
				<h3>Order #{indexOfFirstOrder + orderIndex + 1}</h3>
				<table>
					<thead>
						<tr>
							<td>Product</td>
							<td>Image</td>
							<td>Size</td>
							<td>Quantity</td>
							<td>Price</td>
							<td>Action</td>
						</tr>
					</thead>
					<tbody>
						{order.cart.map((item, itemIndex) => (
							<tr key={itemIndex}>
								<td>Name</td>
								<td>Image</td>
								<td>{item.size}</td>
								<td>{item.quantity}</td>
								<td>Price</td>
								<td>
									<Link to={`/order-status/${indexOfFirstOrder + orderIndex}`}>View</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		));
	};

	const renderPageNumbers = () => {
		const pageNumbers = [];
		for (let i = 1; i <= Math.ceil(orderList.length / ordersPerPage); i++) {
			pageNumbers.push(
				<button key={i} onClick={() => setCurrentPage(i)}>
					{i}
				</button>
			);
		}
		return pageNumbers;
	};

	return (
		<div>
			<section id='order-list'>{renderOrders()}</section>
			<section id='pagination'>
				<div>{renderPageNumbers()}</div>
			</section>
		</div>
	);
}

export default OrderList;
