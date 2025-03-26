const express = require('express');
const books = require('./components/books/books-route');
const auth = require('./components/authentication/authentication-route');
const user = require('./components/users/users-route');


module.exports = () => {
  const router = express.Router();

  
  // Contoh pendaftaran route yang benar
  router.use('/books', books);
  router.use('/auth', auth);
  

  return router;
};