import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/Customer/Product_detail.css';
import { products } from '../helpers/product_list';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function Description({ token, productId, addToCart }) {
	console.log(productId)
	const [pro, setPro] = useState([]);
	const [quantity, setQuantity] = React.useState(0);
	const [selectedSize, setSelectedSize] = React.useState('');
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		axios
			.post('http://localhost:4000/product', { productId })
			.then((response) => {
				console.log(response.data.product);
				if (response.data.success) {
					setPro(response.data.product);
				}
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	}, []);

	const handleQuantityChange = (event) => {
		const newQuantity = parseInt(event.target.value, 10);
		setQuantity(newQuantity);
		if (!isNaN(newQuantity)) {
			if (newQuantity < 0) setQuantity(0);
			else if (newQuantity > 10) setQuantity(10);
			else setQuantity(newQuantity);
		}
	};

	const handleInputBlur = () => {
		if (isNaN(quantity)) {
			setQuantity(0);
		}
	};

	const handleSizeChange = (event) => {
		setSelectedSize(event.target.value);
	};

	const handleAddToCart = () => {
		if (token) {
			if (selectedSize && quantity > 0) {
				// addToCart({
				// 	productId,
				// 	quantity,
				// 	selectedSize,
				// });
				const decodeToken = decodeURIComponent(
					atob(token.split('.')[1].replace('-', '+').replace('_', '/'))
						.split('')
						.map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
						.join('')
				);
				const userId = JSON.parse(decodeToken).user.userId;
				axios.post('http://localhost:4000/customer/addtocart', { userId, productId, quantity, size: selectedSize });

				setSelectedSize('');
				setQuantity(0);
				toast.success('Added to Cart');
			} else toast.error('Missing options');
		} else {
			setShowModal(true);
		}
	};

	const customStyles = {
		content: {
			top: '50%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			marginRight: '-50%',
			transform: 'translate(-50%, -50%)',
			border: '1px solid #ccc',
			borderRadius: '8px',
			maxWidth: '400px',
			padding: '20px',
			boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
			backgroundColor: '#fff',
		},
		overlay: {
			backgroundColor: 'rgba(0, 0, 0, 0.3)',
		},
	};

	return (
		<div className='single-pro-details'>
			<h4>{pro.name}</h4>
			<h2>{Intl.NumberFormat('en-DE').format(pro.price)} VND</h2>
			<select value={selectedSize} onChange={handleSizeChange}>
				<option>Select Size</option>
				<option>S</option>
				<option>M</option>
				<option>L</option>
				<option>XL</option>
				<option>2XL</option>
			</select>
			<input type='number' value={quantity} onBlur={handleInputBlur} onChange={handleQuantityChange} />
			<button className='normal' onClick={handleAddToCart}>
				Add to cart
			</button>
			<Modal isOpen={showModal} shouldCloseOnEsc={false} onRequestClose={() => setShowModal(false)} contentLabel='Not Logged In Modal' style={customStyles}>
				<div>
					<p>
						Click <Link to='/login'>here</Link> to Sign In.
					</p>
					<button onClick={() => setShowModal(false)}>Close</button>
				</div>
			</Modal>
			<h4>Desciption</h4>
			<ul>
				{pro.description &&
					Object.entries(pro.description).map(([key, value]) => (
						<li key={key}>
							<strong>{key}:</strong> {value}
						</li>
					))}
			</ul>
		</div>
	);
}

function SmallImg({ image, onClick }) {
	return (
		<div className='small-img-col' onClick={onClick}>
			<img src={image} width='100%' className='small-img' alt='' />
		</div>
	);
}

const ProductDetail = ({ addToCart, token }) => {
	const { productId } = useParams();
	const [product, setProduct] = useState([]);
	const [mainImg, setMainImg] = useState('');

	useEffect(() => {
		axios
			.post('http://localhost:4000/product', { productId })
			.then((response) => {
				console.log(response.data.product);
				if (response.data.success) {
					setProduct(response.data.product);
					setMainImg(response.data.product.imgURLs[0]);
				}
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	}, []);

	const handleSmallImgClick = (newImg) => {
		setMainImg(newImg);
	};
	return (
		<div>
			<section id='prodetails' className='section-p1'>
				<div className='single-pro-image'>
					<img src={mainImg} width='100%' id='MainImg' alt='' />

					<div className='small-img-group'>
						{product.imgURLs && product.imgURLs.map((imgURL, index) => <SmallImg key={index} image={imgURL} onClick={() => handleSmallImgClick(imgURL)} />)}
					</div>
				</div>
				<Description productId={productId} addToCart={addToCart} token={token} />
			</section>
		</div>
	);
};

export default ProductDetail;
