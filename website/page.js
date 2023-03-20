// Get references to the input, add button, delete all button, and list elements
const reviewInput = document.getElementById("review-input");
const addReviewButton = document.getElementById("add-review");
const deleteAllButton = document.getElementById("delete-all");
const reviewList = document.getElementById("review-list");

// Add event listeners to the buttons that call the addReview and deleteAllReviews functions when clicked
addReviewButton.addEventListener("click", addReview);
deleteAllButton.addEventListener("click", deleteAllReviews);

function addReview() {
    // Get the text of the input element
    const reviewText = reviewInput.value;
  
    // Create a new list item and append it to the list if the input is not empty
    if (reviewText.trim() !== "") {
      const li = document.createElement("li");
      const reviewTextNode = document.createTextNode(reviewText);
      li.appendChild(reviewTextNode);
  
      // Set custom styles for even-numbered list items
      const listItems = reviewList.children;
      const newItemIndex = listItems.length;
      if (newItemIndex % 2 === 0) {
        li.style.color = "blue";
        li.style.fontSize = "16px";
      }
  
      // Insert the new item in the correct alphabetical position
      const existingItems = Array.from(listItems);
      const insertIndex = existingItems.findIndex(item => item.textContent > reviewText);
      if (insertIndex === -1) {
        reviewList.appendChild(li);
      } else {
        reviewList.insertBefore(li, existingItems[insertIndex]);
      }
  
      // Clear the input element
      reviewInput.value = "";
    } else {
      // Show an alert message if the input is empty
      alert("Please enter a Review.");
    }
  }
  

function deleteAllReviews() {
  // Delete all list items
  while (reviewList.firstChild) {
    reviewList.removeChild(reviewList.firstChild);
  }
}
