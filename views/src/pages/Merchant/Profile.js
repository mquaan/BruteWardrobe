import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import '../../styles/Merchant/Profile.css';

function getUserId(token) {
	const decodeToken = decodeURIComponent(
		atob(token.split('.')[1].replace('-', '+').replace('_', '/'))
			.split('')
			.map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
			.join('')
	);
	return JSON.parse(decodeToken).user.userId;
}

function compareObjects(obj1, obj2) {
	const keys1 = Object.keys(obj1);
	const keys2 = Object.keys(obj2);
	if (keys1.length !== keys2.length) {
		return false;
	}
	for (let key of keys1) {
		if (obj1[key] !== obj2[key]) {
			return false;
		}
	}
	return true;
}

function calculateExperience(date) {
	if (!date) return 0;
	var now = new Date();
	date = new Date(date);
	var months = (now.getFullYear() - date.getFullYear()) * 12;
	months -= date.getMonth();
	months += now.getMonth();
	return months <= 0 ? 0 : months;
}

function MerchantProfile({ token }) {
	const initobj = {
		username: null,
		gender: 'male',
		dob: null,
		firstname: null,
		lastname: null,
		phoneNumber: null,
		email: null,
		salary: null,
		experience: null,
	};
	const [userId, setUserId] = useState('');
	const [userInfo, setUserInfo] = useState(initobj);
	const [openSnackbar, setSnackbar] = useState(false);
	const [severity, setSeverity] = useState('error');
	const [message, setMessage] = useState('');

	const genderOptions = [
		{ value: 'male', label: 'Male' },
		{ value: 'female', label: 'Female' },
	];

	const [genderOption, setGenderOption] = useState('male');


	useEffect(() => {
		const fetchData = async () => {
			try {
				let uid = await getUserId(token);
				setUserId(uid);
				let response = await axios.get('http://localhost:4000/merchant/getinfo', {
					params: { userId: uid },
				});
				if (response.data.success) {
					response.data.merchant.experience = calculateExperience(response.data.merchant.dateCreated);
					setUserInfo(response.data.merchant);
					setGenderOption(response.data.merchant.gender)
				}
			} catch (errors) {
				console.error('Error:', errors);
			}
		};

		fetchData();
	}, [token]);


	const handleGenderChange = (event) => {
		setGenderOption(event.target.value);
	};

	const handleUpdateInfo = async () => {
		let updatedUserInfo = {};
		document.querySelectorAll('.personal-details input').forEach((input) => {
			if (input.name !== 'salary' && input.name !== 'experience') {
				updatedUserInfo[input.name] = input.value === '' ? null : input.value;
			}
		});

		updatedUserInfo.gender = genderOption;

		// extract properties
		let extractedProperties = {};
		Object.keys(updatedUserInfo).forEach((key) => {
			if (userInfo.hasOwnProperty(key)) {
				extractedProperties[key] = userInfo[key];
			} else {
				extractedProperties[key] = initobj[key];
			}
		});

		console.log(updatedUserInfo)
		console.log(extractedProperties)

		// if there's new update
		if (!compareObjects(updatedUserInfo, extractedProperties)) {
			let updatedMerchant = {};
			Object.keys(userInfo).forEach((key) => {
				if (updatedUserInfo.hasOwnProperty(key)) {
					updatedMerchant[key] = updatedUserInfo[key];
				} else {
					updatedMerchant[key] = userInfo[key];
				}
			});
			Object.keys(updatedUserInfo).forEach((key) => {
				if (!updatedMerchant.hasOwnProperty(key)) {
					updatedMerchant[key] = initobj[key];
				}
			});
			setUserInfo(updatedMerchant);

			const response = await axios.post('http://localhost:4000/merchant/updateinfo', {
				userId: userId,
				userInfo: updatedUserInfo,
			});
			if (response && response.data && response.data.success) {
				setSnackbar(false);
				setMessage('Your information have been updated successfully.');
				setSeverity('success');
				setSnackbar(true);
			} else {
				setSnackbar(false);
				setMessage('Failed to update your info! Please try again later.');
				setSeverity('error');
				setSnackbar(true);
			}
		} else {
			setSnackbar(false);
			setMessage("You haven't made any changes.");
			setSeverity('warning');
			setSnackbar(true);
		}
	};

	const handleUpdatePassword = async () => {
		let updatedPasswordInfo = {};
		document.querySelectorAll('.password-details input').forEach((input) => {
			updatedPasswordInfo[input.name] = input.value === '' ? null : input.value;
		});
		console.log(updatedPasswordInfo);

		// if there's new update
		if (updatedPasswordInfo['new-password'] !== updatedPasswordInfo['confirm-password']) {
			setMessage('Wrong password confirmation.');
			setSeverity('warning');
		} else if (updatedPasswordInfo['current-password'] !== updatedPasswordInfo['new-password']) {
			const response = await axios.post('http://localhost:4000/merchant/updatepassword', {
				userId,
				currentPassword: updatedPasswordInfo['current-password'],
				newPassword: updatedPasswordInfo['new-password'],
			});
			if (response.data.success) {
				setSnackbar(false);
				setMessage('Your information have been updated successfully.');
				setSeverity('success');
				setSnackbar(true);
			} else {
				if (response.data.message) {
					setSnackbar(false);
					setMessage(response.data.message);
					setSeverity('error');
					setSnackbar(true);
				} else {
					setSnackbar(false);
					setMessage('Failed to update your info! Please try again later.');
					setSeverity('error');
					setSnackbar(true);
				}
			}
		} else {
			setSnackbar(false);
			setMessage("You haven't made any changes.");
			setSeverity('warning');
			setSnackbar(true);
		}
	};

	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setSnackbar(false);
	};

	return (
		<div className='body-editprofile-m'>
			<div className='sub-profile-wrap'>
				<div className='sub-profile'>
					{/* TRÁI */}
					<div className='option-wrap'>
						<div className='personal-pic'>
							<img src='../assets/features/avatar_cus.png' alt=""></img>
							<p>{userInfo.username}</p>
						</div>

						<div className='option'>
							<div
								className='personal-info'
								onClick={() => {
									document.getElementById('details').classList.remove('active');
								}}
							>
								<i className='fa-solid fa-user-tie'></i>
								<p>Detailed information</p>
							</div>

							<div
								className='change-password'
								onClick={() => {
									document.getElementById('details').classList.add('active');
								}}
							>
								<i className='fa-solid fa-lock'></i>
								<p>Change Password</p>
							</div>
						</div>
					</div>

					{/* PHẢI */}
					<div className='details' id='details'>
						<div className='personal-details'>
							<p className='personal-information'>Detailed Information</p>
							<div className='fullname'>
								<form className='firstname'>
									<p>First name</p>
									<input name='firstname' type='text' defaultValue={userInfo.firstname} />
								</form>
								<form className='lastname'>
									<p>Last name</p>
									<input name='lastname' type='text' defaultValue={userInfo.lastname} />
								</form>
							</div>

							<div className='gender-birth'>
								<form className='gender'>
									<p>Gender</p>
									<select name='gender' className='select-gender' onChange={(e) => handleGenderChange(e)}>
										{genderOptions.map((option) => (
											<option key={option.value} value={option.value} selected={option.value === genderOption ? true : false}>
												{option.label}
											</option>
										))}
									</select>
								</form>
								<form className='birth'>
									<p>Date of birth</p>
									<input name='dob' type='date' defaultValue={userInfo.dob} />
								</form>
							</div>

							<div className='email-phone'>
								<form className='email'>
									<p>Email</p>
									<input name='email' type='email' defaultValue={userInfo.email} />
								</form>
								<form className='phone'>
									<p>Phone number</p>
									<input name='phoneNumber' type='text' defaultValue={userInfo.phoneNumber} />
								</form>
							</div>

							<div className='experience-salary'>
								<form className='experience'>
									<p>Experience (months)</p>
									<input name='experience' readOnly type='number' defaultValue={userInfo.experience} />
								</form>

								<form className='salary'>
									<p>Salary ($)</p>
									<input name='salary' readOnly type='number' defaultValue={userInfo.salary} />
								</form>
							</div>

							<div className='button-confirm-personalInfo'>
								<button
									className='update_btn'
									onClick={() => {
										handleUpdateInfo();
										setSnackbar(true);
									}}
								>
									Update
								</button>
							</div>
							<Snackbar
								anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
								open={openSnackbar}
								onClose={handleSnackbarClose}
								autoHideDuration={5000}
							>
								<Alert severity={severity} onClose={handleSnackbarClose} sx={{ width: '100%' }}>
									{message}
								</Alert>
							</Snackbar>
						</div>

						<div className='password-details'>
							<p className='password-settings'>Password Settings</p>

							<div className='current-password'>
								<form className='current-password-p'>
									<p>Current Password</p>
									<input name='current-password' type='password' />
								</form>
							</div>

							<div className='new-confirm-password'>
								<form className='new-password'>
									<p>New Password</p>
									<input name='new-password' type='password' />
								</form>
								<form className='confirm-password'>
									<p>Confirm New Password</p>
									<input name='confirm-password' type='password' />
								</form>
							</div>

							<div className='button-confirm-password'>
								<button
									className='update_btn'
									onClick={() => {
										handleUpdatePassword();
										setSnackbar(true);
									}}
								>
									Change password
								</button>
							</div>
							<Snackbar
								anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
								open={openSnackbar}
								onClose={handleSnackbarClose}
								autoHideDuration={5000}
							>
								<Alert severity={severity} onClose={handleSnackbarClose} sx={{ width: '100%' }}>
									{message}
								</Alert>
							</Snackbar>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MerchantProfile;
