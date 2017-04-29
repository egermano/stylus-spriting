// bind to change the function scope and send arguments for the functions
Function.prototype.bind = function(context) {
  var __method = this;
  var args = Array.prototype.slice.call(arguments, 1);
  return function() {
    var a = Array.prototype.concat(Array.prototype.slice.call(arguments), args);
    return __method.apply(context, Array.prototype.slice.call(a));
  }
};