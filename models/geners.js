const db = require('../config/db');

const Genres = {
    getAll: (callback) => {
        db.query('SELECT * FROM `movie_genres` ORDER BY name', (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    create: (name, callback) => {
        db.query('INSERT INTO `movie_genres` (name) VALUES (?,?)', [name], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    delete: (id,callback) => {
        db.query('DELETE FROM `movie_genres` WHERE id = ?',[id],(err,results)=>{
            if(err) return callback(err)
            callback(null,results)
        })
    }
};

module.exports = Genres;
