class ballAllXeo{
    constructor(game){
        this.game = game;
        this.y = 0;
        this.balls = [];
        this.speedBalls = 0.2;
        this.numBallBullet =0;
        this.i = 0;
    }

    numRow(){
        // var n =0;
        // for (var i =0;i<this.balls.length;i++){
        //     if (this.balls[i][1] != undefined){
        //         n++;
        //     }
        // }
        // return n;
        return this.balls.length - this.numBallBullet;
    }

    haveToCreateNewRow(){
        return (this.y +30 > ((this.numRow())*row_height));
    }

    setSpeedBall(speed){
        for (var i in this.balls){
            for (var j in this.balls[i]){
                this.balls[i][j].speedBall =speed;
            }
        }
    }

    createNewRow(){
        var row = this.numRow();
        // console.log(row , this.numBallBullet);
        var rowBalls = [];
        if (this.i %2 ==0){
            for (var col=0;col<19;col+=2){
                var newBall = new ball(this.game,row,col);
                rowBalls.push(newBall);
            }
            this.i++;
        }
        else{
            for (var col =1;col <19;col+=2){
                var newBall = new ball(this.game,row,col);
                rowBalls.push(newBall);
            }
            this.i++;
        }
        
        this.balls.push(rowBalls);
    }

    countRow(){
        var count = 0;
        var arr = [];
        this.balls.forEach((line)=>{
            line.forEach((ball) =>{
                var y = ball.row;
                var val =  arr.find( (element) =>{
                    return element == y;
                })
                if (val == undefined){
                    count ++;
                    arr.push(y);
                }
            })
        })
        return count;
    }

    findBall(row , col){
        for (var i in this.balls){
            for (var j in this.balls[i]){
                if (this.balls[i][j].row == row && 
                    this.balls[i][j].col == col
                ){
                    return {
                        row: row,
                        col: col,
                        rowArray :i,
                        colArray :j,
                        color :this.balls[i][j].color
                    }
                }
            }
        }
        return undefined;
    }

    largestRow(){
        var largestRow =  0;
        for (var i of this.balls){
            for (var j of i){
                if (largestRow < j.row){
                    largestRow = j.row;
                }
            }
        }
        return largestRow;
    }

    update(){
        this.y += this.speedBalls;
        if (this.haveToCreateNewRow()){
            this.createNewRow();
        }
        this.balls.forEach( (line)=>{
            // line.forEach( (ball) =>{
            //     ball.update();
            // });
            Array.prototype.forEach.call(line , ball => {
                ball.update();
            })
        })      
    }

    draw(){
        // this.game.context.beginPath();
        // this.game.context.strokeStyle ="#ff0000";
        // this.game.context.lineWidth = 2;
        // this.game.context.moveTo(0, this.y);
        // this.game.context.lineTo(game_width, this.y);;
        // this.game.context.stroke();


        this.balls.forEach( (line)=>{
            // line.forEach( (ball) =>{
            //     ball.draw();
            // });
            Array.prototype.forEach.call(line , ball => {
                ball.draw();
            })
        })
    }
}