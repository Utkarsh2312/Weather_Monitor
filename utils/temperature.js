// Function to convert temperature from Kelvin to Celsius
const convertKelvinToCelsius = (kelvin) => {
  const celsius =  kelvin - 273.15;
  return parseFloat(celsius.toFixed(2)); // returns a number with 2 decimal precision
};

module.exports = { convertKelvinToCelsius };