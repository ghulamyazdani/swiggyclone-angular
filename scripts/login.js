// const loginForm = document.getElementById("loginForm");
// var finalValidation = document.getElementById("final-validation-login");

// loginForm.addEventListener("submit", handleSubmit);
// var logindata = {};
// function handleSubmit(event) {
//   event.preventDefault();
//   console.log("hello");
//   const data = new FormData(event.target);

//   const emailorusername = data.get("emailorusername");
//   const password = data.get("password");
//   //   const confirmPassword = data.get("confirmPassword");
//   //   logindata = { email, username, password, confirmPassword };
//   console.log({ emailorusername, password });
//   if (emailorusername.length > 0 && password.length > 0) {
//     validateEmail(emailorusername)
//       ? login({ email: emailorusername, password }, "email")
//       : login({ username: emailorusername, password }, "username");
//   } else {
//     finalValidation.innerHTML = `Please fill all the required fields`;
//     setTimeout(() => {
//       finalValidation.innerHTML = ``;
//     }, 2000);
//   }
// }

// function login(data, type) {
//   const usersData = JSON.parse(localStorage.getItem("usersData")) || [];
//   console.log(usersData);
//   if (type === "email") {
//     // if (user.email === data.email && user.password === data.password) {
//     //   window.location.href = "index.html";
//     // } else {
//     //   finalValidation.innerHTML = `Invalid Email or Password`;
//     //   setTimeout(() => {
//     //     finalValidation.innerHTML = ``;
//     //   }, 2000);
//     // }
//     // userData.array.forEach(element => {
//     //     element.email === data.email && element.password === data.password ? window.location.href = "index.html" : finalValidation.innerHTML = `Invalid Email or Password`;
//     // });
//     // if (userData.find((user) => user.email === data.email)) {

//     // }
//     const tempData = usersData.find((user) => user.email === data.email);
//     if (tempData !== undefined) {
//       if (tempData.password === data.password) {
//         window.location.href = "index.html";
//         localStorage.setItem("user", JSON.stringify(tempData));
//       } else {
//         finalValidation.innerHTML = `Password is Incorrect`;
//         setTimeout(() => {
//           finalValidation.innerHTML = ``;
//         }, 2000);
//       }
//     } else {
//       finalValidation.innerHTML = `Email does not exist in database`;
//       setTimeout(() => {
//         finalValidation.innerHTML = ``;
//       }, 2000);
//     }
//   } else {
//     const tempData = usersData.find((user) => user.username === data.username);
//     if (tempData !== undefined) {
//       if (tempData.password === data.password) {
//         window.location.href = "index.html";
//         localStorage.setItem("user", JSON.stringify(tempData));
//         document.getElementById(
//           "mainop"
//         ).innerHTML = `<button id="userbutton">${data.username}</button> <div id="logout" onclick="logout()"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg></div>`;
//       } else {
//         finalValidation.innerHTML = `Password is Incorrect`;
//         setTimeout(() => {
//           finalValidation.innerHTML = ``;
//         }, 2000);
//       }
//     } else {
//       finalValidation.innerHTML = `Username does not exist in database`;
//       setTimeout(() => {
//         finalValidation.innerHTML = ``;
//       }, 2000);
//     }
//   }
// }

// function validateEmail(email) {
//   const re =
//     /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return re.test(String(email).toLowerCase());
// }
