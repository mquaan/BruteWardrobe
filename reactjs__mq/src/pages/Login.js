import React, { useState } from 'react';
import '../styles/Login.css'
import { Link } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Đưa logic xác thực ở đây
        console.log('Username:', username);
        console.log('Password:', password);
    };

    return (
        <div className='body'>
            <section id="header">
                <img src="../assets/Logo.png" alt="Logo" width="120" height="100"/>
            </section>
            <section id="body_section">
                <div className='container' id='container'>
                    <div className="form-container sign-in"> 
                        <form>
                            <h1>Sign In</h1>
                            <div className="social-icons">   
                                <div className="icon"><i id="google-icon" className="fa-brands fa-google"></i></div>
                                <div className="icon"><i id="facebook-icon" className="fa-brands fa-facebook"></i></div>
                            </div>
                            <input
                                id="si_username"
                                type="text"
                                placeholder='Username or Email'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input
                                id="si_password"
                                type="password"
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className='forget'>Forget Your Password?</div>
                            <button id='signIn_btn' type="button" onClick={handleLogin}>
                                Sign In
                            </button>
                        </form>
                    </div>
                    
                    <div className="toggle-container">
                        <div className="toggle">
                            <div class="toggle-panel toggle-left">
                                <h1>Welcome Back!</h1>
                                <p>Enter your personal details to use all of site features</p>
                                <Link to="/login">
                                    <button class="hidden" id="login">Sign In</button>
                                </Link>
                            </div>
                            <div className="toggle-panel toggle-right">
                                <h1>Hello, Friend!</h1>
                                <p>Register with your personal details to use all of site features</p>
                                <Link to="/signup">
                                    <button class="hidden" id="register">
                                        Sign Up
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="background_image">
                    <img src="../assets/clothing_background_2.png" alt="background_image" width="670" height="450"/>
                </div>
            </section>
            
        </div>
    );
};

export default Login;
