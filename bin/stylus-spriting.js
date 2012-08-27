#!/usr/bin/env node

var program = require('commander'),
    args = process.argv.slice(2),
    sprite = require('../lib/sprite').sprite;

program
    .version('0.0.4')
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
        
        var imgOutput = program.image?program.image:"sprite.png",
            stylusOutput = program.stylus?program.stylus:"sprite.styl",
            debug = program.debug?program.debug==='true'?true:false:false,
            classPrefix = program.classPrefix?program.classPrefix:'sprite-';

        if(debug)
            console.log('[stylus-spriting] - Start process in Debugger mode.');
        else
            console.log('[stylus-spriting] - Start process.');

        new sprite(images, imgOutput, stylusOutput, classPrefix, debug).process();
    });


program.parse(process.argv);