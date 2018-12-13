var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Control API', indexActive: 'active' });
});

// Get the documentation for the API
router.get('/documentation', (req, res) => {
    res.render('documentation', { title: 'Control API', docsActive: 'active' })
})
module.exports = router;
