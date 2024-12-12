const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log('Environment variables:', {
            mongoURI: process.env.MONGODB_URI,
            nodeEnv: process.env.NODE_ENV
        });
        
        if (!process.env.MONGODB_URI) {
            throw new Error('MongoDB URI is not defined in environment variables');
        }

        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
