import React from 'react';
import { useEffect, useState } from 'react';
import '../styles/Home.css';
import Login from  './Login.js'
import { Link } from 'react-router-dom';

const product1 = [
    { image: '../assets/products/p1.jpg', span: 'Tee', type: 'Tee', price: '250.000' },
    { image: '../assets/products/p2.jpg', span: 'Tee', type: 'Tee', price: '350.000' },
    { image: '../assets/products/p3.jpg', span: 'Tee', type: 'Tee', price: '470.000' },
    { image: '../assets/products/p4.jpg', span: 'Tee', type: 'Tee', price: '290.000' },
    { image: '../assets/products/p5.jpg', span: 'Tee', type: 'Tee', price: '160.000' },
    { image: '../assets/products/p6.jpg', span: 'Tee', type: 'Tee', price: '240.000' },
    { image: '../assets/products/p7.jpg', span: 'Tee', type: 'Tee', price: '250.000' },
    { image: '../assets/products/p8.jpg', span: 'Tee', type: 'Tee', price: '350.000' },
];

const product2 = [
    { image: '../assets/products/p9.jpg', span: 'Tee', type: 'Tee', price: '260.000' },
    { image: '../assets/products/p10.jpg', span: 'Pants', type: 'Pants', price: '550.000' },
    { image: '../assets/products/p11.jpg', span: 'Pants', type: 'Pants', price: '380.000' },
    { image: '../assets/products/p12.jpg', span: 'Pants', type: 'Pants', price: '290.000' },
    { image: '../assets/products/p13.jpg', span: 'Tee', type: 'Tee', price: '360.000' },
    { image: '../assets/products/p14.jpg', span: 'Pants', type: 'Pants', price: '240.000' },
    { image: '../assets/products/p15.jpg', span: 'Tee', type: 'Tee', price: '320.000' },
    { image: '../assets/products/p16.jpg', span: 'Pants', type: 'Pants', price: '310.000' },
];

function Product(props) {
    const goToTop = () => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    };
    return (
        <div className='pro' onClick={() => goToTop()}>
            <Link to={`/product-detail/${props.index + 1}`} style={{ textDecoration: 'none' }}>
                <img className='image' src={props.image} alt='' />
                <div className='des'>
                    <span>{props.span}</span>
                    <h5>{props.product_type}</h5>
                    <div className='star'>
                        <i className='fas fa-star'></i>
                        <i className='fas fa-star'></i>
                        <i className='fas fa-star'></i>
                        <i className='fas fa-star'></i>
                        <i className='fas fa-star'></i>
                    </div>
                    <h4>{props.price} VND</h4>
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
    const [token, setToken] = useState();

    if (!token) {
        return <Login setToken={setToken} />;
    }

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
                        <Product key={index} index={index} image={product.image} span={product.span} type={product.type} price={product.price} />
                    ))}
                    {/* <Product image="../assets/products/p1.jpg" span="unknown" product_type="Tee" price="250.000"/>
                    <Product image="../assets/products/p2.jpg" span="unknown" product_type="Tee" price="250.000"/>
                    <Product image="../assets/products/p3.jpg" span="unknown" product_type="Tee" price="250.000"/>
                    <Product image="../assets/products/p4.jpg" span="unknown" product_type="Tee" price="250.000"/>
                    <Product image="../assets/products/p5.jpg" span="unknown" product_type="Tee" price="250.000"/>
                    <Product image="../assets/products/p6.jpg" span="unknown" product_type="Tee" price="250.000"/>
                    <Product image="../assets/products/p7.jpg" span="unknown" product_type="Tee" price="250.000"/>
                    <Product image="../assets/products/p8.jpg" span="unknown" product_type="Tee" price="250.000"/> */}
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
                        <Product key={index} image={product.image} span={product.span} type={product.type} price={product.price} />
                    ))}
                    {/* <Product image="../assets/products/p9.jpg" span="unknown" product_type="Tee" price="250.000"/>
                    <Product image="../assets/products/p10.jpg" span="unknown" product_type="Tee" price="250.000"/>
                    <Product image="../assets/products/p11.jpg" span="unknown" product_type="Tee" price="250.000"/>
                    <Product image="../assets/products/p12.jpg" span="unknown" product_type="Tee" price="250.000"/>
                    <Product image="../assets/products/p13.jpg" span="unknown" product_type="Tee" price="250.000"/>
                    <Product image="../assets/products/p14.jpg" span="unknown" product_type="Tee" price="250.000"/>
                    <Product image="../assets/products/p15.jpg" span="unknown" product_type="Tee" price="250.000"/>
                    <Product image="../assets/products/p16.jpg" span="unknown" product_type="Tee" price="250.000"/> */}
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
                <Feature image='../assets/features/24-hours.png' feature='24/7 Support' />
                <Feature image='../assets/features/product-management.png' feature='Secure' />
                <Feature image='../assets/features/productivity.png' feature='Save Time' />
                <Feature image='../assets/features/save-money.png' feature='Economical' />
                <Feature image='../assets/features/shield.png' feature='Safe' />
                <Feature image='../assets/features/tap.png' feature='Convenient' />
            </section>
        </div>
    );
}

export default Home;
