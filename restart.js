var img = document.getElementById("img");

img.addEventListener('click',()=>{
    location.replace(location.href);
});



// đổi chế độ
var btl = document.getElementById("btl");
btl.addEventListener('click',()=>{
    if (document.getElementById("doc").style.width == "70%" || document.getElementById("doc").style.width ==""){
        document.getElementById("doc").style.width = "30%";
        document.getElementById("xeo").style.width = "70%";
        document.getElementById("chedo").style.left = "30px";
        document.getElementById("chedo").style.right = "60px";
    }
    else{
        document.getElementById("doc").style.width = "70%";
        document.getElementById("xeo").style.width = "30%";
        document.getElementById("chedo").style.left = "-30px";
        document.getElementById("chedo").style.right = "0";
    }
    document.getElementById("play").style.display="none";
    document.getElementById("imgPause").style.display="block";
    g.canvas = null;
    var can = document.querySelectorAll("canvas");
    can[can.length-1].style.display = "none";
    g.init();
});


var arrows = document.getElementById("arrows");
arrows.addEventListener('click', ()=>{
    let cl = g.bulletball.color;
    g.bulletball.color = g.bulletball2.color;
    g.bulletball2.color = cl;

    g.bulletball.loadImage();
    g.bulletball2.loadImage();

})

document.getElementById("imgPause").addEventListener('click',()=>{
    g.ballAll.speedBalls = 0;
    g.ballAll.setSpeedBall(0);
    g.bulletball.pause = true;
    document.getElementById("play").style.display="block";
    document.getElementById("imgPause").style.display="none";
})

document.getElementById("imgPlay").addEventListener('click',()=>{
    g.ballAll.speedBalls = 0.2;
    g.ballAll.setSpeedBall(0.2);
    g.bulletball.pause = false;
    document.getElementById("play").style.display="none";
    document.getElementById("imgPause").style.display="block";
})

document.getElementById("imgRePlay").addEventListener('click',()=>{
    var can = document.querySelectorAll("canvas");
    can[can.length-1].style.display = "none";
    g.init();
    document.getElementById("play").style.display="none";
    document.getElementById("imgPause").style.display="block";
})