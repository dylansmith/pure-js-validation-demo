define(['demo/utils',
        'demo/validation/ValidationManager'
        ], function(utils, ValidationManager) {

    /**
      @constructor
      @description FormManager class that can manage an HTML Form element
        and perform validation on it's fields, based on one or more validation
        rules that can be applied to each field via the #addRule method.
      */
    var FormManager = function(htmlFormElement)
    {
      if (htmlFormElement) {
        this.attach(htmlFormElement);
      }

      this.validation = new ValidationManager();
    };

    FormManager.prototype = {

      /**
        @var
        @type {HTMLFormElement}
       */
      formElement: null,

      /**
        @var
        @type {demo/validation/validation}
        */
      validation: null,

      /**
        @description Stores the provided HTMLFormElement internally as the
          target of all class behaviour
        @param {HTMLFormElement} htmlFormElement
       */
      attach: function(htmlFormElement)
      {
        // unbind existing event handlers before overwriting the element reference
        if (this.formElement) {
          this.unbindEvents();
        }

        this.formElement = htmlFormElement;
        this.bindEvents();
      },

      /**
        @description Set focus on specified element
        @param {String} elementId
        */
      focusField: function(elementId)
      {
        var field = this.getField(elementId);
        if (field) field.focus();
      },

      /**
        @description Returns the HTML field element by it's name
        @param {String} fieldId
        @returns {HTMLElement}
       */
      getField: function(elementId)
      {
        var doc = this.formElement.ownerDocument || document,
            el = doc.getElementById(elementId);
        return el || undefined;
      },

      /**
        @description Returns the value of a form field
        @param {String} fieldId
        @returns {String|null}
       */
      getFieldValue: function(elementId)
      {
        var field = this.getField(elementId);
        if (field) {
          return field.value || null;
        }
      },

      /**
        @description Sets a new validation manager
        @param {demo/validation/validation} validation
       */
      setValidator: function(validation)
      {
        this.validation = validation;
      },

      /**
        @description Binds all DOM event listeners to the attached form element
       */
      bindEvents: function()
      {
        this._checkFormElement();
        utils.bind(this.formElement, 'submit', this.handleSubmit, this);
      },

      /**
        @description Unbinds all DOM event listeners from the attached form element
       */
      unbindEvents: function()
      {
        this._checkFormElement();
        utils.unbind(this.formElement, 'submit', this.handleSubmit, this);
      },

      /**
        @description Submit event handler for the form
        @param {DOMEvent} evt
        @returns {Boolean}
       */
      handleSubmit: function(evt)
      {
        var field, errors;

        if (this.validation) {
          errors = this.validation.evaluateRules(this);
        }

        if (utils.empty(errors) === false)
        {
          // display the field errors visually
          this.updateFieldErrors(errors);

          // focus the first element
          for (field in errors) {
            this.focusField(field);
            break;
          }

          // prevent the form from submitting
          evt.returnValue = false;
          return false;
        }

        return true;
      },

      /**
        @description Clear error classnames from the field elements
        */
      clearFieldErrors: function()
      {
        var fieldId, field;
        for (fieldId in this.validation.rules)
        {
          field = this.getField(fieldId);
          if (field) {
            field.className = '';
          }
        }
      },

      /**
        @description Sets error classnames on field elements
        @param {Object} errors
        */
      updateFieldErrors: function(errors)
      {
        var fieldId, field;

        this.clearFieldErrors();
        for (fieldId in errors)
        {
          field = this.getField(fieldId);
          if (field) {
            field.className = 'error';
          }
        }
      },

      /**
        @description Ensures a formElement is set, otherwise throws an exception
       */
      _checkFormElement: function() {
        if (!this.formElement) throw "Form#bind: no HTMLFormElement defined; use #attach()";
      }

    };

    return FormManager;
  }
);