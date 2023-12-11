import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/Navbar.css'

function Navbar() {
    const goToTop = () => {
        window.scrollTo( {top: 0, behavior: 'auto'} );
    }
    return (
        <div className="navbar">
            <img src='../assets/Logo.png' className="logo" alt=""/>
            <div>
                <ul className="navbar_right">
                    <li><NavLink className='link' activeclassname='active' to="/" onClick={() => goToTop()}>Home</NavLink></li>
                    <li><NavLink className='link' activeclassname='active' to="/shop" onClick={() => goToTop()}>Shop</NavLink></li>
                    <li><NavLink className='link' activeclassname='active' to="/blog" onClick={() => goToTop()}>Blog</NavLink></li>
                    <li><NavLink className='link' activeclassname='active' to="/about" onClick={() => goToTop()}>About</NavLink></li>
                    <li><NavLink className='link' activeclassname='active' to="/contact" onClick={() => goToTop()}>Contact</NavLink></li>
                    <li><NavLink className='link' activeclassname='active' to="/cart" onClick={() => goToTop()}>
                        <i className="fa-solid fa-bag-shopping fa-bounce"></i>
                    </NavLink></li>
                    <div className="close"><i className="far fa-times"></i></div>
                </ul>
            </div>
            <div className="mobile">
                <NavLink className='link' activeclassname='active' to="/cart" onClick={() => goToTop()}>
                    <i className="fa-solid fa-bag-shopping"></i>
                </NavLink>
                <i id="bar" className="fas fa-outdent"></i>
            </div>
        </div>
    )
}

export default Navbar