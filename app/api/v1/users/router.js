const express = require('express');
const router = express();
const jwtSecret = require('../../../config');
const supabase = require('../../../config/supabase');
const authMiddlewares = require('../../../middlewares/auth');
const jwt = require('../../../utils');

// Authentication

// Sign Up
router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'Email and password are required',
      });
    }

    const { data: user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({
        error: error.message,
      });
    }

    const token = jwt.sign({ userId: user.user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.status(201).json({
      user: user.user,
      token,
    });
  } catch (error) {
    console.error('Error signing up:', error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
});

// Sign In
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        error: 'Email and password are required',
      });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({
        error: error.message,
      });
    }

    const token = jwt.sign({ userId: data.user.id }, jwtSecret, {
      expiresIn: '1h',
    });

    return res.status(200).json({
      user: data.user,
      token,
    });
  } catch (error) {
    console.error('Error signing in:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Sign Out
router.post('/signout', async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return res.status(500).json({
        error: error.message,
      });
    }

    return res.status(200).json({
      message: 'Successfully signed out',
    });
  } catch (error) {
    console.error('Error signing out:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// --- CRUD User Routes (Protected) ---

// Get all users (Contoh: hanya admin yang bisa)
router.get('/users', authMiddlewares, async (req, res) => {
  try {
    // Cek role user (contoh implementasi sederhana)
    // if (req.user.role !== 'admin') {
    //     return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
    // }

    const { data, error } = await supabase.from('users').select('*');
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
