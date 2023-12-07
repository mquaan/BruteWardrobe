import React from 'react'
import '../styles/Home.css'
import { Link } from 'react-router-dom'
function Product(props) {
    return (
        <div className="pro">
            <img className="image" src={props.image} alt="" />
            <div className="des">
                <span>{props.span}</span>
                <h5>{props.product_type}</h5>
                <div className="star">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                </div>
                <h4>{props.price} VND</h4>
            </div>
            <div><i className="fa-solid fa-cart-shopping cart"></i></div>
        </div>
    )
}

function Feature(props){
    return (
        <div className="fe-box">
            <img className="image" src={props.image} alt="" />
            <h6>{props.feature}</h6>
        </div>
    )
}

function Home() {
    return (
        <div>
            <div id="hero">
                <h4>What's new!</h4>
                <h2>Spring offer</h2>
                <h1>On Tee products</h1>
                <p>Sale up to 30% off!</p>
                <Link to='/shop'>
                    <button>Shop now</button>
                </Link>
            </div>
            <section className='product1 section-p1'>
                <h2>Our products</h2>
                <p>New Collection Design</p>
                <div className="pro-container">
                    <Product image="../assets/products/p1.jpg" span="unknown" product_type="Tee" price="250.000"/>
                    <Product image="../assets/products/p2.jpg" span="unknown" product_type="Tee" price="250.000"/>
                    <Product image="../assets/products/p3.jpg" span="unknown" product_type="Tee" price="250.000"/>
                    <Product image="../assets/products/p4.jpg" span="unknown" product_type="Tee" price="250.000"/>
                    <Product image="../assets/products/p5.jpg" span="unknown" product_type="Tee" price="250.000"/>
                    <Product image="../assets/products/p6.jpg" span="unknown" product_type="Tee" price="250.000"/>
                    <Product image="../assets/products/p7.jpg" span="unknown" product_type="Tee" price="250.000"/>
                    <Product image="../assets/products/p8.jpg" span="unknown" product_type="Tee" price="250.000"/>
                </div>
            </section>
            
            <section id="banner" className="section-m1">
                <h4>Bundle Sale</h4>
                <h2>Save up to <span>50% off</span> - When buy 3 items</h2>
                <Link to='/shop'>
                    <button className="normal">Explore more </button>
                </Link>
            </section>

            <section className='product1 section-p1'>
                <h2>New Arrivals</h2>
                <p>New Collection Design</p>
                <div className="pro-container">
                    <Product image="../assets/products/p9.jpg" span="unknown" product_type="Tee" price="250.000"/>
                    <Product image="../assets/products/p10.jpg" span="unknown" product_type="Tee" price="250.000"/>
                    <Product image="../assets/products/p11.jpg" span="unknown" product_type="Tee" price="250.000"/>
                    <Product image="../assets/products/p12.jpg" span="unknown" product_type="Tee" price="250.000"/>
                    <Product image="../assets/products/p13.jpg" span="unknown" product_type="Tee" price="250.000"/>
                    <Product image="../assets/products/p14.jpg" span="unknown" product_type="Tee" price="250.000"/>
                    <Product image="../assets/products/p15.jpg" span="unknown" product_type="Tee" price="250.000"/>
                    <Product image="../assets/products/p16.jpg" span="unknown" product_type="Tee" price="250.000"/>
                </div>
            </section>

            <section id="sm-banner" className='section-p1'>
                <div className="banner-box">
                    <h4>Super deal</h4>
                    <h2>Buy 1 get voucher up to 40%</h2>
                    <span>The best collection is on sale at BruteWardrobe</span>
                    <Link to='/shop'>
                        <button className="white">Learn More</button>
                    </Link>
                    
                </div>
                <div className="banner-box banner-box2">
                    <h4>Summer</h4>
                    <h2>Upcomming season</h2>
                    <span>The best collection is on sale at BruteWardrobe</span>
                    <Link to='/shop'>
                        <button className="white">Collection</button>
                    </Link>
                    
                </div>
            </section>

            <section id="banner3">
                <div className="banner-box">
                    <h2>Advertisment</h2>
                    <h3>Something</h3>
                </div>
                <div className="banner-box banner-box2">
                    <h2>Advertisment</h2>
                    <h3>Something</h3>
                </div>
                <div className="banner-box banner-box3">
                    <h2>Advertisment</h2>
                    <h3>Something</h3>
                </div>
            </section>

            <section id="feature" className='section-p1'>
                <Feature image="../assets/features/24-hours.png" feature="24/7 Support"/>
                <Feature image="../assets/features/product-management.png" feature="Secure"/>
                <Feature image="../assets/features/productivity.png" feature="Save Time"/>
                <Feature image="../assets/features/save-money.png" feature="Economical"/>
                <Feature image="../assets/features/shield.png" feature="Safe"/>
                <Feature image="../assets/features/tap.png" feature="Convenient"/>
            </section>
        </div>
    )
}

export default Home