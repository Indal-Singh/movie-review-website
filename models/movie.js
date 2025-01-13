const db = require('../config/db');

const Movie = {
    getAll: (callback) => {
        db.query('SELECT * FROM movies', (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    create: (title, category_id, review, image_path, callback) => {
        db.query('INSERT INTO movies (title, category_id, review, image_path) VALUES (?, ?, ?, ?)', 
            [title, category_id, review, image_path], 
            (err, results) => {
                if (err) return callback(err);
                callback(null, results);
            }
        );
    },
};

module.exports = Movie;
