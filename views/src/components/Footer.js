import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Customer/Footer.css'

function Footer() {
    return (
        <div className="footer section-p1">
            <div className="col">
                <img className="logo" src="../assets/Logo.png" alt=""/>
                <div className='h4'>Contact</div>
                <div className='p'><strong>Address: </strong>HCM</div>
                <div className='p'><strong>Phone: </strong>0123456789</div>
                <div className="follow">
                    <div className='h4'>Follow us</div>
                    <div className="icon">
                        <i className="fab fa-facebook-f"></i>
                        <i className="fab fa-twitter"></i>
                        <i className="fab fa-instagram"></i>
                        <i className="fab fa-youtube"></i>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className='h4'>About</div>
                <Link className='link' to="/about">About us</Link>
                <Link className='link' to="/cart">Delivery Information</Link>
                <Link className='link' to="/about">Privacy Policy</Link>
                <Link className='link' to="/contact">Contact us</Link>
            </div>

            <div className="col">
                <div className='h4'>Account</div>
                <Link className='link' to="/">Sign in</Link>
                <Link className='link' to="/cart">View Cart</Link>
                <Link className='link' to="/">Whishlist</Link>
                <Link className='link' to="/">Track My Order</Link>
                <Link className='link' to="/">Help</Link>
            </div>

            <div className="col">
                <div className='h4'>Payment</div>
                <img className="bank" src="../assets/bank.png" alt=""/>
            </div>

            <div className="copyright">
                <div className='p'>@2023, BruteForce Team - BruteWardrobe Ecommerce Website</div>
            </div>
        </div>
    )
}

export default Footer