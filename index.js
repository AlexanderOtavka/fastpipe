'use strict';

var through = require('through');
var duplexer = require('duplexer');

function fastpipe() {
  return _wrap(through());
}

function _wrap(stream) {
  let oldPipe = stream.pipe;
  stream.pipe = function pipe(dest, opts) {
    oldPipe.call(stream, dest, opts);
    return _wrap(duplexer(stream, dest));
  };

  return stream;
}

module.exports = fastpipe;
