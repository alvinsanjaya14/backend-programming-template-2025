const bcrypt = require('bcryptjs'); // Ganti dari bcrypt ke bcryptjs

async function hashPassword(password) {
  const saltRounds = 10; // Turunkan dari 16 ke 10 (aman untuk kebanyakan kasus)
  return await bcrypt.hash(password, saltRounds); // Langsung gunakan async/await
}

async function passwordMatched(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword); // Gunakan async version
}

module.exports = {
  hashPassword,
  passwordMatched
};