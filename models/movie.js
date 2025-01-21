const db = require('../config/db');

const Movie = {
    getAll: (callback) => {
        db.query(`SELECT movies.*, categories.name AS cat_name
FROM movies
LEFT JOIN (
    SELECT id, name
    FROM categories
) AS categories ON movies.category_id = categories.id ORDER BY movies.id DESC`, (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    create: (title, category_id, releaseDate, description, rating, imagePath, callback) => {
        db.query('INSERT INTO movies (title, category_id, release_date, description,rating,image_path) VALUES (?, ?, ?, ?, ?, ?)',
            [title, category_id, releaseDate, description, rating, imagePath],
            (err, results) => {
                if (err) return callback(err);
                callback(null, results);
            }
        );
    },
    delete: (id, callback) => {
        db.query('DELETE FROM movies WHERE id = ?', [id], (err, results) => {
            if (err) return callback(err)
            callback(null, results)
        })
    },
    getMovieDetailsById: (id, callback) => {
        db.query(`SELECT movies.*, categories.name AS cat_name , categories.id AS cat_id
FROM movies
LEFT JOIN (
    SELECT id, name
    FROM categories
) AS categories ON movies.category_id = categories.id WHERE movies.id=? ORDER BY movies.id DESC`, [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        })
    },
    update: (movieId, title, category_id, releaseDate, description, rating, imagePath, callback) => {
        let query = `UPDATE movies SET title=?, category_id=?, release_date=?, description=?, rating=?`;
        let queryParams = [title, category_id, releaseDate, description, rating];
    
        if (imagePath) {
            query += `, image_path=?`;
            queryParams.push(imagePath);
        }
    
        query += ` WHERE id=?`;
        queryParams.push(movieId);
    
        db.query(query, queryParams, (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    }
};

module.exports = Movie;
