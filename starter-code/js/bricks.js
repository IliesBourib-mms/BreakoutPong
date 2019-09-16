class Bricks {
    constructor(ball) {
        this.brickRowCount = 5;
        this.brickColumnCount = 20;
        this.brickWidth = 15;
        this.brickHeight = 10;
        this.brickPadding = 20;
        this.brickOffsetTop = 50;
        this.brickOffsetLeft = 50;
        this.bricks = [];
        
        for (let columns = 0; columns < this.brickColumnCount; columns++) {
            this.bricks[columns] = [];
            for (let rows = 0; rows < this.brickRowCount; rows++) {
                this.bricks[columns][rows] = {
                    x: 0,
                    y: 0,
                    status: 1
                };
            }
        }
        this.ball = ball;
    }


        
    drawBricks() {

        
        for (let columns = 0; columns < this.brickColumnCount; columns++) {
            for (let rows = 0; rows < this.brickRowCount; rows++) {

                let brickX = (columns * (this.brickWidth + this.brickPadding)) + this.brickOffsetLeft;
                let brickY = (rows * (this.brickHeight + this.brickPadding)) + this.brickOffsetTop;
                this.bricks[columns][rows].x = brickX;
                this.bricks[columns][rows].y = brickY;
                let status = this.bricks[columns][rows].status;


                if(status===1){
                ctx.beginPath();
                ctx.rect(brickX, brickY, this.brickWidth, this.brickHeight);
                ctx.fillStyle = "#8A4B08";
                ctx.fill();
                ctx.closePath();

                if(status === 1){
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, this.brickWidth, this.brickHeight);
                    ctx.fillStyle = "#8A4B08";
                    ctx.fill();
                    ctx.closePath();
                }
                


                }
           }
        }
    }
    collisionDetection() {
        for (let columns = 0; columns < bricksObject.brickColumnCount; columns++) {
            for (let rows = 0; rows < bricksObject.brickRowCount; rows++) {
                //console.log(columns+" "+rows);
                let brick = this.bricks[columns][rows];
                if (brick.status === 1) {
                    if (this.ball.x > brick.x &&
                        this.ball.x < brick.x + this.brickWidth &&
                        this.ball.y > brick.y &&
                        this.ball.y < brick.y + this.brickHeight) {
                        ball.dy = -ball.dy;
                        brick.status = 0;
                        this.bricks[columns][rows].status = 0;
                        

                        score++;
                        if (score === this.brickColumnCount * this.brickRowCount) {
                            alert("You have won!");
                            document.location.reload;
                        }
                    }
                }
            }
        }
    }
}