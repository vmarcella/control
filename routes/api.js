const express = require('express');
const router = express.Router();

// Import all v1 API routes
const companyRouter = require('./api/companies');

// Attach all v1 API routes to the v1 router
router.use('/v1/companies', companyRouter);

module.exports = router;


