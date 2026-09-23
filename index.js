function processWeatherData(weatherData) {
  const city = weatherData?.location?.name
    ? String(weatherData.location.name).trim()
    : "";
  const country = weatherData?.location?.country
    ? String(weatherData.location.country).trim()
    : "";

  const rawAQ =
    weatherData?.current?.air_quality ||
    weatherData?.location?.air_quality ||
    {};
  const air_quality = {
    co: Number(rawAQ.co) || 0,
    no2: Number(rawAQ.no2) || 0,
    o3: Number(rawAQ.o3) || 0,
    so2: Number(rawAQ.so2) || 0,
    pm2_5: Number(rawAQ.pm2_5) || 0,
    pm10: Number(rawAQ.pm10) || 0,
    "us-epa-index": Number(rawAQ["us-epa-index"]) || 0,
    "gb-defra-index": Number(rawAQ["gb-defra-index"]) || 0,
  };

  const rawForecast = weatherData?.forecast?.forecastday || [];

  const forecast = rawForecast.slice(0, 3).map((item) => {
    const day = item.day || {};
    return {
      date: item.date || "",
      mintemp_c: Number(day.mintemp_c) || 0,
      maxtemp_c: Number(day.maxtemp_c) || 0,
      condition: day.condition?.text ? String(day.condition.text).trim() : "",
    };
  });

  let totalTemp = 0;
  let totalPrecip = 0;
  let maxWindSpeed = 0;
  let totalHoursCount = 0;

  rawForecast.slice(0, 3).forEach((dayObj) => {
    const hours = dayObj.hour || [];
    hours.forEach((hourObj) => {
      const temp = Number(hourObj.temp_c) || 0;
      const precip = Number(hourObj.precip_mm) || 0;
      const wind = Number(hourObj.wind_kph) || 0;

      totalTemp += temp;
      totalPrecip += precip;
      if (wind > maxWindSpeed) {
        maxWindSpeed = wind;
      }
      totalHoursCount++;
    });
  });

  const average_temperature =
    totalHoursCount > 0 ? totalTemp / totalHoursCount : 0;
  const total_precipitation = totalPrecip;

  return {
    city,
    country,
    air_quality,
    forecast,
    average_temperature,
    total_precipitation,
    max_wind_speed: maxWindSpeed,
  };
}

const weatherDatabase = {
  Ulaanbaatar: { baseTemp: -5, icon: "❄️", desc: "Cold and cloudy" },
  Moscow: { baseTemp: 2, icon: "🌨️", desc: "Light snow" },
  Tokyo: { baseTemp: 16, icon: "🌧️", desc: "Moderate rain" },
  Beijing: { baseTemp: 12, icon: "🌤️", desc: "Partly cloudy" },
  Seoul: { baseTemp: 10, icon: "☀️", desc: "Sunny and clear" },
};

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
  const citySelect = document.getElementById("citySelect");
  const cityName = document.getElementById("cityName");
  const dateInfo = document.getElementById("dateInfo");
  const weatherIcon = document.getElementById("weatherIcon");
  const temp = document.getElementById("temp");
  const description = document.getElementById("description");
  const humidity = document.getElementById("humidity");
  const wind = document.getElementById("wind");

  if (!citySelect) return;

  const selectedCity = citySelect.value;
  const cityData = weatherDatabase[selectedCity];

  if (!cityData) return;

  const randomTempOffset = Math.floor(Math.random() * 5) - 2;
  const currentTemp = cityData.baseTemp + randomTempOffset;
  const randomHumidity = Math.floor(Math.random() * 40) + 40;
  const randomWind = (Math.random() * 5 + 1).toFixed(1);

  if (cityName) cityName.textContent = selectedCity;
  if (dateInfo) dateInfo.textContent = getCurrentDate();
  if (weatherIcon) weatherIcon.textContent = cityData.icon;
  if (temp) temp.textContent = `${currentTemp}°C`;
  if (description) description.textContent = cityData.desc;
  if (humidity) humidity.textContent = `${randomHumidity}%`;
  if (wind) wind.textContent = `${randomWind} m/s`;
}

document.addEventListener("DOMContentLoaded", () => {
  const getWeatherBtn = document.getElementById("getWeatherBtn");
  const citySelect = document.getElementById("citySelect");

  if (getWeatherBtn) {
    getWeatherBtn.addEventListener("click", showWeather);
  }

  if (citySelect) {
    citySelect.addEventListener("change", showWeather);
  }

  showWeather();
});
