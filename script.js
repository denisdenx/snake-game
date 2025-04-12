// WASD управление
// если выйти за граници, то игра багнется

let canvas = document.getElementById('gridCanvas');
let ctx = canvas.getContext('2d');

let rows = 17;
let columns = 17;
let cellSize = 40;
let direction = 1;

let tempX = 1;
let tempY = 1;

let cords = [];

let tempX2 = Math.floor(Math.random() * 17);
let tempY2 = Math.floor(Math.random() * 17);

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
    ctx.strokeStyle = "black";
    for (let i = 0; i <= rows; i++) {
        for (let j = 0; j <= columns; j++) {
            let y = j * cellSize;
            let x = i * cellSize;
            ctx.strokeRect(j * cellSize, i * cellSize, cellSize, cellSize);
            cords.push({ i, j, x, y });
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

/*function myFunction(index) {
    if (index == tempX) {
        console.log(index);
    }
}*/

function execute() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    move();

    drawGrid();

    drawSnake(tempX*40, tempY*40);
    if (tempY == tempY2 && tempX == tempX2) {
        tempX2 = Math.floor(Math.random() * 17);
        tempY2 = Math.floor(Math.random() * 17);
        console.log("ate apple");
    }
    drawApple(tempX2*40, tempY2*40);
/*    cords.x.findIndex(myFunction);
    myFunction();*/
//    console.log(cords);
}

execute();

setInterval(execute ,500)