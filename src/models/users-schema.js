module.exports = (db) =>
  db.model(
    'src/api/components/authentication/users.js',
    db.Schema({
      email: String,
      password: String,
      fullName: String,
    })
  );
