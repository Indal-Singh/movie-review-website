const db = require('../config/db');

const Web = {
    getLatestMoviesByLimit: (LIMIT, callback) => {
        db.query(`SELECT movies.*, categories.name AS cat_name
FROM movies
LEFT JOIN (
    SELECT id, name
    FROM categories
) AS categories ON movies.category_id = categories.id ORDER BY movies.id DESC LIMIT ?`, [LIMIT], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    getMovieById: (id, callback) => {
        db.query(`SELECT movies.*, categories.name AS cat_name
FROM movies
LEFT JOIN (
    SELECT id, name
    FROM categories
) AS categories ON movies.category_id = categories.id WHERE movies.id = ?`, [id], (err, results) => {
            if (err) return callback(err);
            if (results.length > 0) {
                callback(null, results[0]);
            } else {
                callback(null, null);
            }
        });
    }
}

module.exports = Web;