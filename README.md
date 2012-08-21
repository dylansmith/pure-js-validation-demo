Demo Form Validation example
============================

Author: Dylan Smith <dylansmith@gmail.com>

Use of require.js and the native alternative
--------------------------------------------
I am using require.js as it is a fantastic modular dependency management tool,
allowing code to be split up into modular class/object files and loaded
asyncronously if required.

The alternative approach to this would be to write each class/object using the
module pattern, e.g.

    (function(namespace) {

      function MyClass() {

      }

      namespace.MyClass = MyClass;

    }(myNamespace));

The example above assumes that a namespace object (myNamespace) has been
created by the application before subsequent modules are executed by the interpreter.

This approach would require all external JavaScripts to be added to the document
HEAD or BODY, creating multiple HTTP requests on page load which will hamper
performance. However, if you took this approach, classes could be accessed via:

    var instance = myNamespace.MyClass();

HTML & CSS
----------
No other JavaScript libaries (DOM manipulation or otherwise have been used), except
in unit testing to quickly access and change DOM state for test purposes.

The HTML markup is based on HTML5 Bootstrap (http://html5boilerplate.com/), which
contains a number of best practices. I have not used their CSS scripts, but rather
have used Eric Meyer's CSS Reset, a simple include that normalises the default
styling of HTML elements across browsers, providing a common baseline for your
own custom CSS.

I have omitted the required attribute on the 2 input fields as it would prevent
the JavaScript code from displaying errors in supporting browsers (since the
field values would have to satisfy the native requirement first).

Unit Testing
------------
There is an issue with accessing QUnit's DOM fixtures in IE from a require module,
even using jQuery. I have applied a hacky little quick fix by selecting them in
the runner.html and adding them to a window.fixtures object.

Device Testing
--------------
Tested on IE6, IE8, Chrome (Win), Chrome (Android, Galaxy S2),
Default browser (Android, Galaxy S2

Further improvements
--------------------
Given more time, the code can be improved to support the output of error messages
to the DOM, and adding other validation providers. A DOM manipulation library
like Sizzle would make things a bit easier too, but not required.