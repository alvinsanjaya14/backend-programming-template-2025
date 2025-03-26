const getAllUsers = async (req, res) => {
  try {
    // Ambil query parameters dengan default values
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 10;

    // Dapatkan total jumlah users
    const totalUsers = await User.countDocuments();

    // Ambil users dengan pagination
    const users = await User.find()
      .skip(offset)
      .limit(limit)
      .select('-password'); // Exclude password field

    // Hitung halaman selanjutnya
    const nextOffset = offset + limit < totalUsers 
      ? offset + limit 
      : null;

    // Hitung halaman sebelumnya  
    const prevOffset = offset > 0 
      ? Math.max(0, offset - limit)
      : null;

    res.json({
      count: totalUsers,
      next: nextOffset !== null 
        ? `/api/users?offset=${nextOffset}&limit=${limit}` 
        : null,
      previous: prevOffset !== null 
        ? `/api/users?offset=${prevOffset}&limit=${limit}` 
        : null,
      results: users
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching users', 
      error: error.message 
    });
  }
};