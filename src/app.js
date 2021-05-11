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
    minutes = `0${hours}`;
  }

  return `${day} | ${hours}:${minutes}`;
}

function showWeather(response) {
  console.log(response.data);

  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#country").innerHTML =
    "(" + response.data.sys.country + ")";
  document.querySelector("#current-weather").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    3.6 * response.data.wind.speed
  );
  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
}

let apiKey = "b409f6a940ab5609bc1ca05aa3fc68e6";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=hamburg&appid=${apiKey}&units=metric `;

axios.get(apiUrl).then(showWeather);
