import React from 'react'
import Logo from'../assets/Logo.png'
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'

function Navbar() {
    return (
        // <div className="navbar">
        //     <div className="left_side">
        //         <img src={Logo} alt="Logo" />
        //     </div>
        //     <div className="right_side">
        //         <Link to="/Home">Home</Link>
        //         <Link to="/Shop">Shop</Link>
        //         <Link to="/Blog">Blog</Link>
        //         <Link to="/About">About</Link>
        //         <Link to="/Contact">Contact</Link>
        //     </div>
        // </div>
        <div className="header">
            <img src={Logo} class="logo" alt=""/>
            <div>
                <ul id="navbar">
                    <Link className="active" to="/Home">Home</Link>
                    <Link to="/Shop">Shop</Link>
                    <Link to="/Blog">Blog</Link>
                    <Link to="/About">About</Link>
                    <Link to="/Contact">Contact</Link>
                    <Link to="Cart"><i class="fa-solid fa-bag-shopping fa-bounce"></i></Link>
                </ul>
            </div>
        </div>
    )
}

export default Navbar