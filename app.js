// Import necessary modules
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const routes = require('./routes');
const db = require('./models');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables

const app = express();

// Import auth routes (corrected import statement)
const authRoutes = require('./routes/auth');

// Middleware for parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up Handlebars.js as the template engine
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Session middleware with SequelizeStore
app.use(session({
    secret: process.env.SESSION_SECRET || 'supersecretkey', // Use env variable for secret
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: db.sequelize,
    }),
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        httpOnly: true, // Protects against XSS
    }
}));

// Use the routes (correct placement)
app.use(authRoutes); // Use the auth routes
app.use(routes); // Use general routes

// Sync database (corrected `sequelize.sync()` typo)
db.sequelize.sync({ force: false })
    .then(() => {
        console.log('Database synced successfully');
    })
    .catch(err => {
        console.error('Failed to sync database:', err);
    });

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

