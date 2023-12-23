import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Login.css';

function Login({ token, setToken }) {
	axios
		.get('http://localhost:4000/token', { withCredentials: true })
		.then((response) => {
			if (response.data.token) {
				setToken(response.data.token);
				localStorage.setItem('token', JSON.stringify(response.data.token));
			}
		})
		.catch((error) => {
			console.error('Error:', error);
		});
	const [username, setUsername] = useState('');
	const [pass, setPass] = useState('');
	const [cfpass, setCfPass] = useState('');
	const [email, setEmail] = useState('');
	const isSubmitDisabled = !username || !pass || !cfpass;

	function CheckSignUpUsername(username, errorSignUpUsername) {
		setUsername(username);
		const regex = /[!@#$%^&*(),.?":{}|<>+=;']/;
		if (regex.test(username)) {
			errorSignUpUsername.textContent = "(*) Username mustn't consist special character: /[!@#$%^&*(),.?:{}|<>]/";
			errorSignUpUsername.style.display = 'inline';
		} else {
			errorSignUpUsername.style.display = 'none';
		}
	}

	function CheckPassword(password, cf_password, wrongPassword) {
		setPass(password);
		setCfPass(cf_password);
		if (cf_password !== password && cf_password) {
			wrongPassword.textContent = '(*) Wrong password confirmation';
			wrongPassword.style.display = 'inline';
			setCfPass('');
		} else {
			wrongPassword.style.display = 'none';
		}
	}

	async function handleLogin(event, msg) {
		event.preventDefault();

		await axios
			.post('http://localhost:4000/login', { username, password: pass })
			.then((response) => {
				if (response.data.token) {
					localStorage.setItem('token', JSON.stringify(response.data.token));
					const decodeToken = decodeURIComponent(
						atob(response.data.token.split('.')[1].replace('-', '+').replace('_', '/'))
							.split('')
							.map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
							.join('')
					);
					const role = JSON.parse(decodeToken).user.role;
					if (role === 'customer') {
						window.location.href = '/';
					} else if (role === 'merchant') {
						window.location.href = '/merchant';
					} else if (role === 'admin') {
						window.location.href = '/admin';
					}
				} else {
					msg.textContent = response.data.message;
					msg.style.display = 'inline';
					console.log(response.data.message);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}

	async function handleSignUp(event, msg) {
		event.preventDefault();

		await axios
			.post('http://localhost:4000/signup', { username, email, password: pass })
			.then((response) => {
				if (response.data.success) {
					localStorage.setItem('token', JSON.stringify(response.data.token));
					window.location.href = '/';
				} else {
					msg.textContent = response.data.message;
					msg.style.display = 'inline';
					console.log(response.data.message);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}

	if (token) {
		window.location.href = '/';
	} else {
		return (
			<div className='body'>
				<section id='header'>
					<img src='../assets/Logo.png' alt='Logo' width='90' height='75' />
				</section>

				<section id='body_section'>
					<div className='container' id='container'>
						<div className='form-container sign-in'>
							<form onSubmit={(event) => handleLogin(event, document.getElementById('errorSignIn'))}>
								<h1>Sign In</h1>
								<div className='social-icons'>
									<a className='a icon' href={'http://localhost:4000/login/google'}>
										<i className='fa-brands fa-google'></i>
									</a>
									<a className='a icon' href={'http://localhost:4000/login/facebook'}>
										<i className='fa-brands fa-facebook'></i>
									</a>
								</div>
								<span>or use your email password</span>
								<input
									name='username'
									type='text'
									id='si_username'
									placeholder='Username or Email'
									onChange={(event) => {
										setUsername(event.target.value);
									}}
								/>
								<span id='errorSignInUsername' className='signIn-error-message'></span>
								<input
									name='password'
									type='password'
									id='si_password'
									placeholder='Password'
									onChange={(event) => {
										setPass(event.target.value);
									}}
									required
								/>
								<span id='errorSignIn' className='signUp-error-message'></span>

								<div className='a'>Forget Your Password?</div>
								<button type='submit' id='signIn_btn'>
									Sign In
								</button>
							</form>
						</div>
						<div className='form-container sign-up'>
							<form onSubmit={(event) => handleSignUp(event, document.getElementById('errorSignUp'))}>
								<h1>Create Account</h1>
								<div className='social-icons'>
									<div className='a icon'>
										<i id='google-icon' className='fa-brands fa-google'></i>
									</div>
									<div className='a icon'>
										<i id='facebook-icon' className='fa-brands fa-facebook'></i>
									</div>
								</div>
								<span>or use your email for registeration</span>
								<input
									name='email'
									type='email'
									id='su_email'
									placeholder='Email'
									onChange={(event) => {
										setEmail(event.target.value);
									}}
								/>
								<input
									name='username'
									type='text'
									id='su_username'
									placeholder='Username'
									onChange={(event) => CheckSignUpUsername(event.target.value, document.getElementById('errorSignUpUsername'))}
									required
								/>
								<span id='errorSignUpUsername' className='signUp-error-message'></span>
								<input
									name='password'
									type='password'
									id='su_password'
									placeholder='Password'
									onChange={(event) =>
										CheckPassword(event.target.value, document.getElementById('su_confirmPassword').value, document.getElementById('wrongPassword'))
									}
									required
								/>
								<input
									type='password'
									id='su_confirmPassword'
									placeholder='Confirm Password'
									onChange={(event) =>
										CheckPassword(document.getElementById('su_password').value, event.target.value, document.getElementById('wrongPassword'))
									}
									required
								/>
								<span id='wrongPassword' className='wrongPassword-message'></span>
								<span id='errorSignUp' className='signUp-error-message'></span>
								<button id='signUp_btn' disabled={isSubmitDisabled}>
									Sign Up
								</button>
							</form>
						</div>
						<div className='toggle-container'>
							<div className='toggle'>
								<div className='toggle-panel toggle-left'>
									<h1>Welcome Back!</h1>
									<p>Enter your personal details to use all of site features</p>
									<button
										className='hidden'
										id='login'
										onClick={() => {
											document.getElementById('container').classList.remove('active');
										}}
									>
										Sign In
									</button>
								</div>
								<div className='toggle-panel toggle-right'>
									<h1>Hello, Friend!</h1>
									<p>Register with your personal details to use all of site features</p>
									<button
										className='hidden'
										id='register'
										onClick={() => {
											document.getElementById('container').classList.add('active');
										}}
									>
										Sign Up
									</button>
								</div>
							</div>
						</div>
					</div>

					<div className='background_image' id='background_image'>
						<img src='../assets/clothing_background_2.png' alt='background_image' width='650' height='480' />
					</div>
				</section>
			</div>
		);
	}
}
export default Login;
