const express = require('express');
const router = express.Router();

const Company = require('../../models/company');

// Get all of the companies registered with the api
router.get('/', (req, res) => {
    Company
        .find()
        .then(companies => res.json(companies))
        .catch(err => res.json({ err: 'Couldn\'t load the companies' }));
});

// Get a single companies information
router.get('/:id', (req, res) => {

});

router.put('/')
