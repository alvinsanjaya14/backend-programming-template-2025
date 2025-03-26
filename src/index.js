const { env, port } = require('./core/config');
const logger = require('./core/logger')('app');
const server = require('./core/server');
const express = require('express');
const routes = require('./api/routes');

const index = express();

// Pasang middleware
index.use(express.json());

// Pasang routes
routes(index); // Perhatikan ini diubah

const app = server.listen(port, (err) => {
  if (err) {
    logger.fatal(err, 'Failed to start the server.');
    process.exit(1);
  } else {
    logger.info(`Server runs at port ${port} in ${env} environment`);
  }
});

process.on('uncaughtException', (err) => {
  logger.fatal(err, 'Uncaught exception.');

  // Shutdown the server gracefully
  app.close(() => process.exit(1));

  // If a graceful shutdown is not achieved after 1 second,
  // shut down the process completely
  setTimeout(() => process.abort(), 1000).unref();
  process.exit(1);
});
