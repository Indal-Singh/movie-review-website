const { default: slugify } = require("slugify");
const Web = require("../models/web");
const { utilFunction } = require("../utilt/utillFunction");

module.exports.webHome = async (req, res) => {
    try {
        const title = "A Movie Review Website Of KanndaMaza.Com";
        const metas = [{
            name: "description",
            content: "This Is Home Page Of Movie Review Websites And You Can Find Latest Movies And Reviews"
        }];

        // Fetch categories
        const categories = await new Promise((resolve, reject) => {
            Web.getCategories((err, categories) => {
                if (err) {
                    console.error('Error fetching categories:', err);
                    return reject(err);
                }
                categories = categories.map((category) => {
                    category.url = '/category/' + category.id + '/' + slugify(category.name.toLowerCase());
                    return category;
                });
                resolve(categories);
            });
        });

        // Fetch latest movies
        const movies = await new Promise((resolve, reject) => {
            Web.getLatestMoviesByLimit(30, (err, movies) => {
                if (err) {
                    console.error('Error fetching movies:', err);
                    return reject(err);
                }
                movies = movies.map((movie) => {
                    console.log(utilFunction);
                    movie.release_date = utilFunction.formatDate(movie.release_date);
                    movie.url = '/post/' + movie.id + '/' + slugify(movie.title.toLowerCase());
                    movie.parseContentHtml = movie.description.replace(/<[^>]*>?/gm, '').substring(0, 100);
                    return movie;
                });
                resolve(movies);
            });
        });

        // Render the page
        res.render('tamplate/layout', {
            body: 'home',
            movies: movies,
            title: title,
            metas: metas,
            categories: categories
        });
    } catch (error) {
        console.error('Error in webHome:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports.webPost = async (req, res) => {
   try
   {
        const id = req.params.id;
        let title = "Post Title";
        let metas = [];
         // Fetch categories
         const categories = await new Promise((resolve, reject) => {
            Web.getCategories((err, categories) => {
                if (err) {
                    console.error('Error fetching categories:', err);
                    return reject(err);
                }
                categories = categories.map((category) => {
                    category.url = '/category/' + category.id + '/' + slugify(category.name.toLowerCase());
                    return category;
                });
                resolve(categories);
            });
        });

        const movie = await new Promise((resolve, reject) =>{
            Web.getMovieById(id,(err, movie) => {
                if (err) {
                    console.error('Error fetching movie:', err);
                    return reject(err);
                }
                title = movie.title + " From KanndaMaza.Com";
                const metas = [{
                    name: "description",
                    content: movie.title + " From KanndaMaza.Com"
                }];
                movie.release_date = utilFunction.formatDate(movie.release_date);
                movie.url = '/post/' + movie.id+ '/' + slugify(movie.title.toLowerCase());
                resolve(movie);
            });
        });

        res.render('tamplate/layout',{body:'postdetails',movie:movie,title:title, metas: metas,
            categories: categories});
   }
    catch(error)
    {
        console.error('Error in webHome:', error);
        res.status(500).send('Internal Server Error');
    }
}