import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import '../styles/Customer/Navbar.css';
import axios from 'axios';


function getUserId_Role(token) {
	const decodeToken = decodeURIComponent(
		atob(token.split('.')[1].replace('-', '+').replace('_', '/'))
			.split('')
			.map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
			.join('')
	);
	return JSON.parse(decodeToken).user;
}

function Navbar({ token, setToken, cartItems }) {
	const [username, setUsername] = useState('Loading...');

	const goToTop = () => {
		window.scrollTo({ top: 0, behavior: 'auto' });
	};
	const [isNavHidden, setIsNavHidden] = useState(false);
	const isEmptyCart = cartItems ? cartItems.length === 0 : true;

	useEffect(() => {
		const handleScroll = () => {
			const scrollY = window.scrollY;
			if(scrollY > 200){
				setMenuOpen(false);
			}
			setIsNavHidden(scrollY > 100);
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	useEffect(() => {
		const fetchData = async (temp_token) => {
			try {
				
				let id_role = await getUserId_Role(temp_token);

				if (id_role.role != 'customer') {
					localStorage.removeItem('token');
					setToken(null);
				}
				else {
					const responseCustomer = await axios.get('http://localhost:4000/customer/getinfo', {
						params: { userId: id_role.userId }
					});
					if (responseCustomer.data.success) {
						setUsername(responseCustomer.data.customer.username);
					}
				}

			} catch (errors) {
				console.error('Error:', errors);
			}
		};
		if (token)
			fetchData(token);
	}, [token]);

	const [menuOpen, setMenuOpen] = useState(false);

	const subMenuRef = useRef(null);

	const ToggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	const handleCloseMenu = (event) => {
		if (subMenuRef.current && !subMenuRef.current.contains(event.target) && menuOpen) {
			setMenuOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleCloseMenu);
		return () => {
			document.removeEventListener('mousedown', handleCloseMenu);
		};
	}, [menuOpen]);
	
	const handleLogout = () => {
		axios
			.get('http://localhost:4000/logout', { withCredentials: true })
			.then((response) => {
				if (response.data.success) {
					localStorage.removeItem('token');
					setToken(null);
					ToggleMenu();
					window.location.href = '/'
				} else {
				}
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};

	const [isExpanded, setIsExpanded] = useState(false);
	const inputRef = useRef();

	const [searchQuery, setSearchQuery] = useState('');
	const handleInputChange = (event) => {
		setSearchQuery(event.target.value);
	};
	const handleClear = () => {
		setSearchQuery('');
		inputRef.current.focus(); // Keep the focus on the input after clearing
	};
	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			HandleSearch();
		}
	};
	const navigate = useNavigate();
	const HandleSearch = () => {
		navigate(`/shop?search=${searchQuery}`);
		setSearchQuery('');
		setIsExpanded(false);
	};

	const handleBlur = (event) => {
		if (!inputRef.current.contains(event.relatedTarget)) {
			setIsExpanded(false);
		}
	};
	return (
		<div className={`navbar ${isNavHidden ? 'hidden' : ''}`}>
			<div style={{ display: 'flex', alignItems: 'center', gap: '80px' }}>
				<NavLink className='link' activeclassname='active' to='/' onClick={() => goToTop()}>
					<img src='../assets/Logo.png' className='logo' alt='' />
				</NavLink>
				<div className='search-bar1' onClick={() => setIsExpanded(true)} onBlur={handleBlur} tabIndex={0} ref={inputRef}>
					<i className='fa-solid fa-magnifying-glass'></i>
					<input type='text' 
						className={`search-click1 ${isExpanded ? 'expanded' : ''}`} 
						placeholder='Search here...'
						value={searchQuery}
						onChange={handleInputChange}
						onKeyDown={handleKeyDown}
					/>
					{searchQuery && (
						<button className={`clear-button ${isExpanded ? 'expanded' : ''}`} onClick={handleClear}>
							<i class="fa-light fa-circle-xmark"></i>
						</button>
					)}
				</div>
			</div>
			<div>
				<ul className='navbar_right'>
					<li>
						<NavLink className='link' activeclassname='active' to='/' onClick={() => goToTop()}>
							Home
						</NavLink>
					</li>
					<li>
						<NavLink className='link' activeclassname='active' to='/shop' onClick={() => goToTop()}>
							Shop
						</NavLink>
					</li>
					<li>
						<NavLink className='link' activeclassname='active' to='/about' onClick={() => goToTop()}>
							About
						</NavLink>
					</li>
					<li>
						<NavLink className='link' activeclassname='active' to='/cart' onClick={() => goToTop()}>
							<i className={`fa-solid fa-bag-shopping ${isEmptyCart ? '' : 'fa-bounce'}`}></i>
						</NavLink>
					</li>
					{token ? (
						<li>
							<img src='../assets/features/avatar_cus.png' className='user-pic' onClick={ToggleMenu} alt=''></img>
						</li>
					) : (
						<li>
							<Link to='/login' style={{ textDecoration: 'none' }}>
								<div className='to-login'>
									<i className='fa-thin fa-circle-user'></i>
									<div className='login'>Sign In</div>
								</div>
							</Link>
						</li>
					)}
				</ul>
			</div>

			<div className={`sub-menu-wrap ${menuOpen ? 'open-menu' : ''}`} id='subMenu' ref={subMenuRef}>
				<div className='sub-menu'>
					<div className='user-info'>
						<img src='../assets/features/avatar_cus.png' alt='' />
						<h3>{username}</h3>
					</div>
					<hr />
					<Link to='/edit-profile' style={{ textDecoration: 'none' }} 
						onClick={ToggleMenu}>
						<div className='sub-menu-link'>
							<img src='../assets/features/profile.png' alt='' />
							<p>Edit Profile</p>
							<span>{'>'}</span>
						</div>
					</Link>

					<Link to='/order-list' style={{ textDecoration: 'none' }} 
						onClick={ToggleMenu}>
						<div className='sub-menu-link'>
							<img src='../assets/features/order.png' alt='' />
							<p>Order Status</p>
							<span>{'>'}</span>
						</div>
					</Link>

					{/* <Link to='/order-history' style={{ textDecoration: 'none' }} 
						onClick={ToggleMenu}>
						<div className='sub-menu-link'>
							<img src='../assets/features/order.png' alt='' />
							<p>Order History</p>
							<span>{'>'}</span>
						</div>
					</Link> */}

					<Link style={{ textDecoration: 'none' }}>
						<div className='sub-menu-link' onClick={handleLogout}>
							<img src='../assets/features/logout.png' alt='' />
							<p>Logout</p>
							<span>{'>'}</span>
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
