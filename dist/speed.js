"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (descriptor.value) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

/* jshint esnext: true, browser: true */

var DOM = (function () {
  function DOM(selector) {
    _classCallCheck(this, DOM);

    var elements = document.querySelectorAll(selector);
    this.length = elements.length;
    this._events = {};
    Object.assign(this, elements);
  }

  _createClass(DOM, [{
    key: "each",
    value: function each(callback) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Array.from(this)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var el = _step.value;

          callback.call(el);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"]) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return this;
    }
  }, {
    key: "addClass",
    value: function addClass(className) {
      return this.each(function () {
        this.classList.add(className);
      });
    }
  }, {
    key: "removeClass",
    value: function removeClass(className) {
      return this.each(function () {
        this.classList.remove(className);
      });
    }
  }, {
    key: "hasClass",
    value: function hasClass(className) {
      return this[0].classList.contains(className);
    }
  }, {
    key: "on",
    value: function on(event, callback) {
      this._events[event] = this._events[event] || [];
      this._events[event].push(callback);
      return this.each(function () {
        this.addEventListener(event, callback, false);
      });
    }
  }, {
    key: "off",
    value: function off(event, callback) {
      event = event ? event : false;
      callback = callback ? callback : false;
      return this.each(function () {
        if (event) {} else {
          var el = this;
          var elClone = el.cloneNode(true);
          el.parentNode.replaceChild(elClone, el);
        }
      });
    }
  }]);

  return DOM;
})();

var $ = function $(selector) {
  return new DOM(selector);
};

$.fn = $.prototype = DOM.prototype;