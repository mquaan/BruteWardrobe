import React from 'react'
import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import '../styles/Navbar.css'

function Navbar() {
    const goToTop = () => {
        window.scrollTo( {top: 0, behavior: 'auto'} );
    }
    const [isNavHidden, setIsNavHidden] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
        const scrollY = window.scrollY;
        setIsNavHidden(scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    function ToggleMenu(subMenu){
        subMenu.classList.toggle("open-menu");
    }

    return (
        <div className={`navbar ${isNavHidden ? 'hidden' : ''}`}>
            <img src='../assets/Logo.png' className="logo" alt=""/>
            <div>
                <ul className="navbar_right">
                    <li><NavLink className='link' activeclassname='active' to="/" onClick={() => goToTop()}>Home</NavLink></li>
                    <li><NavLink className='link' activeclassname='active' to="/shop" onClick={() => goToTop()}>Shop</NavLink></li>
                    <li><NavLink className='link' activeclassname='active' to="/about" onClick={() => goToTop()}>About</NavLink></li>
                    <li><NavLink className='link' activeclassname='active' to="/contact" onClick={() => goToTop()}>Contact</NavLink></li>
                    <li><NavLink className='link' activeclassname='active' to="/cart" onClick={() => goToTop()}>
                        <i className="fa-solid fa-bag-shopping fa-bounce"></i>
                    </NavLink></li>
                    <li>
                    <img src="../assets/features/avatar_cus.png" 
                        className='user-pic' 
                        onClick={() => ToggleMenu(document.getElementById("subMenu"))}>
                    </img>
                    </li>
                </ul>
            </div>
            <div className="mobile">
                <NavLink className='link' activeclassname='active' to="/cart" onClick={() => goToTop()}>
                    <i className="fa-solid fa-bag-shopping"></i>
                </NavLink>
                <i id="bar" className="fas fa-outdent"></i>
            </div>

            <div className="sub-menu-wrap" id="subMenu">
                <div className="sub-menu">
                    <div className="user-info">
                        <img src="../assets/features/avatar_cus.png" alt=""/>
                        <h3>Phạm Sĩ Phú</h3>
                    </div>

                    <hr/>

                    <a href="#" class="sub-menu-link">
                        <img src="../assets/features/profile.png" alt=""/>
                        <p>Edit Profile</p>
                        <span>{'>'}</span>
                    </a>

                    <a href="#" class="sub-menu-link">
                        <img src="../assets/features/logout.png" alt=""/>
                        <p>Logout</p>
                        <span>{'>'}</span>
                    </a>

                </div>

            </div>
        </div>
    )
}

export default Navbar