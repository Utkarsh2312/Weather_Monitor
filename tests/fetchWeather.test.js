const { fetchWeatherData } = require('../utils/fetchWeather');
const axios = require('axios');

// Mocking axios
jest.mock('axios');

describe('Data Retrieval', () => {
    it('should retrieve and parse weather data correctly', async () => {
        // Mock API response
        const mockResponse = {
            data: {
                main: {
                    temp: 300.0, // 26.85°C
                    feels_like: 298.0, // 24.85°C
                    humidity: 60,
                },
                weather: [
                    { description: 'Clear' }
                ],
                wind: {
                    speed: 5,
                },
                dt: 1697842200, // Example timestamp
            },
        };
        axios.get.mockResolvedValue(mockResponse);

        const weather = await fetchWeatherData('Mumbai');

        expect(weather).toBeDefined(); // Check that weather is defined
        expect(weather.temp).toBeCloseTo(26.85, 2); // Kelvin to Celsius
        expect(weather.feels_like).toBeCloseTo(24.85, 2);
        expect(weather.condition).toBe('Clear');
        expect(weather.humidity).toBe(60);
    });

    it('should handle errors when fetching weather data', async () => {
        axios.get.mockRejectedValue(new Error('API call failed'));

        const weather = await fetchWeatherData('Mumbai');

        expect(weather).toBeNull(); // Expect null if there's an error
    });
});
