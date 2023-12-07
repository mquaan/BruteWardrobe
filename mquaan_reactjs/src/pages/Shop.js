import React from 'react'
import '../styles/Shop.css'

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
    return (
        <div>
            <section className="page-header">
                <h2>#stayfashionable</h2>
                <p>Discover your style</p>
            </section>

            <section className="product1 section-p1">
                <div className="pro-container">
                    {/* <div className="pro" onclick="window.location.href='sproduct.html';"> */}
                    <Product image="../assets/products/p1.jpg" span="unknown" type="Tee" price="250.000"/>
                    <Product image="../assets/products/p2.jpg" span="unknown" type="Tee" price="250.000"/>
                    <Product image="../assets/products/p3.jpg" span="unknown" type="Tee" price="250.000"/>
                    <Product image="../assets/products/p4.jpg" span="unknown" type="Tee" price="250.000"/>
                    <Product image="../assets/products/p5.jpg" span="unknown" type="Tee" price="250.000"/>
                    <Product image="../assets/products/p6.jpg" span="unknown" type="Tee" price="250.000"/>
                    <Product image="../assets/products/p7.jpg" span="unknown" type="Tee" price="250.000"/>
                    <Product image="../assets/products/p8.jpg" span="unknown" type="Tee" price="250.000"/>
                    <Product image="../assets/products/p9.jpg" span="unknown" type="Tee" price="250.000"/>
                    <Product image="../assets/products/p10.jpg" span="unknown" type="Tee" price="250.000"/>
                    <Product image="../assets/products/p11.jpg" span="unknown" type="Tee" price="250.000"/>
                    <Product image="../assets/products/p12.jpg" span="unknown" type="Tee" price="250.000"/>
                    <Product image="../assets/products/p13.jpg" span="unknown" type="Tee" price="250.000"/>
                    <Product image="../assets/products/p14.jpg" span="unknown" type="Tee" price="250.000"/>
                    <Product image="../assets/products/p15.jpg" span="unknown" type="Tee" price="250.000"/>
                    <Product image="../assets/products/p16.jpg" span="unknown" type="Tee" price="250.000"/>
                </div>
            </section>

            <section id="pagination" className="section-p1">
                <a href="#">1</a>
                <a href="#">2</a>
                <a href="#"><i className="fal fa-long-arrow-alt-right"></i></a>
            </section>
        </div>
    )
}

export default Shop