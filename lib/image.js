var gm = require('gm');

var images = {
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
	},
	mergeImages: function(images, imgOutput, callback, debug){
		var sprite = gm('');
		// sprite.resize(this.defaults.width, this.defaults.height);
		sprite.tile(images.length+'x1');
		sprite.quality('100');
		sprite.background('transparent');

		for(var i in images){
			if(debug)
				console.log('[stylus-spriting] - Debug - Process image: #' + i + ' ' + images[i].path + ' ' + images[i].width + 'x' + images[i].height + '.');

			sprite.geometry('+0+0 ', '');
			sprite.gravity('NorthEast');
			sprite._out.push(images[i].path);
		}

		sprite.subCommand('montage');

		if(debug)
			console.log('[stylus-spriting] - Debug - Write image ' + imgOutput + '.');

		sprite.write(imgOutput, function(err, stdout, stderr, command){
			console.log('[stylus-spriting] - Write image Done!');
			callback(null, true);
		});
	}
};

exports.images = images;