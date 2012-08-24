

var args = process.argv.slice(2),
	sprite = require('../lib/sprite').sprite;

var imgPath = args[0],
	imgOutput = args[1]?args[1]:"sprite.png",
	stylusOutput = args[2]?args[2]:"sprite.styl";

new sprite(imgPath, imgOutput, stylusOutput).teste();