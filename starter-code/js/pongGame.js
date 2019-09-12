const PADDLE_HEIGHT = 100;
const WINNING_SCORE = 3;
const PADDLE_THICKNESS = 10;
let paddle1Y = 250;
let paddle2Y = 250;
let pongCanvas;
let pongCanvasContext;
let ballX = 50;
let ballSpeedX = 10;
let ballY = 50;
let ballSpeedY = 4;
let player1Score = 0;
let player2Score = 0;
let paddle2X;
let winScreen = false;

function calculateMousePosition(evt) {
    let rect = pongCanvas.getBoundingClientRect();
    let root = document.documentElement;
    let mouseX = evt.clientx - rect.left - root.scrollLeft;
    let mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    };
}
function handleMouseClick(evt){
    if(winScreen){
        player2Score=0;
        player1Score=0;
        winScreen = false
    }
}

window.onload = function () {
    pongCanvas = document.getElementById('pongGame');
    pongCanvasContext = pongCanvas.getContext('2d');
    let framesPerSecond = 30;
    setInterval(function () {
        move();
        draw();
    }, 1000 / framesPerSecond);
    pongCanvas.addEventListener('mousedown',handleMouseClick)
    pongCanvas.addEventListener('mousemove', function (evt) {
        let mousePos = calculateMousePosition(evt);
        paddle1Y = mousePos.y - (PADDLE_HEIGHT / 2);
    });
}


function ballReset() {
    if(player1Score>=WINNING_SCORE || player2Score>=WINNING_SCORE){
        
        winScreen = true;
    }
    ballSpeedY = 4;
    ballSpeedX = -ballSpeedX;
    ballX = pongCanvas.width / 2;
    ballY = pongCanvas.height / 2;

}

function move() {
    if(winScreen){
         return ;
    }
    
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    if (ballX < 0) {
        if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT){
            ballSpeedX = -ballSpeedX;
            let deltaY = ballY - (paddle1Y+PADDLE_HEIGHT/2);
            ballSpeedY = deltaY*0.35;
        }
            else {
            
            player2Score++;
            ballReset();
            
           
        }
    }

    if (ballX > pongCanvas.width) {
        if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT){
            ballSpeedX = -ballSpeedX;
            let deltaY = ballY - (paddle2Y+PADDLE_HEIGHT/2);
            ballSpeedY = deltaY*0.35;

        }
            else {
            player1Score++;
            ballReset();
        }
        

    }


    if (ballY > pongCanvas.height) {
        ballSpeedY = -ballSpeedY;
    }
    if (ballY < 0) {
        ballSpeedY = -ballSpeedY;
    }
}

function drawNet(){
    for(let i = 0;i<pongCanvas.height;i+=pongCanvas.height/15){
        colorRect(pongCanvas.width/2-1,i,2,20,'white');
    }
}

function draw() {
  
    // next line draws the canvas
    pongCanvasContext.fillRect(0, 0, pongCanvas.width, pongCanvas.height);    // this is the left paddle
    if(winScreen){
        pongCanvasContext.fillStyle = 'white';
        if(player1Score>=WINNING_SCORE){
        pongCanvasContext.fillText("Left Player won!!! Click to play again" ,350,200);
    }   else if (player2Score>=WINNING_SCORE){
        pongCanvasContext.fillText("Right Player won!!! Click to play again" ,350,200);


    }
        return ;
   }
   drawNet();
    colorRect(0, paddle1Y, 10, PADDLE_HEIGHT, 'white');
// this the right paddle
    colorRect(pongCanvas.width -PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
    // next line draws the ball
    colorCircle(ballX, ballY, 10, 'white');

    pongCanvasContext.fillText("Score Player 1:" +player1Score,100,100);
    pongCanvasContext.fillText("Score Player 2:"+player2Score,pongCanvas.width - 200,100);



}

function colorCircle(centerX, centerY, radius, drawColor) {
    pongCanvasContext.fillStyle = drawColor;
    pongCanvasContext.beginPath();
    pongCanvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2);
    pongCanvasContext.fill();
}

function colorRect(leftX, topY, width, height, drawColor) {
    pongCanvasContext.fillStyle = drawColor;
    pongCanvasContext.fillRect(leftX, topY, width, height);
}