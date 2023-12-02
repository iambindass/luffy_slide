// Define the number of rows and columns for the puzzle board
var rows = 5;
var columns = 5;

// Variables to keep track of the current and other tiles during drag-and-drop
var currTile;
var otherTile;

// Counter to track the number of turns made by the player
var turns = 0;

// Execute the code when the HTML document has finished loading
window.onload = function () {
    // Initialize the 5x5 puzzle board
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            // Create an image element for each tile on the board
            let tile = document.createElement("img");

            // Set the source of the image to a blank image
            tile.src = `./assets/blank.jpg`;

            // Add drag-and-drop event listeners to the tile
            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            // Append the tile to the puzzle board
            document.getElementById("board").append(tile);
        }
    }

    // Initialize the puzzle pieces and shuffle them
    let pieces = [];
    for (let i = 1; i <= rows * columns; i++) {
        pieces.push(i.toString().padStart(3, '0'));
    }
    pieces = shuffleArray(pieces);

    // Create image elements for the shuffled pieces
    for (let i = 0; i < pieces.length; i++) {
        let tile = document.createElement("img");

        // Set the source of the image to the corresponding puzzle piece
        tile.src = `./assets/image${pieces[i]}.jpg`;

        // Add drag-and-drop event listeners to the puzzle pieces
        tile.addEventListener("dragstart", dragStart);
        tile.addEventListener("dragover", dragOver);
        tile.addEventListener("dragenter", dragEnter);
        tile.addEventListener("dragleave", dragLeave);
        tile.addEventListener("drop", dragDrop);
        tile.addEventListener("dragend", dragEnd);

        // Append the puzzle piece to the 'pieces' container
        document.getElementById("pieces").append(tile);
    }
}

// Function to handle the start of the drag
function dragStart() {
    currTile = this; // Set the current tile when drag starts
}

// Function to handle the dragover event
function dragOver(e) {
    e.preventDefault(); // Prevent the default dragover behavior
}

// Function to handle the dragenter event
function dragEnter(e) {
    e.preventDefault(); // Prevent the default dragenter behavior
}

// Function to handle the dragleave event
function dragLeave() {
    // No specific action for dragleave
}

// Function to handle the drop event
function dragDrop() {
    otherTile = this; // Set the other tile when a drop occurs
}

// Function to handle the end of the drag
function dragEnd() {
    if (currTile.src.includes("blank")) {
        return; // If the current tile is blank, do nothing
    }

    // Swap the source of the current and other tiles
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;

    // Increment the turns counter and update the turns display
    turns += 1;
    document.getElementById("turns").innerText = turns;

    // Check if the puzzle is solved after each move
    if (checkWin()) {
        // If the puzzle is solved, direct the player to the win page
        window.location.href = 'winPage.html';
    }
}

// Function to check if the puzzle is solved
function checkWin() {
    // Generate the correct order of puzzle pieces
    let correctOrder = [];
    for (let i = 1; i <= rows * columns; i++) {
        correctOrder.push(i.toString().padStart(3, '0'));
    }

    // Get the current order of puzzle pieces on the board
    let currentOrder = [];
    let boardImages = document.getElementById("board").getElementsByTagName("img");

    for (let i = 0; i < boardImages.length; i++) {
        // Extract the image name without the file extension
        let imageName = boardImages[i].src.split("/").pop();
        currentOrder.push(imageName.slice(0, -4));
    }

    // Compare the current order with the correct order
    return arraysAreEqual(currentOrder, correctOrder);
}

// Function to compare two arrays for equality
function arraysAreEqual(arr1, arr2) {
    return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
}

// Function to shuffle an array using the Fisher-Yates algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
