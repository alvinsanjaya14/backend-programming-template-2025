const authService = require('./authentication-service');
const { errorResponder, errorTypes } = require('../../../core/errors');
const { verifyLoginCredentials } = require('./authentication-service');


async function login(request, response, next) {
  try {
    const { email, password } = request.body;

    // 1. Validasi input
    if (!email) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Both email and password are required'
      );
    }

    // 2. Verifikasi credentials
    const result = await verifyLoginCredentials(email, password);

    // 3. Handle failed login
    if (!result.success) {
      throw errorResponder(
        errorTypes.INVALID_CREDENTIALS,
        result.message
      );
    }

    // 4. Response sukses
    return response.status(200).json({
      status: 'success',
      message: 'Login successful',
      data: result.data
    });

  } catch (error) {
    return next(error);
  }
}

module.exports = { login };