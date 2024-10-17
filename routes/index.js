const express = require('express');
const router = express.Router();

// Homepage route
router.get('/', async (req, res) => {
    // Fetch blog posts from the database (we'll add this later)
    const posts = []; // Placeholder
    res.render('home', { posts });
});

// Login route
router.get('/login', (req, res) => {
    res.render('login');
});

// Dashboard route (protected)
router.get('/dashboard', (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    // Fetch user's posts from the database (we'll add this later)
    const userPosts = []; // Placeholder
    res.render('dashboard', { userPosts });
});

module.exports = router;
