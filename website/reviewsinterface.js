// Assign delete button event
const deleteAllButton = document.getElementById("delete-all");
deleteAllButton.addEventListener("click", deleteAllReviews);

window.addEventListener("DOMContentLoaded", loadPage);

// Passes user review to a model to determine whether its spam or not
function predictReview(review) {
  const data = { reviews: [review] }; // wrap the string in an array

  // needs Flask runing to work
  return fetch('http://192.168.1.20:54/predict', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data), timeout: 1 // send the object as JSON
  })
    .then(response => response.json())
    .then(data => {
      // process the response from the Flask API
      return data.predictions; // return the predicted sentiment
    })
    .catch(error => {
      console.error(error);

      return null; // return null if an error occurs
    });
}

// This gets the review information, and specifies which book it was reviewed for
async function fetchInfo(page) {
  // get user input

  const reviewInput = document.getElementById(page).value;
  if (reviewInput === "") {
    alert("Review is empty");
    return;
  }

  // pass input to ML model
  let decision = await predictReview(reviewInput);

  // If it detects as spam, don't add review to page
  if (decision !== null) {
    if (decision.toString() === "spam") {
      alert("Spam detected");
      document.getElementById(page).value = "";
      return;
    }
  }

  // Load information about the user
  var CurrUser = JSON.parse(sessionStorage.getItem("CurrUser")) || { username: null, isAdmin: false, isLoggedIn: false };
  let temp;
  // if the user isn't logged in, set username as Guest####
  if (!CurrUser.isLoggedIn) {
    temp = "Guest" + Math.floor(Math.random() * 1001); // note that if two guest users share the same username they can both manipulate the same reviews
  }
  else {
    temp = CurrUser.username;
  }
  // add messages
  addNewMessage(temp, reviewInput);
  updateList();
  document.getElementById(page).value = "";
}

// Get messages from each user of a book and display it
function updateList() {
  msgList = "<ol>"
  usersArray = getUsers(tempLoad[0]);
  for (nextUser of usersArray) {
    msgList += "<li>" + nextUser;
    msgList += " says: " + getMessage(nextUser) + "</li>";
  }
  msgList += "</ol>"
  tempLoad[2].innerHTML = msgList;
}

// When the page is loaded, activate the database and display everything on the page
function loadPage() {
  loadData();
  updateList();
}

// Deletes all reviews from local storage
function deleteAllReviews() {
  localStorage.removeItem(tempLoad[1]);
  tempLoad[0] = {};
  storeData();
  tempLoad[2].innerHTML = "No reviews yet.";
}

// :(
// This function loads all reviews on a single page
function loadReviews() {
  tempLoad = [FireBloodReviews, "FireBloodJSON", document.getElementById("reviews1")];
  loadPage();
  tempLoad = [NotebookReviews, "NotebookJSON", document.getElementById("reviews2")];
  loadPage();
  tempLoad = [PotterReviews, "PotterJSON", document.getElementById("reviews3")];
  loadPage();
  tempLoad = [MobyReviews, "MobyJSON", document.getElementById("reviews4")];
  loadPage();
  tempLoad = [KnifeReviews, "KnifeJSON", document.getElementById("reviews5")];
  loadPage();
}