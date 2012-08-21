requirejs.config({
  baseUrl: 'js/'
});

requirejs([ 'demo/utils',
            'demo/FormManager',
            'demo/validation/RuleTypes'
          ], function (utils, FormManager, RuleTypes) {

  // this is ugly, but without libraries it's the fastest solution
  window.onload = function() {

    // execute some IE polyfills
    utils.polyfills();

    // get the form element by it's ID
    var loginForm = document.getElementById('form-login');
    if (loginForm)
    {
      // instantiate a new FormManager, and pass in the form DOM element
      var form = new FormManager(loginForm);

      // create validation rules for the form fields
      form.validation.addRule('form-login-username', RuleTypes.NOT_BLANK);
      form.validation.addRule('form-login-password', RuleTypes.NOT_BLANK);

      // adding other rules is simple, if a provider is setup in the ProviderFactory
      // e.g. (uncomment below to test it out)
      //form.validation.addRule('form-login-password', RuleTypes.MIN_LENGTH, {value: 8});
    }

    var msg = document.getElementById('message-box');
    if (msg) msg.innerHTML = 'Status: JavaScript has loaded and validation is active';

  };

});