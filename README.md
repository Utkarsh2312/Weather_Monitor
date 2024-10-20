# Weather Monitoring Application

This is a **Real-Time Weather Monitoring System** that fetches weather data from the OpenWeather API and sends alerts based on predefined thresholds for temperature, humidity, and wind speed. The app also calculates daily weather summaries and stores them in a MongoDB database.

## Features
- **Real-time weather data** fetching using the OpenWeather API.
- **Email alerts** for specific weather conditions (e.g., temperature, wind speed).
- **Daily weather summary** including average temperature, highest/lowest temperatures, and dominant weather conditions.
- **MongoDB integration** for persistent storage of weather data.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:
- **Node.js** (v12+)
- **MongoDB** (v4.2+)
- **npm** (Node Package Manager)
- **Git**
- **An OpenWeatherMap API key**
- **Email credentials for sending alerts**

## Tech Stack

- **Node.js**: Back-end runtime environment for building server-side logic.
- **Express.js**: Web framework for Node.js to handle routes and API endpoints.
- **MongoDB**: NoSQL database for storing weather data and daily summaries.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **OpenWeather API**: External weather data provider for real-time weather updates.
- **Nodemailer**: Library for sending weather alerts via email.
- **Axios**: HTTP client for making API requests to the OpenWeather API.
- **Jest**: Testing framework for writing unit and integration tests.


### Setting up MongoDB
To run MongoDB locally:
1. Install MongoDB from [MongoDB Download Center](https://www.mongodb.com/try/download/community).
2. Start MongoDB:
   - On Windows: Run `mongod` from the command line.
   - On macOS/Linux: Use `brew services start mongodb-community` (if installed via Homebrew) or simply run `mongod`.
3. You can connect to MongoDB using its default URI:
   ```bash
   mongodb://localhost:27017

### Installation
1. Clone the repository:
- git clone https://github.com/Utkarsh2312/Weather_Monitor.git
- cd weather-monitor

2. Install dependencies:
- npm install

3. Set up environment variables:
- Create a .env file in the root directory of the project and add the following content:

- OPENWEATHER_API_KEY=your_openweather_api_key
- EMAIL_USER=your_email_user
- EMAIL_PASS=your_email_password (This should me app password for your gmail account)
- ALERT_EMAIL=email_to_receive_alerts
- MONGO_URI=mongodb://localhost:27017/weather-monitor

- Replace each placeholder (your_openweather_api_key, etc.) with your actual values.

### Running the Application
1. Start MongoDB (if it's not already running):
- mongod
Ensure that MongoDB is running on the default port 27017.
You can use the connection string mongodb://localhost:27017/weather-monitor in your .env file for local development.

2. Start the application:
- npm start
The server will start, and the application will begin fetching weather data and sending alerts as configured.

### Testing
The application has several unit tests and integration tests. You can run them using:
- npm test

***Available Tests:***
- System Setup Tests: Ensures proper setup and connection with the OpenWeatherMap API.
- Data Retrieval Tests: Verifies correct fetching and processing of weather data.
- Alerting Tests: Ensures email alerts are sent under defined thresholds.


***Common Issues***
- MongoDB Connection Error: Ensure MongoDB is running on the correct port and the MONGO_URI is correctly defined in your .env file.
- Email Alert Issues: Check that the EMAIL_USER, EMAIL_PASS, and ALERT_EMAIL are properly configured and that your email provider allows less secure apps or app-specific passwords.