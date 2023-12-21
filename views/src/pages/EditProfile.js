import React from 'react'
import '../styles/EditProfile.css'



function EditProfile() {
    return (
        <div className='body-editprofile'>
            <div className='sub-profile-wrap'>
                <div className='sub-profile'>
                    
                    {/* TRÁI */}
                    <div className='option-wrap'>

                        <div className='personal-pic'>
                            <img src='../assets/features/avatar_cus.png'></img>
                            <p>Michael Jackson</p>
                        </div>

                        <div className='option'>
                            <div className='personal-info'
                                onClick={() => {document.getElementById('details').classList.remove("active")}}>
                                <i class="fa-solid fa-user-tie"></i>
                                <p>Personal Info</p>
                            </div>

                            <div className='change-password'
                                onClick={() => {document.getElementById('details').classList.add("active")}}>
                                <i class="fa-solid fa-lock"></i>
                                <p>Change Password</p>
                            </div>
                        </div>

                    </div>


                    {/* PHẢI */}
                    <div className='details' id='details'>
                        <div className='personal-details'>
                            <p className='personal-information'>Personal Information</p>
                            <div className='fullname'>
                                <form className='firstname'>
                                    <p>Firstname</p>
                                    <input name="firstname" type="text"/>
                                </form>
                                <form className='lastname'>
                                    <p>Lastname</p>
                                    <input name="lastname" type="text"/>
                                </form>
                            </div>

                            <div className='gender-birth'>
                                <form className='gender'>
                                    <p>Gender</p>
                                    <input name="gender" type="text"/>
                                </form>
                                <form className='birth'>   
                                    <p>Date Of Birth</p>
                                    <input name="birth" type="text"/>
                                </form>
                            </div>

                            <div className='email-phone'>
                                <form className='email'>
                                    <p>Email</p>
                                    <input name="email" type="test"/>
                                </form>
                                <form className='phone'>   
                                    <p>Phone Number</p>
                                    <input name="phone" type="text"/>
                                </form>
                            </div>
                            <div className='address'>
                                <form>
                                    <p>Address</p>
                                    <input name="address" type="text"/>
                                </form>
                            </div>

                            <div className='button-confirm-personalInfo'>
                                <button className='update_btn'>Update</button>
                                <button className='cancel_btn'>Cancel</button>
                            </div>

                        </div>

                        <div className='password-details'>
                            <p className='password-settings'>Password Settings</p>

                            <div className='current-password'>
                                <form className='current-password-p'>
                                    <p>Current Password</p>
                                    <input name="current-password" type="password"/>
                                </form>
                            </div>

                            <div className='new-confirm-password'>
                                <form className='new-password'>
                                    <p>New Password</p>
                                    <input name="new-password" type="password"/>
                                </form>
                                <form className='confirm-password'>
                                    <p>Confirm New Password</p>
                                    <input name="confirm-password" type="password"/>
                                </form>
                            </div>

                            <div className='button-confirm-password'>
                                <button className='update_btn'>Update</button>
                                <button className='cancel_btn'>Cancel</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile