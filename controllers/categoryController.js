const Category = require("../models/category");


module.exports.listCategory = (req, res) => {
    Category.getAll((err,data) =>{
        if(err) data= [];
        res.render('admin/layout',{body:"categories",categories:data});
        
    });
}
module.exports.addCategory = (req, res) => {
    const { name, description } = req.body;
    Category.create(name,description, (err) => {
        if (err) return res.send('Error adding category');
        res.redirect(`/${process.env.ADMIN_URI}/categories`);
    });
}

module.exports.deleteCategory = (req,res) =>{
    const delId = req.params['id'];
    Category.delete(delId,(err,results)=>{
        if (err) return res.send('Error To Delete category');
        res.redirect(`/${process.env.ADMIN_URI}/categories`);
    })
}