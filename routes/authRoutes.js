const express = require('express');
const router = express.Router();
const { authenticateAdmin } = require('../middleware/authMiddleware');

// Login route (GET request to render login form)
router.get('/login', (req, res) => {
    res.render('admin/login');
});


// Login route (POST request for handling form submission)
router.post('/login', authenticateAdmin);

// Logout route
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        }
        res.redirect('/auth/login');
    });
});

module.exports = router;

