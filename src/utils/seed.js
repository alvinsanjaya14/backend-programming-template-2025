const User = require('../models/users');

const seedUsers = async () => {
  try {
    await User.deleteMany();

    const testUser = await User.create({
      email: 'test@example.com',
      password: 'password123', // Akan di-hash otomatis
      name: 'Test User',
    });

    console.log('Database seeded successfully!');
    console.log('Test user created:', {
      email: testUser.email,
      name: testUser.name,
    });
  } catch (err) {
    console.error('Seeding error:', err);
  }
};

// // Jalankan jika file dipanggil langsung
// if (require.main === module) {
//   require('../config/database')()
//     .then(seedUsers)
//     .catch(console.error);
// }

module.exports = seedUsers;
