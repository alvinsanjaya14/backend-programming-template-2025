const getAllBooks = async (req, res) => {
  try {
    // Ambil query parameters dengan default values
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 10;

    // Dapatkan total jumlah buku
    const totalBooks = await Book.countDocuments();

    // Ambil buku dengan pagination
    const books = await Book.find()
      .skip(offset)
      .limit(limit);

    // Hitung halaman selanjutnya
    const nextOffset = offset + limit < totalBooks 
      ? offset + limit 
      : null;

    // Hitung halaman sebelumnya
    const prevOffset = offset > 0 
      ? Math.max(0, offset - limit)
      : null;

    res.json({
      count: totalBooks,
      next: nextOffset !== null 
        ? `/api/books?offset=${nextOffset}&limit=${limit}` 
        : null,
      previous: prevOffset !== null 
        ? `/api/books?offset=${prevOffset}&limit=${limit}` 
        : null,
      results: books
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching books', 
      error: error.message 
    });
  }
};