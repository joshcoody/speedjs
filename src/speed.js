/* jshint esnext: true, browser: true */

const _events = {};

class SpeedJS {
  constructor(selector) {
    let typeOfSelector = selector.substr(0,1);
    let anyBrackets = selector.indexOf('[');
    let textSelector = selector.substr(1);
    let switchResult;
    switch (typeOfSelector) {
      case '#':
        switchResult = document.getElementById(textSelector);
        switchResult = switchResult === null ? false : [switchResult];
        break;
      case '.':
        switchResult = document.getElementsByClassName(textSelector);
        break;
      default:
        if(anyBrackets > 0) {
          switchResult = document.querySelectorAll(selector);
        } else {
          switchResult = document.getElementsByTagName(selector);
        }
    }
    if(switchResult) {
      this.elements = switchResult;
      this.length = this.elements.length;
    } else {
      throw 'No elements were found.';
    }
  }

  each(callback) {
    for(let el of Array.from(this.elements)) {
      callback.call(el);
    }
    return this;
  }

  first() {
    this.elements = [this.elements[0]];
    return this;
  }

  last() {
    this.elements = [this.elements[this.elements.length-1]];
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
            if(String(callback) === String(func)) {
              el.removeEventListener(event, func);
              delete _events[el][event][index];
            }
            index++;
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

  trigger(type, customData) {
    customData = customData || false;
    return this.each(function(){
      let el = this;
      let event;
      if(customData) {
        if (window.CustomEvent) {
          event = new CustomEvent(type, {detail: customData});
        } else {
          event = document.createEvent('CustomEvent');
          event.initCustomEvent(type, true, true, customData);
        }
      }else {
        event = document.createEvent('HTMLEvents');
        event.initEvent(type, true, false);
      }
      el.dispatchEvent(event);
    });
  }

  html(content) {
    content = content || false;
    if(!content) {
      return this.elements[0].innerHTML;
    } else {
      return this.each(function() {
        let el = this;
        el.innerHTML = content;
      });
    }
  }

  text(content) {
    content = content || false;
    if(!content) {
      return this.elements[0].innerText;
    } else {
      return this.each(function() {
        let el = this;
        el.innerText = content;
      });
    }
  }

  attr(attribute, value) {
    value = value || false;
    if(value) {
      return this.each(function() {
        let el = this;
        el.setAttribute(attribute, value);
      });
    } else {
      return this.elements[0].getAttribute(attribute);
    }
  }

}

const $ = selector => new SpeedJS(selector);

$.fn = $.prototype = SpeedJS.prototype;

const speedjs = $;
