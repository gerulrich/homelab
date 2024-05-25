require('module-alias/register');
require('dotenv').config();
const cron = require('node-cron');
const express = require('express');
const cors = require('cors');
const morgan = require('@app/middlewares/morgan');
const logger = require('@app/helpers/logger');
const { initializeMongoose, initializeSocketIO, initializeMQTT } = require('@app/config');
const { investmentJob } = require('@app/jobs');

console.log = (message) => logger.info(message);
console.error = (message) => logger.error(message);

const app = express();
const server = require('http').createServer(app);

initializeMongoose();
const io = initializeSocketIO(server, app);
app.set('socketio', io);
app.set('mqtt', initializeMQTT(io));

// middlewares
app.use(express.json());
app.use(morgan);
app.use(cors());

// routes
app.use('/auth', require('./routes/auth/auth.routes'));
app.use('/message', require('./routes/message'));
app.use('/investments/assets', require('./routes/investments/asset.routes.js'));
app.use('/investments/transaction', require('./routes/investments/transaction.routes.js'));

// HTTP 404 error handling
app.use((req, res, next) => {  
  res.status(404).json({ message: 'Route not found' });
});

// HTTP 500 error handling
app.use((err, req, res, next) => {  
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.NODE_PORT || 3000;

cron.schedule('*/10 10-17 * * 1-5', () => investmentJob());

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));