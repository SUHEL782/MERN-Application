const mongoose = require('mongoose');


// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI).then(() => {
            console.log('Connected to Mongodb');
        }).catch(err => {
            console.error(err.message);
            process.exit(1);
        });
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}    

module.exports = connectDB;
