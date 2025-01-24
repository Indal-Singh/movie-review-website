const Category = require("../models/category");
const Movie = require("../models/movie"); // Assuming you have a Movie model
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // check id directory exist or not
        if (!fs.existsSync('public/movies')) {
            fs.mkdirSync('public/movies');
        }
        cb(null, 'public/movies/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

module.exports.listMovies = (req, res) => {
    Movie.getAll((err,data)=>{
        if(err) data=[];
        res.render('admin/layout', { movies: data, body: 'movies' });
    })
    
};

module.exports.addMovies = (req, res) => {
    Category.getAll((err, data) => {
        if (err) data = [];
        res.render('admin/layout', { body: "add-movie", categories: data });
    });
};

module.exports.saveMovieData = [
    upload.single('movie-poster'),
    (req, res) => {
        const { 'movie-title': title, category, 'release-date': releaseDate, 'movie-description': description, rating } = req.body;
        const imageName = req.file ? req.file.filename : ''; // Image upload handling
        Movie.create(title, category, releaseDate, description, rating, imageName, (err) => {
            if (err) return res.status(500).send('Error adding movie');
            // res.status(200).send('Movie added successfully');
            res.redirect(`/${process.env.ADMIN_URI}/movies`);
        });
    }
];

module.exports.deleteMovie = (req, res) => {
    const delId = req.params['id'];
    // deteting file 
    let imageName = '';
    Movie.getMovieDetailsById(delId,(err,rest) => {
        if(err) imageName = '';
        imageName = rest[0].image_path;
    })
    Movie.delete(delId,(err,results)=>{
        if (err) return res.send('Error To Delete category');
        fs.unlinkSync(`public/movies/${imageName}`);
        res.redirect(`/${process.env.ADMIN_URI}/movies`);
    })
};

module.exports.editMovie = (req,res) =>{
    const editId = req.params['id'];
    let categories = [];
    Category.getAll((err, data) => {
        if (err) data = [];
        categories = data;
    });
    Movie.getMovieDetailsById(editId,(err,movie) => {
        if(err) res.status(500).send("Faild to Open Edit This Movie")
        res.render('admin/layout', 
            { 
                body: "edit-movie",
                movie:movie[0],
                categories
            }
        );
        })
}

module.exports.updateMovie = [
    upload.single('movie-poster'),
    (req,res) =>{
    const movieId = req.params['id'];
    const { 'movie-title': title, category, 'release-date': releaseDate, 'movie-description': description, rating,'old-image-name':oldImageName } = req.body;
    const imageName = req.file ? req.file.filename : ''; // Image upload handling
    Movie.update(movieId,title, category, releaseDate, description, rating, imageName, (err) => {
        if (err) return res.status(500).send('Error adding movie');
        // remove old file name if we are updating new image
        if(imageName)
        {
            fs.unlinkSync('public/movies/'+oldImageName);
        }
        // res.status(200).send('Movie added successfully');
        res.redirect(`/${process.env.ADMIN_URI}/movies`);
    });
}]