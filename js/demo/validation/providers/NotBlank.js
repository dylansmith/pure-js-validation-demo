define(['demo/validation/providers/AbstractProvider'], function(AbstractProvider) {

  var NotBlankProvider = function() {}
  NotBlankProvider.prototype = new AbstractProvider();

  NotBlankProvider.prototype.execute = function(data, params)
  {
    return (typeof data === 'string') ? (String(data).trim().length > 0) : false;
  }

  return NotBlankProvider;

});