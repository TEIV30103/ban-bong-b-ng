class lineLose{
    constructor(game){
        this.game = game;
    }
    draw(){
        this.game.context.beginPath();
        this.game.context.strokeStyle ="#ff0000";
        this.game.context.lineWidth = 2;
        this.game.context.moveTo(0, ball_radius*1.45*(rowLose+2));
        this.game.context.lineTo(game_width, ball_radius*1.45*(rowLose+2));;
        this.game.context.stroke();
    }
}