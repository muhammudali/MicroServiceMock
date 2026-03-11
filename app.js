// app.js
const express = require('express');
const { trace, SpanStatusCode } = require('@opentelemetry/api');

const app = express();
const port = process.env.PORT || 5000;
const environment = process.env.NODE_ENV || 'development';

// Initialize a tracer specific to this file/module
const tracer = trace.getTracer('hello-world-routes');

// Endpoint 1: The main "Hello World" route
app.get('/', (req, res) => {
  // Start an active span to track this specific block of logic
  tracer.startActiveSpan('process_hello_world', (span) => {
    try {


      res.json({
        message: 'Hello World from GCP Cloud Run!',
        environment: environment,
        timestamp: new Date().toISOString()
      });

      // Mark the span as successful
      span.setStatus({ code: SpanStatusCode.OK });

    } catch (error) {
      // Record the error details in the OpenTelemetry span
      span.recordException(error);
      span.setStatus({ 
        code: SpanStatusCode.ERROR, 
        message: error.message 
      });

      // Return a proper HTTP error response to the client
      res.status(500).json({ error: 'An internal server error occurred' });

    } finally {
      // CRITICAL: Always end the span in a finally block to prevent memory leaks
      span.end();
    }
  });
});

// Endpoint 2: A health check route
app.get('/health', (req, res) => {
  tracer.startActiveSpan('process_health_check', (span) => {
    try {
      // In a real app, you might check database connections here
      res.status(200).json({
        status: 'Healthy',
        service: 'hello-world-microservice',
        uptime: process.uptime()
      });
      
      span.setStatus({ code: SpanStatusCode.OK });

    } catch (error) {
      span.recordException(error);
      span.setStatus({ code: SpanStatusCode.ERROR, message: error.message });
      res.status(500).json({ error: 'Health check failed' });

    } finally {
      span.end();
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Microservice listening on port ${port}`);
});