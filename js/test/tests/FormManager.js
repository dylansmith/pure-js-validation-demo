define(['demo/utils',
        'demo/FormManager',
        'demo/validation/ValidationManager',
        'demo/validation/RuleTypes'
        ], function(utils, FormManager, ValidationManager, RuleTypes) {

  return function()
  {
    module('FormManager.js');

    var htmlFormElement = $('#test-form');

    test('constructor accepts an HTMLFormElement', function()
    {
      var f = new FormManager(htmlFormElement);
      ok(f.formElement === htmlFormElement, 'the provided HTMLFormElement has been set');
    });

    test('constructor creates a validation manager', function()
    {
      var f = new FormManager();
      ok(f.validation.prototype === new ValidationManager().prototype, '.validation is a ValidationManager');
    });

    test('constructor creates independent instances', function()
    {
      var f1 = new FormManager(),
          f2 = new FormManager();

      ok(f1 !== f2, 'the 2 instances are not the same object');
      f1.attach(htmlFormElement);
      ok(f1.formElement !== null, 'f1 has an htmlFormElement');
      ok(f2.formElement === null, 'f2 does not have an htmlFormElement');
    });

    test('#attach can attach a new form element', function()
    {
      var f = new FormManager();
      ok(!f.formElement);
      f.attach(htmlFormElement);
      ok(f.formElement === htmlFormElement, 'the #attach method has set the htmlFormElement');
    });

    test('#focusField can focus a field by id', function()
    {
      var f = new FormManager(htmlFormElement),
          id = 'test-input',
          input = $('#'+'test-input');

      input.blur();
      ok(input.not(':focus'), 'the field does not have focus');
      f.focusField(id);
      // this sometimes fails in IE ... *sigh*
      ok(input.is(':focus'), 'the field has focus after #focusField is called');
    });

    test('#getField can get a field by id', function()
    {
      var el,
          f = new FormManager(htmlFormElement),
          id = 'test-input';

      el = f.getField(id);
      ok(el.id === id, 'the return element has an id that matches');
    });

    test('#getFieldValue can get a field value by id', function()
    {
      var f = new FormManager(htmlFormElement),
          id = 'test-input';

      ok(f.getFieldValue(id) !== 'foo', 'the value of the field is not "foo"');
      $('#'+id).val('foo');
      ok(f.getFieldValue(id) === 'foo', 'the value has been set to "foo"');
    });

  };

});