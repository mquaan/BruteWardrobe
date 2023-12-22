import bcrypt from 'bcrypt';
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

class User {
	constructor(username, password, email, facebookId = null, userId = null, address = null, phoneNumber = null, loginStatus = false, gender = 'male', dob = null) {
		this.username = username;
		this.userId = userId;
		this.password = password ? bcrypt.hashSync(password, salt) : null;
		this.address = address;
		this.phoneNumber = phoneNumber;
		this.email = email;
		this.facebookId = facebookId;
		this.loginStatus = loginStatus;
		this.gender = gender;
		this.dob = dob;
	}
}

export default User;
