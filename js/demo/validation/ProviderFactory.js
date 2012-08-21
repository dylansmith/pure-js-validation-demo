define(['demo/validation/RuleTypes',
        'demo/validation/providers/NotBlank',
        'demo/validation/providers/MinLength'
        ], function(RuleTypes, NotBlank, MinLength) {

  /**
    @description Simple factory to return validation provider functions for each RuleType
   */
  var ProviderFactory = {

    getProvider: function(ruleType)
    {
      switch (ruleType)
      {
        case RuleTypes.NOT_BLANK:
          return new NotBlank();

        case RuleTypes.MIN_LENGTH:
          return new MinLength();

        // you can extend the rule support by adding more cases referencing other rule providers here
        // e.g. case RuleTypes.MAX_LENGTH:

        default: return false;
      }
    }

  };

  return ProviderFactory;

});