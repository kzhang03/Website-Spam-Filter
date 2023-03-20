window.addEventListener("DOMContentLoaded",orderBooks);

const book = document.querySelectorAll(".bk");

// original order of books
let order = [0,1,2,3,4];

// original order of books as an object
const originalOrder = {
  0: book[0],
  1: book[1],
  2: book[2],
  3: book[3],
  4: book[4]
};

const modeToggle = document.getElementById("mode-toggle");

modeToggle.addEventListener("click", toggleMode);

function toggleMode() {
  const body = document.body;
  body.classList.toggle("dark-mode");
}

// function DM is used to toggle dark mode.
function DM() {
  const body = document.querySelector('body');
  const highlight = document.querySelector('.highlight');
  const line = document.querySelector('.line');

  body.classList.toggle('dark-mode');
  highlight.classList.toggle('dark-mode-highlight');
  line.classList.toggle('dark-mode-line');
}

function show() {
  document.getElementById('sidebar').classList.toggle('active');
}

// Checks if user is an admin
function adminCheck() {
  if (CurrUser === NULL) {
    window.location.href = "login.html";
    return;
  }
  let admin = checkAdmin(CurrUser);

  if (admin) {
    window.location.href = "admin.html";
  }
  else {
    alert("You don't have permission")
  }
}


//switchBooks function is used to switch the books order in the admin page
function switchBooks() {

    // ask user which book to switch
    const bookIndex = prompt(
      `Enter the index of the book you want to switch (0-${book.length - 1}):`
    );

    // check if user input is valid for the switch
    if (bookIndex >= 0 && bookIndex < book.length) {
      // ask user which book to switch with
      const switchIndex = prompt(
        `Enter the index of the book div that you want to switch with (0-${book.length - 1}):`
      );

      // check if user input is valid
      if (switchIndex >= 0 && switchIndex < book.length) {

        // switch the content
        const temp = order[bookIndex];
        order[bookIndex] = order[switchIndex];
        order[switchIndex] = temp;

        // Set the new order into a local storage as JSON
        localStorage.setItem("bookOrder", JSON.stringify(order));

        redrawBooks();
        // Reload the page
        location.reload();

        //return invalid input if the the admin chooses invalid book div index
      } else {
        alert("Invalid input.");
      }
    } else {
      alert("Invalid input.");
    }
  }

// Display all the books in specified order
function redrawBooks() {
  let temp = [book[0].innerHTML, book[1].innerHTML, book[2].innerHTML, book[3].innerHTML, book[4].innerHTML];
  for (let i = 0; i < 5; i++) {
    originalOrder[i].innerHTML = temp[order[i]];
  }
}

// Resets the order of the books
function resetOrder() {
  const reset = [0,1,2,3,4];
  localStorage.setItem("bookOrder", JSON.stringify(reset));
  orderBooks();
  location.reload();
}

// Reorder the books
function orderBooks() {
  const storedOrder = localStorage.getItem("bookOrder");
  if (storedOrder !== null) {
    order = JSON.parse(storedOrder);
  }
  redrawBooks();
}
