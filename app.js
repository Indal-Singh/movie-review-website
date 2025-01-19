const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const flash = require('connect-flash');
const dotenv = require('dotenv');
const webRoutes = require('./routes/web');

dotenv.config();

const PORT = process.env.PORT||5000;
// Database setup
const db = require('./config/db');

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Sessions and Passport
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(flash());

// Make flash messages available to all views
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});


// Routes
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/admin-panel', adminRoutes);
app.use('/auth', authRoutes);
app.use('/',webRoutes);

// Start server
app.listen(PORT, () => {
    console.log('Server running on http://localhost:'+PORT);
});
