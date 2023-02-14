app.controller("signup", function ($scope, authServices, $timeout) {
  var userData = {
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    username: "",
    password: "",
    confirm_password: "",
    urole: "user",
  };
  $scope.emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  $scope.passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  $scope.userData = userData;
  $scope.signedupstate = false;
  $scope.handleSignUp = function (e) {
    e.preventDefault();
    // var userLocalData = JSON.parse(localStorage.getItem("usersData")) || [];
    // if (userLocalData.length > 0) {
    //   userLocalData = userLocalData.filter(
    //     (user) =>
    //       user.email !== userData.email || user.username !== userData.username
    //   );
    // }
    // console.log(userData);
    // userLocalData.push(userData);
    // localStorage.setItem("usersData", JSON.stringify(userLocalData));
    authServices.signup(userData, function (response) {
      console.log(response);
      if (response.errors) {
        $scope.signedupstate = false;
        $timeout(function () {
          $scope.errormessage = response.errors[0].msg;
        }, 3000);
      } else {
        $scope.signedupstate = true;
        $scope.errormessage = "";
      }
    });
  };

  // $scope.checkPassword = function () {
  //   if (userData.password !== userData.confirmPassword) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  // $scope.checkEmail = function () {
  //   if (!userData.email.match($scope.emailRegex)) {
  //     $scope.emailError = "Email is not valid";
  //   } else {
  //     $scope.emailError = "";
  //   }
  // };
});
