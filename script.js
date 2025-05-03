// WASD управление

let scoreText = document.getElementById('scoreT');

let canvas = document.getElementById('gridCanvas');
let ctx = canvas.getContext('2d');

let canvas2 = document.getElementById("pointsCanvas");
let ctx2 = canvas2.getContext("2d");

// for drawing the grid
let rows = 17
let columns = 17
let cellSize = 40

let direction = 1
let tempDirection = 1

let tempX = 1
let tempY = 1

let ateApple = 0

let lost = 0

// keep track of the snake
let tail = []

// these are for the apple
let tempX2 = Math.floor(Math.random() * 17);
let tempY2 = Math.floor(Math.random() * 17);

let score = 0

document.addEventListener("keydown", function(event) {
    if (event.key === "w" || event.key == "W") {
        direction = 0
    }
    if (event.key === "d" || event.key == "D") {
        direction = 1
    }
    if (event.key === "s" || event.key == "S") {
        direction = 2
    }
    if (event.key === "a" || event.key == "A") {
        direction = 3
    }
});

function drawGrid() {
    // i are rows, j are columns
    ctx.strokeStyle = "black";
    for (let i = 0; i <= rows; i++) {
        for (let j = 0; j <= columns; j++) {
            let y = j * cellSize
            let x = i * cellSize
            ctx.strokeRect(j * cellSize, i * cellSize, cellSize, cellSize);
        }
    }
}

function drawApple(x, y) {
    ctx.fillStyle = "red"
    ctx.fillRect(x, y, cellSize, cellSize)
    ctx.strokeRect(x, y, cellSize, cellSize)
}

function move() {
    if (tempDirection - 2 !== direction && tempDirection + 2 !== direction) {
        if (direction === 0) {
            tempY = tempY - 1
            tempDirection = direction
        }
        if (direction === 1) {
            tempX = tempX + 1
            tempDirection = direction
        }
        if (direction === 2) {
            tempY = tempY + 1
            tempDirection = direction
        }
        if (direction === 3) {
            tempX = tempX - 1
            tempDirection = direction
        }   
    } else {
        direction = tempDirection
        if (direction === 0) {
            tempY = tempY - 1
        }
        if (direction === 1) {
            tempX = tempX + 1
        }
        if (direction === 2) {
            tempY = tempY + 1
        }
        if (direction === 3) {
            tempX = tempX - 1
        }
    }
}

function checkIfUsed() {
    if (ateApple === 1) {
        for(let i = 0; i < tail.length; i++) {
            tail[i].sc = tail[i].sc + 1
        }
    }

    for (let i = 0; i < tail.length; i++) {
        if (tail[i].sc > 0) {
            tail[i].sc = tail[i].sc - 1
        }
        if (tail[i].sc === 0) {
            tail.splice(i, 1);
            i--
        }
    }

    if (tail.some(obj => obj.x === tempX && obj.y === tempY)) {
        lost = 1
    }

    tail.push({x: tempX, y: tempY, sc: 0});

    tail[tail.length-1].sc = score+3

    for (let i = 0; i < tail.length; i++) {
        ctx.fillStyle = "green"
        ctx.fillRect(tail[i].x*cellSize, tail[i].y*cellSize, cellSize, cellSize)
        ctx.strokeRect(tail[i].x*cellSize, tail[i].y*cellSize, cellSize, cellSize)
    }
}

function showPointsImage() {
    ctx2.lineWidth = 5
    ctx2.fillStyle = "red"
    ctx2.fillRect(0, 0, 60, 60)
    ctx2.strokeRect(0, 0, 60, 60)
}

function showPoints() {
    scoreText.innerHTML = score
}

function appleEaten() {
    if (tempY === tempY2 && tempX === tempX2) {
        tempX2 = Math.floor(Math.random() * rows);
        tempY2 = Math.floor(Math.random() * columns);
        while (tail.some(obj => obj.x === tempX2 && obj.y === tempY2)) {
            tempX2 = Math.floor(Math.random() * rows);
            tempY2 = Math.floor(Math.random() * columns);
        }
        console.log("ate apple");
        score = score + 1
        ateApple = 1
    }
}

function checkOutOfBounds() {
    if (tempX < 0 || tempX >= rows || tempY < 0 || tempY >= columns) {
        lost = 1
    }
    if (lost === 1) {
        console.log("you lost");
    }
}

if (lost === 0) {
    ateApple = 0

    move();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    appleEaten();

    drawGrid();

    drawApple(tempX2*cellSize, tempY2*cellSize);
    
    checkIfUsed();

    showPoints();
}
// erases everything and then redraws
function execute() {
    if (lost === 0) {
        ateApple = 0
    
        move();
    
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        appleEaten();
    
        drawGrid();
    
        drawApple(tempX2*cellSize, tempY2*cellSize);
        
        checkIfUsed();

        checkOutOfBounds();
    
        showPoints();
    }
}

showPointsImage();
execute();


setInterval(execute ,250)

