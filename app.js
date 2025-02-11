require('dotenv').config();

const cors = require('cors');
const express = require('express');
const app = express();

const connectDB = require('./config/mongodb');
const indexRoutes = require('./routes/index.route');
const userRoutes = require('./routes/user.route');
const productRoutes = require('./routes/products.routes');
const productcontroller = require('./controllers/product.cotroller');

connectDB();

// CORS Configuration
app.use(cors({
    origin: ['http://localhost:3000', 'https://your-frontend-domain.com'], // Allow specific origins
    methods: 'GET,POST,PUT,DELETE,PATCH,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization'
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRoutes);
app.use('/user', userRoutes);
// app.use('/products', productRoutes);

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
