// var app = angular.module("swiggy", []);
var app = angular.module("swiggy", ["ui.router"]);
app.config(function ($stateProvider) {
  var mainState = {
    name: "Main",
    url: "/",
    templateUrl: "/views/home.html",
    controller: "login",
  };
  var helloState = {
    name: "menu",
    url: "/menu",
    templateUrl: "/views/menu.html",
  };

  var aboutState = {
    name: "about",
    url: "/about",
    template: "<h3>menupage</h3>",
  };
  var aboutState = {
    name: "noroute",
    url: "*path",
    template: "<h3>Not available</h3>",
  };

  $stateProvider.state(mainState);
  $stateProvider.state(helloState);
  $stateProvider.state(aboutState);
});

app.controller("signup", function ($scope) {
  var userData = { email: "", username: "", password: "", confirmPassword: "" };

  $scope.userData = userData;
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
    // signupForm.innerHTML = `<h1>Signup Successful</h1>`;
  };
  $scope.emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  $scope.passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  // $scope.usernameRegex = /^[a-zA-Z0-9]{6,}$/;

  $scope.checkPassword = function () {
    if (userData.password !== userData.confirmPassword) {
      return true;
    } else {
      return false;
    }
  };

  // $scope.checkUsername = function () {
  //   if (userData.username.length < 6) {
  //     $scope.usernameError = "Username should be atleast 6 characters";
  //   } else {
  //     $scope.usernameError = "";
  //   }
  // };

  $scope.checkEmail = function () {
    if (!userData.email.match($scope.emailRegex)) {
      $scope.emailError = "Email is not valid";
    } else {
      $scope.emailError = "";
    }
  };
});

app.controller("login", [
  "$scope",
  "$timeout",
  function ($scope, $timeout) {
    var loginData = { emailorusername: "", password: "" };
    const userLogged = JSON.parse(localStorage.getItem("user"));

    $scope.errormessage = "";
    $scope.loginData = loginData;
    $scope.logginSignupbtn = userLogged ? false : true;
    $scope.username = userLogged ? userLogged.username : "";
    $scope.handleLogin = function () {
      const usersData = JSON.parse(localStorage.getItem("usersData")) || [];
      if (validateEmail(loginData.emailorusername)) {
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

    function validateEmail(email) {
      const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  },
]);

app.controller("drawercontroller", function ($scope) {
  $scope.loginDrawer = false;
  $scope.signupDrawer = false;
  $scope.handleSignupOpen = function () {
    if ($scope.signupDrawer === false) {
      $scope.signupDrawer = true;
      $scope.loginDrawer = false;
    } else {
      $scope.signupDrawer = false;
    }
  };
  $scope.handleLoginOpen = function () {
    if ($scope.loginDrawer === false) {
      $scope.signupDrawer = false;
      $scope.loginDrawer = true;
    } else {
      $scope.loginDrawer = false;
    }
  };

  $scope.closeSignUpDrawer = function () {
    $scope.signupDrawer = false;
  };
  $scope.closeLoginDrawer = function () {
    $scope.loginDrawer = false;
  };
});
