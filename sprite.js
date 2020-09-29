class MyExplosion {
    x = 0;
    y = 0;
    sprite_rows = 0; // size of sprite ... starting from 1 ... 
    sprite_cols = 0;
    spriteImage = null; // here we gonna store the image after loading
    image_width = 0;
    image_height = 0;
    readyToUse = false; // extra safety if not loaded ...
    ctx = null; // this will be the content where we output our image. See setSpriteProps
    // this variables are needed for the order of images in animation ...
    currentAnimationSlide = 0; // will be sprite_rows x sprite_cols Slides ....
    currentlyAnimating = false; // will be true if the sprite is animating...
    lastFrameAtMillies = 0; // will store last animation milliseconds since 1970 ...
    animateEveryThisManyMilliseconds = 30;




    mySprite() { // constructor

    }


    setXY(x, y) { // set the position  of the sprite
        this.x = x;
        this.y = y;
    }

    log(text) {
        console.log(text);
    }

    loadImage(url, callback) {
        // Create an image object. This is not attached to the DOM and is not part of the page.
        // callback is the result of the Promise who calls this.

        var image = new Image();
        this.spriteImage = image;
        this.spriteImage.onload = () => {
            this.readyToUse = true;
            console.log(this.spriteImage.src + " loaded succesfully.");
            callback("Done.")
        };
        // Now set the source of the image that we want to load
        image.src = url; // here starts the loading ....
    }

    setSpriteProps(rows, cols, image_width, image_height, ctx) { // after we load the image, tell the object how big is the original image....
        this.sprite_rows = rows;
        this.sprite_cols = cols;
        this.image_width = image_width;
        this.image_height = image_height;
        this.ctx = ctx; // the 2d content to draw to ....
    }

    putSlideOnCanvas(slide) { // slides start with 1 to ... rows-1 x cols-1.
        let row = Math.floor((slide - 1) / (this.sprite_cols)); // from 0 to this.cols-1
        let col = slide - 1 - row * (this.sprite_cols); // from 0 to this.rows-1
        //console.log("Draw ctx !!! Slide:" + slide + "R:" + row + " C:" + col);
        this.ctx.drawImage(this.spriteImage, // witch image
            col * this.image_width, row * this.image_height, //start clip from this point
            this.image_width, this.image_height, // take so much ...
            this.x - this.image_width / 2, // put the image in the center of this.x and this.y
            this.y - this.image_height / 2,
            this.image_width, this.image_height); // the size of the output
    }

    tick() {
        let millis = (new Date()).getTime(); // get millies since 1970 ... will do an animation only after each this.animateEveryThisManyMilliseconds
        if (millis > this.lastFrameAtMillies + this.animateEveryThisManyMilliseconds) {
            this.lastFrameAtMillies = millis;

            if (this.currentlyAnimating) {
                this.currentAnimationSlide++;
                if (this.currentAnimationSlide > this.sprite_rows * this.sprite_cols) {
                    this.currentAnimationSlide = 0;
                    this.currentlyAnimating = false;
                }

                if (this.currentlyAnimating) this.putSlideOnCanvas(this.currentAnimationSlide); // wenn noch immer animation ... then draw it !
            }
        } else if (this.currentlyAnimating) this.putSlideOnCanvas(this.currentAnimationSlide); // wenn noch immer animation ... then draw it !
    }

    startAnimation() {
        this.currentlyAnimating = true;
    }

}

// ------------------------------------------------------------------------------------------------------------------------------------------------------------

class myCharacter {
    x = 0;
    y = 0;
    acceleration_X = 0;

    sprite_rows = 0; // size of sprite ... starting from 1 ... 
    sprite_cols = 0;
    spriteImage = null; // here we gonna store the image after loading
    image_width = 0;
    image_height = 0;
    readyToUse = false; // extra safety if not loaded ...
    ctx = null; // this will be the content where we output our image. See setSpriteProps
    // this variables are needed for the order of images in animation ...
    currentAnimationSlide = 0; // will be sprite_rows x sprite_cols Slides ....
    currentlyAnimating = false; // will be true if the sprite is animating...
    lastFrameAtMillies = 0; // will store last animation milliseconds since 1970 ...
    animateEveryThisManyMilliseconds = 30;

    currentAmimationID = ""; // will be attack, dance ...


