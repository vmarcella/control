// Import npm modules / std lib dependencies
const mongoose = require('mongoose');
const assert = require('assert');

// Set up some variables for mongo
const url = process.env.MONGODB_URI || process.env.MONGODB_TESTURI;
mongoose.Promise = global.Promise;

// Connect to our database at url, using the new url parser
mongoose.connect(url,
    { useNewUrlParser: true },
    (err, db) => {
        assert.equal(null, err);
        console.log('Successfully connected to the database');
    });

// Setup debug mode and connection error handler
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error: '));
mongoose.set('debug', true);

// Export our connection in case we need to use it later
module.exports = mongoose.connection;
