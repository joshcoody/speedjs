'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (descriptor.value) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

/* jshint esnext: true, browser: true */

var _events = {};

var SpeedJS = (function () {
  function SpeedJS(selector) {
    _classCallCheck(this, SpeedJS);

    var typeOfSelector = selector.substr(0, 1);
    var anyBrackets = selector.indexOf('[');
    var textSelector = selector.substr(1);
    var switchResult = undefined;
    switch (typeOfSelector) {
      case '#':
        switchResult = document.getElementById(textSelector);
        switchResult = switchResult === null ? false : [switchResult];
        break;
      case '.':
        switchResult = document.getElementsByClassName(textSelector);
        break;
      default:
        if (anyBrackets > 0) {
          switchResult = document.querySelectorAll(selector);
        } else {
          switchResult = document.getElementsByTagName(selector);
        }
    }
    if (switchResult) {
      this.elements = switchResult;
      this.length = this.elements.length;
    } else {
      throw 'No elements were found.';
    }
  }

  _createClass(SpeedJS, [{
    key: 'each',
    value: function each(callback) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Array.from(this.elements)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var el = _step.value;

          callback.call(el);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
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
    key: 'first',
    value: function first() {
      this.elements = [this.elements[0]];
      return this;
    }
  }, {
    key: 'last',
    value: function last() {
      this.elements = [this.elements[this.elements.length - 1]];
      return this;
    }
  }, {
    key: 'addClass',
    value: function addClass(className) {
      return this.each(function () {
        this.classList.add(className);
      });
    }
  }, {
    key: 'removeClass',
    value: function removeClass(className) {
      return this.each(function () {
        this.classList.remove(className);
      });
    }
  }, {
    key: 'hasClass',
    value: function hasClass(className) {
      return this[0].classList.contains(className);
    }
  }, {
    key: 'on',
    value: function on(event, callback) {
      return this.each(function () {
        _events[this] = _events[this] || {};
        _events[this][event] = _events[this][event] || [];
        _events[this][event].push(callback);
        this.addEventListener(event, callback, false);
      });
    }
  }, {
    key: 'off',
    value: function off(event, callback) {
      event = event ? event : false;
      callback = callback ? callback : false;
      return this.each(function () {
        var el = this;
        if (event) {
          if (callback) {
            var index = 0;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = _events[el][event][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var func = _step2.value;

                if (String(callback) === String(func)) {
                  el.removeEventListener(event, func);
                  delete _events[el][event][index];
                }
                index++;
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                  _iterator2['return']();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }
          } else {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
              for (var _iterator3 = _events[el][event][Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var func = _step3.value;

                el.removeEventListener(event, func);
              }
            } catch (err) {
              _didIteratorError3 = true;
              _iteratorError3 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion3 && _iterator3['return']) {
                  _iterator3['return']();
                }
              } finally {
                if (_didIteratorError3) {
                  throw _iteratorError3;
                }
              }
            }

            delete _events[el][event];
            if (Object.keys(_events[el]).length === 0) {
              delete _events[el];
            }
          }
        } else {
          var elClone = el.cloneNode(true);
          el.parentNode.replaceChild(elClone, el);
          delete _events[el];
        }
      });
    }
  }, {
    key: 'trigger',
    value: function trigger(type, customData) {
      customData = customData || false;
      return this.each(function () {
        var el = this;
        var event = undefined;
        if (customData) {
          if (window.CustomEvent) {
            event = new CustomEvent(type, { detail: customData });
          } else {
            event = document.createEvent('CustomEvent');
            event.initCustomEvent(type, true, true, customData);
          }
        } else {
          event = document.createEvent('HTMLEvents');
          event.initEvent(type, true, false);
        }
        el.dispatchEvent(event);
      });
    }
  }, {
    key: 'html',
    value: function html(content) {
      content = content || false;
      if (!content) {
        return this.elements[0].innerHTML;
      } else {
        return this.each(function () {
          var el = this;
          el.innerHTML = content;
        });
      }
    }
  }, {
    key: 'text',
    value: function text(content) {
      content = content || false;
      if (!content) {
        return this.elements[0].innerText;
      } else {
        return this.each(function () {
          var el = this;
          el.innerText = content;
        });
      }
    }
  }, {
    key: 'attr',
    value: function attr(attribute, value) {
      value = value || false;
      if (value) {
        return this.each(function () {
          var el = this;
          el.setAttribute(attribute, value);
        });
      } else {
        return this.elements[0].getAttribute(attribute);
      }
    }
  }]);

  return SpeedJS;
})();

var $ = function $(selector) {
  return new SpeedJS(selector);
};

$.fn = $.prototype = SpeedJS.prototype;

var speedjs = $;