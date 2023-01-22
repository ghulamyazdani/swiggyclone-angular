app.controller("menu", [
  "$scope",
  "$http",
  "$timeout",
  "$location",
  "$log",
  "$anchorScroll",
  function ($scope, $http, $timeout, $location, $log, $anchorScroll) {
    $scope.placeList = [
      {
        id: 52977,
        mealImg:
          "https://www.themealdb.com/images/media/meals/58oia61564916529.jpg",
        name: "Corba",
        country: "Turkish",
        price: 100,
        deliverytime: "30 min",
        rating: 4,
        promoted: true,
        foodItems:
          "Bakery, Desserts, Beverages, Combo, European, Ice Cream, Juices, Waffle, Sweets.",
      },
      {
        id: 53060,
        mealImg:
          "https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg",
        name: "Burek",
        country: "Croatian",
        price: 100,
        deliverytime: "30 min",
        rating: 4.5,
        promoted: true,

        foodItems:
          "Bakery, Desserts, Beverages, Combo, European, Ice Cream, Juices, Waffle, Sweets.",
      },
      {
        id: 53065,
        mealImg:
          "https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg",
        name: "Shushi",
        country: "Croatian",
        price: 100,
        deliverytime: "30 min",
        promoted: false,

        rating: 4.5,
        foodItems:
          "Bakery, Desserts, Beverages, Combo, European, Ice Cream, Juices, Waffle, Sweets.",
      },
      {
        id: 52978,
        mealImg:
          "https://www.themealdb.com/images/media/meals/mlchx21564916997.jpg",
        name: "Kumpir",
        country: "Turkish",
        price: 100,
        deliverytime: "30 min",
        promoted: false,

        rating: "4.5",
        foodItems:
          "Bakery, Desserts, Beverages, Combo, European, Ice Cream, Juices, Waffle, Sweets.",
      },
      {
        id: 53026,
        mealImg:
          "https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg",
        name: "Tamiya",
        country: "Egyptian",
        price: 100,
        deliverytime: "30 min",
        promoted: false,

        rating: "4.5",
        foodItems:
          "Bakery, Desserts, Beverages, Combo, European, Ice Cream, Juices, Waffle, Sweets.",
      },
      {
        id: 52785,
        mealImg:
          "https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg",
        name: "Dal fry",
        country: "Indian",
        price: 100,
        deliverytime: "30 min",
        rating: 4.5,
        promoted: false,

        foodItems:
          "Bakery, Desserts, Beverages, Combo, European, Ice Cream, Juices, Waffle, Sweets.",
      },
      {
        id: 52804,
        mealImg:
          "https://www.themealdb.com/images/media/meals/uuyrrx1487327597.jpg",
        name: "Poutine",
        country: "Canadian",
        price: 100,
        deliverytime: "30 min",
        rating: 4.5,
        promoted: false,

        foodItems:
          "Bakery, Desserts, Beverages, Combo, European, Ice Cream, Juices, Waffle, Sweets.",
      },
      {
        id: 52844,
        mealImg:
          "https://www.themealdb.com/images/media/meals/wtsvxx1511296896.jpg",
        name: "Lasagne",
        country: "Italian",
        price: 200,
        deliverytime: "30 min",
        promoted: false,
        rating: 3.5,
        foodItems:
          "Bakery, Desserts, Beverages, Combo, European, Ice Cream, Juices, Waffle, Sweets.",
      },
    ];
    $scope.showlocDrawer = false;
    $scope.openLocDrawer = function () {
      $log.info("working");
      // console.log("working");
      $scope.showlocDrawer = !$scope.showlocDrawer;
    };
    $scope.mealsCount = $scope.placeList.length;
    $scope.cart = JSON.parse(localStorage.getItem("meals")) || [];
    $scope.cartCount = $scope.cart.length || 0;
    $scope.menuData = "";
    $scope.recentOrders = [];
    $scope.sortColumn = "name";
    $scope.reverseSort = false;
    // $scope.searchText = "";
    $scope.location = localStorage.getItem("location");
    $scope.user = JSON.parse(localStorage.getItem("user"));
    if ($scope.user === null) {
      $location.path("/");
    }
    $scope.addMealToLS = function (mealId, mealName, mealImg) {
      const mealItem = {
        id: mealId,
        name: mealName,
        img: mealImg,
      };

      $scope.cart.push(mealItem);
      localStorage.setItem("meals", JSON.stringify($scope.cart));
      LoadCartMeal();
    };
    $scope.placeorder = function () {
      let recent = JSON.parse(localStorage.getItem("meals"));

      localStorage.setItem(
        "recentmeals",
        recent.map((e) => e.name)
      );
      $scope.recentOrders = recent.map((e) => e.name);

      console.log("clicked");
      localStorage.setItem("meals", JSON.stringify([]));
      setCartCount(0);
      $scope.cart = [];
    };
    function setCartCount(count) {
      $scope.cartCount = count;
    }
    $scope.sortway = "";
    $scope.sortData = function (column, status) {
      if (column === "price" && status == true) {
        $scope.sortway = "HTL";
        $scope.sortColumn = column;
      } else if (column === "price" && status == false) {
        $scope.sortColumn = column;
        $scope.sortway = "LTH";
      } else {
        $scope.sortColumn = column;
        $scope.sortway = column;
      }
      $scope.reverseSort = status;
    };
    $scope.scrollTo = function (scrollLocation) {
      $location.hash(scrollLocation);
      $anchorScroll();
    };

    $scope.getSortClass = function (column, way) {
      // if (column === "rating" && $scope.sortway === "rating") {
      //   return "active";
      // }
      // if (column === "deliverytime" && $scope.sortway === "deliverytime") {
      //   return "active";
      // }
      if (column === "price") {
        console.log(way, $scope.sortway);
        return way === $scope.sortway ? "active" : "not-active";
      }
      if ($scope.sortway === column) {
        return "active";
      }

      return "";
    };
    function LoadCartMeal() {
      const meals = JSON.parse(localStorage.getItem("meals"));
      if (meals) {
        $scope.cartCount = meals.length;
      }
    }
  },
]);
