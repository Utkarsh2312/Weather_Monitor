const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  city: { type: String, required: true },
  temp: { type: Number, required: true },
  feels_like: { type: Number, required: true },
  condition: { type: String, required: true },
  humidity: { type: Number, required: true }, // Add humidity
  wind_speed: { type: Number, required: true }, // Add wind speed
  timestamp: { type: Date, default: Date.now, required: true },
});

const Weather = mongoose.model('Weather', weatherSchema);
module.exports = Weather;