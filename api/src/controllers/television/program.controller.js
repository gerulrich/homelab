const Program = require('@app/models/television/program');

const getPrograms = async(req, res) => {
  const { limit = 25, offset = 0, q = '' } = req.query;
  const query = q ? { $text: { $search: q } } : {};
  const [total, programs] = await Promise.all([
    Program.countDocuments(query),
    Program.find(query).sort({ start: 1 }).limit(parseInt(limit)).skip(parseInt(offset))
  ]);
  res.json({
    items: programs,
    pagination: {
      total,
      limit: parseInt(limit),
      offset: parseInt(offset),
    }
  });
};

module.exports = {
  getPrograms
};
