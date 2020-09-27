window.onload= readyAndLoaded; // this will run only after the javascript is completly loaded.



// this will run only after the javascript is completly loaded.
async function readyAndLoaded (){
    // get our canvas
    var canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");


    var mysprite = new mySprite(); // must declare here, because the code will be loaded async and will be avaible for sure here( window .load )
    var mycharacter = new myCharacter();

    function loadsprite(myObject, imageFile, rows, cols, size_x, size_y, context2D){
        return  new Promise(async (resolve, reject)=>{
            myObject.loadImage(imageFile, resolve);   // mysprite object will call resolve when finished loading.
            myObject.setSpriteProps(rows,cols,size_x,size_y,context2D); // the sprite has 4 col and 6 rows. single image is 200x150. whole sprite sheet is 1207 x 605 pixel
            console.log("Loading images ..."+ imageFile); 
    })};

    console.log("Main started ...");

    async function init(){
        await loadsprite(mysprite, "./../images/explosion3.png" , 9,7,71,71,ctx);
        await loadsprite(mycharacter, "./../images/girl-sprite-2.png" , 9,6,114,114,ctx);
        console.log("init() complete.");
    }
    await init();


    //(async ()=>{ await loadsprite().then(  (values)=>{ console.log("loadsprite() returned : "+values)}   );})();
    //(async ()=>{ await loadsprite()}  )();


    console.log("Init complete. Continuing main ....");



    ptag= document.getElementById("angle-test"),
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
        //ctx= canvas.getContext("2d");
        //ctx.drawImage(mysprite.spriteImage, 150,  138, 150, 138);
        //draw();
    }
    

    document.addEventListener("mousedown", onMouseDown);

    document.addEventListener("keyup", (event)=>{
        switch (event.keyCode){
            case 32: //
                // do somethig
                mysprite.startAnimation();
                mainAnimationCycle();
                break;
            default:
                break;

        }
    });



    // ********************************************* MAIN CYCLE ****************************

    draw();

    mysprite.setXY(200,200);
    mysprite.startAnimation();
    mycharacter.setXY(500,500);
    mycharacter.dance();

    let nextFrameNeeded = false;

    mainAnimationCycle(); // call the main animation cycle

    function mainAnimationCycle(){
        ctx.clearRect(0,0,width,height);

        ctx.globalAlpha = 1;

        mysprite.tick();
        mycharacter.tick();
        nextFrameNeeded = mysprite.currentlyAnimating || mycharacter.currentlyAnimating; 

        ctx.globalAlpha = 1;

        if (nextFrameNeeded)
        requestAnimationFrame(mainAnimationCycle); // call this again for the next frame.

    }


    
    function onMouseDown(event){
        document.addEventListener("mousemove",onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
       // aimGun(event.clientX, event.clientY);

        mysprite.startAnimation();
        mycharacter.dance();

        mainAnimationCycle();
        
    }

    function onMouseMove(event){
      //  aimGun(event.clientX, event.clientY);
    }

    function onMouseUp(event){
        document.removeEventListener("mousemove",onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
 //       aimGun(event.clientX, event.clientY);
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

        //ctx.drawImage(mysprite.spriteImage, 150,  138, 150, 138);

        ctx.beginPath();
        // ctx.arc(100,100,100,0,180*Math.PI/180,true);
        ctx.arc(gun.x, gun.y, 24,0,180*Math.PI/180,true);
        ctx.fill();
        ctx.save(); //  we will rotate the canvas, let's save the current settings
        ctx.translate(gun.x, gun.y);
        ctx.rotate (gun.angle);
        ctx.fillRect(27,-8,30,16);
        ctx.restore();
        ptag.innerHTML = gun.angle.toString();

    }


} // end of window.onload