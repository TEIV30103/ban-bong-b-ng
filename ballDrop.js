class ballDrop{
    constructor(game,x,y,img){
        this.game = game;
        this.x =x;
        this.y =y;
        this.image = img;
        this.speedBall = 15;
    }
    update(){
        this.y += this.speedBall;
    }
    draw(){
        this.game.context.drawImage(
            this.image,
            this.x - ball_radius,
            this.y - ball_radius
        )
    } 
}