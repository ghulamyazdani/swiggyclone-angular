app.directive("validateEmail", [
  "validateService",
  function (validateService) {
    return {
      require: "ngModel",
      link: function (scope, element, attrs, ngModel) {
        ngModel.$validators.validateEmail = function (modelValue) {
          return validateService.validateEmail(modelValue);
        };
      },
    };
  },
]);

// can be used to create components or templates that can be used in the html
app.directive("myInfoMsg", [
  function () {
    return {
      template: `<div class="alert alert-info" role="alert">
                <strong>Info!</strong> This is an info message.
            </div>`,
    };
  },
]);
