// WASD управление
// если выйти за граници, то игра багнется

let canvas = document.getElementById('gridCanvas');
let ctx = canvas.getContext('2d');

// for drawing the grid
let rows = 17;
let columns = 17;
let cellSize = 40;

let direction = 1;

let tempX = 1;
let tempY = 1;

// the list of all squares on the grid
let cords = [];

// to know if the square on the grid has the snake on it
let used = 0;

// these are for the apple
let tempX2 = Math.floor(Math.random() * 17);
let tempY2 = Math.floor(Math.random() * 17);

let score = 0;

let currentLocation = [];

document.addEventListener("keydown", function(event) {
    if (event.key == "w") {
        direction = 0;
    }
    if (event.key == "d") {
        direction = 1;
    }
    if (event.key == "s") {
        direction = 2;
    }
    if (event.key == "a") {
        direction = 3;
    }
    console.log(direction);
});

function drawGrid() {
    // i are rows, j are columns
    ctx.strokeStyle = "black";
    for (let i = 0; i <= rows; i++) {
        for (let j = 0; j <= columns; j++) {
            let y = j * cellSize;
            let x = i * cellSize;
            ctx.strokeRect(j * cellSize, i * cellSize, cellSize, cellSize);
            cords.push({ i, j, x, y, used});
        }
    }
}

function drawSnake(x, y) {
    ctx.fillStyle = "green";
    ctx.fillRect(x, y, cellSize, cellSize)
    ctx.strokeRect(x, y, cellSize, cellSize)
}

function drawApple(x, y) {
    ctx.fillStyle = "red";
    ctx.fillRect(x, y, cellSize, cellSize)
    ctx.strokeRect(x, y, cellSize, cellSize)
}

function move() {
    if (direction == 0) {
        tempY = tempY - 1
    }
    if (direction == 1) {
        tempX = tempX + 1
    }
    if (direction == 2) {
        tempY = tempY + 1
    }
    if (direction == 3) {
        tempX = tempX - 1
    }
}

function checkIfUsed() {
    currentLocation = cords.find(l => l.j === tempY && l.i === tempX);
    currentLocation.used = 1;
    console.log(currentLocation);
}

function findPosition() {
    let currentLocation = cords.find(l => l.j === tempY && l.i === tempX);
}

// erases everything and then redraws
function execute() {
    currentLocation.used = 0;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawGrid();

    move();

    drawSnake(tempX*40, tempY*40);
    
    if (tempY == tempY2 && tempX == tempX2) {
        tempX2 = Math.floor(Math.random() * 17);
        tempY2 = Math.floor(Math.random() * 17);
        console.log("ate apple");
        score = score + 1;
    }
    
    drawApple(tempX2*40, tempY2*40);

    checkIfUsed();

    console.log("score: " + score);
}

execute();

setInterval(execute ,500)