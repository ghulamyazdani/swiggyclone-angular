// var app = angular.module("swiggy", []);
var app = angular.module("swiggy", ["ui.router"]);

app.config(function ($stateProvider) {
  var mainState = {
    name: "Main",
    url: "/",
    templateUrl: "/views/home.html",
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

app.controller("login", function ($scope) {
  var loginData = { emailorusername: "", password: "" };

  $scope.loginData = loginData;
  $scope.handleLogin = function (e) {
    e.preventDefault();
    if (validateEmail(loginData.emailorusername)) {
      const usersData = JSON.parse(localStorage.getItem("usersData")) || [];

      const tempData = usersData.find(
        (user) => user.email === loginData.emailorusername
      );
      if (tempData !== undefined) {
        if (tempData.password === loginData.password) {
          window.location.href = "index.html";
          localStorage.setItem("user", JSON.stringify(tempData));
        } else {
          // finalValidation.innerHTML = `Password is Incorrect`;
          console.log(`Password is Incorrect`);
          setTimeout(() => {
            // finalValidation.innerHTML = ``;
          }, 2000);
        }
      } else {
        console.log(`Email does not exist in database`);
        setTimeout(() => {
          // finalValidation.innerHTML = ``;
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
          document.getElementById(
            "mainop"
          ).innerHTML = `<button id="userbutton">${loginData.emailorusername}</button> <div id="logout" onclick="logout()"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg></div>`;
        } else {
          // finalValidation.innerHTML = `Password is Incorrect`;
          setTimeout(() => {
            // finalValidation.innerHTML = ``;
          }, 2000);
        }
      } else {
        // finalValidation.innerHTML = `Username does not exist in database`;
        setTimeout(() => {
          // finalValidation.innerHTML = ``;
        }, 2000);
      }
    }

    console.log(validateEmail(loginData.emailorusername));
  };

  function validateEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
});

app.controller("drawercontroller", function ($scope) {
  $scope.handleSignupOpen = function () {
    if (document.getElementById("drawer2").style.display === "none") {
      document.getElementById("drawer1").style.display = "none";
      document.getElementById("drawer2").style.display = "flex";
      state = "signup";
    } else {
      document.getElementById("drawer2").style.display = "none";
    }
  };
});
