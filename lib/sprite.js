var gm = require('gm'),
	pathlib = require('path'),
	fs = require("fs");

require('./bind');

function Sprite(images, imgOutput, stylusOutput, classPrefix, debug){

	this.imageFiles = [];

	for(i in images){
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
    	image: false,
    	stylus: false
    }
};

Sprite.prototype.done = function(){
	if(this.defaults.complete.image && this.defaults.complete.stylus)
	{
		console.log('[stylus-spriting] - All done!');
	}	
}

Sprite.prototype.images = {
	setSize: function(images, callback){

		var i = 0,
			run = function(){
				gm(images[i].path).size(function(err, value){
					images[i].width = value.width;
					images[i].height = value.height;
				
					i++;

					if(i==images.length)
						callback(images);
					else
						run();
				});
			};
		run();
	}
};

Sprite.prototype.stylus = {
	build: function(images, sprite, classPrefix, callback, debug){
		var stylus = '' +
		'/*\n' +
		' * Image replacement\n' +
		' */\n\n' +
		'ir() \n' +
		'    background-color transparent\n' +
		'    border 0\n' +
		'    overflow hidden\n' +
		'    /* IE 6/7 fallback */\n' +
		'    *text-indent -9999px\n' +
		'    &:before \n' +
		'        content ""\n' +
		'        display block\n' +
		'        width 0\n' +
		'        height 100%\n\n';

		if(debug)
			console.log('[stylus-spriting] - Debug - Start build a stylus.');

		var spriteWidth = 0,
			imagesPrefix = [],
			imagesSprites = [];
		
		for(i in images)
		{
			if(debug)
				console.log('[stylus-spriting] - Debug - Process stylus for image: #' + i + ' ' + images[i].path + ' ' + images[i].width + 'x' + images[i].height + '.');

			var imageName = (images[i].path.split('/')[images[i].path.split('/').length-1]).split('.');
			imageName.pop();
			imageName = imageName.join('.');
			imageName = imageName.replace(/\s/g, '-');

			var imagePrefix = '.' + classPrefix + imageName;
			imagesPrefix.push(imagePrefix);

			var imageSprite = imagePrefix + '\n' +
			'    width ' + images[i].width + 'px\n' +
			'    height ' + images[i].height + 'px\n' +
			'    background-position top ' + (spriteWidth>0?'-':'') + spriteWidth + 'px';

			spriteWidth += images[i].width;

			imagesSprites.push(imageSprite);
		}

		stylus += '.' + classPrefix + 'sprite\n' + imagesPrefix.join('\n') +' \n'+ 
		'	 display block\n' + 
		'    background transparent url(\''+ sprite +'\') no-repeat\n'+
		'    ir() \n\n';

		stylus += imagesSprites.join('\n\n');

		callback(null, stylus);
	}
};

Sprite.prototype.process = function(){
	
	console.log('[stylus-spriting] - Processing...');

	this.images.setSize(this.imageFiles, function(){

		this.stylus.build(this.imageFiles, this.imgOutput, this.classPrefix, function(err, stylus){

			if(this.debug)
				console.log('[stylus-spriting] - Debug - Write stylus ' + this.stylusOutput + '.');

			fs.writeFile(this.stylusOutput, stylus, function(err) {
			    console.log('[stylus-spriting] - Write stylus Done!');
			    this.defaults.complete.stylus = true;

			    this.done();
			}.bind(this));

		}.bind(this), this.debug);

	}.bind(this));

	if(this.debug)
		console.log('[stylus-spriting] - Debug - Start a process images.');

	this.images.setSize(this.imageFiles, function(){
		for(i in this.imageFiles){
			this.defaults.width += this.imageFiles[i].width; 
			this.defaults.height = this.imageFiles[i].height>this.defaults.height?this.imageFiles[i].height:this.defaults.height; 
		}

		if(this.debug)
			console.log('[stylus-spriting] - Debug - Sprite image size ' + this.defaults.width + 'x' + this.defaults.height + '.');

		var sprite = gm('');
		// sprite.resize(this.defaults.width, this.defaults.height);
		sprite.tile(this.imageFiles.length+'x1');
		sprite.quality('100');
		sprite.background('transparent');

		for(i in this.imageFiles){
			if(this.debug)
				console.log('[stylus-spriting] - Debug - Process image: #' + i + ' ' + this.imageFiles[i].path + ' ' + this.imageFiles[i].width + 'x' + this.imageFiles[i].height + '.');

			sprite.geometry('+0+0 ', '');
			sprite.gravity('NorthEast');
			sprite._out.push(this.imageFiles[i].path);
		}

		sprite.subCommand('montage');

		if(this.debug)
			console.log('[stylus-spriting] - Debug - Write image ' + this.imgOutput + '.');

		sprite.write(this.imgOutput, function(err, stdout, stderr, command){
			console.log('[stylus-spriting] - Write image Done!');
			this.defaults.complete.image = true;

			this.done();
		}.bind(this));
	}.bind(this));
}



exports.sprite = Sprite;