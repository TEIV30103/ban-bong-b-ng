class game{
    constructor(){
        this.canvas =null;
        this.context =null;
        this.init();
        this.loop();
        
    }
    init(){
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        this.canvas.width = game_width;
        this.canvas.height = game_height;
        document.body.appendChild(this.canvas);

        //create ballAll
        if (document.getElementById("doc").style.width == "70%" || document.getElementById("doc").style.width == ""){
            
            this.ballAll = new ballAll(this);
        }
        else{
            this.ballAll = new ballAllXeo(this);
        }
        // create bulletBall2
        this.bulletball2 = new bulletball2(this);

        // create bulletBall
        this.bulletball = new bulletball(this);

        //create ballDropAll
        this.ballDropAll = new ballDropAll(this);

        // create arrow
        this.arrow = new arrow(this);

        // create lineLose
        this.lineLose = new lineLose(this);

        // physic
        if(document.getElementById("doc").style.width == "70%" || document.getElementById("doc").style.width == ""){
            this.physic = new physic();
        }
        else{
            this.physic = new physicXeo();
        }

        //listen mouse event
        this.listenMouseEvent();

        // create point
        this.point =0;
    }

    getMousePosition(event){
        var rect = this.canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

    listenMouseEvent(){
        this.canvas.addEventListener('mousemove',(event) =>{
            var mousePosition = this.getMousePosition(event);
            
            // ve mui ten
            this.arrow.update(mousePosition);
        });

        this.canvas.addEventListener('click',(event) =>{
            var mousePosition = this.getMousePosition(event);
            this.bulletball.fire(mousePosition);
        });
    }

    loop(){
        this.update();
        this.draw();
        var p = document.querySelector("#p");
        p.innerText = "Điểm : "+ this.point;
        setTimeout(()=> this.loop(),20);
    }
    update(){
        this.bulletball.update();
        this.ballAll.update();
        this.ballDropAll.update();
        this.physic.fireBallAll(this);
        this.physic.dropBall(this,this.ballAll);
        this.physic.lose(this);
    }
    draw(){
        this.context.clearRect(0,0,game_width,game_height);
        this.lineLose.draw();
        this.arrow.draw();
        this.bulletball.draw();
        this.ballAll.draw();
        this.ballDropAll.draw();
    }
}
var g = new game();