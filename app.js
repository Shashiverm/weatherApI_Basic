// Replace 'YOUR_API_KEY' with your actual API key from OpenWeatherMap
const API_KEY = 'fe2fc0f8564a9778bbc6f1038a2de75b'


// Get the necessary DOM elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherInfo = document.getElementById('weather-info');

// Add an event listener to the search button
searchBtn.addEventListener('click', fetchWeatherData);

// Function to fetch weather data from the API
function fetchWeatherData() {
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