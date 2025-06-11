const express = require('express');
const router = express.Router();
const pool = require('../db');

// Add bus
router.post('/', async (req, res) => {
  try {
    const { name, available_seats } = req.body;
    const result = await pool.query(
      'INSERT INTO buses (name, available_seats) VALUES ($1, $2) RETURNING *',
      [name, available_seats]
    );
    console.log('Inserted bus:', result.rows[0]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Insert Error:', err.message);
    res.status(500).send('Server error');
  }
});

// Get buses by seat availability
router.get('/available/:seats', async (req, res) => {
  try {
    const { seats } = req.params;
    const result = await pool.query(
      'SELECT * FROM buses WHERE available_seats > $1',
      [seats]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Fetch Error:', err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
