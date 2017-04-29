require('./bind');

var gm = require('gm');
var stylus = require('./stylus');
var images = require('./image').images;
var fs = require("fs");

function Sprite(images, imgOutput, stylusOutput, classPrefix, debug){

    this.imageFiles = [];

    for(var i in images){
        this.imageFiles.push({
            path: images[i]
        });
    }

    this.imgOutput = imgOutput;
    this.stylusOutput = stylusOutput;
    this.classPrefix = classPrefix;
    this.debug = debug;
}

Sprite.prototype.defaults = {
    width:  0,
    height: 0,
    complete: {
        image : false,
        stylus : false
    }
};

Sprite.prototype.done = function(){
    if(this.defaults.complete.image && this.defaults.complete.stylus)
    {
        console.log('[stylus-spriting] - All done!');
    }   
};

Sprite.prototype.process = function(){
    
    console.log('[stylus-spriting] - Processing...');

    images.setSize(this.imageFiles, () => {

        stylus.build(this.imageFiles, this.imgOutput, this.classPrefix, (err, stylus) => {

            if(this.debug)
                console.log('[stylus-spriting] - Debug - Write stylus ' + this.stylusOutput + '.');

            fs.writeFile(this.stylusOutput, stylus, err => {
                console.log('[stylus-spriting] - Write stylus Done!');
                this.defaults.complete.stylus = true;

                this.done();
            });

        }, this.debug);

    });

    if(this.debug)
        console.log('[stylus-spriting] - Debug - Start a process images.');

    images.setSize(this.imageFiles, () => {
        for(var i in this.imageFiles){
            this.defaults.width += this.imageFiles[i].width; 
            this.defaults.height = this.imageFiles[i].height>this.defaults.height?this.imageFiles[i].height:this.defaults.height; 
        }

        if(this.debug)
            console.log('[stylus-spriting] - Debug - Sprite image size ' + this.defaults.width + 'x' + this.defaults.height + '.');

        images.mergeImages(this.imageFiles, this.imgOutput, (err, complete) => {
            this.defaults.complete.image = complete;
            this.done();
        });

    });
};

exports.sprite = Sprite;