'use strict';

if (!Object.keys) {
  Object.keys = (function () {
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
        dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'],
        dontEnumsLength = dontEnums.length;

    return function (obj) {
      if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
        throw new TypeError('Object.keys called on non-object');
      }

      var result = [],
          prop,
          i;

      for (prop in obj) {
        if (hasOwnProperty.call(obj, prop)) {
          result.push(prop);
        }
      }

      if (hasDontEnumBug) {
        for (i = 0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) {
            result.push(dontEnums[i]);
          }
        }
      }
      return result;
    };
  })();
}

// modified from https://github.com/es-shims/es6-shim
var canBeObject = function canBeObject(obj) {
  return typeof obj !== 'undefined' && obj !== null;
};

var assignShim = function assign(target, source1) {
  if (!canBeObject(target)) {
    throw new TypeError('target must be an object');
  }
  var objTarget = Object(target);
  var s, source, i, props;
  for (s = 1; s < arguments.length; ++s) {
    source = Object(arguments[s]);
    props = Object.keys(source);
    for (i = 0; i < props.length; ++i) {
      objTarget[props[i]] = source[props[i]];
    }
  }
  return objTarget;
};

assignShim.shim = function shimObjectAssign() {
  if (!Object.assign) {
    Object.assign = assignShim;
  }
  return Object.assign || assignShim;
};

assignShim.shim();