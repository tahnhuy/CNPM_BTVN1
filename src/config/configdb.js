import mongoose from 'mongoose';
require('dotenv').config();

let connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/node_fulltask');
        console.log('Connect to MongoDB successfully!');
    } catch (error) {
        console.error('Connection error:', error);
    }
}

export default connectDB;
