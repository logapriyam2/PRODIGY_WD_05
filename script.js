const apiKey = '6e1854155d2c4ae825d41e3981837e4c'; // Replace with your new OpenWeatherMap API key

async function getWeatherByLocation() {
  const location = document.getElementById('location-input').value.trim(); // added trim() to remove whitespace
  if (!location) {
    alert('Please enter a location');
    return;
  }
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) { // added check for HTTP status code
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.cod !== 200) {
      alert(data.message);
      return;
    }
    displayWeather(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    alert('Error fetching weather data');
  }
}

function displayWeather(data) {
  const weatherResult = document.getElementById('weather-result');
  weatherResult.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
    <p><strong>Weather:</strong> ${data.weather[0].description}</p>
    <p><strong>Humidity:</strong> ${data.main.humidity} %</p>
    <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
  `;

  // Change background based on weather conditions
  const weatherDescription = data.weather[0].main.toLowerCase();
  document.body.className = ''; // Reset all classes
  if (weatherDescription.includes('clear')) {
    document.body.classList.add('sunny');
    // Add sun animation or effect
    weatherResult.innerHTML += `<div class="sun"></div>`;
  } else if (weatherDescription.includes('clouds')) {
    document.body.classList.add('cloudy');
    // Add clouds animation or effect
    weatherResult.innerHTML += `<div class="cloud"></div>`;
  } else if (weatherDescription.includes('rain')) {
    document.body.classList.add('rainy');
    // Add rain animation or effect
    weatherResult.innerHTML += `<div class="rain"></div>`;
  } else if (weatherDescription.includes('snow')) {
    document.body.classList.add('snowy');
    // Add snow animation or effect
    weatherResult.innerHTML += `<div class="snowflake"></div>`;
  } else if (weatherDescription.includes('haze')) {
    document.body.classList.add('haze');
  }
}

// Initialize with a default background image or color
document.addEventListener('DOMContentLoaded', function () {
  // Set a default background image or color
  // Example: document.body.style.backgroundImage = 'url("images/default-background.jpg")';
  // Adjust based on your design preferences
});
