var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { style: 'Express' });
});
router.get('/editor', function(req, res, next) {
  res.render('editor', { title: 'Express' });
});
router.get('/create', function(req, res, next) {
  res.render('create', { title: 'Express' });
});

module.exports = router;
