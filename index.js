const weatherDatabase = {
  Улаанбаатар: { baseTemp: -5, icon: "❄️", desc: "Хүйтэн, үүлэрхэг" },
  Дархан: { baseTemp: -3, icon: "🌤️", desc: "Багавтар үүлтэй" },
  Эрдэнэт: { baseTemp: -6, icon: "🌨️", desc: "Цас орж байна" },
  "Шинэ Дели": { baseTemp: 28, icon: "☀️", desc: "Нарлаг, халуун" },
  Токио: { baseTemp: 15, icon: "🌧️", desc: "Хур бороотой" },
};

const citySelect = document.getElementById("citySelect");
const getWeatherBtn = document.getElementById("getWeatherBtn");

const cityName = document.getElementById("cityName");
const weatherIcon = document.getElementById("weatherIcon");
const temp = document.getElementById("temp");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

function showWeather() {
  const selectedCity = citySelect.value;
  const cityData = weatherDatabase[selectedCity];

  const randomTempOffset = Math.floor(Math.random() * 5) - 2;
  const currentTemp = cityData.baseTemp + randomTempOffset;
  const randomHumidity = Math.floor(Math.random() * 40) + 40;
  const randomWind = (Math.random() * 5 + 1).toFixed(1);

  cityName.textContent = selectedCity;
  weatherIcon.textContent = cityData.icon;
  temp.textContent = `${currentTemp}°C`;
  description.textContent = cityData.desc;
  humidity.textContent = `${randomHumidity}%`;
  wind.textContent = `${randomWind} м/с`;
}

showWeather();

getWeatherBtn.addEventListener("click", showWeather);
