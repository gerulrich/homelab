const Program = require('@app/models/television/program');

const getPrograms = async(req, res) => {
  const user_level = req.user.level;
  const { limit = 25, offset = 0, q = '' } = req.query;
  const query = q ? {
    $and: [ { $text: { $search: q } }, { 'plan.level': { $lte: user_level } }]
  } : { 'plan.level': { $lte: user_level } };
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

const getProgramById = async(req, res) => {
  const { id } = req.params;
  const program = await Program.findById(id);
  if (!program) {
    return res.status(404).json({msg: 'program not found'});
  }
  res.json(program);
};

module.exports = {
  getPrograms,
  getProgramById
};
