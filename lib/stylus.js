
var stylus = function(images, sprite, classPrefix, callback, debug){
	var stylus = '' +
	'/*\n' +
	' * Image replacement\n' +
	' */\n\n' +
	'ir() \n' +
	'    background-color transparent\n' +
	'    border 0\n' +
	'    display block\n' +
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
	
	for(var i in images)
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
		'    background-position ' + (spriteWidth>0?'-':'') + spriteWidth + 'px 0px';

		spriteWidth += images[i].width;

		imagesSprites.push(imageSprite);
	}

	stylus += '.' + classPrefix + 'sprite\n' + imagesPrefix.join('\n') +' \n'+ 
	'    background transparent url(\''+ sprite +'\') no-repeat\n'+
	'    ir() \n\n';

	stylus += imagesSprites.join('\n\n');

	callback(null, stylus);
};

exports.build = stylus;
