async function getBooks(offset, limit) {
  return Books.find({})
    .skip(offset)
    .limit(limit);
}

async function countBooks() {
  return Books.countDocuments();
}