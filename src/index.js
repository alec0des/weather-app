let apiKey = "b1a8336ff1e05b64da5625e4158fbea3";
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDateH2 = document.querySelector("#current-date");
let dayIndex = now.getDay();
let day = days[dayIndex];
let hour = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
currentDateH2.innerHTML = `${day} ${hour} : ${minutes}`;

function geocodeAPIResponse(response) {
  let lat = response.data[0].lat;
  let lon = response.data[0].lon;
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(weatherUrl).then(getWeather);
}

function getWeather(response) {
  let city = response.data.name;
  let cityH1 = document.querySelector("h1#city");
  cityH1.innerHTML = city;

  let temp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = temp;
}

let searchForm = document.querySelector("#search-form");
function searchCity(event) {
  event.preventDefault();

  let cityInput = event.target.querySelector("#search-bar");

  let geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityInput.value}&limit=1&appid=${apiKey}`;
  axios.get(geoUrl).then(geocodeAPIResponse);
}
searchForm.addEventListener("submit", searchCity);

let cButton = document.querySelector("#c-button");
let fButton = document.querySelector("#f-button");
function changeTemp(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  if (event.target.getAttribute("id") === "c-button") {
    currentTemp.innerHTML = 19;
  } else {
    currentTemp.innerHTML = 66;
  }
}
cButton.addEventListener("click", changeTemp);
fButton.addEventListener("click", changeTemp);

let currentButton = document.querySelector("#current-button");
function getGeoLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(weatherUrl).then(getWeather);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(getGeoLocation);
}
currentButton.addEventListener("click", getCurrentLocation);
