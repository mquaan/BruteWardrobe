import React from 'react';
import '../styles/Administrator/Admin_Sidebar.css';
import { Link, NavLink } from 'react-router-dom';

function Admin_Sidebar(){
    return(
        <div className='admin_page'>
            <div className='ad_sidebar'>
                <img src ='../assets/Logo.png' className='ad-bruteforce-logo' alt=''/>
                <div className='bybruteforce'><p>by Brute Force</p></div>
                <ul className='ad_sidebar_tab'>
                    <Link to='/admin/' className='link'>
                        <li>
                            <p className='p-dashboard'><i className="fa-sharp fa-solid fa-house-chimney"></i>Dashboard</p>
                        
                        </li>
                    </Link>

                    <Link to='/admin/users' className='link'>
                            <li>
                                <p className='p-users'><i className="fa-solid fa-users"></i>Users</p>
                            </li>
                    </Link>

                    <Link to='/admin/products' className='link'>
                        <li>
                            
                            <p className='p-products'><i className="fa-sharp fa-solid fa-boxes-packing"></i>Products</p>
                            
                        </li>
                    </Link>

                    <Link to='/login' className='link'>
                        <li>
                            <p className='p-logout'><i className="fa-solid fa-right-from-bracket"></i>Log out</p>
                            
                        </li>
                    </Link>
                </ul>
                
            </div>
        </div>
    );
}

export default Admin_Sidebar;