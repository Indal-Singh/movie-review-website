const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const Movie = require('../models/movie');
const { ensureAuthenticated } = require('../middleware/authMiddleware');

// Apply ensureAuthenticated middleware to all admin routes
router.use(ensureAuthenticated);


// Admin dashboard route
router.get('/dashboard', (req, res) => {
    res.render('admin/layout',{body:"dashboard"});
});

// Add category
router.get('/categories', (req, res) => {
    let categories = [];
    res.render('admin/layout',{body:"categories",categories:categories});
});
router.get('/add-category', (req, res) => {
    res.render('admin/add-category');
});

router.post('/add-category', (req, res) => {
    const { name } = req.body;
    Category.create(name, (err) => {
        if (err) return res.send('Error adding category');
        res.redirect('/admin/dashboard');
    });
});

// Add movie
router.get('/add-movie', (req, res) => {
    Category.getAll((err, categories) => {
        if (err) return res.send('Error fetching categories');
        res.render('admin/add-movie', { categories });
    });
});

router.post('/add-movie', (req, res) => {
    const { title, category_id, review } = req.body;
    const image_path = req.file ? req.file.path : ''; // Image upload handling
    Movie.create(title, category_id, review, image_path, (err) => {
        if (err) return res.send('Error adding movie');
        res.redirect('/admin/dashboard');
    });
});



module.exports = router;
