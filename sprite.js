class mySprite {
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
            id: "attack",
            Sequence: [1, 2, 3,4, 1, 13, 14, 15]

        },
        {
            id: "dance",
            Sequence: [9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9]
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