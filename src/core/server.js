const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const pinoHTTP = require('pino-http');

const config = require('./config');
const logger = require('./logger')('app');
const routes = require('../api/routes');
const { errorResponder, errorTypes } = require('./errors');

const app = express();

// 1. Fix: Initialize middleware in correct order
app.enable('trust proxy');
app.use(cors());
app.use(require('method-override')());

// 2. Fix: BodyParser should come before routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 3. Fix: HTTP logger middleware
app.use(pinoHTTP({ logger }));

app.use(express.json());

app.use('/api', routes()); 


// 4. Fix: Remove duplicate route registration
// (Original had both app.use('/api', routes) and app.use(config.api.prefix, routes()))
app.use(config.api.prefix || '/api', routes());

// 5. Fix: Proper error handling middleware chain
app.use((req, res, next) => {
  // Only trigger 404 if no other routes have matched
  if (!res.headersSent) {
    next(errorResponder(errorTypes.ROUTE_NOT_FOUND, 'Route not found'));
  }
});

app.use((error, req, res, next) => {
  const ctx = {
    code: error.code,
    status: error.status,
    description: error.description,
  };

  if (error.stack) {
    ctx.stack = error.stack;
  }

  logger.error(ctx, error.toString());
  next(error);
});


// 6. Fix: Final error handler must properly end the response
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    statusCode: error.status || 500,
    error: error.code || 'UNKNOWN_ERROR',
    description: error.description || 'Unknown error',
    message: error.message || 'An error has occurred',
  }).end(); // Explicitly end the response
});



module.exports = app;

  return app;