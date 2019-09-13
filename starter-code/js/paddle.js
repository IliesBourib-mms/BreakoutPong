class Paddle{

constructor(){

    this.paddleHeight = 10;
    this.paddleWidth = 80;
    this.paddleX = (canvas.width-this.paddleWidth)/2;
    this.rightPressed = false;
    this.leftPressed = false;
    this.upPressedPlayer1 = false;
    this.downPressedPlayer1 = false;
    this.upPressedPlayer2 = false;
    this.downPressedPlayer2 = false;
    
    

}
drawPaddle(){
    ctx.beginPath();
    ctx.rect(this.paddleX,canvas.height-this.paddleHeight,this.paddleWidth,this.paddleHeight);
    ctx.fillStyle = "#190707";
    ctx.fill();
    ctx.closePath();

    if(this.rightPressed) {
        this.paddleX += 7;
        if(this.paddleX+this.paddleWidth> canvas.width){
            this.paddleX = canvas.width - this.paddleWidth;
        }
    }
    else if(paddle.leftPressed){
        paddle.paddleX -= 7;
        if (paddle.paddleX <50){
            paddle.paddleX = 50;
        }
    }
}   



}