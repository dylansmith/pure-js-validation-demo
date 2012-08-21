define(['demo/utils',
        'demo/FormManager',
        'demo/validation/ValidationManager',
        'demo/validation/Rule',
        'demo/validation/RuleTypes'
        ], function(utils, FormManager, ValidationManager, Rule, RuleTypes) {

  return function()
  {
    module('validation/ValidationManager.js');

    test('constructor creates independent instances', function()
    {
      var v1 = new ValidationManager(),
          v2 = new ValidationManager();

      ok(v1 !== v2, 'the instances are not the same object');
      v1.addRule('some-field', RuleTypes.NOT_BLANK);
      ok(utils.empty(v1.rules) === false, 'v1 has had a rule added, and the #rules property is not empty');
      ok(utils.empty(v2.rules) === true, 'v2 has had no rule added, and the #rules property is empty');
    });

    test('#addRule adds a new Rule object to the rules hash', function()
    {
      var r,
          v = new ValidationManager();

      ok(utils.empty(v.rules), 'the rules object is empty');
      v.addRule('some-field', RuleTypes.NOT_BLANK, {myparam: true});
      r = v.rules['some-field'][RuleTypes.NOT_BLANK];
      ok(r.prototype === new Rule().prototype, 'the created rule is a Rule instance');
      ok(r.type = RuleTypes.NOT_BLANK, 'the rule type matches');
      ok(r.params.myparam === true, 'the provided rule params have been applied');
    });

    test('#removeRule removes a new Rule object from the rules hash', function()
    {
      var r,
          id = 'some-field',
          v = new ValidationManager();

      ok(utils.empty(v.rules), 'the rules object is empty');
      v.addRule(id, RuleTypes.NOT_BLANK, {myparam: true});
      r = v.rules[id][RuleTypes.NOT_BLANK];
      ok(r.prototype === new Rule().prototype, 'the created rule is a Rule instance');
      ok(r.type = RuleTypes.NOT_BLANK, 'the rule type matches');
      ok(r.params.myparam === true, 'the provided rule params have been applied');

      v.removeRule(id, RuleTypes.NOT_BLANK);
      ok(utils.empty(v.rules), 'after the rule is removed, the rules object is empty');
    });

    test('#evaluateRules should return errors for invalid fields', function() {
      var mock, errors,
          f = new FormManager($('#test-form')),
          v = new ValidationManager(),
          input = $('#test-input');

      mock = function() {
        return '';
      }
      f.getFieldValue = mock;
      f.setValidator(v);
      v.addRule('test-input', RuleTypes.NOT_BLANK);
      ok(input.val().length === 0, 'the field has no value and should create an error');
      errors = v.evaluateRules(f);
      ok(utils.empty(errors) === false, 'there are errors');
      ok(errors['test-input'], 'an error exists for the matched field id');
    });

  }

});