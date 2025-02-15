require('dotenv').config();

const cors = require('cors');
const express = require('express');
const app = express();

const connectDB = require('./config/mongodb');
const indexRoutes = require('./routes/index.route');
const userRoutes = require('./routes/user.route');
const productRoutes = require('./routes/products.routes');

connectDB();

// ✅ Apply CORS Middleware Before Routes
app.use(cors({
    origin: ['http://localhost:3000', 'https://your-frontend-domain.com'], // Allow frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Apply Routes
app.use('/', indexRoutes);
app.use('/user', userRoutes);
app.use('/products', productRoutes); // Uncommented to make sure it's included

app.get('/', (req, res) => {
    res.send('My server is currently running');
});

// ✅ 404 Error Handling
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// ✅ Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong on the server' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
