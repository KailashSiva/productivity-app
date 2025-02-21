
const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

let isConnected = false; // Track connection status

async function connectDB() {
    if (isConnected) {
        console.log("Using existing database connection");
        return;
    }

    try {
        await mongoose.connect(uri, clientOptions);
        isConnected = true;
        console.log("Connected to MongoDB successfully!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

export default connectDB