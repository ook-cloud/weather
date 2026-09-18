const weatherDatabase = {
  Ulaanbaatar: { baseTemp: -5, icon: "❄️", desc: "Cold and cloudy" },
  Moscow: { baseTemp: 2, icon: "🌨️", desc: "Light snow" },
  Tokyo: { baseTemp: 16, icon: "🌧️", desc: "Moderate rain" },
  Beijing: { baseTemp: 12, icon: "🌤️", desc: "Partly cloudy" },
  Seoul: { baseTemp: 10, icon: "☀️", desc: "Sunny and clear" },
};

const citySelect = document.getElementById("citySelect");
const getWeatherBtn = document.getElementById("getWeatherBtn");

const cityName = document.getElementById("cityName");
const dateInfo = document.getElementById("dateInfo");
const weatherIcon = document.getElementById("weatherIcon");
const temp = document.getElementById("temp");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

function getCurrentDate() {
  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return now.toLocaleDateString("en-US", options);
}

function showWeather() {
  const selectedCity = citySelect.value;
  const cityData = weatherDatabase[selectedCity];

  if (!cityData) return;

  const randomTempOffset = Math.floor(Math.random() * 5) - 2;
  const currentTemp = cityData.baseTemp + randomTempOffset;
  const randomHumidity = Math.floor(Math.random() * 40) + 40;
  const randomWind = (Math.random() * 5 + 1).toFixed(1);

  cityName.textContent = selectedCity;
  if (dateInfo) dateInfo.textContent = getCurrentDate();
  weatherIcon.textContent = cityData.icon;
  temp.textContent = `${currentTemp}°C`;
  description.textContent = cityData.desc;
  humidity.textContent = `${randomHumidity}%`;
  wind.textContent = `${randomWind} m/s`;
}

showWeather();

getWeatherBtn.addEventListener("click", showWeather);

citySelect.addEventListener("change", showWeather);
