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

router.post('/', (req, res) => {
    Company
        .create(req.body)
        .then(company => res.json(company))
        .catch(err => res.json({ err: 'Couldn\t create the company' }));
});

// Get a single companies information
router.get('/:name', (req, res) => {
    Company
        .findOne({ name: req.params.name })
        .then(company => res.json(company))
        .catch(err => res.json({ err: 'Couldn\t find the company you were looking for' }))
});

// Update a single companies information
router.put('/:name', (req, res) => {
    Company
        .findOneAndUpdate({ name: req.params.name }, req.body)
        .then(company => res.json(company))
        .catch(err => res.json({ err: 'Couldn\'t find the company you were trying to update' }));
});

router.delete('/:name', (req, res) => {
    Company
        .findOneAndDelete({ name: req.params.name })
        .then(company => res.json(company))
        .catch(err => res.json({ err: 'Couldn\'t find the company you were trying to delete' }));
});


module.exports = router;
