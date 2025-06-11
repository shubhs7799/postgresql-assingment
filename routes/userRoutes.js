const express = require('express');
const router = express.Router();
const pool = require('../db');

// Add user
router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;
    const result = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    console.log('Inserted user:', result.rows[0]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Insert Error:', err.message);
    res.status(500).send('Server error');
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error('Fetch Error:', err.message);
    res.status(500).send('Server error');
  }
});

// Update user by ID
router.put('/:id', async (req, res) => {
  try {
    const { name, email } = req.body;
    const { id } = req.params;
    const result = await pool.query(
      'UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *',
      [name, email, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send('User not found');
    }
    console.log('Updated user:', result.rows[0]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Update Error:', err.message);
    res.status(500).send('Server error');
  }
});

// Delete user by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'DELETE FROM users WHERE id=$1 RETURNING *',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send('User not found');
    }
    console.log('Deleted user:', result.rows[0]);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Delete Error:', err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
