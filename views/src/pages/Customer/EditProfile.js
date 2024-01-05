import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/Customer/EditProfile.css'


function EditProfile({ token }) {
    const decodeToken = decodeURIComponent(
        atob(token.split('.')[1].replace('-', '+').replace('_', '/'))
            .split('')
            .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
            .join('')
    );
    const userId = JSON.parse(decodeToken).user.userId;


    const [customers, setCustomers] = useState([]);
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseCustomers = await axios.get('http://localhost:4000/customers');
                if (responseCustomers.data.success) {
                    setCustomers(responseCustomers.data.customers);

                    let foundCustomer = customers.find((uval) => userId === uval.userId);

                    if (!foundCustomer) {
                        console.error('Error:', 'customer not found');
                    }
                    else {
                        setUserInfo(foundCustomer);
                    }
                }
            } catch (errors) {
                console.error('Error:', errors);
            }
        };

        fetchData();
    })


    const handleUpdateInfo = () => {
        console.log('sd')
    }

    return (
        <div className='body-editprofile'>
            <div className='sub-profile-wrap'>
                <div className='sub-profile'>

                    {/* TRÁI */}
                    <div className='option-wrap'>

                        <div className='personal-pic'>
                            <img src='../assets/features/avatar_cus.png'></img>
                            <p>{userInfo.username}</p>
                        </div>

                        <div className='option'>
                            <div className='personal-info'
                                onClick={() => { document.getElementById('details').classList.remove("active") }}>
                                <i class="fa-solid fa-user-tie"></i>
                                <p>Personal Info</p>
                            </div>

                            <div className='change-password'
                                onClick={() => { document.getElementById('details').classList.add("active") }}>
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
                                    <p>First name</p>
                                    <input name="firstname" type="text" value={userInfo.firstname} />
                                </form>
                                <form className='lastname'>
                                    <p>Last name</p>
                                    <input name="lastname" type="text" value={userInfo.lastname} />
                                </form>
                            </div>

                            <div className='gender-birth'>
                                <form className='gender'>
                                    <p>Gender</p>
                                    <input name="gender" type="text" value={userInfo.gender} />
                                </form>
                                <form className='birth'>
                                    <p>Date of birth</p>
                                    <input name="birth" type="text" value={userInfo.dob} />
                                </form>
                            </div>

                            <div className='email-phone'>
                                <form className='email'>
                                    <p>Email</p>
                                    <input name="email" type="test" value={userInfo.email} />
                                </form>
                                <form className='phone'>
                                    <p>Phone number</p>
                                    <input name="phone" type="text" value={userInfo.phoneNumber} />
                                </form>
                            </div>
                            <div className='address'>
                                <form>
                                    <p>Address</p>
                                    <input name="address" type="text" value={userInfo.address} />
                                </form>
                            </div>

                            <div className='button-confirm-personalInfo'>
                                <button
                                    className='update_btn'
                                    onClick={() => {
                                        handleUpdateInfo()
                                    }}
                                >
                                    Update
                                </button>
                            </div>

                        </div>

                        <div className='password-details'>
                            <p className='password-settings'>Password Settings</p>

                            <div className='current-password'>
                                <form className='current-password-p'>
                                    <p>Current Password</p>
                                    <input name="current-password" type="password" />
                                </form>
                            </div>

                            <div className='new-confirm-password'>
                                <form className='new-password'>
                                    <p>New Password</p>
                                    <input name="new-password" type="password" />
                                </form>
                                <form className='confirm-password'>
                                    <p>Confirm New Password</p>
                                    <input name="confirm-password" type="password" />
                                </form>
                            </div>

                            <div className='button-confirm-password'>
                                <button className='update_btn'>Change password</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile