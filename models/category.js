const db = require('../config/db');

const Category = {
    getAll: (callback) => {
        db.query('SELECT * FROM categories ORDER BY id DESC', (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    create: (name,description, callback) => {
        db.query('INSERT INTO categories (name,description) VALUES (?,?)', [name,description], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    delete: (id,callback) => {
        db.query('DELETE FROM categories WHERE id = ?',[id],(err,results)=>{
            if(err) return callback(err)
            callback(null,results)
        })
    }
};

module.exports = Category;
