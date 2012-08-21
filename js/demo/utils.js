define([], function() {

  /**
   @description Utility methods
   */
  return {

    polyfills: function()
    {
      // add String.trim for IE
      if (!String.prototype.hasOwnProperty('trim')) {
        String.prototype.trim = function() {
          return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        };
      }

      // add console for IE
      if (typeof console === 'undefined') {
        console = {
          log: alert,
          info: alert,
          error: alert
        };
      }
    },

    /**
     @description Cross-browser event binding helper
     @param {HTMLElement} targetElement
     @param {string} eventName
     @param {function} handler
     */
    bind: function(targetElement, eventName, handler, scopeContext) {
      if (targetElement.attachEvent) {
        targetElement.attachEvent('on'+eventName, this.proxy(handler, scopeContext));
      }
      else if (targetElement.addEventListener) {
        targetElement.addEventListener(eventName, this.proxy(handler, scopeContext));
      }
    },

    /**
     @description Cross-browser event binding helper
     @param {HTMLElement} targetElement
     @param {string} eventName
     @param {function} handler
     */
    unbind: function(targetElement, eventName, handler, scopeContext) {
      if (targetElement.detachEvent) {
        targetElement.detachEvent('on'+eventName, this.proxy(handler, scopeContext));
      }
      else if (targetElement.removeEventListener) {
        targetElement.removeEventListener(eventName, this.proxy(handler, scopeContext));
      }
    },

    /**
     @description Simple scope proxy
     @returns {function}
     */
    proxy: function(fn, context) {
      if (!context) return fn;
      return function() {
        return fn.apply(context, arguments);
      };
    },

    /**
     @description Determines whether an obj/hashmap is empty
     @returns {Boolean}
     */
    empty: function(obj) {
      var p;
      for (p in obj) {
        if (obj.hasOwnProperty(p)) return false;
      }
      return true;
    }

  };

});