    animations = [{
            id: "toLeft",
            row : 2,
            Sequence: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 9, 8, 7, 6, 5, 4]

        },
        {
            id: "explode",
            row: 1,
            Sequence: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
        }
    ];



    myCharacter() { // constructor

    }


    setXY(x, y) { // set the position  of the sprite
        this.x = x;
        this.y = y;
    }


    loadImage(url, callback) {
        // Create an image object. This is not attached to the DOM and is not part of the page.
        // callback is the result of the Promise who calls this.

        var image = new Image();
        this.spriteImage = image;
        this.spriteImage.onload = () => {
            this.readyToUse = true;
            console.log(this.spriteImage.src + " loaded succesfully.");
            callback("Done.")
        };
        // Now set the source of the image that we want to load
        image.src = url; // here starts the loading ....
    }

    setSpriteProps(rows, cols, image_width, image_height, ctx) { // after we load the image, tell the object how big is the original image....
        this.sprite_rows = rows;
        this.sprite_cols = cols;
        this.image_width = image_width;
        this.image_height = image_height;
        this.ctx = ctx; // the 2d content to draw to ....
    }

    putSlideOnCanvas(slide, flipVertically) { // slides start with 1 to ... rows-1 x cols-1.
        let row = Math.floor((slide - 1) / (this.sprite_cols)); // from 0 to this.cols-1
        let col = slide - 1 - row * (this.sprite_cols); // from 0 to this.rows-1

        this.ctx.save();
        if (flipVertically) {
            this.ctx.translate(width, 0);
            this.ctx.scale(-1, 1);
        }
        // console.log("Draw ctx !!! Slide:" + slide + "R:" + row + " C:" + col);
        this.ctx.drawImage(this.spriteImage, // witch image
            col * this.image_width, row * this.image_height, //start clip from this point
            this.image_width, this.image_height, // take so much ...
            this.x - this.image_width / 2, // put the image in the center of this.x and this.y
            this.y - this.image_height / 2,
            this.image_width, this.image_height); // the size of the output

        this.ctx.restore();
    }




    tick() {

        let current_animations_index = -1;
        for (let i = 0; i <= this.animations.length - 1; i++) {
            if (this.animations[i].id == this.currentAmimationID) current_animations_index = i; // found the current animation.
        }
            if (current_animations_index > -1) { // we found the animation index.

                let millis = (new Date()).getTime(); // get millies since 1970 ... will do an animation only after each this.animateEveryThisManyMilliseconds
                if (millis > this.lastFrameAtMillies + this.animateEveryThisManyMilliseconds) {
                    this.lastFrameAtMillies = millis;

                    let lenght_Sequence = this.animations[current_animations_index].Sequence.length;
                    this.currentAnimationSlide++;
                    if (this.currentAnimationSlide > lenght_Sequence) {
                        this.currentAnimationSlide = lenght_Sequence;
                        this.currentlyAnimating = true;
                    }

                    this.putSlideOnCanvas(this.animations[current_animations_index].Sequence[this.currentAnimationSlide]);

                } else {
                    if (this.currentlyAnimating) this.putSlideOnCanvas(this.animations[current_animations_index].Sequence[this.currentAnimationSlide]);
                }
            }
        
    }// end of tick()

        startAnimation() {
           

        }


        dance() {
            this.currentAnimationSlide = 0; // will be sprite_rows x sprite_cols Slides ....
            this.currentlyAnimating = true; // will be true if the sprite is animating...
            this.lastFrameAtMillies = 0; // will store last animation milliseconds since 1970 ...
            this.animateEveryThisManyMilliseconds = 60;

            this.currentAmimationID = "dance"; // will be attack, dance ...
        }

        attackAnimationToLeft() {

        }

    } // End of class character

class MySprite{
    x=0; // this is the position of the sprite.
    y=0;
    acceleration = 0 ; //this will be used when we move our character left or right.
    readyToUse = false ; // will be true after we load the sprite.
    spriteImage = null; // here we gonna store our animation image.
    sprite_rows =   0 ; // here we store the number of tiles in our sprite sheet, so we can extract the pictures later. Will be configured by setSpriteProps() 
    sprite_cols = 0;
    needsNextFrame=false; // here we store true if the sprite needs an new animation frame.
    currentAnimation = ""; // will be ex "toLeft" or "explode" ...
    currentAnimationRow = -1; // will be the row number in animations[].... 
    currentAnimationSequence = 0 ; // will be the current animation sequence. is the "index" of sequence [] in "explode"
    animationActiv = false ; // if this is false, the sprite will not be shown.
    lastAnimationMillies = -1; // the last animation was at this milliseconds
    minimumMilliesBetweenAnimations = 20; // 30ms


