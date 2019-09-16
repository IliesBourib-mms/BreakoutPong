class Ball {

    constructor(canvas, paddle) {
        this.lives = lives;
        this.canvas = canvas;
        this.paddle = paddle;
        this.ballRadius = 5;
        this.x = this.canvas.width / 2;
        this.y = this.canvas.height - 30;
        this.dx = 2;
        this.dy = -3;
    }

    drawBall() {

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        ctx.closePath();



        if (this.x + this.dx > this.canvas.width - this.ballRadius || this.x + this.dx < this.ballRadius) {
            this.dx = -this.dx;
        }
        if (this.y + this.dy < this.ballRadius) {
            this.dy = -this.dy;

        } else if (this.y + this.dy > this.canvas.height - this.ballRadius) {
            if (this.x > this.paddle.paddleX && this.x < this.paddle.paddleX + this.paddle.paddleWidth) {
                this.dy = -this.dy;
            } else {
                lives--;
                if (!lives) {
                    alert("Game Over");
                    document.location.reload();
                } else {
                //    alert("You died");
                    this.paddle.drawPaddle();
                    this.x = canvas.width/2;
                    this.dx = 3;
                    this.dy = -3;
                }
            }
        }

    }

}