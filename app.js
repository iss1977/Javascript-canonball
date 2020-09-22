//var scriptSpriteJs ; // here we gonna store a sprite  
var assetsLoaded = 0;

window.onload= readyAndLoaded;


// this will run only after the javascript is completly loaded.
    function readyAndLoaded (){
    var mysprite = new mySprite(); // must declare here, because the code will be loaded async and will be avaible for sure here( window .load )

    function loadsprite(){
        return  new Promise(async (resolve, reject)=>{
            var a =  mysprite.loadImage("./../images/2d-animation-explosion.png");   
            console.log("End loading..."); 
            resolve("ok");
            
        
    })};

    console.log("Main function running....");

    // async function init(){
    //     await loadsprite();
    // }
    // init();

    (async ()=>{ await loadsprite();})();

    console.log("Sprite:"+mysprite.spriteImage.src);



    var canvas = document.getElementById("canvas"),
    ptag= document.getElementById("angle-test"),
    ctx = canvas.getContext("2d"),
    height = canvas.height = window.innerHeight,
    width  = canvas.width = window.innerWidth,
    gun={
        x: 100,
        y: height,
        angle : Math.PI / 4
    }

    ctx.clearRect(0,0,width,height);
    ctx.drawImage(mysprite.spriteImage, 150,  138, 150, 138);

    

    // Attaching the event listener function to window's resize event
    window.addEventListener("resize", displayWindowSize);
    function displayWindowSize(){
        height = canvas.height = window.innerHeight;
        width  = canvas.width = window.innerWidth;
        ctx.drawImage(mysprite.spriteImage, 150,  138, 150, 138);
        //draw();
    }
    return;

    draw();


    document.addEventListener("mousedown", onMouseDown);

    function onMouseDown(event){
        document.addEventListener("mousemove",onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
        aimGun(event.clientX, event.clientY);
    }

    function onMouseMove(event){
        aimGun(event.clientX, event.clientY);
    }

    function onMouseUp(event){
        document.removeEventListener("mousemove",onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        aimGun(event.clientX, event.clientY);
    }

    function aimGun(mouseX, mouseY){
        gun.angle = Math.atan2(mouseY-gun.y, mouseX-gun.x); // this angle is in radians. See formula in developer.mozilla.org
        if (gun.angle > 90* Math.PI/180) gun.angle =  90* Math.PI/180;
        if (gun.angle < -1.5) gun.angle = -1.5;
        if (gun.angle > 0) gun.angle = 0;
        
        draw();
    }

    function draw(){
        ctx.clearRect(0,0,width,height);

        ctx.drawImage(mysprite.spriteImage, 150,  138, 150, 138);

        ctx.beginPath();
        // ctx.arc(100,100,100,0,180*Math.PI/180,true);
        ctx.arc(gun.x, gun.y, 24,0,180*Math.PI/180,true);
        ctx.fill();
        ctx.save(); //  we will rotate the canvas, let's save the current settings
        ctx.translate(gun.x, gun.y);
        ctx.rotate (gun.angle);
        ctx.fillRect(27,-8,30,16);
        ctx.restore();
        ptag.innerHTML = gun.angle.toString() +"-"+ assetsLoaded.toString();

    }


} // end of window.onload