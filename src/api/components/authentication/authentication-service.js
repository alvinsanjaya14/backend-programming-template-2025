const authRepository = require('./authentication-repository');
const bcrypt = require('bcrypt');
const User = require('./../../../models/users');

  async function verifyLoginCredentials(email, password) {
  // 1. Cari user by email
  const user = await User.findOne({ email }).select('+password');
  
  // 2. Jika user tidak ditemukan
  // if (!user || !user.password) {
  if (!user) {
    return { success: false, message: 'Email not registered' };
  }

  // 3. Verifikasi password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  
  // 4. Jika password salah
  // if (!isPasswordValid) {
  //   return { success: false, message: 'Incorrect password' };
  // }

  // 5. Jika sukses
  return {
    success: true,
    data: {
      id: user._id,
      email: user.email,
      name: user.name
    }
  };
}

module.exports = { verifyLoginCredentials };