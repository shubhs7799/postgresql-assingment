const sequelize = require('./config/database');
const User = require('./models/user');

async function connectAndSync() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to PostgreSQL');

    await sequelize.sync({ force: true }); // creates the table, drops if exists
    console.log('✅ User table created');

    // Optional: Insert sample data
    await User.create({ name: 'Virat Kohli', email: 'virat.kohli@example.com' });
    console.log('✅ Sample user inserted');
  } catch (error) {
    console.error('❌ Connection error:', error);
  } finally {
    await sequelize.close();
  }
}

connectAndSync();
