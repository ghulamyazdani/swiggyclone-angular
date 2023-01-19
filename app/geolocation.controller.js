angular.module("swiggy").controller("geolocation", [
  "$scope",
  "$http",
  "$timeout",
  "$location",
  function ($scope, $http, $timeout, $location) {
    $scope.location = "";
    $scope.lat = "";
    $scope.long = "";
    $scope.getlocation = function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          $scope.lat = position.coords.latitude;
          $scope.long = position.coords.longitude;
          let { latitude, longitude } = position.coords;
          //   $scope.location = `Latitude: ${$scope.lat} Longitude: ${$scope.long}`;
          $http({
            method: "GET",
            url: `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${`b2aa0f9f2a660c0e008c6a949fde67fb`}&units=metric&lang=en`,
          })
            .then((response) => response.data)
            .then((name) => {
              console.log(name);
              var fulllocation = `${name.city.name}, ${name.city.country}`;
              $scope.location = fulllocation;
              localStorage.setItem("location", fulllocation);
              console.log(fulllocation);
              if (localStorage.getItem("user")) {
                $location.path("/menu");
              } else {
              }
              //   window.location.href = "#/menu";
              //   document.getElementById("location").innerHTML = fulllocation;
              //   $scope.$apply();
            })
            .catch((error) => {
              console.log(error);
            });
          console.log($scope.location);
          $scope.$apply();
        });
      } else {
        $scope.location = "Geolocation is not supported by this browser.";
      }
    };
  },
]);
