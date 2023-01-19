angular.module("swiggy").controller("signup", function ($scope) {
  var userData = { email: "", username: "", password: "", confirmPassword: "" };

  $scope.userData = userData;
  $scope.signedupstate = false;
  $scope.handleSignUp = function (e) {
    e.preventDefault();
    var userLocalData = JSON.parse(localStorage.getItem("usersData")) || [];
    if (userLocalData.length > 0) {
      userLocalData = userLocalData.filter(
        (user) =>
          user.email !== userData.email || user.username !== userData.username
      );
    }
    console.log(userData);
    userLocalData.push(userData);
    localStorage.setItem("usersData", JSON.stringify(userLocalData));
    $scope.signedupstate = true;
  };
  $scope.emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  $scope.passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  $scope.checkPassword = function () {
    if (userData.password !== userData.confirmPassword) {
      return true;
    } else {
      return false;
    }
  };

  $scope.checkEmail = function () {
    if (!userData.email.match($scope.emailRegex)) {
      $scope.emailError = "Email is not valid";
    } else {
      $scope.emailError = "";
    }
  };
});
