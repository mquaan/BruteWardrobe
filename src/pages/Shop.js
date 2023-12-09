import React, { useState } from 'react'
import '../styles/Shop.css'
// import ProductDetail from '../components/ProductDetail'
// import { Link, Route } from 'react-router-dom';

const allProducts = [
    {image: '../assets/products/p1.jpg', span: 'Tee', type: 'Tee', price: '250.000'},
    {image: '../assets/products/p2.jpg', span: 'Tee', type: 'Tee', price: '350.000'},
    {image: '../assets/products/p3.jpg', span: 'Tee', type: 'Tee', price: '470.000'},
    {image: '../assets/products/p4.jpg', span: 'Tee', type: 'Tee', price: '290.000'},
    {image: '../assets/products/p5.jpg', span: 'Tee', type: 'Tee', price: '160.000'},
    {image: '../assets/products/p6.jpg', span: 'Tee', type: 'Tee', price: '240.000'},
    {image: '../assets/products/p7.jpg', span: 'Tee', type: 'Tee', price: '250.000'},
    {image: '../assets/products/p8.jpg', span: 'Tee', type: 'Tee', price: '350.000'},
    {image: '../assets/products/p9.jpg', span: 'Tee', type: 'Tee', price: '260.000'},
    {image: '../assets/products/p10.jpg', span: 'Pants', type: 'Pants', price: '550.000'},
    {image: '../assets/products/p11.jpg', span: 'Pants', type: 'Pants', price: '380.000'},
    {image: '../assets/products/p12.jpg', span: 'Pants', type: 'Pants', price: '290.000'},
    {image: '../assets/products/p13.jpg', span: 'Tee', type: 'Tee', price: '360.000'},
    {image: '../assets/products/p14.jpg', span: 'Pants', type: 'Pants', price: '240.000'},
    {image: '../assets/products/p15.jpg', span: 'Tee', type: 'Tee', price: '320.000'},
    {image: '../assets/products/p16.jpg', span: 'Pants', type: 'Pants', price: '310.000'},
    {image: '../assets/products/p17.jpg', span: 'Tee', type: 'Tee', price: '300.000'},
    {image: '../assets/products/p18.jpg', span: 'Pants', type: 'Pants', price: '390.000'},
    {image: '../assets/products/p19.jpg', span: 'Tee', type: 'Tee', price: '300.000'},
    {image: '../assets/products/p20.jpg', span: 'Tee', type: 'Tee', price: '150.000'},
    {image: '../assets/products/p21.jpg', span: 'Tee', type: 'Tee', price: '250.000'},
    {image: '../assets/products/p22.jpg', span: 'Tee', type: 'Tee', price: '450.000'},
    {image: '../assets/products/p23.jpg', span: 'Tee', type: 'Tee', price: '450.000'},
    {image: '../assets/products/p24.jpg', span: 'Tee', type: 'Tee', price: '450.000'},
    {image: '../assets/products/p25.jpg', span: 'Tee', type: 'Tee', price: '340.000'},
    {image: '../assets/products/p26.jpg', span: 'Tee', type: 'Tee', price: '350.000'},
    {image: '../assets/products/p26.jpg', span: 'Tee', type: 'Tee', price: '350.000'},
    {image: '../assets/products/p26.jpg', span: 'Tee', type: 'Tee', price: '350.000'},
    {image: '../assets/products/p26.jpg', span: 'Tee', type: 'Tee', price: '350.000'},
    {image: '../assets/products/p26.jpg', span: 'Tee', type: 'Tee', price: '350.000'},
    {image: '../assets/products/p27.jpg', span: 'Tee', type: 'Tee', price: '350.000'},
    {image: '../assets/products/p28.jpg', span: 'Tee', type: 'Tee', price: '350.000'},
    {image: '../assets/products/p29.jpg', span: 'Tee', type: 'Tee', price: '350.000'},
    {image: '../assets/products/p30.jpg', span: 'Tee', type: 'Tee', price: '350.000'},
    {image: '../assets/products/p31.jpg', span: 'Tee', type: 'Tee', price: '350.000'},
    {image: '../assets/products/p32.jpg', span: 'Tee', type: 'Tee', price: '350.000'},
];

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

function Shop() {
    const productsPerPage = 12;
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const totalPages = Math.ceil(allProducts.length / productsPerPage);
    const displayedProducts = allProducts.slice(startIndex, endIndex);
    const goToPage = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'auto' });
    };
    
    return (
        <div>
            <section className="page-header">
                <h2>#stayfashionable</h2>
                <h3>Discover your style</h3>
            </section>
  
            <section className="product1 section-p1">
                <div className="pro-container">
                    {displayedProducts.map((product, index) => (
                        <Product
                            key={index}
                            image={product.image}
                            span={product.span}
                            type={product.type}
                            price={product.price}
                        />
                    ))}
                </div>
            </section>
  
            <section id="pagination" className="section-p1">
                {/* Previous button */}
                {currentPage > 1 && (
                <button onClick={() => goToPage(currentPage - 1)}>
                    <i className="fal fa-long-arrow-alt-left"></i>
                </button>
                )}

                {/* Create buttons dynamically based on the number of pages */}
                {Array.from({ length: totalPages }, (_, index) => (
                <button key={index + 1} onClick={() => goToPage(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>
                    {index + 1}
                </button>
                ))}

                {/* Next button */}
                {currentPage < totalPages && (
                <button onClick={() => goToPage(currentPage + 1)}>
                    <i className="fal fa-long-arrow-alt-right"></i>
                </button>
                )}
            </section>
            {/* <Route path="/product/:productId" component={ProductDetail} /> */}
        </div>
    );
}

export default Shop