import React from 'react';
import '../../styles/Customer/Home.css';
import { Link } from 'react-router-dom';
import { products } from '../../helpers/product_list';

function Product(props) {
	const goToTop = () => {
		window.scrollTo({ top: 0, behavior: 'auto' });
	};
	return (
		<div className='pro' onClick={() => goToTop()}>
			<Link to={`/product-detail/${props.index + 1}`} style={{ textDecoration: 'none' }}>
				<img className='image' src={props.image} alt='' />
				<div className='des'>
					<h5>{props.type}</h5>
					<div className='star'>
						<i className='fas fa-star'></i>
						<i className='fas fa-star'></i>
						<i className='fas fa-star'></i>
						<i className='fas fa-star'></i>
						<i className='fas fa-star'></i>
					</div>
					<h4>${props.price}</h4>
				</div>
			</Link>
			<div>
				<i className='fa-solid fa-cart-shopping cart'></i>
			</div>
		</div>
	);
}

function Feature(props) {
	return (
		<div className='fe-box'>
			<img className='image' src={props.image} alt='' />
			<h6>{props.feature}</h6>
		</div>
	);
}

function Home() {
	const product1 = products.slice(0, 8);
	const product2 = products.slice(8, 16);
	const goToTop = () => {
		window.scrollTo({ top: 0, behavior: 'auto' });
	};
	return (
		<div>
			<div id='hero'>
				<h4>What's new!</h4>
				<h2>Spring offer</h2>
				<h1>On Tee products</h1>
				<p>Sale up to 30% off!</p>
				<Link to='/shop'>
					<button onClick={() => goToTop()}>Shop now</button>
				</Link>
			</div>
			<section className='product1 section-p1'>
				<h2>Our products</h2>
				<p>New Collection Design</p>
				<div className='pro-container'>
					{product1.map((product, index) => (
						<Product key={index} index={index} image={product.imgURLs[0]} type={product.description.Type} price={product.price} />
					))}
				</div>
			</section>

			<section id='banner' className='section-m1'>
				<h4>Bundle Sale</h4>
				<h2>
					Save up to <span>50% off</span> - When buy 3 items
				</h2>
				<Link to='/shop'>
					<button className='normal' onClick={() => goToTop()}>
						Explore more{' '}
					</button>
				</Link>
			</section>

			<section className='product1 section-p1'>
				<h2>New Arrivals</h2>
				<p>New Collection Design</p>
				<div className='pro-container'>
					{product2.map((product, index) => (
						<Product key={index} index={index + 8} image={product.imgURLs[0]} type={product.description.type} price={product.price} />
					))}
				</div>
			</section>

			<section id='sm-banner' className='section-p1'>
				<div className='banner-box'>
					<h4>Super deal</h4>
					<h2>Buy 1 get voucher up to 40%</h2>
					<span>The best collection is on sale at BruteWardrobe</span>
					<Link to='/shop'>
						<button className='white' onClick={() => goToTop()}>
							Learn More
						</button>
					</Link>
				</div>
				<div className='banner-box banner-box2'>
					<h4>Summer</h4>
					<h2>Upcomming season</h2>
					<span>The best collection is on sale at BruteWardrobe</span>
					<Link to='/shop'>
						<button className='white' onClick={() => goToTop()}>
							Collection
						</button>
					</Link>
				</div>
			</section>

			<section id='feature' className='section-p1'>
				<Feature image='../../assets/features/24-hours.png' feature='24/7 Support' />
				<Feature image='../../assets/features/product-management.png' feature='Secure' />
				<Feature image='../../assets/features/productivity.png' feature='Save Time' />
				<Feature image='../../assets/features/save-money.png' feature='Economical' />
				<Feature image='../../assets/features/shield.png' feature='Safe' />
				<Feature image='../../assets/features/tap.png' feature='Convenient' />
			</section>
		</div>
	);
}

export default Home;
