define(['demo/validation/providers/AbstractProvider'], function(AbtractProvider) {

  var MinLengthProvider = function() {}
  MinLengthProvider.prototype = new AbtractProvider();

  MinLengthProvider.prototype.execute = function(data, params)
  {
    if (!params.hasOwnProperty('value')) throw 'MinLengthProvider#execute requires a value parameter';
    return (typeof data === 'string') ? (String(data).trim().length >= params.value) : false;
  }

  return MinLengthProvider;

});