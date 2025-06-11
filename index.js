const express = require('express');
const app = express();
require('dotenv').config();
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const User = require('./models/user');

app.use(express.json());
app.use('/users', userRoutes);

// Sync and start server
async function start() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to PostgreSQL');

    await sequelize.sync(); // set { force: true } to reset tables
    console.log('✅ Tables synced');

    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
    });
  } catch (err) {
    console.error('❌ Error starting server:', err);
  }
}

start();
