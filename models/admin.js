const db = require('../config/db');

const Admin = {
    findByUsername: (username, callback) => {
        db.query('SELECT * FROM admin WHERE username = ?', [username], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);  // Return the first user matching the username
        });
    },

    findById: (id, callback) => {
        db.query('SELECT * FROM admin WHERE id = ?', [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);  // Return user by ID
        });
    },
};

module.exports = Admin;
