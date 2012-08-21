define(['demo/utils'], function(utils) {

  return function()
  {
    module('utils.js');

    test('#polyfills are applied', function()
    {
      utils.polyfills();
      ok(String.prototype.hasOwnProperty('trim'), 'String#trim exists');
      equal('hello', new String('   hello   ').trim(), 'String#trim produces the correct string');
      ok(console.log, 'console.log exists');
      ok(console.info, 'console.info exists');
      ok(console.error, 'console.error exists');
    });

    test('#proxy binds the method to the correct scope', function() {
      var foo1 = {bar: true},
          foo2 = {bar: false},
          getBar = function() {
            return this.bar;
          }

      ok(utils.proxy(getBar, foo1)() === true, 'foo1.bar is true');
      ok(utils.proxy(getBar, foo2)() === false, 'foo2.bar is false');
    });

    test('#empty checks whether an object has no properties', function() {
      var foo1 = {bar: true},
          foo2 = {};

      ok(utils.empty(foo1) === false, 'foo1 is not empty');
      ok(utils.empty(foo2) === true, 'foo2 is empty');
    });

  }

});