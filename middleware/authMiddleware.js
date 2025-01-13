const { throws } = require('assert');
const Admin = require('../models/admin');
const crypto = require('crypto');

exports.authenticateAdmin = (req, res, next) => {
    const { username, password } = req.body;

    try {
        Admin.findByUsername(username,(error, admin)=>{
            if(error) {
                throw new Error(`Error While Excuting Query: ${error}`);
            }

            if (!admin) {
                req.flash('error_msg', 'Invalid username or password');
                return res.redirect('/auth/login');
            }
    
            const hashedPassword = crypto.createHash('md5').update(password).digest('hex');
    
            if (hashedPassword !== admin.password) {
                req.flash('error_msg', 'Invalid username or password');
                return res.redirect('/auth/login');
            }
    
            // Authentication successful
            req.session.adminId = admin.id;
            req.flash('success_msg', 'You are now logged in');
            res.redirect('/admin-panel/dashboard');
        });
    } catch (error) {
        console.error(error);
        req.flash('error_msg', 'An error occurred during login');
        res.redirect('/auth/login');
    }
};

exports.ensureAuthenticated = (req, res, next) => {
    if (req.session.adminId) {
        return next();
    }
    req.flash('error_msg', 'Please log in to view this resource');
    res.redirect('/auth/login');
};

