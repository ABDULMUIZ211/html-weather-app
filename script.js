 const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const message = document.getElementById("message");

const result = document.getElementById("result");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const wind = document.getElementById("wind");


function getCondition(code) {

    if (code === 0) {
        return "Clear sky";
    }

    if (code >= 1 && code <= 3) {
        return "Cloudy";
    }

    if (code >= 45 && code <= 48) {
        return "Fog";
    }

    if (code >= 51 && code <= 67) {
        return "Rain";
    }

    if (code >= 71 && code <= 77) {
        return "Snow";
    }

    if (code >= 80 && code <= 82) {
        return "Rain showers";
    }

    if (code >= 95) {
        return "Thunderstorm";
    }

    return "Unknown";
}



 async function getWeather(city) {
  try {
    const geoUrl = "https://geocoding-api.open-meteo.com"
      + 
"/v1/search?name=" + city + "&count=1";
    const geo = await (await fetch(geoUrl)).json();
    if (!geo.results) {
      message.textContent = "City not found.";
      return;
    }
    const { latitude, longitude, name } = geo.results[0];
    const url = "https://api.open-meteo.com/v1/forecast"
      + 
"?latitude=" + latitude + "&longitude=" + longitude
      + 
"&current=temperature_2m,wind_speed_10m,weather_code";
    const data = await (await fetch(url)).json();
    showWeather(name, data.current);
  } catch (error) {
    message.textContent = "Something went wrong.";
  }
}

function showWeather(name, current) {

    message.textContent = "";

    cityName.textContent = name;

    temperature.textContent =
        current.temperature_2m + "°C";

    condition.textContent =
        getCondition(current.weather_code);

    wind.textContent =
        "Wind: " + current.wind_speed_10m + " km/h";

    result.classList.remove("hidden");
}


searchBtn.addEventListener("click", function () {

    const city = cityInput.value.trim();

    if (city === "") {
        return;
    }

    getWeather(city);

});

cityInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        const city = cityInput.value.trim();

        if (city === "") {
            return;
        }

        getWeather(city);
    }

});