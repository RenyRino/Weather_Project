function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `Last Updated: ${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDays, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
     <div class="col-2">
                <div class="forecast-date">${formatDay(forecastDays.dt)}</div>
                <div class="forecast-img">
                  <img
                    src="http://openweathermap.org/img/wn/${
                      forecastDays.weather[0].icon
                    }@2x.png"
                    alt=""
                    width="42"
                  />
                </div>
                <div class="forecast-temp">
                  <span class="forecast-temp-max"> ${Math.round(
                    forecastDays.temp.max
                  )}° </span>
                  <span class="forecast-temp-min"> ${Math.round(
                    forecastDays.temp.min
                  )}° </span>
                </div>
              </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "bfd9704943b4519f0e07887eef27902e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemp(response) {
  console.log(response.data);
  let cityElement = document.querySelector("#city");
  let tempElement = document.querySelector("#temp");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  celciusTemp = response.data.main.temp;
  cityElement.innerHTML = response.data.name;
  tempElement.innerHTML = Math.round(celciusTemp);
  descriptionElement.innerHTML = response.data.weather[0].main;
  humidityElement.innerHTML = "Humidity: " + response.data.main.humidity + "%";
  windElement.innerHTML =
    "Wind: " + Math.round(response.data.wind.speed) + " m/s";
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    ` http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "bfd9704943b4519f0e07887eef27902e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheit(event) {
  event.preventDefault();
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celciusTemp * 9) / 5 + 32;
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(fahrenheitTemp);
}

function displayCelcius(event) {
  event.preventDefault();
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(celciusTemp);
}

let celciusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#Fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celciusLink = document.querySelector("#Celcius");
celciusLink.addEventListener("click", displayCelcius);

search("New York");
