class ball{
    constructor(game,row,col){
        this.game = game;
        this.row = row;
        this.col = col;

        this.x =0;
        this.y =0;
        this.speedBall = 0.2;
        this.image = null;
        this.isImageLoaded = false;
        this.color = this.randomColor();
        this.loadImage();
        
        this.calculatePosition();
    }

    calculatePosition(){
        if (document.getElementById("doc").style.width == "70%" || document.getElementById("doc").style.width == ""){
            this.x = ball_radius * 2 * this.col + ball_radius;
        }
        else{
            this.x = ball_radius_Xeo * 2 * this.col + ball_radius; 
        }
        this.y = this.game.ballAll.y - ( row_height * this.row);
    }

    randomColor(){
        var colors = ['do' , 'xanh' , 'vang'];
        var r = Math.round(Math.random() *2);
        return colors[r];
    }

    loadImage(){
        this.image = new Image;
        this.image.onload =() =>{
            this.isImageLoaded = true;
        }
        this.image.src ="image/"+this.color+'.png';
    }

    update(){
        this.y += this.speedBall;
    }

    draw(){
        if (! this.isImageLoaded){
            return;
        }
        this.game.context.drawImage(
            this.image,
            this.x - ball_radius,
            this.y - ball_radius
        )
    }   
}