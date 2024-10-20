const express = require('express');
const cron = require('node-cron');
const connectDB = require('./utils/db');
const { fetchWeatherData } = require('./utils/fetchWeather');
const { calculateDailySummary } = require('./utils/dailySummary');
const { fetchWeatherForecast } = require('./utils/forcast'); 
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// List of cities to fetch weather data from
const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

// Function to fetch weather data for all cities
const fetchWeatherForAllCities = async () => {
  for (const city of cities) {
    console.log(`Fetching weather data for ${city}...`);
    await fetchWeatherData(city);
    console.log(`Finished fetching weather data for ${city}.\n`);
  }
};

// Schedule weather data fetching every 5 minutes using node-cron
cron.schedule('*/5 * * * *', fetchWeatherForAllCities); // Every 5 minutes

// Function to calculate daily summaries for all cities
const calculateSummaryForAllCities = async () => {
  for (const city of cities) {
    console.log(`Calculating daily summary for ${city}...`);
    await calculateDailySummary(city);
    console.log(`Daily summary calculated for ${city}.\n`);
  }
};

// Schedule daily summary calculation at 11:59 PM
cron.schedule('59 23 * * *', calculateSummaryForAllCities); // Every day at 11:59 PM

// Function to fetch weather forecast for all cities
const fetchForecastForAllCities = async () => {
  for (const city of cities) {
    console.log(`Fetching forecast for ${city}...`);
    await fetchWeatherForecast(city);
    console.log(`Finished fetching forecast for ${city}.\n`);
  }
};

// Schedule weather forecast fetching every 12 hours using node-cron
cron.schedule('0 */12 * * *', fetchForecastForAllCities); // Every 12 hours

// Initial run to fetch current weather data and forecast
const runInitialFetch = async () => {
  await fetchWeatherForAllCities();
  await fetchForecastForAllCities();
};

// Execute the initial fetch
runInitialFetch();

app.listen(port, () => {
  console.log(`Weather monitoring app running on port ${port}`);
});
