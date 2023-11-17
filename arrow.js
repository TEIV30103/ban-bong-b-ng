class arrow{
    constructor(game){
        this.game = game;
        this.mousePosition = null;

    }

    update(newMousePosition){
        this.mousePosition = newMousePosition;
    }

    draw(){
        if (this.mousePosition == null){
            return;
        }
        this.game.context.beginPath();
        this.game.context.strokeStyle ="#ffff00";
        this.game.context.lineWidth = 2;
        this.game.context.moveTo(bullet_ball_start_x, bullet_ball_start_y);
        this.game.context.lineTo(this.mousePosition.x, this.mousePosition.y);
        this.game.context.stroke();
        
        let deg = Math.atan2(this.mousePosition.y - bullet_ball_start_y , this.mousePosition.x - bullet_ball_start_x);
        document.getElementById("imgKP").style.transform = "rotate("+(deg-90-0.1)*3.14*20+"deg)";
    }
}