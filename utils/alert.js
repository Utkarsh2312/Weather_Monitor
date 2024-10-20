const nodemailer = require('nodemailer');

// Function to send an email alert
const sendAlert = async (subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ALERT_EMAIL,
      subject: subject,
      text: message,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Alert email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { sendAlert };
