require('dotenv').config();

const cors = require('cors');
const express = require('express');
const app = express();
const connectDB = require('./config/mongodb');

// ✅ Import All Required Routes & Controllers
const indexRoutes = require('./routes/index.route');
const userRoutes = require('./routes/user.route');
const productRoutes = require('./routes/products.routes');
const productcontroller = require('./controllers/product.cotroller');
const authMiddleware = require('./middlewares/auth.middleware'); // If authentication is needed

// ✅ Connect to MongoDB
connectDB();

// ✅ Proper CORS Configuration
app.use(cors({
    origin: ['http://localhost:3000', 'https://your-frontend-domain.com'], // Adjust frontend domain
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// ✅ Handle Preflight Requests
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Define Routes
app.use('/', indexRoutes);
app.use('/user', userRoutes);
app.use('/products', productRoutes);

// ✅ Test API Route
app.get('/', (req, res) => {
    res.send('🚀 My server is currently running');
});

// ✅ Error Handling Middleware
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong on the server' });
});

// ✅ Change Backend Port (Avoid Frontend Conflict)
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
