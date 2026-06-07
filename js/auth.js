// ==========================
// TOAST NOTIFICATION
// ==========================

function showToast(message) {
    const toast = document.getElementById("toast");

    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

// ==========================
// SIGNUP
// ==========================

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (!fullName || !email || !password || !confirmPassword) {
            showToast("All fields are required");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            showToast("Enter a valid email");
            return;
        }

        if (password.length < 6) {
            showToast("Password must be at least 6 characters");
            return;
        }

        if (password !== confirmPassword) {
            showToast("Passwords do not match");
            return;
        }

        const users =
            JSON.parse(localStorage.getItem("users")) || [];

        const existingUser =
            users.find(user => user.email === email);

        if (existingUser) {
            showToast("Email already registered");
            return;
        }

        users.push({
            fullName,
            email,
            password
        });

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );

        showToast("Account created successfully");

        setTimeout(() => {
            window.location.href = "index.html";
        }, 1500);

    });
}

// ==========================
// LOGIN
// ==========================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;

        if (!email || !password) {
            showToast("All fields are required");
            return;
        }

        const users =
            JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(
            user =>
                user.email === email &&
                user.password === password
        );

        if (!user) {
            showToast("Invalid email or password");
            return;
        }

        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(user)
        );

        showToast("Login successful");

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1000);

    });
}

// ==========================
// LOGOUT
// ==========================

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        localStorage.removeItem("loggedInUser");

        showToast("Logged out successfully");

        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);

    });

}

// LOGIN PASSWORD

const loginPassword =
document.getElementById("loginPassword");

const toggleLoginPassword =
document.getElementById("toggleLoginPassword");

if(loginPassword && toggleLoginPassword){

    toggleLoginPassword.addEventListener("click",()=>{

        if(loginPassword.type === "password"){

            loginPassword.type = "text";
            toggleLoginPassword.classList.replace(
                "fa-eye",
                "fa-eye-slash"
            );

        }else{

            loginPassword.type = "password";
            toggleLoginPassword.classList.replace(
                "fa-eye-slash",
                "fa-eye"
            );
        }
    });
}

// SIGNUP PASSWORD

const password =
document.getElementById("password");

const togglePassword =
document.getElementById("togglePassword");

if(password && togglePassword){

    togglePassword.addEventListener("click",()=>{

        if(password.type === "password"){

            password.type = "text";
            togglePassword.classList.replace(
                "fa-eye",
                "fa-eye-slash"
            );

        }else{

            password.type = "password";
            togglePassword.classList.replace(
                "fa-eye-slash",
                "fa-eye"
            );
        }
    });
}

// CONFIRM PASSWORD

const confirmPassword =
document.getElementById("confirmPassword");

const toggleConfirmPassword =
document.getElementById("toggleConfirmPassword");

if(confirmPassword && toggleConfirmPassword){

    toggleConfirmPassword.addEventListener("click",()=>{

        if(confirmPassword.type === "password"){

            confirmPassword.type = "text";
            toggleConfirmPassword.classList.replace(
                "fa-eye",
                "fa-eye-slash"
            );

        }else{

            confirmPassword.type = "password";
            toggleConfirmPassword.classList.replace(
                "fa-eye-slash",
                "fa-eye"
            );
        }
    });
}