const mongoose = require('mongoose');

const { Schema } = mongoose;

const employeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    
    position: {
        type: String,
        required: true
    },

    email: {
        type: String
    },
    
    employeeId: {
        type: Number,
        required: true,
        unique: true
    },
    employedAt: {
        type: Schema.Types.ObjectId,
        ref: 'Company'
    },

});

module.exports = mongoose.model('Employee', employeeSchema);
