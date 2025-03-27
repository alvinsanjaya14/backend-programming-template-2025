const express = require('express');
const router = express.Router();
const usersController = require('./users-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/users', route);

  // Get list of users
  route.get('/', usersController.getUsers);

  // Create a new user
  route.post('/', usersController.createUser);

  // Update user
  route.put('/:id', usersController.updateUser);

  // Change password
  route.put('/:id/change-password', usersController.changePassword);

  // Delete user
  route.delete('/:id', usersController.deleteUser);
  
  router.get('/', usersController.getAllUsers);
  router.put('/:id/change-password', usersController.changePassword);
  router.delete('/:id', usersController.deleteUser);

  module.exports = router;
};
