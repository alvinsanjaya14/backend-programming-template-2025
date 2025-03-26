async function getUsers(offset, limit) {
  return Users.find({})
    .skip(offset)
    .limit(limit)
    .select('-password'); // Exclude sensitive data
}

async function countUsers() {
  return Users.countDocuments();
}