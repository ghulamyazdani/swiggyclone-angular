// const logout = document.getElementById("logout");

// logout.addEventListener("click", () => {
//   localStorage.removeItem("user");
//   // window.location.href = "login.html";
// });

function logout() {
  localStorage.removeItem("user");
  document.getElementById(
    "mainop"
  ).innerHTML = `<button id="loginopen">Login</button>
  <button id="signupopen">SignUp</button>`;
}
