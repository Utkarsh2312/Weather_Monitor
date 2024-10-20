const { calculateDailySummary } = require('../utils/dailySummary');
const { fetchWeatherData } = require('../utils/fetchWeather');
const Weather = require('../models/Weather');

jest.mock('../utils/fetchWeather');

describe('Daily Weather Summary', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should calculate daily summary correctly', async () => {
    const mockResponses = [
      { temp: 25, condition: 'Sunny' },
      { temp: 28, condition: 'Cloudy' },
      { temp: 22, condition: 'Rainy' }
    ];

    Weather.find.mockReturnValue(Promise.resolve(mockResponses));

    await calculateDailySummary('Delhi');

    expect(calculateDailySummary).toHaveBeenCalledWith('Delhi');
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Daily Summary for Delhi'));
  });
});
