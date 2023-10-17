class bulletball{
    constructor(game){
        this.game = game;
        this.createStartProperties();
        
    }

    createStartProperties(){
        this.image = null;
        this.isImageLoaded = false;
        this.speed = ball_speed;
        this.speedX =0;
        this.speedY =0;
        this.isMoving = false;

        this.x = bullet_ball_start_x; 
        this.y = bullet_ball_start_y;
        
        this.color = this.ramdomColor();
        this.loadImage();
    }

    loadImage(){
        this.image = new Image;
        this.image.onload =() =>{
            this.isImageLoaded = true;
        }
        this.image.src ="image/"+this.color+'.png';
    }

    ramdomColor(){
        var colors = ['do' , 'xanh' , 'vang'];
        var r = Math.round(Math.random() *2);
        return colors[r];
    }

    fire(mousePosition){
        if (this.isMoving){
            return;
        }
        var deg = Math.atan2(mousePosition.y - this.y, mousePosition.x - this.x);
        this.speedX = this.speed * Math.cos(deg);
        this.speedY = this.speed * Math.sin(deg);
        this.isMoving = true;
            
    }

    update(){

        if (this.x - ball_radius <=0 || this.x + ball_radius >= game_width){
            this.speedX = -this.speedX;
        }
        this.x += this.speedX;
        this.y += this.speedY;

        // if(this.isMoving){
        //     var bullet = this.game.physic.fireBallAll(this.game);
        //     // this.game.ballAll.push();
        // }
        

        // check over top
        if (this.y + ball_radius <=0 ){
            this.createStartProperties();
        }
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