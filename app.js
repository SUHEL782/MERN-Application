require('dotenv').config();

const cors = require('cors');
const express = require('express');
const app = express();
const connectDB = require('./config/mongodb');
const indexRoutes = require('./routes/index.route');
const userRoutes = require('./routes/user.route');
const productRoutes = require('./routes/products.routes'); 
const productcontroller = require('./controllers/product.cotroller');

// Connect to the database
connectDB();

// ✅ Explicit CORS Configuration (Fix Preflight Requests)
const corsOptions = {
    origin: "http://localhost:3000", // Allow requests from your React frontend
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true, // Allow cookies if needed
};

// Enable CORS for all requests
app.use(cors(corsOptions));

// ✅ Handle Preflight Requests Explicitly
app.options('*', cors(corsOptions));  // Allow preflight requests for all routes

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', indexRoutes);
app.use('/user', userRoutes);
/*app.use('/products', productRoutes);*/

app.get('/', (req, res) => {
    res.send('My server is currently running');
});

// ✅ Correct Error Handling Middleware Order
app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong on the server' });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
