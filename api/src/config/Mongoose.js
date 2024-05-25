const mongoose = require('mongoose');

const initializeMongoose = () => {
  mongoose.connect(process.env.MONGODB, {  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'Database connection error:'));
  db.once('open', () => console.log('Successful database connection'));
};

module.exports = initializeMongoose;