const Weather = require('../models/Weather');

// Function to calculate daily summary for a specific city
const calculateDailySummary = async (city) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const weatherData = await Weather.find({
      city: city,
      timestamp: { $gte: today }
    });

    if (weatherData.length === 0) return console.log(`No data for ${city} today.`);

    const tempSum = weatherData.reduce((sum, record) => sum + record.temp, 0);
    const maxTemp = Math.max(...weatherData.map(record => record.temp));
    const minTemp = Math.min(...weatherData.map(record => record.temp));

    const dominantCondition = weatherData
      .map(record => record.condition)
      .reduce((acc, condition) => {
        acc[condition] = (acc[condition] || 0) + 1;
        return acc;
      }, {});

    const mostFrequentCondition = Object.keys(dominantCondition).reduce((a, b) => dominantCondition[a] > dominantCondition[b] ? a : b);

    console.log(`
      Daily Summary for ${city}:
      - Average Temperature: ${(tempSum / weatherData.length).toFixed(2)}°C
      - Maximum Temperature: ${maxTemp}°C
      - Minimum Temperature: ${minTemp}°C
      - Dominant Weather Condition: ${mostFrequentCondition}
    `);

  } catch (error) {
    console.error('Error calculating daily summary:', error);
  }
};

module.exports = { calculateDailySummary };
