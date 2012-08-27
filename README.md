stylus-spriting
===============

Sprite generator with stylus

Instalation
-----------

	npm install stylus-spriting -g

To use you must install the dependencies.

The ```GM Library``` is the only dependence that can't be installed with a ```npm```.

### GM (Graphics Magick)

Installing a ```GM Library```.

_MAC OSX_

To install I used a [homebrew](http://mxcl.github.com/homebrew/) tool. For more instruction of installation go to [GM Site](http://www.graphicsmagick.org/).

	$ brew update
	$ brew install graphicsmagick

### Installing stylus-spriting

	$ git clone git://github.com/thepirates/stylus-spriting.git
	$ cd stylus-spriting
	$ npm install

Usage
-----

To use you need do like that:

	$ node bin/stylus-spriting --help


*Usage*: ```stylus-spriting stylus-spriting path/to/images/*.png [options]```

*Options*:

    -h, --help               output usage information
    -V, --version            output the version number
    --image <file>           Name for output image.
    --stylus <file>          Name for output stylus.
    --class-prefix <string>  Class prefix for stylus.
    --debug <boolean>        Debugger mode.