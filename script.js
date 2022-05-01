let input = document.querySelector(".formSearch");
let output = document.querySelector(".city h3");

function getValue() {
  output.innerHTML = input.value;
  let apiKey = "bfd9704943b4519f0e07887eef27902e";
  let selectedCity = input.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

let newCity = document.querySelector(".btn");
newCity.addEventListener("click", getValue);

input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    output.innerHTML = input.value;
    let apiKey = "bfd9704943b4519f0e07887eef27902e";
    let selectedCity = input.value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemp);
  }
});

function showTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let tempElement = document.querySelector(".temp-c");
  tempElement.innerHTML = temp;
}

let currentLocation = document.querySelector(".btnCurrentLoc");
currentLocation.addEventListener("click", locationCurrent);

function locationCurrent() {
  navigator.geolocation.getCurrentPosition(retrieveCurrentLoc);
}

function retrieveCurrentLoc(position) {
  let apiKey = "bfd9704943b4519f0e07887eef27902e";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showCurrentLoc);
}

function showCurrentLoc(response) {
  console.log(response.data);
  let tempCurrent = Math.round(response.data.main.temp);
  let cityCurrent = response.data.name;
  let tempCurrentElement = document.querySelector(".temp-c");
  tempCurrentElement.innerHTML = tempCurrent;
  let cityCurrentElement = document.querySelector(".city h3");
  cityCurrentElement.innerHTML = cityCurrent;
}

let now = new Date();
function formatDate() {
  let milisec = now.getMilliseconds();
  let date = now.getDate();
  let year = now.getFullYear();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let newDate = day + ", " + date + " " + month + " " + year;
  return newDate;
}
let currentTime = document.querySelector(".time");
currentTime.innerHTML = formatDate(now);

function convertTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  let tempElementClass = tempElement.className;

  if (event.target.className == "degF" && tempElementClass == "temp-c") {
    tempElement.innerHTML = Math.round(
      Number(tempElement.innerHTML) * 1.8 + 32
    );
    tempElement.className = "temp-f";
  } else if (event.target.className == "degC" && tempElementClass == "temp-f") {
    tempElement.innerHTML = Math.round(
      (Number(tempElement.innerHTML) - 32) * 0.56
    );
    tempElement.className = "temp-c";
  }
}
let selectCel = document.querySelector(".degC");
selectCel.addEventListener("click", convertTemp);

let selectFah = document.querySelector(".degF");
selectFah.addEventListener("click", convertTemp);
