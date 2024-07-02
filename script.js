// Global variables
let names = [
 ]; // Array to store names
  
  let removedNames = []; // Array to store removed names
  
  // Function to load removed names from localStorage
  function loadRemovedNames() {
    const storedNames = localStorage.getItem('removedNames');
    if (storedNames) {
      removedNames = JSON.parse(storedNames);
      displayRemovedNames();
    }
  }
  
  // Function to save removed names to localStorage
  function saveRemovedNames() {
    localStorage.setItem('removedNames', JSON.stringify(removedNames));
  }
  
  // Function to reset the page
  function resetPage() {
    // Clear localStorage
    localStorage.removeItem('removedNames');
    // Clear arrays
    removedNames = [];
    names = [
      "abhishek", "harsh", "akash", "manoj", "shivam", "vinod", 
      "kashif sir", "astha", "shamshad", "aaditya", "anuj", 
      "shail", "kajal", "sonali", "sachin", "kartik"
    ];
    // Clear UI
    document.getElementById("winnerDisplay").innerHTML = '';
    document.getElementById("removedNames").innerHTML = '';
    // Display default names
    displayNames();
  }
  
  // Function to select a random name and remove it from the list
  function selectWinner() {
    if (names.length === 0) {
      alert("All names have been selected!");
      return;
    }
  
    // Generate a random index
    const randomIndex = Math.floor(Math.random() * names.length);
    // Get the winner
    const winner = names[randomIndex];
    // Remove the winner from the array
    names.splice(randomIndex, 1);
    // Add winner to removed names
    removedNames.push(winner);
  
    // Save removed names to localStorage
    saveRemovedNames();
  
    // Display the winner on the UI
    const winnerDisplay = document.getElementById("winnerDisplay");
    winnerDisplay.innerHTML = `
      <div class="alert alert-success" role="alert">
        The winner of the Chai Trap is: <strong>${winner}</strong>
      </div>
    `;
  
    // Display removed names
    displayRemovedNames();
  }
  
  // Function to display removed names
  function displayRemovedNames() {
    const removedNamesDiv = document.getElementById("removedNames");
    removedNamesDiv.innerHTML = `
      <p>Previously selected winners:</p>
      <ul class="list-group">
        ${removedNames.map(name => `<li class="list-group-item">${name}</li>`).join('')}
      </ul>
    `;
  }
  
  // Function to add names from user input or default names if input is empty
  function addNames() {
    const inputNames = document.getElementById("inputNames").value.trim();
    let newNames = [];
  
    if (inputNames === "") {
      names=[
        "abhishek", "harsh", "akash", "manoj", "shivam", "vinod", 
        "kashif sir", "astha", "shamshad", "aaditya", "anuj", 
        "shail", "kajal", "sonali", "sachin", "kartik"
      ]
      
    } else {
      // Split names by comma and trim whitespace
      names = inputNames.split(',').map(name => name.trim());
    }
  
    // Add new names to the names array
    // names.push(...newNames);
  
    // Clear input field
    document.getElementById("inputNames").value = "";
  
    // Display updated list of names
    displayNames();
  }
  
  // Function to display current list of names
  function displayNames() {
    const namesDiv = document.getElementById("names");
    namesDiv.innerHTML = `
      <p>Current list of names:</p>
      <ul class="list-group">
        ${names.map(name => `<li class="list-group-item">${name}</li>`).join('')}
      </ul>
    `;
  }
  
  // Event listener for the add names button click
  document.getElementById("addNamesBtn").addEventListener("click", addNames);
  
  // Event listener for the button click to select winner
  document.getElementById("selectWinnerBtn").addEventListener("click", selectWinner);
  
  // Event listener for the reset button click
  document.getElementById("resetBtn").addEventListener("click", () => {
    resetPage();
    // Clear the displayed removed names from UI
    displayRemovedNames(); // This will clear the displayed names
  });
  
  // Initial load of removed names from localStorage
  loadRemovedNames();
  