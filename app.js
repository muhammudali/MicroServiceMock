const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const environment = process.env.NODE_ENV || 'development';

// Endpoint 1: The main "Hello World" route
app.get('/', (req, res) => {
  res.json({
    message: 'Hello World from GCP Cloud Run!',
    environment: environment,
    timestamp: new Date().toISOString()
  });
});

// Endpoint 2: A health check route (Best Practice for Cloud deployments)
app.get('/health', (req, res) => {
  // In a real app, you might check database connections here
  res.status(200).json({
    status: 'Healthy',
    service: 'hello-world-microservice',
    uptime: process.uptime()
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Microservice listening on port ${port}`);
});