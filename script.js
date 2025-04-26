// WASD управление

let scoreText = document.getElementById('scoreT');

let canvas = document.getElementById('gridCanvas');
let ctx = canvas.getContext('2d');

let canvas2 = document.getElementById("pointsCanvas");
let ctx2 = canvas2.getContext("2d");

// for drawing the grid
let rows = 17;
let columns = 17;
let cellSize = 40;

let direction = 1;

let tempX = 1;
let tempY = 1;

let ateApple = 0;

// the list of all squares on the grid
let cords = [];

// keep track of the snake
let tail = [];

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

/*function checkIfUsed() {
    currentLocation = cords.find(l => l.j === tempY && l.i === tempX);

    currentLocation.used = score + 3

    console.log(currentLocation);

    for (let i = 0; i < cords.length; i++) {
        if (cords[i].used > 0) {
          console.log(cords[i]);
          
          ctx.fillStyle = "green";
          ctx.fillRect(cords[i].x, cords[i].y, cellSize, cellSize)
          ctx.strokeRect(cords[i].x, cords[i].y, cellSize, cellSize)
        }
    }

    for (let i = 0; i < cords.length; i++) {
        if (cords[i].used > 0) {
            cords[i].used = cords[i].used - 1;
        }
    }
}*/

function checkIfUsed() {
    for (let i = 0; i < tail.length; i++) {
        if (tail.includes(tail[i].tempY === tempY && tail[i].tempX === tempX) === true) {
            console.log("you lost");
        }
    }
    tail.push({tempX, tempY, sc: 0});
    tail[tail.length-1].sc += score+3;
    if (ateApple === 1) {
        for(let i = 0; i < tail.length; i++) {
            tail[i].sc = tail[i].sc + 1;
        }
    }

    for (let i = 0; i < tail.length; i++) {
        if (tail[i].sc > 0) {
            tail[i].sc = tail[i].sc - 1;
        }
        if (tail[i].sc === 0) {
            tail.splice(i, 1);
            i--;
        }
    }

    for (let i = 0; i < tail.length; i++) {

        ctx.fillStyle = "green";
        ctx.fillRect(tail[i].tempX*40, tail[i].tempY*40, cellSize, cellSize)
        ctx.strokeRect(tail[i].tempX*40, tail[i].tempY*40, cellSize, cellSize)
    }
    console.log(tail);
}

function findPosition() {
    let currentLocation = cords.find(l => l.j === tempY && l.i === tempX);
}

function showPointsImage() {
    ctx2.lineWidth = 5; // Set the thickness
    ctx2.fillStyle = "red";
    ctx2.fillRect(0, 0, 60, 60)
    ctx2.strokeRect(0, 0, 60, 60)
}

function showPoints(){
    scoreText.innerHTML = score;
}

// erases everything and then redraws
function execute() {
    ateApple = 0;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

    drawGrid();

    move();

    drawApple(tempX2*40, tempY2*40);
    
    if (tempY == tempY2 && tempX == tempX2) {
        tempX2 = Math.floor(Math.random() * 17);
        tempY2 = Math.floor(Math.random() * 17);
        console.log("ate apple");
        score = score + 1;
        ateApple = 1;
    }
    checkIfUsed();

    showPoints();

    console.log("score: " + score);
}

showPointsImage();
execute();

setInterval(execute ,500)
