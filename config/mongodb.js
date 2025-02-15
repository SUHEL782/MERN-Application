const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 20000, // 20s timeout to prevent errors
        });

        console.log('🟢 MongoDB connected successfully!');
        
        // Handling MongoDB connection events
        mongoose.connection.on('disconnected', () => {
            console.log('⚠️ MongoDB disconnected. Reconnecting...');
            connectDB();
        });

        mongoose.connection.on('error', (err) => {
            console.error('❌ MongoDB connection error:', err.message);
        });

    } catch (err) {
        console.error('❌ MongoDB Connection Failed:', err.message);
        process.exit(1); // Exit process if DB fails
    }
};

module.exports = connectDB;
