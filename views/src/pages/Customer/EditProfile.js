import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../../styles/Customer/EditProfile.css'

function getUserId(token) {
    const decodeToken = decodeURIComponent(
        atob(token.split('.')[1].replace('-', '+').replace('_', '/'))
            .split('')
            .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
            .join('')
    );
    return JSON.parse(decodeToken).user.userId;
}

function EditProfile({ token }) {
    const userId = getUserId(token);
    const initobj = {
        gender: null,
        dob: null,
        firstname: null,
        lastname: null,
        address: null,
        phoneNumber: null,
        email: null,
    }

    const [userInfo, setUserInfo] = useState(initobj);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseCustomer = await axios.get('http://localhost:4000/customer/getcustomer', {
                    params: { userId: userId }
                });

                if (responseCustomer.data.success) {
                    setUserInfo(responseCustomer.data.customer);
                }
            } catch (errors) {
                console.error('Error:', errors);
            }
        };

        fetchData();
    }, [userId]);


    const handleUpdateInfo = () => {
        let updatedUserInfo = {};
        document.querySelectorAll('.personal-details input').forEach((input) => {
            updatedUserInfo[input.name] = input.value === '' ? null : input.value;
        });

        // extract properties
        let extractedProperties = {};
        Object.keys(initobj).forEach((key) => {
            if (userInfo.hasOwnProperty(key)) {
                extractedProperties[key] = userInfo[key];
            }
            else {
                extractedProperties[key] = initobj[key];
            }
        });

        // if there's new update
        if (JSON.stringify(updatedUserInfo) !== JSON.stringify(extractedProperties)) {
            console.log(updatedUserInfo)
            console.log(extractedProperties)
            let udpatedCustomer = {};
            Object.keys(userInfo).forEach((key) => {
                if (updatedUserInfo.hasOwnProperty(key)) {
                    udpatedCustomer[key] = updatedUserInfo[key];
                }
                else {
                    udpatedCustomer[key] = userInfo[key];
                }
            });
            setUserInfo(udpatedCustomer);

            const response = axios.post('http://localhost:4000/customer/updateinfo', {
                userId: userId,
                userInfo: updatedUserInfo
            });

            if (response && response.data && response.data.success) {
                console.alert('User info updated successfully');
            } else {
                console.error('Failed to update user info');
            }
        }
        else {
            console.alert("Nothing's changed")
        }
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
                                <i className="fa-solid fa-user-tie"></i>
                                <p>Personal Info</p>
                            </div>

                            <div className='change-password'
                                onClick={() => { document.getElementById('details').classList.add("active") }}>
                                <i className="fa-solid fa-lock"></i>
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
                                    <input name="firstname" type="text" defaultValue={userInfo.firstname} />
                                </form>
                                <form className='lastname'>
                                    <p>Last name</p>
                                    <input name="lastname" type="text" defaultValue={userInfo.lastname} />
                                </form>
                            </div>

                            <div className='gender-birth'>
                                <form className='gender'>
                                    <p>Gender</p>
                                    <input name="gender" type="text" defaultValue={userInfo.gender} />
                                </form>
                                <form className='birth'>
                                    <p>Date of birth</p>
                                    <input name="dob" type="date" defaultValue={userInfo.dob} />
                                </form>
                            </div>

                            <div className='email-phone'>
                                <form className='email'>
                                    <p>Email</p>
                                    <input name="email" type="email" defaultValue={userInfo.email} />
                                </form>
                                <form className='phone'>
                                    <p>Phone number</p>
                                    <input name="phoneNumber" type="text" defaultValue={userInfo.phoneNumber} />
                                </form>
                            </div>
                            <div className='address'>
                                <form>
                                    <p>Address</p>
                                    <input name="address" type="text" defaultValue={userInfo.address} />
                                </form>
                            </div>

                            <div className='button-confirm-personalInfo'>
                                <button
                                    className='update_btn'
                                    onClick={() => handleUpdateInfo()}
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