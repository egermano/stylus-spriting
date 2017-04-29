#!/usr/bin/env node

var program = require('commander');
var args = process.argv.slice(2);
var sprite = require('../lib/sprite').sprite;

program
    .version('0.0.5')
    .usage('path/to/images/*.png [options]')
    .option('--image <file>', 'Name for output image.')
    .option('--stylus <file>', 'Name for output stylus.')
    .option('--class-prefix <string>', 'Class prefix for stylus.')
    .option('--debug <boolean>', 'Debugger mode.');

program
    .command('*')
    .action(function(){
    var images = Array.prototype.slice.call(arguments, 0);
    images.pop();

    var imgOutput = program.image?program.image:"sprite.png";
    var stylusOutput = program.stylus?program.stylus:"sprite.styl";
    var debug = program.debug?program.debug==='true'?true:false:false;
    var classPrefix = program.classPrefix?program.classPrefix:'sprite-';

    if(debug)
        console.log('[stylus-spriting] - Start process in Debugger mode.');
    else
        console.log('[stylus-spriting] - Start process.');

    new sprite(images, imgOutput, stylusOutput, classPrefix, debug).process();
});


program.parse(process.argv);