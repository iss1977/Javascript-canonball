class mySprite {
    x = 0;
    y = 0;
    spriteImage = null; // here we gonna store the image after loading


    log(text) {
        console.log(text);
    }

    loadImage(url) {
        // Create an image object. This is not attached to the DOM and is not part of the page.
        
        var image = new Image();
        this.spriteImage = image;
        console.log("Image file "+image.src+" loaded succesfully");
        // Now set the source of the image that we want to load
        // image.src = url;
        setTimeout(()=>{image.src = url},3000);
    }
    

}