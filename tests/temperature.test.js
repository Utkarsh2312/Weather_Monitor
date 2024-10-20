// Temperature Conversion: Test Kelvin to Celsius conversion
const { convertKelvinToCelsius } = require('../utils/temperature');

describe('Temperature Conversion', () => {
    it('should correctly convert Kelvin to Celsius', () => {
        const tempInKelvin = 300;
        const tempInCelsius = convertKelvinToCelsius(tempInKelvin);
        expect(tempInCelsius).toBeCloseTo(26.85); // (300 - 273.15)
    });
});