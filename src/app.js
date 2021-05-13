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

  return `${day} | ${hours}:${minutes}`;
}

function showWeather(response) {
  let weatherIcon = document.querySelector("#current-weather-icon");
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#country").innerHTML =
    "(" + response.data.sys.country + ")";
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    3.6 * response.data.wind.speed
  );
  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "b409f6a940ab5609bc1ca05aa3fc68e6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  search(searchInputElement.value);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  celsiusConversion.classList.remove("active");
  fahrenheitConversion.classList.add("active");
  let celsius = document.querySelector("#current-temp").innerHTML;
  let fahrenheit = Math.round((celsius * 9) / 5 + 32);
  document.querySelector("#current-temp").innerHTML = fahrenheit;
}

function convertToCelsius(event) {
  event.preventDefault();
  celsiusConversion.classList.add("active");
  fahrenheitConversion.classList.remove("active");
  let fahrenheit = document.querySelector("#current-temp").innerHTML;
  let celsius = Math.round(((fahrenheit - 32) * 5) / 9);
  document.querySelector("#current-temp").innerHTML = celsius;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitConversion = document.querySelector("#unit-fahrenheit");
fahrenheitConversion.addEventListener("click", convertToFahrenheit);

let celsiusConversion = document.querySelector("#unit-celsius");
celsiusConversion.addEventListener("click", convertToCelsius);

search("Hamburg");
