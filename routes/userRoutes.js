const express = require('express');
const router = express.Router();
const User = require('../models/user');

// CREATE - Add a new user
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    console.log('User created:', user.toJSON());
    res.status(201).json(user);
  } catch (err) {
    console.error('Create error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// READ - Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error('Fetch error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// UPDATE - Update user by ID
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await User.update(req.body, {
      where: { id: req.params.id }
    });

    if (updated === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updatedUser = await User.findByPk(req.params.id);
    console.log('User updated:', updatedUser.toJSON());
    res.json(updatedUser);
  } catch (err) {
    console.error('Update error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// DELETE - Delete user by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });

    if (deleted === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log(`User with ID ${req.params.id} deleted`);
    res.json({ message: 'User deleted' });
  } catch (err) {
    console.error('Delete error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
