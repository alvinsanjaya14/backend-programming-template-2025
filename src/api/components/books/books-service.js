async function getBooks(offset = 0, limit = 10) {
  return booksRepository.getBooks(offset, limit);
}

async function countBooks() {
  return booksRepository.countBooks();
}