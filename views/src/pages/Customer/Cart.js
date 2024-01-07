import React, { useState, useEffect } from 'react';
import '../../styles/Customer/Cart.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';

function Cart({ token }) {
	const decodeToken = decodeURIComponent(
		atob(token.split('.')[1].replace('-', '+').replace('_', '/'))
			.split('')
			.map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
			.join('')
	);
	const userId = JSON.parse(decodeToken).user.userId;

	const [cart, setCart] = useState([]);
	const [itemChanged, setItemChanged] = useState(false);

	useEffect(() => {
		axios
			.post('http://localhost:4000/customer/getcart', { userId })
			.then((response) => {
				if (response.data.success) {
					console.log(response.data.cart);
					setCart(response.data.cart);
					setItemChanged(false);
				}
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	}, [itemChanged]);

	const handleQuantityChange = async (productId, quantity, size) => {
		try {
			const response = await axios.post('http://localhost:4000/customer/updatecartquantity', { userId, productId, quantity, size });
			if (response.data.success) {
				setItemChanged(true);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	const handleIncrement = (productId, quantity, size) => {
		handleQuantityChange(productId, quantity + 1, size);
	};

	const handleDecrement = (productId, quantity, size) => {
		if (quantity >= 2) {
			handleQuantityChange(productId, quantity - 1, size);
		}
	};

	const handleRemove = async (productId, size) => {
		try {
			const response = await axios.post('http://localhost:4000/customer/removefromcart', { userId, productId, size });
			if (response.data.success) {
				setItemChanged(true);
				toast.success('Removed from Cart');
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	const calculateTotalPrice = () => {
		return cart.reduce((total, item) => total + item.price * item.quantity, 0);
	};
	return (
		<div>
			<section id='cart' className=''>
				<table width='100%'>
					<thead>
						<tr>
							<td>Product</td>
							<td>Image</td>
							<td>Size</td>
							<td>Quantity</td>
							<td>Price</td>
							<td>Remove</td>
						</tr>
					</thead>
					<tbody>
						{cart &&
							cart.map((item) => (
								<tr>
									<td>{item.name}</td>
									<td>
										<img src={item.imgURLs[0]} alt={`Product ${item.name}`} />
									</td>
									<td>{item.size}</td>
									<td>
										<div>
											<button onClick={() => handleDecrement(item.productId, item.quantity, item.size)}>
												<span>
													<i className='fa-solid fa-minus'></i>
												</span>
											</button>
											<input
												type='number'
												aria-live='polite'
												data-bs-step='counter'
												value={item.quantity}
												min='0'
												max='10'
												step='1'
												data-bs-round='0'
												aria-label='Quantity selector'
												readOnly
											/>
											<button onClick={() => handleIncrement(item.productId, item.quantity, item.size)}>
												<span>
													<i class='fa-solid fa-plus'></i>
												</span>
											</button>
										</div>
									</td>
									<td>{Intl.NumberFormat('en-DE').format(item.price)} VND</td>
									<td>
										<button className='remove' onClick={() => handleRemove(item.productId, item.size)}>
											<i className='far fa-times-circle'></i>
										</button>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</section>

			<section id='cart-proceed'>
				<div id='total'>
					<table>
						<tr>
							<td>
								<strong>Total</strong>
							</td>
							<td>
								<strong>{Intl.NumberFormat('en-DE').format(calculateTotalPrice())} VND</strong>
							</td>
						</tr>
					</table>
					<Link to='/checkout'>
						<button className='checkout'>Proceed to checkout</button>
					</Link>
				</div>
			</section>
		</div>
	);
}
export default Cart;
