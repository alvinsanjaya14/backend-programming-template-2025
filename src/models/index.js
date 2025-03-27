const express = require('express');
const mongoose = require('mongoose');
const routes = require('./api/routes');

// 1. Inisialisasi Express
const app = express();

// 2. Koneksi Database
// mongoose.connect('mongodb://localhost:27017/yourdb', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// 3. Middleware
app.use(express.json());

// 4. Routes
routes(app);

// 5. Error Handling
app.use((err, req, res, next) => {
  res.status(500).json({
    statusCode: 500,
    error: err.name || 'UNKNOWN_ERROR',
    message: err.message
  });
});

// 6. Start Server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
  console.log('Available routes:');
  console.log('- GET /api/books');
  console.log('- GET /api/users');
});