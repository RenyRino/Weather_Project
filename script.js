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

function displayTemp(response) {
  console.log(response.data);
  let cityElement = document.querySelector("#city");
  let tempElement = document.querySelector("#temp");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  cityElement.innerHTML = response.data.name;
  tempElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].main;
  humidityElement.innerHTML = "Humidity: " + response.data.main.humidity + "%";
  windElement.innerHTML =
    "Wind: " + Math.round(response.data.wind.speed) + " km/h";
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
}

let apiKey = "bfd9704943b4519f0e07887eef27902e";
let city = "New York";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemp);
