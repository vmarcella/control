const mongoose = require('mongoose');

const { Schema } = mongoose;

const companySchema = new Schema({
    name: { type: String, required: true, unique: true },
    verified: { type: Boolean },
    description: { type: String, default: '' },
    employees: [{ type: String, default: [] }],
});

module.exports = mongoose.model('Company', companySchema)
