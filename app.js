window.onload = function(){
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

    // Attaching the event listener function to window's resize event
    window.addEventListener("resize", displayWindowSize);
    function displayWindowSize(){
        height = canvas.height = window.innerHeight;
        width  = canvas.width = window.innerWidth;
        draw();
    }

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