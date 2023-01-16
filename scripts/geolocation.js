// var fulllocation = "";

// window.onload = () => {
//   // document.getElementById("loading").style.display = "none";
//   const location = localStorage.getItem("location");
//   if (location) {
//     document.getElementById("locationShow").innerHTML = location;
//   }
//   // if (user && window.location.href.includes("menu.html")) {
//   //   // window.location.href = "menu.html";
//   // } else if (!user && window.location.href.includes("menu.html")) {
//   //   window.location.href = "index.html";
//   // }
// };

// document.getElementById("locateme").addEventListener("click", geoLocation);

// function geoLocation() {
//   navigator.geolocation.getCurrentPosition((success) => {
//     let { latitude, longitude } = success.coords;
//     fetch(
//       `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${`b2aa0f9f2a660c0e008c6a949fde67fb`}&units=metric&lang=en`
//     )
//       .then((response) => response.json())
//       .then((name) => {
//         setTimeout(() => {
//           fulllocation = `${name.city.name}, ${name.city.country}`;
//           document.getElementById("inputt").value = fulllocation;
//           localStorage.setItem("location", fulllocation);
//           console.log(fulllocation);
//           window.location.href = "menu.html";
//           document.getElementById("location").innerHTML = fulllocation;
//         }, 1000);
//       })
//       .catch(() => {
//         console.log("error");
//       });
//   });
// }
