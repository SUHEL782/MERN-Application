require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./config/mongodb');
const indexRoutes = require('./routes/index.route'); // Correct path to the index route
const userRoutes = require('./routes/user.route');


connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the correct routes
app.use('/', indexRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.send('My server is currently running');
});

// Error handling middleware
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong on the server' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
