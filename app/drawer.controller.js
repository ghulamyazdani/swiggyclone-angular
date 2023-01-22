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
