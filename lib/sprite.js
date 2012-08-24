var gm = require('gm'),
	pathlib = require('path'),
	fs = require("fs");

function Sprite(imgPath, imgOutput, stylusOutput){
	console.log(imgPath, imgOutput, stylusOutput);

	this.imgPath = imgPath;
	this.imgOutput = imgOutput;
	this.stylusOutput = stylusOutput;
}

Sprite.prototype.teste = function(){
	console.log(this);
}

Sprite.prototype.defaults = {
    width:  0,
    height: 0
};


exports.sprite = Sprite;