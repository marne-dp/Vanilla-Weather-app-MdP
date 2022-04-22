function formatDate(date) {
  let hours = currentTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = currentTime.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  let monthIndex = currentTime.getMonth();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let month = months[monthIndex];
  let dayInMonth = currentTime.getDate();
  return `${day}, ${dayInMonth} ${month}, ${hours}:${minutes}`;
}

function displayWeather(response) {
  console.log(response.data);
  console.log(response.data.weather[0].icon);
  let iconElement = document.querySelector("#icon");
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("h2").innerHTML = response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `src/img/${response.data.weather[0].icon}.svg`
  );
}

function search(cityInput) {
  let apiKey = "72474dba6fbdd6e19757ef5d68f22223";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function citySearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-search").value;
  search(cityInput);
}
function searchLocation(position) {
  let apiKey = "72474dba6fbdd6e19757ef5d68f22223";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchButton = document.querySelector("#search-form");
searchButton.addEventListener("submit", citySearch);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
search("Zagreb");
