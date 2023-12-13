import React, { useState } from 'react'
import '../styles/Login.css'
import { Link } from 'react-router-dom';

function Login({ handleLogin }) {
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');
    const [cfpass, setCfPass] = useState('');
    const isSubmitDisabled = !username || !pass || !cfpass;
    
    function CheckSignUpUsername(username, errorSignUpUsername) {
        setUsername(username);
        const regex = /[!@#$%^&*(),.?":{}|<>+=;']/;
        if (regex.test(username)) {
            errorSignUpUsername.textContent = "(*) Username musn't consist special character: /[!@#$%^&*(),.?:{}|<>]/";
            errorSignUpUsername.style.display = "inline";
        }
        else {
            errorSignUpUsername.style.display = "none";
        }
    }

    function CheckPassword(password, cf_password, wrongPassword){
        setPass(password);
        setCfPass(cf_password);
        if(cf_password !== password && cf_password){
            wrongPassword.textContent = "(*) Wrong password confirmation";
            wrongPassword.style.display = "inline";
            setCfPass('');
        }
        else {
            wrongPassword.style.display = "none";
        }
    }

    return (
        <div className='body'>
            <section id="header">
                <img src="../assets/Logo.png" alt="Logo" width="90" height="50"/>
            </section>

            <section id="body_section">
                <div className="container" id="container">
                    <div className="form-container sign-in">
                        <form>
                            <h1>Sign In</h1>
                            <div className="social-icons">
                                <div className="a icon"><i className="fa-brands fa-google"></i></div>
                                <div className="a icon"><i className="fa-brands fa-facebook"></i></div>
                            </div>
                            <span>or use your email password</span>
                            <input 
                                name="username" 
                                type="text" id="si_username" 
                                placeholder="Username or Email"
                            />
                            <span id="errorSignInUsername" className="signIn-error-message"></span>
                            <input name="password" type="password" id="si_password" placeholder="Password" required/>
                            <div className='a'>Forget Your Password?</div>
                            <Link to="/"><button id="signIn_btn" onClick={handleLogin}>Sign In</button></Link>
                        </form>
                    </div>
                    <div className="form-container sign-up">
                        <form>
                            <h1>Create Account</h1>
                            <div className="social-icons">   
                                <div className="a icon"><i id="google-icon" className="fa-brands fa-google"></i></div>
                                <div className="a icon"><i id="facebook-icon" className="fa-brands fa-facebook"></i></div>
                            </div>
                            <span>or use your email for registeration</span>
                            <input 
                                name="username"
                                type="text" id="su_username"
                                placeholder="Username"
                                onChange={(event) => CheckSignUpUsername(
                                    event.target.value,
                                    document.getElementById("errorSignUpUsername")
                                )}
                                required
                            />
                            <span id="errorSignUpUsername" className="signUp-error-message"></span>
                            <input name="email" type="email" id="su_email" placeholder="Email"/>
                            <input 
                                name="password"
                                type="password"
                                id="su_password"
                                placeholder="Password"
                                onChange={(event) => CheckPassword(
                                    event.target.value,
                                    document.getElementById("su_confirmPassword").value,
                                    document.getElementById("wrongPassword")
                                )}
                                required
                            />
                            <input 
                                type="password"
                                id="su_confirmPassword"
                                placeholder="Confirm Password"
                                onChange={(event) => CheckPassword(
                                    document.getElementById("su_password").value,
                                    event.target.value,
                                    document.getElementById("wrongPassword")
                                )}
                                required
                                />
                            <span id="wrongPassword" className="wrongPassword-message"></span>
                            <button id="signUp_btn" disabled={ isSubmitDisabled }>Sign Up</button>
                        </form>
                    </div>
                    <div className="toggle-container">
                        <div className="toggle">
                            <div className="toggle-panel toggle-left">
                                <h1>Welcome Back!</h1>
                                <p>Enter your personal details to use all of site features</p>
                                <button
                                    className="hidden"
                                    id="login"
                                    onClick={() => {document.getElementById('container').classList.remove("active")}}
                                >
                                    Sign In
                                </button>
                            </div>
                            <div className="toggle-panel toggle-right">
                                <h1>Hello, Friend!</h1>
                                <p>Register with your personal details to use all of site features</p>
                                <button
                                    className="hidden"
                                    id="register"
                                    onClick={() => {document.getElementById('container').classList.add("active")}}
                                >
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="background_image" id="background_image">
                    <img src="../assets/clothing_background_2.png" alt="background_image" width="750" height="500"/>
                </div>
                
            </section>
        </div>
    )
}
export default Login