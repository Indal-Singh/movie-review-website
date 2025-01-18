const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const Movie = require('../models/movie');
const { ensureAuthenticated } = require('../middleware/authMiddleware');
const { addCategory, listCategory, deleteCategory } = require('../controllers/categoryController');
const { addMovies, listMovies, saveMovieData, deleteMovie, editMovie, updateMovie } = require('../controllers/movieController');

// Apply ensureAuthenticated middleware to all admin routes
router.use(ensureAuthenticated);

// Admin dashboard route
router.get('/dashboard', (req, res) => {
    res.render('admin/layout',{body:"dashboard"});
});

// Add category
router.get('/categories', listCategory);

router.get('/add-category', (req, res) => {
    res.render('admin/layout',{body:"add-category"});
});

router.post('/add-category', addCategory);

router.get('/category/delete/:id', deleteCategory);

router.get('/movies',listMovies)
// Add movie
router.get('/movies/add', addMovies);
router.post('/movies/delete/:id', deleteMovie);
router.get('/movies/edit/:id', editMovie);
router.post('/movies/edit/:id', updateMovie);

router.post('/movies/add', saveMovieData);


module.exports = router;
