angular
  .module("swiggy")
  .controller("animationType", function ($scope, $interval) {
    // $scope.$on("$start", function () {
    //   typeWriter();
    // });
    $scope.animcontent = "chal ra hai";

    var arr = [
      "Hungry?",
      "Movie marathon?",
      "Unexpected guests?",
      "Late Night at Office?",
      "Cooking gone wrong?",
      "Game Night?",
      "Late Night at Office?",
    ];

    var i = 0;
    let count = 0;
    let slideInterval;

    function typeWriter() {
      handleOnNextClick();
      slideInterval = $interval(() => {
        handleOnNextClick();
      }, 3000);
    }
    typeWriter();

    function handleOnNextClick() {
      count = (count + 1) % arr.length;
      $scope.animcontent = arr[count];
    }
  });
