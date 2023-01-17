angular.module("swiggy").controller("animationType", [
  "$scope",
  function ($scope) {
    $scope.type = function (e) {
      var text = e.target.value;
      var textArray = text.split("");
      var textArrayLength = textArray.length;
      var i = 0;
      var timer = setInterval(function () {
        if (i < textArrayLength) {
          $scope.text = $scope.text + textArray[i];
          $scope.$apply();
          i++;
        } else {
          clearInterval(timer);
        }
      }, 100);
    };
  },
]);
