const { fetchWeatherData } = require('../utils/fetchWeather');
const axios = require('axios');

jest.mock('axios');

describe('System Setup', () => {
    it('should start successfully and connect to OpenWeatherMap API', async () => {
        const mockResponse = {
            data: {
                main: {
                    temp: 300.0,
                    feels_like: 298.0,
                    humidity: 60,
                },
                weather: [
                    { description: 'Clear' }
                ],
                wind: {
                    speed: 5,
                },
                dt: 1697842200,
            },
        };
        axios.get.mockResolvedValue(mockResponse);

        const result = await fetchWeatherData('Delhi');

        expect(result).toBeDefined(); // Ensure result is defined
        expect(result.temp).toBeCloseTo(26.85, 2); // Kelvin to Celsius
        expect(result.windSpeed).toBe(5); // Wind speed
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('Delhi'));
    });

    it('should handle errors when API call fails', async () => {
        axios.get.mockRejectedValue(new Error('API call failed'));

        const result = await fetchWeatherData('Delhi');

        expect(result).toBeNull(); // Should return null on error
    });
});
