const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Register
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const { username,mailid, password } = req.body;
    try {
        const user = new User({ username,mailid, password });
        await user.save();
        res.redirect('/login');
    } catch (err) {
        res.status(400).send('Error registering user try different userName');
    }
});

// Login
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await user.comparePassword(password)) {
        const token = jwt.sign({ _id: user._id }, 'secretkey', { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/exams');
    } else {
        res.status(400).send('Invalid credentials');
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
});

module.exports = router;