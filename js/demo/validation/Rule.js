define(['demo/validation/ProviderFactory',
        'demo/validation/providers/AbstractProvider'
        ], function(ProviderFactory, AbstractProvider) {

  /**
    @constructor
    @description A simple Rule class/struct used internally by the ValidationManager
   */
  var Rule = function(ruleType, parameters)
  {
    this.type = ruleType;
    this.params = parameters || {};
  };

  Rule.prototype = {

    /**
      @var
      @type {String}
      */
    type: null,

    /**
      @var
      @type {Object}
      */
    params: {},

    /**
     @description Retrieves the rule provider method returns the evaluation
     @returns {function}
     */
    evaluate: function(fieldData)
    {
      // get the rule provider from the ProviderFactory
      var provider = ProviderFactory.getProvider(this.type);
      if (!provider instanceof AbstractProvider) {
        console.error('Rule#evaluate: an invalid validation type or provider is configured for the rule: ', this.type);
      }

      // pass the field data and configured rule params to the provider
      return provider.execute(fieldData, this.params);
    }

  };

  return Rule;

});