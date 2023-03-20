// Create "databases"
const FireBloodReviews = {};
const NotebookReviews = {};
const PotterReviews = {};
const MobyReviews = {};
const KnifeReviews = {};

// Create temp variable 
let tempLoad;

// Add a new message to the "database". "ReviewName" specifies which "database" the data will be stored
function addNewMessage(newName, newText){
    tempLoad[0][newName] = newText;
    storeData();
}

// Stores data in messages to a local storage as a JSON, depending which review it is
function storeData(){
    currentJSON = JSON.stringify(tempLoad[0]);
    window.localStorage.setItem(tempLoad[1],currentJSON);
}


// Get an array of all users who have left messages
function getUsers(){
    userArray = [];
    for (nextUser in tempLoad[0]){
        userArray.push(nextUser);
    }
    return userArray;
}

// Get the message the user sent
function getMessage(userName){
    return tempLoad[0][userName];
}


// Get the current stored JSON file and load it into messages.
// if there is no JSON, set it to {}
function loadData(){
    let fileSystemJSON = window.localStorage.getItem(tempLoad[1]);
    if(fileSystemJSON === null){
        setJSON("{}");
        tempLoad[0] = {};
    }else{
        setJSON(fileSystemJSON);
    }
}

// Load database from JSON
function setJSON(JSONString){
    incomingJSON = JSON.parse(JSONString);
    for(nextName in incomingJSON){
        tempLoad[0][nextName] = incomingJSON[nextName];
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

