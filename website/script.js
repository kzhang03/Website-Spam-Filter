// Script to call a function when everything is loaded
window.addEventListener("DOMContentLoaded",orderBooks);

// Get information on classes .bk
const book = document.querySelectorAll(".bk");

// Original order of how books are ordered as an array
let order = [0,1,2,3,4];

// Original order of how books are ordered as an object
const originalOrder = {
  0: book[0],
  1: book[1],
  2: book[2],
  3: book[3],
  4: book[4]
};

// Get the current user's information
// If not logged in, set default values
var CurrUser = JSON.parse(sessionStorage.getItem("CurrUser")) || { username: null, isAdmin: false, isLoggedIn: false };

function show() {
  document.getElementById('sidebar').classList.toggle('active');
}

// Checks if user is admin when they click on "admin". If they are,
// Redirect to admin.html, otherwise redirect to login.html is not
// logged or alert that they don't have permission if they are logged
// in as a user
function adminCheck() {
  if (!CurrUser.isLoggedIn) {
    window.location.href = "login.html";
    return;
  }

  if (CurrUser.isAdmin) {
    window.location.href = "admin.html";
  }
  else {
    alert("You don't have permission")
  }

}
//Dark mode 
const modeToggle = document.getElementById("mode-toggle");

modeToggle.addEventListener("click", toggleMode);

function show() {
  document.getElementById('sidebar').classList.toggle('active');
}

//Dark mode 
function DM() {
  const body = document.querySelector('body');
  const highlight = document.querySelector('.highlight');
  const line = document.querySelector('.line');

  body.classList.toggle('dark-mode');
  highlight.classList.toggle('dark-mode-highlight');
  line.classList.toggle('dark-mode-line');
}

// Display each book in specified order
function redrawBooks() {
  let temp = [book[0].innerHTML, book[1].innerHTML, book[2].innerHTML, book[3].innerHTML, book[4].innerHTML];
  for (let i = 0; i < 5; i++) {
    originalOrder[i].innerHTML = temp[order[i]];
  }
}

// Function to be called when DOM is all loaded
function orderBooks() {
  // Get the current order stored in the local storage
  const storedOrder = localStorage.getItem("bookOrder");
  if (storedOrder !== null) {
    // assign order to current book orders
    order = JSON.parse(storedOrder);
  }
  redrawBooks();
}

function showAlert() {
  alert("Click on the image to be redirected to the summary page");
}