import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Signup.css'

function Signup() {
    return (
        <div className='body'>
            <section id="header">
                <img src="../assets/Logo.png" alt="Logo" width="120" height="100"/>
            </section>
            <section id="body_section">
                <div className='container' id='container'>
                    <div class="form-container sign-up">
                        <form>
                            <h1>Create Account</h1>
                            <div class="social-icons">   
                                <div className="icon"><i id="google-icon" class="fa-brands fa-google"></i></div>
                                <div className="icon"><i id="facebook-icon" class="fa-brands fa-facebook"></i></div>
                            </div>
                            <input type="text" id="su_username" placeholder="Username" onchange="check_signUp_username()" required/>
                            {/* <span id="errorSignUpUsername" class="signUp-error-message"></span> */}
                            <input type="email" id="su_email" placeholder="Email"/>
                            <input type="password" id="su_password" placeholder="Password" required/>
                            <input type="password" id="su_confirmPassword" placeholder="Confirm Password" required/>
                            {/* <span id="wrongPassword" class="wrongPassword-message"></span> */}
                            <select name="Role" id="role">
                                <option value="none">Choose your role</option>
                                <option value="Customer">Customer</option>
                                <option value="Merchant">Merchant</option>
                            </select>
                            <button id="signUp_btn" disabled>Sign Up</button>
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
                        </div>
                    </div>
                </div>
                
                <div className="background_image">
                    <img src="../assets/clothing_background_2.png" alt="background_image" width="670" height="450"/>
                </div>
            </section>
            
        </div>
    );
}

export default Signup