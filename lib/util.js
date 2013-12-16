/**
 * Slice.
 */

exports.slice = function(args) {
  return Array.prototype.slice.call(args);
};

/**
 * chai-spies
 * (c) 2012 Jake Luer <jake@alogicalparadox.com>
 * MIT
 */

exports.proxy = function(len, fn) {
  switch (len) {
    case 0 : return function () { return fn.apply(this, arguments); };
    case 1 : return function (a) { return fn.apply(this, arguments); };
    case 2 : return function (a,b) { return fn.apply(this, arguments); };
    case 3 : return function (a,b,c) { return fn.apply(this, arguments); };
    case 4 : return function (a,b,c,d) { return fn.apply(this, arguments); };
    case 5 : return function (a,b,c,d,e) { return fn.apply(this, arguments); };
    case 6 : return function (a,b,c,d,e,f) { return fn.apply(this, arguments); };
    case 7 : return function (a,b,c,d,e,f,g) { return fn.apply(this, arguments); };
    case 8 : return function (a,b,c,d,e,f,g,h) { return fn.apply(this, arguments); };
    case 9 : return function (a,b,c,d,e,f,g,h,i) { return fn.apply(this, arguments); };
    default : return function (a,b,c,d,e,f,g,h,i,j) { return fn.apply(this, arguments); };
  }
};
