//shashiverm
//replce with you api
const API_KEY = 'fe2fc0f8564a9778bbc6f1038a2de75b';

// Get the necessary DOM elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const getLocationBtn = document.getElementById('get-location-btn');
const weatherInfo = document.getElementById('weather-info');

// Add event listeners
searchBtn.addEventListener('click', fetchWeatherDataByCity);
getLocationBtn.addEventListener('click', fetchWeatherDataByLocation);

// Function to fetch weather data by city name
function fetchWeatherDataByCity() {
  const city = cityInput.value;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      displayWeatherData(data);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      weatherInfo.innerHTML = 'Error fetching weather data.';
    });
}

// Function to fetch weather data by user's location
function fetchWeatherDataByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    weatherInfo.innerHTML = 'Geolocation is not supported by this browser.';
  }
}

function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      displayWeatherData(data);
    })
    .catch(error => {
      weatherInfo.innerHTML = 'An error occurred while fetching weather data.';
      console.error('Error:', error);
    });
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      weatherInfo.innerHTML = 'User denied the request for Geolocation.';
      break;
    case error.POSITION_UNAVAILABLE:
      weatherInfo.innerHTML = 'Location information is unavailable.';
      break;
    case error.TIMEOUT:
      weatherInfo.innerHTML = 'The request to get user location timed out.';
      break;
    case error.UNKNOWN_ERROR:
      weatherInfo.innerHTML = 'An unknown error occurred.';
      break;
  }
}

// Function to display the weather data on the page
function displayWeatherData(data) {
  if (data.cod === 200) {
    const { name, weather, main } = data;
    const { description, icon } = weather[0];
    const { temp, humidity } = main;
    const iconUrl = `https://openweathermap.org/img/w/${icon}.png`;
    const weatherHTML = `
      <h2>${name}</h2>
      <img src="${iconUrl}" alt="${description}">
      <p>${description}</p>
      <p>Temperature: ${temp}&deg;C</p>
      <p>Humidity: ${humidity}%</p>
    `;
    weatherInfo.innerHTML = weatherHTML;
  } else {
    weatherInfo.innerHTML = 'Error: Could not fetch weather data.';
  }
}
