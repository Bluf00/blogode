const express = require('express');
const router = express.Router();
const { User } = require('../models').models;

// Sign-Up Route
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.create({ username, password });
        req.session.userId = user.id; // Log the user in after sign-up
        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while signing up.');
    }
});

module.exports = router;


// Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
      const user = await User.findOne({ where: { username } });

      if (user && await user.validatePassword(password)) {
          req.session.userId = user.id; // Log the user in
          res.redirect('/dashboard');
      } else {
          res.status(401).send('Invalid username or password.');
      }
  } catch (err) {
      console.error(err);
      res.status(500).send('An error occurred while logging in.');
  }
});

// Logout Route
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
      if (err) {
          console.error(err);
          res.status(500).send('An error occurred while logging out.');
      } else {
          res.redirect('/');
      }
  });
});

// Middleware to protect routes
function isAuthenticated(req, res, next) {
  if (req.session.userId) {
      return next();
  } else {
      res.redirect('/login');
  }
}

module.exports = {
  router,
  isAuthenticated
};
