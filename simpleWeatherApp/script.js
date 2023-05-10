const apiKey = "YOUR-API-KEY-HERE";
const cityInput = document.getElementById("city-input");
const getWeatherBtn = document.getElementById("get-weather-btn");
const weatherInfo = document.getElementById("weather-info");

// Function to fetch weather data from API
const fetchWeatherData = async () => {
  const city = cityInput.value;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const { name, main: { temp, feels_like, humidity } } = data;
    const weatherDescription = data.weather[0].description;
    const weatherHTML = `
      <div>
        <h2>${name}</h2>
        <p>Temperature: ${temp}°C</p>
        <p>Feels like: ${feels_like}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Description: ${weatherDescription}</p>
      </div>
    `;
    weatherInfo.innerHTML = weatherHTML;
    cityInput.value = ""; // Clear the input field
  } catch (error) {
    console.log("Error fetching weather data: ", error);
    weatherInfo.innerHTML = "<p>Unable to fetch weather data. Please try again later.</p>";
  }
}

// Add event listener for button click
getWeatherBtn.addEventListener("click", fetchWeatherData);

// Add event listener for Enter key press
cityInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    fetchWeatherData();
  }
});
