// These are the users available for login
const users = {
  admin1: { password: "password1", isAdmin: true },
  user1: { password: "pass1", isAdmin: false }
};

// This is the login function
function login() {
  const username = document.getElementById("username-input").value;
  const password = document.getElementById("password-input").value;

  // Searches users to see if user inputs exists in the JSON
  for (user in users) {
    // Compares user input to JSON 
    if (user === username && users[user].password === password) {
      // If user is an admin, directs to admin page, otherwise 
      // directs to the user page
      setCurrUser({ username: user, isAdmin: users[user].isAdmin, isLoggedIn: true });
      // Redirects you to index.html
      window.location.href = "index.html";
      return;
    }
  }
  alert("Invalid username or password.");
}

// Get information of the current logged in user
function setCurrUser(user) {
  CurrUser = user;
  sessionStorage.setItem('CurrUser', JSON.stringify(CurrUser));
}

// Check is the current user is an admin or not
function checkAdmin(user) {
  return user.isAdmin;
}