async function getUsers(offset = 0, limit = 10) {
  return usersRepository.getUsers(offset, limit);
}

async function countUsers() {
  return usersRepository.countUsers();
}