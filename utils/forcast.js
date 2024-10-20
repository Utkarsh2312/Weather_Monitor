const axios = require('axios');

// Function to fetch weather forecast for a city
const fetchWeatherForecast = async (city) => {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
    );

    const forecastData = response.data.list.slice(0, 5); // Get 5-day forecast

    console.log(`5-Day Weather Forecast for ${city}:`);
    forecastData.forEach(entry => {
      const temperature = (entry.main.temp - 273.15).toFixed(2); // Convert to Celsius
      const condition = entry.weather[0].description;
      const humidity = entry.main.humidity;
      const windSpeed = entry.wind.speed;
      const forecastTime = new Date(entry.dt * 1000).toLocaleString('en-GB', {
        timeZone: 'Asia/Kolkata',
      });

      console.log(`
        Forecast for ${forecastTime}:
        - Temperature: ${temperature}°C
        - Condition: ${condition}
        - Humidity: ${humidity}%
        - Wind Speed: ${windSpeed} m/s
      `);
    });

  } catch (error) {
    console.error(`Error fetching weather forecast for ${city}:`, error);
  }
};

module.exports = { fetchWeatherForecast };
