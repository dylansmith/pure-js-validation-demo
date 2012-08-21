define([], function() {

  /**
    @description An abstract class which all validation providers must implement
    */
  function AbstractProvider() {

  }

  AbstractProvider.prototype = {

    /**
      @abstract
      */
    execute: function(data, params) {
      throw "AbstractProvider#execute must be implemented by subclasses";
    }

  }

  return AbstractProvider;

});