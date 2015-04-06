/* jshint esnext: true, browser: true */

class DOM {
  constructor(selector) {
    var elements = document.querySelectorAll(selector);
    this.length = elements.length;
    this._events = {};
    Object.assign(this, elements);
  }

  each(callback) {
    for ( let el of Array.from(this) ) {
      callback.call(el);
    }
    return this;
  }

  addClass(className) {
    return this.each(function() {
      this.classList.add(className);
    });
  }

  removeClass(className) {
		return this.each(function() {
			this.classList.remove(className);
		});
	}

  hasClass(className) {
		return this[0].classList.contains(className);
	}

  on(event, callback) {
    this._events[event] = this._events[event] || [];
    this._events[event].push(callback);
    return this.each(function() {
      this.addEventListener(event, callback, false);
    });
  }

  off(event, callback) {
    event = event ? event : false;
    callback = callback ? callback : false;
    return this.each(function() {
      if(event) {

      }else{
        var el = this;
        var elClone = el.cloneNode(true);
        el.parentNode.replaceChild(elClone, el);
      }
    });
  }
}

var $ = selector => new DOM(selector);

$.fn = $.prototype = DOM.prototype;
