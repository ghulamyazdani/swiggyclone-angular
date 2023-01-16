// const emailValidate = document.getElementById("email-validation");
// const passValidate = document.getElementById("password-validation");
// const confirmValidate = document.getElementById("confirm-validation");

// // regex
// var lowerCaseLetters = /[a-z]/g;
// var upperCaseLetters = /[A-Z]/g;
// var numbers = /[0-9]/g;

// document
//   .getElementById("inputEmail4")
//   .addEventListener("keyup", pressEmailHandler);

// document
//   .getElementById("inputPassword4")
//   .addEventListener("keyup", pressPassHandler);

// document
//   .getElementById("inputConfirmPassword4")
//   .addEventListener("keyup", pressConfirmPassHandler);

// function pressEmailHandler(e) {
//   console.log(validateEmail(this.value));
//   if (!validateEmail(this.value) && this.value.length > 0) {
//     emailValidate.innerHTML = `Please fill proper email`;
//   } else {
//     emailValidate.innerHTML = ``;
//   }
// }
// function pressPassHandler(e) {
//   console.log(e.target.id);
//   if (this.value.length <= 8 && this.value.length > 0) {
//     e.target.id === "inputPassword4"
//       ? (passValidate.innerHTML = `Password must contain more than 8 word`)
//       : (confirmValidate.innerHTML = `Password must contain more than 8 word`);
//   } else {
//     e.target.id === "inputPassword4"
//       ? (passValidate.innerHTML = ``)
//       : (confirmValidate.innerHTML = ``);
//   }
//   if (!this.value.match(numbers) && this.value.length > 0) {
//     e.target.id === "inputPassword4"
//       ? (passValidate.innerHTML = `Password must contain numbers`)
//       : null;
//   }
//   if (!this.value.match(upperCaseLetters) && this.value.length > 0) {
//     e.target.id === "inputPassword4"
//       ? (passValidate.innerHTML = `Password must upper case word`)
//       : null;
//   }
//   if (!this.value.match(lowerCaseLetters) && this.value.length > 0) {
//     e.target.id === "inputPassword4"
//       ? (passValidate.innerHTML = `Password must lower case word`)
//       : null;
//   }
// }
// function pressConfirmPassHandler(e) {
//   var pass = document.getElementById("inputPassword4").value || "";

//   console.log(this.value === pass);
//   if (!(this.value === pass)) {
//     confirmValidate.innerHTML = `Password and Confirm Passoword must be same `;
//   } else {
//     confirmValidate.innerHTML = ``;
//   }
// }

// function validateEmail(email) {
//   const re =
//     /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return re.test(String(email).toLowerCase());
// }
