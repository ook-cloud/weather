// Local Өгөгдлийн бааз (API-ийн оронд ашиглах Object)
const weatherDatabase = {
  Улаанбаатар: { baseTemp: -5, icon: "❄️", desc: "Хүйтэн, үүлэрхэг" },
  Дархан: { baseTemp: -3, icon: "🌤️", desc: "Багавтар үүлтэй" },
  Эрдэнэт: { baseTemp: -6, icon: "🌨️", desc: "Цас орж байна" },
  "Шинэ Дели": { baseTemp: 28, icon: "☀️", desc: "Нарлаг, халуун" },
  Токио: { baseTemp: 15, icon: "🌧️", desc: "Хур бороотой" },
};

// HTML элементүүд авна
const citySelect = document.getElementById("citySelect");
const getWeatherBtn = document.getElementById("getWeatherBtn");

const cityName = document.getElementById("cityName");
const weatherIcon = document.getElementById("weatherIcon");
const temp = document.getElementById("temp");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

// Цаг агаарын мэдээг боловсруулах функц
function showWeather() {
  const selectedCity = citySelect.value;
  const cityData = weatherDatabase[selectedCity];

  // Санамсаргүй байдлаар градус болон бусад утгыг бага зэрэг өөрчилнө (Симуляци)
  const randomTempOffset = Math.floor(Math.random() * 5) - 2; // -2-оос +2 хооронд
  const currentTemp = cityData.baseTemp + randomTempOffset;
  const randomHumidity = Math.floor(Math.random() * 40) + 40; // 40-80% хооронд
  const randomWind = (Math.random() * 5 + 1).toFixed(1); // 1.0 - 6.0 м/с

  cityName.textContent = selectedCity;
  weatherIcon.textContent = cityData.icon;
  temp.textContent = `${currentTemp}°C`;
  description.textContent = cityData.desc;
  humidity.textContent = `${randomHumidity}%`;
  wind.textContent = `${randomWind} м/с`;
}

// Эхлэх үед нэг удаа ажиллуулна
showWeather();

// Товч дээр дарахад мэдээллийг шинэчилнэ
getWeatherBtn.addEventListener("click", showWeather);
