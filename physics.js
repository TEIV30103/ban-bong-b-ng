class physic{

    collision(ball1 , ball2){// va cham
        return this.distance(ball1,ball2) <= (ball_radius *2);
    }

    distance(ball1 , ball2){ // khoang cach
        return Math.sqrt(
            Math.pow(ball1.x - ball2.x,2) + 
            Math.pow(ball1.y - ball2.y,2)
            );
    }

    // Kiem tra o do co bong hay chua



    // dính vào ballAll 
    fireBallAll(game){
        var bullet = game.bulletball;
        var ballAll =game.ballAll.balls;
        var ballBullet =null;
        var col,row;
        Array.prototype.forEach.call(ballAll , balls => {
            Array.prototype.forEach.call(balls , ball2 => {
                if(this.collision(bullet,ball2)){
                    col = (ball2.x - ball_radius) / (ball_radius *2);
                    row = Math.round( (game.ballAll.y - ball2.y) / row_height) -1;
                    if (bullet.x < ball2.x + ball_radius && bullet.y <= ball2.y+18){
                        col --;
                        row ++;
                    }else{
                        if (bullet.x > ball2.x + ball_radius && bullet.y <= ball2.y+18){
                            col ++;
                            row ++;
                        }
                    }
                    ballBullet = new ball(game,row,col);
                    ballBullet.color = game.bulletball.color;
                    ballBullet.image.src = "image/"+ballBullet.color+'.png';
                    game.bulletball.y=-99;

                    var ballArr = [];
                    ballArr.push(ballBullet);
                    // console.log(ballArr);
                    game.ballAll.balls.push(ballArr);
                    // console.log(game.ballAll.balls);
                    game.ballAll.numBallBullet++;
                    this.eatBall(game,ballBullet);
                    return true;
                }
            })
        })
    }


    // thanh thua
    lose(game){
        if(game.ballAll.countRow() == rowLose){
            document.getElementById("restart").style.display ="block";
            game.ballAll.speedBalls = 0;
            game.ball.speedBall = 0;
        }
    }

    //an bong
    eatBall(game,ballBullet){
        var row = ballBullet.row;
        var col = ballBullet.col;
        var color = ballBullet.color;

        var arr = []; // mang chu x y cua so bong cg mau
        var ballFind = game.ballAll.findBall(row,col);
        arr.push(ballFind);
        // game.ballAll.balls[ballFind.row].splice(ballFind.col,1);
        // console.log(ballFind);

        this.checkAround(game,row,col,color,arr);
        if(arr.length>=3){
            arr.forEach((Element) =>{
                game.ballAll.balls[Element.rowArray][Element.colArray].image.src = "image/no.png";
            })
            setTimeout(() => {
                arr.forEach( (Element) =>{
                    game.ballAll.balls[Element.rowArray].splice(Element.colArray,1);
                    this.updateArray(arr,Element.rowArray,Element.colArray);
                    game.point++;
                }) 
            }, 100);
        }
    }


    checkAround(game,row,col,color,arr){
        // dau tien la check tren -> duoi -> phai -> trai
        this.checkUp(game,row,col,color,arr);
        this.checkDown(game,row,col,color,arr);
        this.checkRight(game,row,col,color,arr);
        this.checkLeft(game,row,col,color,arr);
    }

    //checkUp
    checkUp(game,row,col,color,arr){
        var ball = game.ballAll.findBall(row+1, col);      
        if (ball != undefined){
            if (ball.color == color){
                var value ={
                    rowArray: ball.rowArray,
                    colArray: ball.colArray,
                    color: ball.color
                };
                if (this.checkArray(arr,value) == false){
                    // console.log(arr);
                    arr.push(value);
                    this.checkAround(game,row+1,col,color,arr);
                }
                
                
            }
        }
    }

    //checkDown
    checkDown(game,row,col,color,arr){
        var ball = game.ballAll.findBall(row-1, col);
        if (ball != undefined){
            if (ball.color == color){
                var value ={
                    rowArray: ball.rowArray,
                    colArray: ball.colArray,
                    color: ball.color
                };
                if (this.checkArray(arr,value) == false){
                    arr.push(value);
                    this.checkAround(game,row-1,col,color,arr);
                }
                
            }
        }
    }

    //checkRight
    checkRight(game,row,col,color,arr){
        var ball = game.ballAll.findBall(row, col +1);
        if (ball != undefined){
            if (ball.color == color){
                var value ={
                    rowArray: ball.rowArray,
                    colArray: ball.colArray,
                    color: ball.color
                };
                if (this.checkArray(arr,value) == false){
                    arr.push(value);
                    this.checkAround(game,row,col+1,color,arr);
                }
            }
        }
    }

    //checkLeft
    checkLeft(game,row,col,color,arr){
        var ball = game.ballAll.findBall(row, col -1);
        if (ball != undefined){
            if (ball.color == color){
                var value ={
                    rowArray: ball.rowArray,
                    colArray: ball.colArray,
                    color: ball.color
                };
                if (this.checkArray(arr,value) == false){
                    arr.push(value);
                    this.checkAround(game,row,col-1,color,arr);
                }
                
            }
        }
    }


    //checkArray
    checkArray(arr , e){
        for (var i of arr){
            if (i.rowArray == e.rowArray && i.colArray == e.colArray){
                return true;
            }
        }
        return false;
    }

    updateArray(arr , row , col){
        arr.forEach( (e)=>{
            if (e.rowArray == row){
                if (e.colArray > col){
                    e.colArray --;
                }
            }
        })
    }

    // rot bong
    dropBall(game,ballAll){
        // dau tien tao ra 1 cai arr chua may ball da xet r thi ko can xet nua
        var arr = [];
        // cach xet thi xet trai roi sang phai coi thu co cai nao co ball o tren ko 
        // neu co thi thoi 
        // ko thi cho no rot xuong
        for (var i in ballAll.balls){
            for (var j in ballAll.balls[i]){
                var ball = ballAll.balls[i][j];
                // console.log(ball.row , largestRow());
                if (ball.row < ballAll.largestRow()){
                    if (!this.dropBall_checkTop(ballAll,ball)){
                        if (!this.dropBall_checkLeft(ballAll,ball)){
                            if (!this.dropBall_checkRight(ballAll,ball)){
                                var newBallDrop = new ballDrop(game,ball.x,ball.y,ball.image);
                                game.ballDropAll.balls.push(newBallDrop);
                                ballAll.balls[i].splice(j,1);
                                this.point++;
                            }
                        }
                    }
                }
            }
        }
    }

    dropBall_checkTop(ballAll,ball){
        var ballFind =  ballAll.findBall(ball.row+1,ball.col);
        if (ballFind == undefined){
            return false;
        }
        return true;
    }

    dropBall_checkLeft(ballAll,ball){
        var ballFind =  ballAll.findBall(ball.row,ball.col-1);
        if (ballFind == undefined){
            return false;
        }
        else{
            if (ballAll.findBall(ballFind.row+1,ballFind.col) != undefined){
                return true;
            }
            else{
                return this.dropBall_checkLeft(ballAll,ballFind);
            }
        }
    }

    dropBall_checkRight(ballAll,ball){
        var ballFind =  ballAll.findBall(ball.row,ball.col+1);
        if (ballFind == undefined){
            return false;
        }
        else{
            if (ballAll.findBall(ballFind.row+1,ballFind.col) != undefined){
                return true;
            }
            else{
                return this.dropBall_checkRight(ballAll,ballFind);
            }
        }
    }


}