/* jshint esnext: true, browser: true */

var _events = {};

class SpeedJS {
  constructor(selector) {
    this._elements = document.querySelectorAll(selector);
    this.length = this._elements.length;
    //Object.assign(this, elements);
  }

  each(callback) {
    for(let el of Array.from(this._elements)) {
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
    return this.each(function() {
      _events[this] = _events[this] || {};
      _events[this][event] = _events[this][event] || [];
      _events[this][event].push(callback);
      this.addEventListener(event, callback, false);
    });
  }

  off(event, callback) {
    event = event ? event : false;
    callback = callback ? callback : false;
    return this.each(function() {
      let el = this;
      if(event) {
        if(callback) {
          let index = 0;
          for(let func of _events[el][event]) {
            console.log(index);
            if(String(callback) === String(func)) {
              el.removeEventListener(event, func);
              delete _events[el][event][index];
            }
            index++;
            console.log(index);
          }
        }else{
          for(let func of _events[el][event]) {
            el.removeEventListener(event, func);
          }
          delete _events[el][event];
          if(Object.keys(_events[el]).length === 0) {
            delete _events[el];
          }
        }
      }else{
        let elClone = el.cloneNode(true);
        el.parentNode.replaceChild(elClone, el);
        delete _events[el];
      }
    });
  }
  
}

var $ = selector => new SpeedJS(selector);

$.fn = $.prototype = SpeedJS.prototype;
