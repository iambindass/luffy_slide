function startGame() {
    alert('Game is starting!');
}
function startGame() {
    // Add your login logic here
    var username = document.getElementById("username").value;
    var nickname = document.getElementById("nickname").value;

    // Example: Check if both fields are not empty
    if (username && nickname) {
        alert('Welcome, ' + nickname + '!');
        // You can redirect to the main game page or perform other actions
    } else {
        alert('Please enter both username and nickname.');
    }
}
function selectDifficulty(difficulty) {
    // Add your logic based on the selected difficulty
    alert('Difficulty selected: ' + difficulty);
    // You can proceed to the next page or perform other actions
}
var rows = 3;
var columns = 3;

var turns = 0;
var imgOrder = ["4", "2", "8", "5", "1", "6", "7", "9", "3"];

window.onload = function () {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = `./assets/${imgOrder.shift()}.jpg`;

            // DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            document.getElementById("board").append(tile);
        }
    }
}

function dragStart() {
    currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
    otherTile = this;
}

function checkWin() {
    let correctOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let currentOrder = [];

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tileId = r.toString() + "-" + c.toString();
            let tileNumber = document.getElementById(tileId).src.split("/").pop().slice(0, -4);
            currentOrder.push(tileNumber);
        }
    }

    if (JSON.stringify(currentOrder) === JSON.stringify(correctOrder)) {
        // Puzzle is solved, store the number of turns in localStorage
        localStorage.setItem('winTurns', turns);

        // Direct the player to the win page
        window.location.href = 'winPage.html';
    }
}

function dragEnd() {
    if (!otherTile.src.includes(".jpg")) {
        return;
    }

    let currCoords = currTile.id.split("-");
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = r == r2 && c2 == c - 1;
    let moveRight = r == r2 && c2 == c + 1;
    let moveUp = c == c2 && r2 == r - 1;
    let moveDown = c == c2 && r2 == r + 1;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;

        turns += 1;
        document.getElementById("turns").innerText = turns;

        // Check for win after each move
        checkWin();
    }
}
