angular.module("swiggy").controller("login", [
  "$scope",
  "$timeout",
  "validateService",
  function ($scope, $timeout, validateService) {
    var loginData = { emailorusername: "", password: "" };
    const userLogged = JSON.parse(localStorage.getItem("user"));

    $scope.errormessage = "";
    $scope.loginData = loginData;
    $scope.logginSignupbtn = userLogged ? false : true;
    $scope.username = userLogged ? userLogged.username : "";
    $scope.handleLogin = function () {
      const usersData = JSON.parse(localStorage.getItem("usersData")) || [];
      //   console.log(validateService.validateEmail(loginData.emailorusername));
      if (validateService.validateEmail(loginData.emailorusername)) {
        const tempData = usersData.find(
          (user) => user.email === loginData.emailorusername
        );
        if (tempData !== undefined) {
          if (tempData.password === loginData.password) {
            localStorage.setItem("user", JSON.stringify(tempData));
            console.log("loggedIn email");
            $scope.username = tempData.username;
            $scope.logginSignupbtn = false;
            console.log($scope.logginSignupbtn);
          } else {
            $scope.errormessage = "Password is Incorrect";
            $timeout(function () {
              $scope.errormessage = "";
            }, 2000);
          }
        } else {
          $scope.errormessage = "Email does not exist in database";
          $timeout(function () {
            $scope.errormessage = "";
          }, 2000);
        }
      } else {
        const tempData = usersData.find(
          (user) => user.username === loginData.emailorusername
        );
        if (tempData !== undefined) {
          if (tempData.password === loginData.password) {
            // window.location.href = "index.html";
            localStorage.setItem("user", JSON.stringify(tempData));
            console.log("loggedIn");
            $scope.username = loginData.emailorusername;
            $scope.logginSignupbtn = false;
            console.log($scope.logginSignupbtn);
          } else {
            $scope.errormessage = "Password is Incorrect";
            $timeout(function () {
              $scope.errormessage = "";
            }, 2000);
          }
        } else {
          $scope.errormessage = "Username does not exist in database";
          $timeout(function () {
            $scope.errormessage = "";
          }, 2000);
        }
      }
    };

    $scope.handleLogout = function () {
      console.log($scope.logginSignupbtn);
      console.log("logout");
      localStorage.removeItem("user");
      $scope.username = "";
      $scope.logginSignupbtn = true;
      console.log($scope.logginSignupbtn);
    };
  },
]);