    animations = [{
            id: "toLeft",
            row : 2,
            repeat : true ,
            sequence: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 9, 8, 7, 6, 5, 4]

        },
        {
            id: "chill",
            row : 1,
            repeat : true ,
            sequence: [1, 2, 3, 4, 5, 4, 3, 2 ]

        },
        {
            id: "explode",
            row: 0,
            repeat:false,
            sequence: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
        }
    ];




    tick(){ // this will be called by each animation frame. Will render the current animation sequence on ctx

        if (this.currentAnimation=="") return; // if there is nothing to animate, then return

        // we are searching the animations[] to find our animation sequence.
        this.currentAnimationRow = -1;
        this.animations.forEach((arrayElement, index)=>{

            if (arrayElement.id == this.currentAnimation) {
                this.currentAnimationRow = index;
                console.log("Found,. index:"+index);
            }
        }) ;

        if(this.currentAnimationRow == -1){
            console.log("Error - animation row not found."); // if we don't return we get an error. This should never happen. Will cause programm error also.
            debugger;
        return;
        } 



        // if the tick is called before 30ms passes, it will render the last image again and return.
        let millies = new Date().getTime();
        if (millies > this.lastAnimationMillies + this.minimumMilliesBetweenAnimations){ // if true, enough millies passed, we can render a new frame
            this.lastAnimationMillies = millies;
        } else { // not enought time has passed to put a new image, we repeat the last image...
            console.log("repeating last animation ... millies not over 50 ...."+ this.currentAnimationRow);
            this.putSlideOnCanvas(this.animations[this.currentAnimationRow].row, this.animations[this.currentAnimationRow].sequence[ this.currentAnimationSequence], this.animations[this.currentAnimationRow].flipIfTrue );
            return; // just render and return.
        }

        

        


        //this.currentAnimationRow = 2 ; // delete this later. this is the explosion

        if (this.currentAnimation=""){ // if we don't find any current animations, then set to chill
            this.currentAnimation = "chill";
            this.currentAnimationSequence = 0;
          // this.tick(); // call the tick again to display the changes.
        }

        // when we arrive here, we have the animation[currentAnimationSequence] = we know where to iterate.
        //console.log(this.currentAnimationSequence+","+this.animations[this.currentAnimationSequence].sequence.length);

        let indexOFLastFrame = this.animations[this.currentAnimationRow].sequence.length -1;
        if  (indexOFLastFrame < this.currentAnimationSequence){ // we passed the last sprite image from the sequeunce.
            // we must now decide if we restart the animation or end it.
            console.log("reset");
            if (this.animations[this.currentAnimationRow].repeat){
                this.currentAnimationSequence = 0
                this.animationActiv = true; // must not be set true, it is true ... but better 2x than 0x ....
            } else { // if we don't repeat it, we stop the animation.
                this.currentAnimationSequence = 0
                this.animationActiv = false; // if the sequence should not repeat itself
                this.currentAnimation="";
                this.currentAnimationRow = -1;
            }
        } else { // we are in the 

        }

        let currentAnimationColumnIndex = this.animations[this.currentAnimationRow].sequence[this.currentAnimationSequence];
        this.currentAnimationSequence
        // everything is set for rendering.
        // putSlideOnCanvas (row, slide,flip)

        this.putSlideOnCanvas(this.animations[this.currentAnimationRow].row, currentAnimationColumnIndex, this.animations[this.currentAnimationRow].flipIfTrue );

        if  (indexOFLastFrame>=this.currentAnimationSequence) // check again if we can increase the sprite index for the next animation ...
        this.currentAnimationSequence++;



    } 


    setPosition(x,y){
        this.x = x;
        this.y = y;
    }
    moveToLeft(){}
    moveToRight(){}
    shoot(){}

    explode(){ // start the explosion animation
        this.animationActiv = true;
        this.currentAnimation = "explode"; // set the current animation sequence to explosion
        this.currentAnimationSequence = 0; // will start with the first frame
        this.acceleration = 0; // cancel any posible accelerations
        this.tick();

    }

    loadImage(url, callback) {
        // Create an image object. This is not attached to the DOM and is not part of the page.
        // callback is the result of the Promise who calls this.

        var image = new Image();
        this.spriteImage = image;
        this.spriteImage.onload = () => {
            this.readyToUse = true;
            console.log(this.spriteImage.src + " loaded succesfully.");
            callback("Done.")
        };
        // Now set the source of the image that we want to load
        image.src = url; // here starts the loading ....
    } // end of loadImage(url, callback)

    setSpriteProps(rows, cols, image_width, image_height, ctx) { // after we load the image, tell the object how big is the original image....
        this.sprite_rows = rows; // must setup this once for the loaded image so we can extract the pictures later.
        this.sprite_cols = cols; // --//--
        this.image_width = image_width; // this is the size of one sprite image in the raster....
        this.image_height = image_height; // this is the size of one sprite image in the raster....
        this.ctx = ctx; // the 2d content to draw to ....
    } // end of setSpriteProps(rows, cols, image_width, image_height, ctx) 


    putSlideOnCanvas(row, col , flipVertically) { // slides start with 1 to ... rows-1 x cols-1.
        if (!this.animationActiv) return; // if there is no active animation, then do nothing.

        this.ctx.save();

        if (flipVertically) {
            this.ctx.translate(width, 0);
            this.ctx.scale(-1, 1);
        }
        // console.log("Draw ctx !!! Slide:" + slide + "R:" + row + " C:" + col);
        this.ctx.drawImage(this.spriteImage, // witch image
            col * this.image_width, row * this.image_height, //start clip from this point
            this.image_width, this.image_height, // take so much ...
            this.x - this.image_width / 2, // put the image in the center of this.x and this.y
            this.y - this.image_height / 2,
            this.image_width, this.image_height); // the size of the output

        this.ctx.restore();
    }


}