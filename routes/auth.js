const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

// Create a new account for the user if the account isn't already created
router.post('/', (req, res) => {
    User
        .create(req.body)
        .then((user) => {
            // Create token payload and headers if user was successfully created
            const tokenPayload = {
                username: user.username,
                id: user._id,
            };

            const tokenHeaders = { expiresIn: '60 days' };
            const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, tokenHeaders);

            // Create cookie with encrypted jwt token, and then send it to the user
            res.cookie('control-auth', token, { maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json({ success: 'Successfully created user and issued auth token' });
        })
        .catch(err => res.status(500).json({ err: 'Could not sign in to API' }));
});

// Sign the user into our API
router.put('/', (req, res) => {
    const { username, password } = req.body;

    User
        .findOne({ username }, 'username password')
        .then((user) => {
            // Ensure that a user was found to continue login process
            if (!user) {
                return res.status(403).json({ err: 'Your username or password is incorrect' });
            }

            // compare the entered password with the one stored for that user
            user.comparePassword(password, (err, isMatch) => {
                if (isMatch) {
                    // Create jwt payload, headers, and token
                    const tokenPayload = {
                        username: user.username,
                        id: user._id,
                    };
                    const tokenHeaders = { expiresIn: '60 days' };
                    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, tokenHeaders);

                    // Create cookie with encrypted jwt token,  and then send it to the user
                    res.cookie('control-auth', token, { maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true });
                    return res.json({ success: 'Successfully signed in and issued auth token' });
                }
                return res.status(403).json({ err: 'Your username or password is incorrect' });
            });
        }).catch(err => res.status(500).json({ err: 'Could not sign in to API' }));
});

// Sign the user out of the API
router.delete('/', (req, res) => {
    res.clearCookie('control-auth');
    res.json({ success: 'Successfully signed out and removed your token' });
});

module.exports = router;
