const db = require('../config/db');

const Category = {
    getAll: (callback) => {
        db.query('SELECT * FROM categories', (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    create: (name, callback) => {
        db.query('INSERT INTO categories (name) VALUES (?)', [name], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
};

module.exports = Category;
