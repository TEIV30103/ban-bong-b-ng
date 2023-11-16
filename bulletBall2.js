class bulletball2{
    constructor(game){
        this.game = game;
        this.createStartProperties();
    }

    createStartProperties(){
        this.image = null;
        this.isImageLoaded = false;

        this.x = bullet_ball_start_x +130; 
        this.y = bullet_ball_start_y;
        this.color = this.randomColor();
        this.loadImage();
    }

    loadImage(){
        this.image = new Image;
        this.image.onload =() =>{
            this.isImageLoaded = true;
        }
        this.image.src ="image/"+this.color+'.png';
    }

    randomColor(){ 
        var colors = ['do' , 'xanh' , 'vang'];
        var r = Math.round(Math.random() *2);
        return colors[r];
    }

    update(){
        this.createStartProperties();
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