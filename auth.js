// User data structure
class UserData {
    constructor(username) {
        this.username = username;
        this.level = 1;
        this.xp = 0;
        this.streak = 0;
        this.lastCompletedDate = null;
        this.tasks = [];
    }
}

// Simple user authentication (In a real app, this should be handled by a backend server)
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // In a real application, this should make an API call to verify credentials
    // For now, we'll simulate user authentication using localStorage
    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[username] && users[username].password === password) {
        // Store current user
        localStorage.setItem('currentUser', username);
        window.location.href = 'index.html';
    } else {
        document.getElementById('error-message').textContent = 'Invalid username or password';
    }
}

function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        document.getElementById('error-message').textContent = 'Please enter both username and password';
        return;
    }

    // Get existing users or initialize empty object
    const users = JSON.parse(localStorage.getItem('users')) || {};

    // Check if user already exists
    if (users[username]) {
        document.getElementById('error-message').textContent = 'Username already exists';
        return;
    }

    // Create new user
    users[username] = {
        password: password,
        userData: new UserData(username)
    };

    // Save updated users object
    localStorage.setItem('users', JSON.stringify(users));
    
    // Automatically log in the new user
    localStorage.setItem('currentUser', username);
    window.location.href = 'index.html';
}

// Check if user is logged in (add this to main pages)
function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = 'login.html';
    }
    return currentUser;
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}