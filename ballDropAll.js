class ballDropAll{
    constructor(game){
        this.game = game;
        this.balls = [];
    }

    update(){
        for (var i in this.balls){
            this.balls[i].update();
            if (this.balls[i].y > game_height){
                this.balls.splice(i,1);
            }
        }
    }
    
    draw(){
        this.balls.forEach( (ball) => {
            ball.draw();
        })
    }
}