const express = require('express');
const db = require('./config/connection');
const routes = require('./routes')

const PORT = process.env.PORT || 3001;
const app = express();

// Add middleware for handling sending and receiving json fetch requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// Connect to database
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}`)
    });
});