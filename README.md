stylus-spriting
===============

Sprite generator with stylus

Instalation
-----------

This tool isn't a final version or a released version, so isn't avaliable in ```npm``` repo. But, to use you must install the dependencies.

The only dependence i cannot install with a npm is the GM ```C``` library.

### Dependencies

**GM (Graphics Magick)**

_MAC OSX_

To install i used a (homebrew)[http://mxcl.github.com/homebrew/] tool. For more install instruction go to (GM Site)[http://www.graphicsmagick.org/].

	brew update
	brew install graphicsmagick


  *Usage*: ```stylus-spriting stylus-spriting path/to/images/*.png [options]```

  *Options*:

    -h, --help               output usage information
    -V, --version            output the version number
    --image <file>           Name for output image.
    --stylus <file>          Name for output stylus.
    --class-prefix <string>  Class prefix for stylus.
    --debug <boolean>        Debugger mode.