define(['demo/utils',
        'demo/validation/ProviderFactory',
        'demo/validation/RuleTypes',
        'demo/validation/providers/NotBlank',
        'demo/validation/providers/MinLength'
        ], function(utils, ProviderFactory, RuleTypes, NotBlank, MinLength) {

  return function()
  {
    module('validation/ProviderFactory.js');

    test('#getProvider returns the correct provider instance', function()
    {
      var provider = ProviderFactory.getProvider(RuleTypes.NOT_BLANK);
      ok(provider instanceof NotBlank, 'the factory returns a NotBlank instance');

      provider = ProviderFactory.getProvider(RuleTypes.MIN_LENGTH);
      ok(provider instanceof MinLength, 'the factory returns a MinLength instance');
    });

  }

});