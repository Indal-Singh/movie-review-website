const { default: slugify } = require("slugify");
const Web = require("../models/web");
const { utilFunctiion } = require("../utilt/utillFunction");

module.exports.webHome = (req, res) => {
   movies = [];
   title = "Home";
   Web.getLatestMoviesByLimit(30,(err, movies) => {
       if (err) {
           console.error('Error fetching movies:', err);
           movies = [];
       }
       movies = movies.map((movie) => {
              movie.release_date = utilFunctiion.formatDatae(movie.release_date);
              movie.url = '/post/' + movie.id+ '/' + slugify(movie.title.toLowerCase());
              movie.parseContentHtml = movie.description.replace(/<[^>]*>?/gm, '').substring(0, 100);
              return movie;
         });
       res.render('tamplate/layout',{body:'home',movies:movies,title:title});
      });
};

module.exports.webPost = (req, res) => {
    const id = req.params.id;
    let title = "Post Title";
    Web.getMovieById(id,(err, movie) => {
        if (err) {
            console.error('Error fetching movie:', err);
            res.redirect('/');
        }
        title = movie.title;
        movie.release_date = utilFunctiion.formatDatae(movie.release_date);
        movie.url = '/post/' + movie.id+ '/' + slugify(movie.title.toLowerCase());
        res.render('tamplate/layout',{body:'postdetails',movie:movie,title:title});
    });
}