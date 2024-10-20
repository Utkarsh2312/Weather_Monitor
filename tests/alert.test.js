const { sendAlert } = require('../utils/alert');
const nodemailer = require('nodemailer');

jest.mock('nodemailer');

describe('Alerting Thresholds', () => {
  let transporter;

  beforeAll(() => {
    // Mock the transporter object and its sendMail function
    transporter = {
      sendMail: jest.fn().mockResolvedValue({ response: 'Email sent' }),
    };
    nodemailer.createTransport.mockReturnValue(transporter);
  });

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
    process.env.EMAIL_USER = 'utkarshshrivastava784@gmail.com'; // Mock email user for testing
    process.env.ALERT_EMAIL = 'jeemains.advanced@gmail.com'; // Mock alert email for testing
  });

  it('should trigger an alert when temperature exceeds threshold', async () => {
    const alertMessage = 'Temperature exceeds threshold!';
    await sendAlert('Temperature Alert', alertMessage);

    expect(transporter.sendMail).toHaveBeenCalledWith({
      from: 'utkarshshrivastava784@gmail.com',
      to: 'jeemains.advanced@gmail.com',
      subject: 'Temperature Alert',
      text: 'Temperature exceeds threshold!',
    });
  });

  it('should trigger an alert when humidity exceeds threshold', async () => {
    const alertMessage = 'Humidity exceeds threshold!';
    await sendAlert('Humidity Alert', alertMessage);

    expect(transporter.sendMail).toHaveBeenCalledWith({
      from: 'utkarshshrivastava784@gmail.com',
      to: 'jeemains.advanced@gmail.com',
      subject: 'Humidity Alert',
      text: 'Humidity exceeds threshold!',
    });
  });

  it('should trigger an alert when wind speed exceeds threshold', async () => {
    const alertMessage = 'Wind speed exceeds threshold!';
    await sendAlert('Wind Speed Alert', alertMessage);

    expect(transporter.sendMail).toHaveBeenCalledWith({
      from: 'utkarshshrivastava784@gmail.com',
      to: 'jeemains.advanced@gmail.com',
      subject: 'Wind Speed Alert',
      text: 'Wind speed exceeds threshold!',
    });
  });
});
