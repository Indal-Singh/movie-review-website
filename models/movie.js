const db = require('../config/db');

const Movie = {
    getAll: (callback) => {
        db.query('SELECT * FROM movies ORDER BY id DESC', (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    create: (title, category_id, releaseDate, description, rating, imagePath, callback) => {
        db.query('INSERT INTO movies (title, category_id, release_date, description,rating,image_path) VALUES (?, ?, ?, ?, ?, ?)', 
            [title, category_id, releaseDate, description,rating,imagePath], 
            (err, results) => {
                if (err) return callback(err);
                callback(null, results);
            }
        );
    },
};

module.exports = Movie;
