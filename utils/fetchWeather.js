const axios = require('axios');
const Weather = require('../models/Weather');
const { convertKelvinToCelsius } = require('./temperature');
const { sendAlert } = require('./alert');

// Object to store the last sent alert for each city and condition
const lastAlerts = {};

const fetchWeatherData = async (city) => {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );

    const data = response.data;

    // Extract relevant data
    const weatherCondition = data.weather[0].description; // Get description
    const temperature = convertKelvinToCelsius(data.main.temp);
    const feelsLike = convertKelvinToCelsius(data.main.feels_like);
    const humidity = data.main.humidity; // Humidity in percentage
    const windSpeed = data.wind.speed; // Wind speed in m/s

    // Convert UNIX timestamp to Date object and format it
    const timestamp = new Date(data.dt * 1000); // From seconds to milliseconds
    const formattedTimestamp = timestamp.toLocaleString('en-GB', {
      timeZone: 'Asia/Kolkata',
    });

    // Log the fetched data to the console
    console.log(` City: ${city}:`);
    console.log(` Temperature: ${temperature}°C`);
    console.log(` Feels Like: ${feelsLike}°C`);
    console.log(` Condition: ${weatherCondition}`);
    console.log(` Humidity: ${humidity}%`);
    console.log(` Wind Speed: ${windSpeed} m/s`);
    console.log(` Timestamp: ${formattedTimestamp}`);

    // Save data to MongoDB
    const weather = new Weather({
      city: city,
      temp: temperature,
      feels_like: feelsLike,
      condition: weatherCondition,
      humidity: humidity,
      wind_speed: windSpeed,
      timestamp: timestamp,
    });

    await weather.save();
    console.log(`Weather data for ${city} saved successfully.\n`);

    // Check and send alerts if necessary
    const tempThreshold = 25; // Temperature threshold for alerts
    const humidityThreshold = 70; // Humidity threshold for alerts
    const windSpeedThreshold = 5; // Wind speed threshold for alerts

    // Unique keys for alerts
    const tempAlertKey = `${city}-temp-${tempThreshold}`;
    const humidityAlertKey = `${city}-humidity-${humidityThreshold}`;
    const windSpeedAlertKey = `${city}-wind-${windSpeedThreshold}`;

    // Send temperature alerts
    if (temperature > tempThreshold) {
      const alertMessage = `Temperature in ${city} is ${temperature}°C, exceeding threshold of ${tempThreshold}°C.`;
      if (lastAlerts[tempAlertKey] !== true) {
        await sendAlert('Temperature Alert', alertMessage);
        lastAlerts[tempAlertKey] = true;
      }
    } else {
      lastAlerts[tempAlertKey] = false;
    }

    // Send humidity alerts
    if (humidity > humidityThreshold) {
      const alertMessage = `Humidity in ${city} is ${humidity}%, exceeding threshold of ${humidityThreshold}%.`;
      if (lastAlerts[humidityAlertKey] !== true) {
        await sendAlert('Humidity Alert', alertMessage);
        lastAlerts[humidityAlertKey] = true;
      }
    } else {
      lastAlerts[humidityAlertKey] = false;
    }

    // Send wind speed alerts
    if (windSpeed > windSpeedThreshold) {
      const alertMessage = `Wind speed in ${city} is ${windSpeed} m/s, exceeding threshold of ${windSpeedThreshold} m/s.`;
      if (lastAlerts[windSpeedAlertKey] !== true) {
        await sendAlert('Wind Speed Alert', alertMessage);
        lastAlerts[windSpeedAlertKey] = true;
      }
    } else {
      lastAlerts[windSpeedAlertKey] = false;
    }

  } catch (error) {
    console.error(`Error fetching weather data for ${city}:`, error);
  }
};

module.exports = { fetchWeatherData };
