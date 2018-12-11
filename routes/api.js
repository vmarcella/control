const express = require('express');
const authorize = require('../lib/authorize');
const router = express.Router();

// Import all v1 API routes
const companyRouter = require('./api/companies');

// Make sure user is authorized to access api routes
router.use(authorize);

// Attach all v1 API routes to the v1 router
router.use('/v1/companies', companyRouter);

module.exports = router;


