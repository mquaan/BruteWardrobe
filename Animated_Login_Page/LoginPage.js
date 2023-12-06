const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});



function check_signIn_username() {
    var username = document.getElementById("si_username").value;
    var signIn_btn = document.getElementById("signIn_btn");
    var regex = /[!@#$%^&*(),.?":{}|<>+=;']/;

    if (regex.test(username) && !username.endsWith('@gmail.com')) {
        errorSignInUsername.textContent = "(*) Username musn't consist special character: /[!@#$%^&*(),.?:{}|<>]/";
        errorSignInUsername.style.display = "inline";
        signIn_btn.disabled = true;

    }
    else {
        errorSignInUsername.style.display = "none";
        signIn_btn.disabled = false;
    }
}

function check_signUp_username() {
    var username = document.getElementById("su_username").value;
    var signUp_btn = document.getElementById("signUp_btn");
    var regex = /[!@#$%^&*(),.?":{}|<>+=;']/;

    if (regex.test(username)) {
        errorSignUpUsername.textContent = "(*) Username musn't consist special character: /[!@#$%^&*(),.?:{}|<>]/";
        errorSignUpUsername.style.display = "inline";
        signUp_btn.disabled = true;

    }
    else {
        errorSignUpUsername.style.display = "none";
        signUp_btn.disabled = false;
    }
}
