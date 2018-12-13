const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

// User schema for 
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },

    password: {
        type: String,
        required: true,
        select: false,
    },

    description: {
        type: String,
    },

    companiesCreated: [{
        type: Schema.Types.ObjectId,
        ref: 'Company'
    }],

    createdAt: {
        type: Date,
    },

    updatedAt: {
        type: Date,
    },
});

// Pre save hook for saving users into our database
userSchema.pre('save', function(next) {
    const user = this;
    const now = new Date();

    user.updatedAt = now;
    if (!user.createdAt) {
        user.createdAt = now;
    }

    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) return next(err);

                user.password = hash;
                return next();
            });
        });
    } else {
        return next();
    }
});

// Compare passwords between the one stored within our database and the one
// supplied in by someone trying to authenticate into a pre existing account
userSchema.methods.comparePassword = function(password, done) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        return done(err, isMatch);
    })
}

module.exports = mongoose.model('User', userSchema);
