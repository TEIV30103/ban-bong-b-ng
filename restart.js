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
    g.canvas = null;
    var can = document.querySelectorAll("canvas");
    can[can.length-1].style.display = "none";
    g.init();
});