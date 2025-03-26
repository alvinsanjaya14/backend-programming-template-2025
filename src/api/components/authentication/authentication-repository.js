const User = require('../../../models/users');

async function getUserByEmail(email) {
  return User.findOne({ email });
}

module.exports = {
  getUserByEmail,
};
