let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let score = 0;
let lives = 3;
let paddle = new Paddle();

let ball = new Ball(canvas, paddle);
let bricksObject = new Bricks(ball);



function drawScore() {

    ctx.font = "16px Arial";
    ctx.fillStyle = '#0095dd';
    ctx.fillText("Score: " + score, 8, 20);
}

function drawLives() {
    ctx.font = "16 px Arial";
    ctx.fillStyle = '0095dd';
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
 document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        paddle.rightPressed = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        paddle.leftPressed = true;
    }
}
   

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        paddle.rightPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        paddle.leftPressed = false;
    }
    else if (e.key == "Up" || e.key == "ArrowUp"){
        pongPlayer1.upPressedPlayer1 = false;
    }
    else if (e.key == "Down" || e.key == "ArrowDown" ){
        pongPlayer1.downPressedPlayer1 = false;
    }
}

function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddle.paddleX = relativeX - paddle.paddleWidth / 2;
    }

}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.drawBall();
    paddle.drawPaddle();
    bricksObject.drawBricks();
    bricksObject.collisionDetection();
    drawScore();
    drawLives();
    ball.x += ball.dx;
    ball.y += ball.dy;
    requestAnimationFrame(draw);
}
draw();

// let audioPlayer ;
/*
function play(){
     audioPlayer = document.getElementById("audioPlayer");

     audioPlayer.volume = 0.5;
     audioPlayer.play();
}*/