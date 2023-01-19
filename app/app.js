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
    template: "<h3>404 Not Found</h3>",
  };

  $stateProvider.state(mainState);
  $stateProvider.state(helloState);
  $stateProvider.state(aboutState);
});
