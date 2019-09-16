const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 10;
const WINNING_SCORE = 3;
let pongCanvas,pongCanvasContext;
let paddle1Y = 250;
let paddle2Y = 250;

let ballX = 50;
let ballY = 50;
let ballSpeedX = 10;
let ballSpeedY = 4;
let player1Score = 0;
let player2Score = 0;
let winningPlayer;
let winScreen = false;
let up = false;
let down = false;
//let paddle2X;

function handleMouseClick(evt){
    if(winScreen){
        player2Score=0;
        player1Score=0;
        winScreen = false;
    }
}

function getMousePosition(evt){
    let mousePosition = calculateMousePosition(evt);
    paddle1Y = mousePosition.y - PADDLE_HEIGHT/2;
}


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


window.onload = function () {
  
    let framesPerSecond = 30;
    pongCanvas = document.getElementById('pongCanvas');
    pongCanvasContext = pongCanvas.getContext('2d');
    setInterval(function () {
        move();
        draw();
    }, 1000 / framesPerSecond);


    document.addEventListener('mousedown',handleMouseClick);
    document.addEventListener('mousemove', getMousePosition);
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

}
/*
function player2Movement(){
    //Inducing intelligence in computer player
    

	if((paddle2Y + PADDLE_HEIGHT/2) < ballY-35)
		paddle2Y += 5;	
	else if((paddle2Y + PADDLE_HEIGHT/2) > ballY+35)
		paddle2Y -= 5;
}
*/

function keyDownHandler(e) {
    if (e.key === "Up" || e.key === "ArrowUp") {
        up = true;
        
    } else if (e.key === "Down" || e.key === "ArrowDown") {
        down = true;
         }
}
   

function keyUpHandler(e) {
    if (e.key == "Up" || e.key == "ArrowUp") {
        up = false;
    } else if (e.key == "Down" || e.key == "ArrowDown") {
        down = false;
    }
    
}


function ballReset() {
    if(player1Score>=WINNING_SCORE){
        winningPlayer=1;
        winScreen = true;
    } 
    else if  (player2Score>=WINNING_SCORE){
        winningPlayer=2;
        winScreen = true;
    }
    ballX = pongCanvas.width / 2;
    ballY = pongCanvas.height / 2;
    ballSpeedX = -ballSpeedX;
    ballSpeedY = 4;
}

function move() {
    if(winScreen){
         return ;
    }
   // computerMovement();
   if(up && paddle2Y < pongCanvas.height-PADDLE_HEIGHT) {
    paddle2Y -= 7;
}
else if(down && paddle2Y > 0) {
    paddle2Y += 7;
}

    ballX += ballSpeedX;
    ballY += ballSpeedY;
    if (ballX < 0) {
        if (ballY >= paddle1Y && ballY <= paddle1Y + PADDLE_HEIGHT){
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



function draw() {
    
    
    pongCanvasContext.fillStyle= 'green';
    pongCanvasContext.fillRect(0, 0, pongCanvas.width, pongCanvas.height);    
  //  drawNet();
   

   pongCanvasContext.fillStyle= 'white';// this is the left paddle
   pongCanvasContext.fillRect(0,paddle1Y,PADDLE_WIDTH,PADDLE_HEIGHT);

    pongCanvasContext.fillStyle='white';// this the right paddle
    pongCanvasContext.fillRect(pongCanvas.width - PADDLE_WIDTH,paddle2Y,PADDLE_WIDTH,PADDLE_HEIGHT);
   
    // next lines draws the ball
   pongCanvasContext.fillStyle='white';
   pongCanvasContext.beginPath();
   pongCanvasContext.arc(ballX,ballY,5,0,Math.PI*2,true);
   pongCanvasContext.fill();
    //next lines display the scores
    pongCanvasContext.fillText("Score Player 1:" +player1Score,100,100);
    pongCanvasContext.fillText("Score Player 2:"+player2Score,pongCanvas.width - 200,100);
// Winning Screen displaying
    if(winScreen){
        let string= "Player "+winningPlayer+" wins!Click to play again";
        pongCanvasContext.fillStyle = 'black';
        pongCanvasContext.fillRect(0,0,pongCanvas.width,pongCanvas.height);
        pongCanvasContext.fillStyle = 'yellow';
        pongCanvasContext.fillText(string,(pongCanvas.width-120)/2,200);
    
   }

}
/*
function drawNet(){
    for(let i = 0;i<pongCanvas.height;i+=pongCanvas.height/15){
        colorRect(pongCanvas.width/2-1,i,2,20,'white');
    }
}*/