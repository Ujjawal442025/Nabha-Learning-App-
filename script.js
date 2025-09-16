const teacher = document.querySelector(".teacher");
const user = document.querySelector(".User");
const pass = document.querySelector(".pwd")
const student = document.querySelector(".student")
const submit = document.querySelector(".submit");
const login = document.querySelector(".login-page");
const loginform = document.querySelector(".login-form");

// Placeholder Changes
teacher.addEventListener('click', () => {
    user.placeholder = "teach1345";
    pass.placeholder = "teach@123";
});

student.addEventListener('click', () => {
    user.placeholder = "student123"
    pass.placeholder = "demo@123"
});

// Demo Data 
const demoCredentials = {
    students: [
        { username: 'student123', password: 'demo@123', name: 'Ravi Kumar' },
        { username: 'student2367', password: 'de@mo123', name: 'Priya Singh' }
    ],
    teachers: [
        { username: 'teacher1345', password: 'teach@123', name: 'Mrs. Sharma' }
    ]
};

// Login Form
document.addEventListener('DOMContentLoaded', () => {
    // Clear any existing login state when on login page
    sessionStorage.removeItem('loggedIn');
    
    // Set up back button behavior for login page - exit site
    setupLoginPageNavigation();

    // Handle form submission
    loginform.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const fullName = document.getElementById('fullname').value;
        const selectedUserType = document.querySelector('input[name="userType"]:checked').value;

        // Basic validation
        if (!username || !password || !fullName) {
            alert('Please fill in all fields');
            return;
        }
        if (user) {
            // Set login state
            sessionStorage.setItem('loggedIn', 'true');
            sessionStorage.setItem('nava_user_name', fullName);
            sessionStorage.setItem('userType', selectedUserType);

            // Navigate to appropriate page
            if (selectedUserType === 'student') {
                window.location.href = 'student.html';
            } else if (selectedUserType === 'teacher') {
                window.location.href = 'teacher.html';
            }
        } else {
            alert('Invalid username or password. Please use demo credentials.');
        }
    });

    // Password toggle functionality
    const passwordToggle = document.querySelector('.password-toggle');
    const passwordInput = document.getElementById('password');

    if (passwordToggle && passwordInput) {
        passwordToggle.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            passwordToggle.textContent = type === 'password' ? '👁️' : '🙈';
        });
    }
});

function setupLoginPageNavigation() {
    // Replace current history state to remove any back navigation
    history.replaceState(null, null, window.location.href);
    
    // Handle back button on login page - should exit site
    window.addEventListener('popstate', function(event) {
        // Try to close the window/tab
        window.close();
        
        // Fallback - go to blank page (exits site)
        setTimeout(() => {
            window.location.href = 'about:blank';
        }, 100);
    });
}

// Check if user is already logged in and redirect
window.addEventListener("load", () => {
    if (sessionStorage.getItem("loggedIn")) {
        const userType = sessionStorage.getItem("userType");
        if (userType === 'student') {
            window.location.href = 'student.html';
        } else {
            window.location.href = 'teacher.html';
        }
    }
});