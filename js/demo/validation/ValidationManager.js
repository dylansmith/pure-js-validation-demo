define(['demo/validation/Rule', 'demo/utils'], function(Rule, utils) {

  /**
    @constructor
    @description ValidationManager manages a set of rules for each fieldId
      and can evaluate all via the bulk #evaluateRules method. It collates
      a hashmap of errors that are passed back to the FormManager, where they
      can be used to update the UI.
    */
  var ValidationManager = function() {
    this.rules = {};
  };

  ValidationManager.prototype = {

    /**
      @var
      @type {Object}
      */
    rules: {},

    /**
      @description Adds a rule for a given fieldId
      @param {String} fieldId
      @param {String} ruleType
      @param {Object} params
      */
    addRule: function(fieldId, ruleType, params)
    {
      if (!this.rules[fieldId]) this.rules[fieldId] = {};

      // ensures only 1 of each rule type can be assigned per field
      this.rules[fieldId][ruleType] = new Rule(ruleType, params);
    },

    /**
      @description Removes a rule for a given fieldId and ruleType
      @param {String} fieldId
      @param {String} ruleType
      */
    removeRule: function(fieldId, ruleType)
    {
      try {
        delete this.rules[fieldId][ruleType];
        // clear out the field entry if no more rules exist
        if (utils.empty(this.rules[fieldId])) {
          delete this.rules[fieldId];
        }
      }
      catch (e) {
        console.error('ValidationManager#removeRule: field or rule type not found');
      }
    },

    /**
      @description Bulk evaluates all rules
      @param {FormManager} formManager
      @returns {Object}
      */
    evaluateRules: function(formManager)
    {
      var fieldId,
          ruleType,
          rule,
          value,
          errors = {};

      for (fieldId in this.rules)
      {
        for (ruleType in this.rules[fieldId])
        {
          rule = this.rules[fieldId][ruleType];
          value = formManager.getFieldValue(fieldId);
          if (!rule.evaluate(value))
          {
            errors[fieldId] = errors[fieldId] || [];
            errors[fieldId][rule.type] = rule.params.message || 'Value is not valid';
          }

        }
      }

      return errors;
    }

  };

  return ValidationManager;

});