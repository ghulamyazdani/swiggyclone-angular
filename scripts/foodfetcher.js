const mealsEl = document.getElementById("meals");
const searchBtn = document.getElementById("search");
const searchTerm = document.getElementById("search-term");
const cartMeal = document.getElementById("modalbody");
getMealMount();

window.onload = () => {
  // document.getElementById("loading").style.display = "none";
  const meals = JSON.parse(localStorage.getItem("meals"));
  const recentmeals = localStorage.getItem("recentmeals");
  if (recentmeals) {
    document.getElementById("recOrders").innerHTML = recentmeals;
  }
  if (meals) {
    document.getElementById("cartCount").innerHTML = meals.length;
  }
  const location = localStorage.getItem("location");
  if (location) {
    document.getElementById("locationShow").innerHTML = location;
  }
  console.log(meals);
  if (meals) {
    meals.forEach((meal) => {
      addCartMeal(meal);
    });
  }
};

function LoadCartMeal() {
  const meals = JSON.parse(localStorage.getItem("meals"));
  if (meals) {
    document.getElementById("cartCount").innerHTML = meals.length;
  }
}
searchBtn.addEventListener("click", async () => {
  // clean container
  mealsEl.innerHTML = "";

  getMealMount();
});
async function getMealMount() {
  const search = searchTerm.value || "";
  const meals = await getMealsBySearch(search);

  if (meals) {
    meals.forEach((meal) => {
      addMeal(meal);
    });
  }
}

async function getMealsBySearch(term) {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
  );

  const respData = await resp.json();
  const meals = respData.meals;

  return meals;
}

function addMeal(mealData) {
  console.log(mealData);

  const meal = document.createElement("div");
  meal.classList.add("meal");

  meal.innerHTML = `
          <div class="meal-header">
              <img
                  src="${mealData.strMealThumb}"
                  alt="${mealData.strMeal}"
              />
          </div>
          <div class="meal-body">
              <h4>${mealData.strMeal}</h4>
              <button class="add-btn">
                  <i class="fas fa-plus"></i> Add to cart
              </button>
          </div>
      `;

  const btn = meal.querySelector(".add-btn");
  btn.addEventListener("click", () => {
    addMealToLS(mealData.idMeal, mealData.strMeal, mealData.strMealThumb);
    LoadCartMeal();
  });

  mealsEl.appendChild(meal);
}

function addCartMeal(mealData) {
  console.log(mealData);

  const meal = document.createElement("div");
  meal.classList.add("cartItem");

  meal.innerHTML = `
              <img
                style="
                  width: 100px;
                  height: 100px;
                  object-fit: cover;
                  margin-right: 1rem;
                "
                src="${mealData.img}"
                alt=""
              />
              <div class="itemText">
                <h5>${mealData.name}</h5>
                <div>
                  <p>1 item</p>
                </div>
              </div>
      `;

  cartMeal.appendChild(meal);
}

function addMealToLS(mealId, mealName, mealImg) {
  const meal = getMealsFromLS();

  const mealItem = {
    id: mealId,
    name: mealName,
    img: mealImg,
  };

  meal.push(mealItem);
  console.log(meal);
  document.getElementById("cartCount").innerHTML = meal.length;
  localStorage.setItem("meals", JSON.stringify(meal));
}

function getMealsFromLS() {
  const meals = JSON.parse(localStorage.getItem("meals"));

  return meals === null ? [] : meals;
}

document.getElementById("placeorder").addEventListener("click", () => {
  let recent = JSON.parse(localStorage.getItem("meals"));

  localStorage.setItem(
    "recentmeals",
    recent.map((e) => e.name)
  );
  document.getElementById("recOrders").innerHTML = recent.map((e) => e.name);

  console.log("clicked");
  localStorage.setItem("meals", JSON.stringify([]));
  setCartCount(0);
});

function setCartCount(count) {
  document.getElementById("cartCount").innerHTML = count;
}

function handleFilterOpen() {
  if (document.getElementById("filterBox").style.display === "none") {
    document.getElementById("filterBox").style.display = "flex";
  } else {
    document.getElementById("filterBox").style.display = "none";
  }
}
