define(['demo/validation/providers/AbstractProvider',
        'demo/validation/providers/NotBlank',
        'demo/validation/providers/MinLength'
        ], function(AbstractProvider, NotBlank, MinLength) {

  return function()
  {
    module('validation/providers');

    test('NotBlank is a valid provider', function()
    {
      var p = new NotBlank();
      ok(p instanceof AbstractProvider, 'NotBlank extends AbstractProvider');
      ok(typeof p.execute === 'function');
    })

    test('NotBlank correctly evaluates strings', function()
    {
      var i,
          p = new NotBlank(),
          bad = ['', ' ', null, undefined],
          good = ['hello', 'here are some words'];

      i = bad.length;
      while (i--) {
        ok(p.execute(bad[i]) === false, '"' + bad[i] + '" does not validate');
      }

      i = good.length;
      while (i--) {
        ok(p.execute(good[i]) === true, '"' + good[i] + '" does validate');
      }
    });

    test('MinLength is a valid provider', function()
    {
      var p = new MinLength();
      ok(p instanceof AbstractProvider, 'MinLength extends AbstractProvider');
      ok(typeof p.execute === 'function');
    })

    test('MinLength correctly evaluates strings', function()
    {
      var i,
          p = new MinLength(),
          params = {value: 4},
          bad = ['1', '12', '123'],
          good = ['1234', '12345'];

      i = bad.length;
      while (i--) {
        ok(p.execute(bad[i], params) === false, 'length of "' + bad[i] + '" is less than ' + params.value);
      }

      i = good.length;
      while (i--) {
        ok(p.execute(good[i], params) === true, 'length of "' + good[i] + '" is at least ' + params.value);
      }
    });

  }

});