// Import mongoose library
const mongoose = require('mongoose');

// Replace with your MongoDB Atlas connection string
const uri = 'mongodb+srv://linktree_user:GHhLo58xB9nrOYgz@cluster0.nwgbk2x.mongodb.net/LinkTree?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB Atlas
mongoose.connect(uri);

// Get the default connection
const db = mongoose.connection;

// Event listener for MongoDB connection open
db.once('open', () => {
    console.log('Connected to MongoDB Atlas');
    
    // Example: Perform database operations here
    // For example, you can define and use Mongoose schemas and models

    // Disconnect from MongoDB Atlas after operations
    mongoose.disconnect();
    console.log('Disconnected from MongoDB Atlas');
});

// Event listener for MongoDB connection error
db.on('error', (error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
});
